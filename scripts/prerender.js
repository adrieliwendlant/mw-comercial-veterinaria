/*
 * Roda depois do `npm run build`.
 * Abre cada página do site num Chrome sem janela, copia o HTML já montado e
 * grava em build/<pagina>/index.html — assim o Google e as IAs leem o conteúdo
 * sem precisar rodar JavaScript. Também gera sitemap.xml, robots.txt e 404.html.
 *
 * Endereços, títulos e descrições vêm de src/seo.json.
 * Se o Chrome não for encontrado, avisa e publica o site sem pré-montagem.
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');
const { execFile, execFileSync } = require('child_process');
const { promisify } = require('util');
const run = promisify(execFile);

const SITE = 'https://mwcomercialveterinaria.com.br';
const BUILD = path.join(__dirname, '..', 'build');
const SEO = require('../src/seo.json');

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.mp4': 'video/mp4' };

const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');

function findChrome() {
  const candidates = [process.env.CHROME_PATH, 'google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].filter(Boolean);
  for (const c of candidates) {
    try { execFileSync(c, ['--version'], { stdio: 'ignore' }); return c; } catch (e) { /* tenta o próximo */ }
  }
  return null;
}

function serve() {
  // Arquivo que existe vai como está; endereço de página vai para o index.html original
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    let file = path.join(BUILD, url);
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
      return fs.createReadStream(file).pipe(res);
    }
    res.writeHead(200, { 'Content-Type': TYPES['.html'] });
    res.end(template);
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function captureRoot(chrome, url) {
  // Perfil temporário: não mexe no Chrome de ninguém e não dispara atualização
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'mw-prerender-'));
  let dom;
  try {
    // assíncrono: o servidor acima precisa continuar respondendo ao Chrome
    ({ stdout: dom } = await run(chrome, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
      '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--disable-background-networking',
      `--user-data-dir=${profile}`, '--window-size=1280,900', '--virtual-time-budget=8000', '--dump-dom', url],
      { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024, timeout: 90000 }));
  } finally {
    fs.rmSync(profile, { recursive: true, force: true });
  }
  const open = '<div id="root">';
  const start = dom.indexOf(open);
  const end = dom.lastIndexOf('</body>');
  if (start < 0 || end < 0) throw new Error('não achei o #root');
  const inner = dom.slice(start + open.length, end).replace(/<\/div>\s*$/, '');
  if (inner.length < 2000) throw new Error('conteúdo curto demais (' + inner.length + ' caracteres)');
  return inner;
}

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function pageHtml(key, rootHtml) {
  const { path: p, title, description } = SEO[key];
  const url = SITE + p;
  let h = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(description)}`)
    .replace('</head>', `<link rel="canonical" href="${url}"/></head>`);
  if (rootHtml) h = h.replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`);
  return h;
}

function write(rel, content) {
  const file = path.join(BUILD, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

(async () => {
  const chrome = findChrome();
  const pages = {};
  if (!chrome) {
    console.warn('prerender: Chrome não encontrado — páginas publicadas sem pré-montagem.');
  } else {
    const server = await serve();
    const base = `http://127.0.0.1:${server.address().port}`;
    for (const key of Object.keys(SEO)) {
      try {
        pages[key] = await captureRoot(chrome, base + SEO[key].path);
        console.log(`prerender: ${SEO[key].path} ok (${pages[key].length} caracteres)`);
      } catch (e) {
        console.warn(`prerender: ${SEO[key].path} falhou — ${e.message}`);
      }
    }
    server.close();
  }

  for (const key of Object.keys(SEO)) {
    write(path.join(SEO[key].path, 'index.html'), pageHtml(key, pages[key]));
  }
  // Endereço que não existe cai na página inicial
  write('404.html', pageHtml('home', pages.home));

  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
  const urls = Object.values(SEO).map(({ path: p }) =>
    `  <url><loc>${SITE}${p}</loc><changefreq>monthly</changefreq><priority>${p === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n');
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  console.log('prerender: sitemap.xml, robots.txt e 404.html gerados');
})();
