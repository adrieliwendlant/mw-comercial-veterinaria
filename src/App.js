import React, { useState, useMemo } from 'react';
import {
  Search, Menu, X, Plus, Minus, Phone, MapPin, Star, Syringe, Bug,
  FlaskConical, Activity, Thermometer, Stethoscope, Pill, MoreHorizontal,
  Mail, Clock, Truck, Sun, Headphones, Check, Send, MessageCircle,
  ShoppingBag, Trash2, ArrowRight, ExternalLink, User,
} from 'lucide-react';

/* ─── DESIGN TOKENS ─────────────────────────────────────────────── */
const t = {
  obsidian:           '#1A1F27',
  obsidianSoft:       '#222831',
  anthracite:         '#2A3140',
  anthraciteElevated: '#333D50',
  teal:               '#6BBCC8',
  tealLuminous:       '#9BC5CE',
  tealDeep:           '#4A9EAB',
  mist:               '#E2EAF0',
  mistSoft:           '#7A8899',
  mistGhost:          '#4D5A68',
  divider:            'rgba(226,234,240,0.07)',
  surface:            'rgba(255,255,255,0.025)',
  surfaceHover:       'rgba(255,255,255,0.045)',
  vital:              '#6FB58A',
  red:                '#D97074',
  whatsapp:           '#25D366',
};

/* ─── DADOS DA EMPRESA ───────────────────────────────────────────── */
const COMPANY = {
  name:      'MW Comercial Veterinária',
  phone:     '(55) 3512-3085',
  whatsapp:  '555535123085',
  email:     'claudia@mwcomercialveterinaria.com.br',
  instagram: 'https://www.instagram.com/mwcomercialveterinaria',
  address: {
    street:   'Avenida Tuparendi, 1795',
    district: 'Bairro Glória',
    city:     'Santa Rosa',
    state:    'RS',
  },
};

/* ─── IMAGENS
   Coloque os arquivos em /public/images/ dentro do projeto.
   Nomes sugeridos abaixo — você pode renomear como quiser,
   só mantenha coerência com os caminhos aqui.
   ─────────────────────────────────────────────────────────────────── */
const IMG = {
  // Logo PNG oficial (fundo transparente, ~500x214px)
  logo:          '/images/logo-mw.png',
  logoAvatar:    '/images/logo-instagram-avatar.jpg',
  logoFooter:    '/images/logo-mw-footer.png',

  products: {
    simparic:                    '/images/produtos/simparic.jpg',
    simparic_trio:               '/images/produtos/simparic-trio.jpg',
    ectofend:                    '/images/produtos/ectofend.jpg',
    revolution:                  '/images/produtos/revolution.jpg',
    revolution_plus:             '/images/produtos/revolution-plus.jpg',
    proheart:                    '/images/produtos/proheart.jpg',
    vanguard_plus:               '/images/produtos/vanguard-plus.jpg',
    vanguard_htlp:               '/images/produtos/vanguard-htlp.jpg',
    defensor:                    '/images/produtos/defensor.jpg',
    bronchiguard:                '/images/produtos/bronchiguard.jpg',
    vanguard_b_oral:             '/images/produtos/vanguard-b-oral.jpg',
    vanguard_i_iii:              '/images/produtos/vanguard-i-iii.jpg',
    giardiavax:                  '/images/produtos/giardiavax.jpg',
    felocell_felv:               '/images/produtos/felocell-felv.jpg',
    felocell_cvr:                '/images/produtos/felocell-cvr.jpg',
    felocell_cvr_c:              '/images/produtos/felocell-cvr-c.jpg',
    apoquel:                     '/images/produtos/apoquel.jpg',
    cytopoint:                   '/images/produtos/cytopoint.jpg',
    rimadyl_comp:                '/images/produtos/rimadyl-comp.jpg',
    rimadyl_inj:                 '/images/produtos/rimadyl-inj.jpg',
    trocoxil:                    '/images/produtos/trocoxil.jpg',
    solensia:                    '/images/produtos/solensia.jpg',
    dexdomitor:                  '/images/produtos/dexdomitor.jpg',
    antisedan:                   '/images/produtos/Antisedan.jpg',
    telazol:                     '/images/produtos/telazol.jpg',
    convenia:                    '/images/produtos/convenia.jpg',
    uranotest_leish:             '/images/produtos/uranotest-leishmaniose.jpg',
    uranotest_ehrlichia:         '/images/produtos/uranotest-ehrlichia.jpg',
    uranotest_cinomose:          '/images/produtos/uranotest-cinomose-adenovirus.jpg',
    uranotest_dirofilariose:     '/images/produtos/uranotest-dirofilariose.jpg',
    uranotest_felv_fiv:          '/images/produtos/uranotest-felv-fiv.jpg',
    uranotest_giardia:           '/images/produtos/uranotest-giardia.jpg',
    uranotest_parvo:             '/images/produtos/uranotest-parvovirus-coronavirus.jpg',
  },

  // Fachada da sede em Santa Rosa
  fachada:       '/images/fachada.jpg',

  // Foto da equipe (evento Conexão MW)
  equipe:        '/images/equipe.jpg',

  // Fotos individuais da equipe (quadradas, mínimo 200x200px)
  team: {
    marcos:      '/images/team/marcos.jpg',
    adrieli:     '/images/team/adrieli.jpg',
    taysa:       '/images/team/taysa.jpg',
    bibiana:     '/images/team/bibiana.jpg',
    kauana:      '/images/team/kauana.jpg',
    ana_luiza:   '/images/team/ana-luiza.jpg',
    camila:      '/images/team/camila.jpg',
    laura:       '/images/team/laura.jpg',
    gabrieli:    '/images/team/gabrieli.jpg',
    ana_karoline:'/images/team/ana-karoline.jpg',
    andreas:     '/images/team/andreas.jpg',
    andryara:    '/images/team/andryara.jpg',
    bruna:       '/images/team/bruna.jpg',
    claudia:     '/images/team/claudia.jpg',
    giovani:     '/images/team/giovani.jpg',
    isabela:     '/images/team/isabela.jpg',
    joana:       '/images/team/joana.jpg',
    messias:     '/images/team/messias.jpg',
    newton:      '/images/team/newton.jpg',
    sabrina:     '/images/team/sabrina.jpg',
    virginia:    '/images/team/virginia.jpg',
  },

  // 4 posts do Instagram (quadrados, 400x400px recomendado)
  instagram: [
    '/images/instagram/post1.jpg',
    '/images/instagram/post2.jpg',
    '/images/instagram/post3.jpg',
    '/images/instagram/post4.jpg',
  ],
};

/* ─── STATS ─────────────────────────────────────────────────────── */
const STATS = [
  { value: '40+',  label: 'anos de mercado' },
  { value: '350+', label: 'estabelecimentos atendidos' },
  { value: '48h',  label: 'entrega média' },
  { value: '21',   label: 'profissionais veterinários' },
];

/* ─── VANTAGENS ──────────────────────────────────────────────────── */
const ADVANTAGES = [
  { icon: Truck,       title: 'Processo Ágil',      desc: 'Distribuição eficiente com entrega em até 48h para todo o Rio Grande do Sul.' },
  { icon: Stethoscope, title: 'Qualidade Garantida', desc: 'Armazenamento com controle de temperatura para manter a integridade dos produtos.' },
  { icon: Sun,         title: 'Energia Sustentável', desc: 'Utilizamos energia solar com armazenamento em baterias em nossas operações.' },
  { icon: Headphones,  title: 'Suporte Pós-Venda',   desc: 'Assistência técnica especializada com treinamentos e consultoria para o seu negócio.' },
];

/* ─── CATEGORIAS ─────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'all',       label: 'Todos',              icon: MoreHorizontal },
  { id: 'vaccines',  label: 'Vacinas',             icon: Syringe },
  { id: 'antiparas', label: 'Antiparasitários',    icon: Bug },
  { id: 'derma',     label: 'Dermatológicos',      icon: Stethoscope },
  { id: 'pain',      label: 'Dor e Inflamação',    icon: Thermometer },
  { id: 'anest',     label: 'Anestesia e Sedação', icon: Pill },
  { id: 'antiemetic',label: 'Antieméticos',        icon: FlaskConical },
  { id: 'diag',      label: 'Testes Diagnóstico',  icon: Search },
  { id: 'other',     label: 'Antibióticos',        icon: ShoppingBag },
];

/* ─── PRODUTOS ───────────────────────────────────────────────────── */
const BASE = 'https://www2.zoetis.com.br/especies/caes-e-gatos';
const PRODUCTS = [
  { id:1,  name:'Simparic®',                    brand:'Zoetis', cat:'antiparas',  sp:['dog'],       img:'simparic',               desc:'Comprimido saboroso que previne e trata carrapatos, pulgas e os 3 tipos de sarnas.',                                              link:`${BASE}/caes/antipulgas-e-outros-parasitas/simparic/` },
  { id:2,  name:'Simparic TRIO®',               brand:'Zoetis', cat:'antiparas',  sp:['dog'],       img:'simparic_trio',           desc:'Comprimido mastigável com três ingredientes ativos contra pulgas, carrapatos e vermes.',                                          link:`${BASE}/caes/antipulgas-e-outros-parasitas/simparic-trio/` },
  { id:3,  name:'EctoFend®',                    brand:'Zoetis', cat:'antiparas',  sp:['dog'],       img:'ectofend',                desc:'Coleira antiparasitária que repele o mosquito transmissor da leishmaniose.',                                                      link:`${BASE}/caes/ectofend/` },
  { id:4,  name:'Revolution®',                  brand:'Zoetis', cat:'antiparas',  sp:['dog','cat'], img:'revolution',              desc:'Antiparasitário tópico composto por selamectina de amplo espectro.',                                                             link:`${BASE}/antipulgas-e-outros-parasitas/revolution/` },
  { id:5,  name:'Revolution Plus®',             brand:'Zoetis', cat:'antiparas',  sp:['cat'],       img:'revolution_plus',         desc:'Antiparasitário tópico para gatos que combina selamectina e sarolaner.',                                                         link:`${BASE}/gatos/revolution-plus/` },
  { id:6,  name:'ProHeart® SR-12',              brand:'Zoetis', cat:'antiparas',  sp:['dog'],       img:'proheart',                desc:'Antiparasitário injetável à base de moxidectina com 12 meses de proteção.',                                                     link:`${BASE}/caes/antipulgas-e-outros-parasitas/proheart-sr-12/` },
  { id:7,  name:'Vanguard Plus®',               brand:'Zoetis', cat:'vaccines',   sp:['dog'],       img:'vanguard_plus',           desc:'Vacina déctupla indicada para cães sadios a partir de 6 semanas.',                                                              link:`${BASE}/caes/vacinas/vanguard-plus/` },
  { id:8,  name:'Vanguard HTLP®',               brand:'Zoetis', cat:'vaccines',   sp:['dog'],       img:'vanguard_htlp',           desc:'Vacina óctupla indicada para cães sadios a partir de 6 semanas.',                                                               link:`${BASE}/caes/vacinas/vanguard-htlp/` },
  { id:9,  name:'Defensor®',                    brand:'Zoetis', cat:'vaccines',   sp:['dog','cat'], img:'defensor',                desc:'Vacina antirrábica indicada para cães e gatos sadios a partir de 3 meses.',                                                     link:`${BASE}/vacinas/defensor/` },
  { id:10, name:'BronchiGuard®',                brand:'Zoetis', cat:'vaccines',   sp:['dog'],       img:'bronchiguard',            desc:'Vacina injetável auxiliar na prevenção da gripe canina (Bordetella).',                                                          link:`${BASE}/caes/vacinas/bronchiguard/` },
  { id:11, name:'Vanguard B Oral®',             brand:'Zoetis', cat:'vaccines',   sp:['dog'],       img:'vanguard_b_oral',         desc:'Vacina oral contra Bordetella. Imunização por estímulo da mucosa.',                                                             link:`${BASE}/caes/vacinas/` },
  { id:12, name:'Vanguard i III®',              brand:'Zoetis', cat:'vaccines',   sp:['dog'],       img:'vanguard_i_iii',          desc:'Vacina intranasal para prevenção da gripe canina, dispensa o uso de agulhas.',                                                  link:`${BASE}/caes/vacinas/` },
  { id:13, name:'GiardiaVax®',                  brand:'Zoetis', cat:'vaccines',   sp:['dog'],       img:'giardiavax',              desc:'Vacina inativada para cães sadios a partir de 8 semanas contra giardíase.',                                                     link:`${BASE}/caes/vacinas/` },
  { id:14, name:'Felocell® FeLV',               brand:'Zoetis', cat:'vaccines',   sp:['cat'],       img:'felocell_felv',           desc:'Vacina contra a leucemia felina (FeLV) para gatos a partir de 8 semanas.',                                                      link:`${BASE}/gatos/vacinas/` },
  { id:15, name:'Felocell® CVR',                brand:'Zoetis', cat:'vaccines',   sp:['cat'],       img:'felocell_cvr',            desc:'Vacina tríplice felina: rinotraqueíte, calicivirose e panleucopenia.',                                                           link:`${BASE}/gatos/vacinas/` },
  { id:16, name:'Felocell® CVR-C',              brand:'Zoetis', cat:'vaccines',   sp:['cat'],       img:'felocell_cvr_c',          desc:'Vacina quádrupla felina: rinotraqueíte, calicivirose, panleucopenia e clamidiose.',                                              link:`${BASE}/gatos/vacinas/` },
  { id:17, name:'Apoquel®',                     brand:'Zoetis', cat:'derma',      sp:['dog'],       img:'apoquel',                 desc:'Controle do prurido associado às dermatites alérgicas e atópica. Efeito em 4h.',                                                link:`${BASE}/caes/dermatologia/apoquel/` },
  { id:18, name:'Cytopoint®',                   brand:'Zoetis', cat:'derma',      sp:['dog'],       img:'cytopoint',               desc:'Dose duradoura e eficaz para controle do prurido da dermatite atópica.',                                                        link:`${BASE}/caes/dermatologia/cytopoint/` },
  { id:19, name:'Rimadyl® Comprimidos',         brand:'Zoetis', cat:'pain',       sp:['dog'],       img:'rimadyl_comp',            desc:'Anti-inflamatório oral à base de carprofeno para alívio de dor e inflamação.',                                                  link:`${BASE}/caes/dor-e-inflamacao/rimadyl/` },
  { id:20, name:'Rimadyl® Injetável',           brand:'Zoetis', cat:'pain',       sp:['dog'],       img:'rimadyl_inj',             desc:'Anti-inflamatório injetável à base de carprofeno para dor peri-operatória.',                                                    link:`${BASE}/caes/dor-e-inflamacao/rimadyl/` },
  { id:21, name:'Trocoxil®',                    brand:'Zoetis', cat:'pain',       sp:['dog'],       img:'trocoxil',                desc:'Anti-inflamatório mavacoxib para tratamento da dor em doença articular.',                                                       link:`${BASE}/caes/dor-e-inflamacao/trocoxil/` },
  { id:22, name:'Librela®',                     brand:'Zoetis', cat:'pain',       sp:['dog'],       img:null,                      desc:'Terapia com anticorpos monoclonais para controle da dor da osteoartrite canina.',                                               link:`${BASE}/caes/dor-e-inflamacao/librela/` },
  { id:23, name:'Solensia®',                    brand:'Zoetis', cat:'pain',       sp:['cat'],       img:'solensia',                desc:'Primeiro anticorpo monoclonal para gatos, controle da dor da osteoartrite felina.',                                             link:`${BASE}/gatos/dor-e-inflamacao/solensia/` },
  { id:24, name:'Dexdomitor®',                  brand:'Zoetis', cat:'anest',      sp:['dog','cat'], img:'dexdomitor',              desc:'Sedativo e analgésico à base de dexmedetomidina.',                                                                              link:`${BASE}/caes/anestesia-e-sedacao/dexdomitor/` },
  { id:25, name:'Antisedan®',                   brand:'Zoetis', cat:'anest',      sp:['dog','cat'], img:'antisedan',               desc:'Reversor de medetomidina e dexmedetomidina.',                                                                                   link:`${BASE}/caes/anestesia-e-sedacao/antisedan/` },
  { id:26, name:'Torbugesic®',                  brand:'Zoetis', cat:'anest',      sp:['dog','cat'], img:null,                      desc:'Analgésico opioide à base de butorfanol para alívio de dor.',                                                                   link:`${BASE}/caes/anestesia-e-sedacao/torbugesic/` },
  { id:27, name:'Telazol®',                     brand:'Zoetis', cat:'anest',      sp:['dog','cat'], img:'telazol',                 desc:'Anestésico dissociativo injetável composto por tiletamina e zolazepam.',                                                        link:`${BASE}/caes/anestesia-e-sedacao/telazol/` },
  { id:28, name:'Cerenia® Injetável',           brand:'Zoetis', cat:'antiemetic', sp:['dog'],       img:null,                      desc:'Antiemético injetável à base de maropitant. Previne e trata o vômito agudo em cães.',                                           link:`${BASE}/caes/vomito-e-enjoo/cerenia/` },
  { id:29, name:'Cerenia® Comprimidos',         brand:'Zoetis', cat:'antiemetic', sp:['dog'],       img:null,                      desc:'Antiemético oral à base de maropitant. Eficaz na prevenção do enjoo do movimento em cães.',                                     link:`${BASE}/caes/vomito-e-enjoo/cerenia/` },
  { id:30, name:'Synulox®',                     brand:'Zoetis', cat:'other',      sp:['dog','cat'], img:null,                      desc:'Antimicrobiano composto por amoxicilina e clavulanato de potássio.',                                                            link:`${BASE}/caes/antibioticos/synulox/` },
  { id:31, name:'Convenia®',                    brand:'Zoetis', cat:'other',      sp:['dog','cat'], img:'convenia',                desc:'Antimicrobiano composto por cefovecina sódica. 14 dias com dose única.',                                                        link:`${BASE}/caes/antibioticos/convenia/` },
  { id:32, name:'Uranotest® Leishmaniose',      brand:'Urano',  cat:'diag',       sp:['dog'],       img:'uranotest_leish',         desc:'Detecção de anticorpos de Leishmania infantum no sangue, soro ou plasma. Caixas de 5, 10 e 30 testes.',                         link:'https://www.uranodiagnostics.com/pt-br/produtos/uranotest-leishmaniose' },
  { id:33, name:'Uranotest® Ehrlichia',         brand:'Urano',  cat:'diag',       sp:['dog'],       img:'uranotest_ehrlichia',     desc:'Detecção de anticorpos contra Ehrlichia canis em sangue total, soro ou plasma. Caixas com 5 ou 10 testes.',                     link:'https://www.uranodiagnostics.com/pt-br/produtos/uranotest-ehrlichia' },
  { id:34, name:'Uranotest® Cinomose-Adenovírus',brand:'Urano', cat:'diag',       sp:['dog'],       img:'uranotest_cinomose',      desc:'Detecção simultânea e diferenciação do vírus da Cinomose e do Adenovírus Canino na secreção conjuntival. Caixas com 5 testes.',  link:'https://www.uranodiagnostics.com/pt-br/produtos/uranotest-cinamose-adenovirus' },
  { id:35, name:'Uranotest® Dirofilariose',     brand:'Urano',  cat:'diag',       sp:['dog'],       img:'uranotest_dirofilariose', desc:'Detecção do antígeno de Dirofilaria immitis no sangue. Diagnóstico rápido e confiável da dirofilariose canina.',                 link:'https://www.uranodiagnostics.com/pt-br/produtos/uranotest-dirofilaria' },
  { id:36, name:'Uranotest® FeLV-FIV',         brand:'Urano',  cat:'diag',       sp:['cat'],       img:'uranotest_felv_fiv',      desc:'Detecção simultânea de antígenos da leucemia felina (FeLV) e anticorpos da imunodeficiência felina (FIV). Caixas com 5, 10 e 30 testes.', link:'https://www.uranodiagnostics.com/pt-br/produtos/uranotest-felv-fiv' },
  { id:37, name:'Uranotest® Giardia',          brand:'Urano',  cat:'diag',       sp:['dog','cat'], img:'uranotest_giardia',       desc:'Detecção do antígeno de Giardia spp. nas fezes de cães e gatos. Diagnóstico rápido da giardíase.',                               link:'https://www.uranodiagnostics.com/pt-br/produtos/uranotest-giardia' },
  { id:38, name:'Uranotest® Parvovírus-Coronavírus', brand:'Urano', cat:'diag',  sp:['dog'],       img:'uranotest_parvo',         desc:'Detecção simultânea do antígeno do Parvovírus Canino e do Coronavírus nas fezes. Caixas com 5, 10 e 20 testes.',                link:'https://www.uranodiagnostics.com/pt-br/produtos/uranotest-parvovirus-coronavirus' },
];

/* ─── EQUIPE ─────────────────────────────────────────────────────── */
const TEAM = [
  { id:1,  name:'Marcos Wendlant',            role:'Proprietário',           tier:'leadership',   region:null,                                   phone:'(55) 9 9962-5124', initials:'MW', hidePhone:true,  photo: IMG.team.marcos   },
  { id:2,  name:'Adrieli Wendlant',            role:'Gerente',                tier:'leadership',   region:null,                                   phone:'(55) 9 9999-8055', initials:'AW', hidePhone:true,  photo: IMG.team.adrieli  },
  { id:3,  name:'Taysa da Silva Caye',         role:'Coordenadora Técnica',   tier:'coordination', region:null,                                   phone:'(55) 9 9693-8002', initials:'TC', hidePhone:true,  photo: IMG.team.taysa    },
  { id:4,  name:'Bibiana Reis',                role:'Coordenadora Comercial', tier:'coordination', region:'Região de Santa Maria',                phone:'(55) 9 9155-3064', initials:'BR', hidePhone:true,  photo: IMG.team.bibiana  },
  { id:5,  name:'Kauana Pazzini',              role:'Coordenadora Comercial', tier:'coordination', region:'Região de Passo Fundo',                phone:'(54) 9 9656-6684', initials:'KP', hidePhone:true,  photo: IMG.team.kauana   },
  { id:6,  name:'Ana Luiza Menegatti',         role:'Promotora Técnica',      tier:'promoters',    region:'Rio Grande do Sul',                    phone:'(54) 9 9933-3133', initials:'AM', photo: IMG.team.ana_luiza },
  { id:7,  name:'Camila Ribas',                role:'Promotora Técnica',      tier:'promoters',    region:'Rio Grande do Sul',                    phone:'(55) 9 9657-4230', initials:'CR', photo: IMG.team.camila   },
  { id:8,  name:'Laura Spode de Arruda',       role:'Promotora Técnica',      tier:'promoters',    region:'Rio Grande do Sul',                    phone:'(55) 9 9679-6677', initials:'LA', photo: IMG.team.laura    },
  { id:9,  name:'Ana Karoline Severo',         role:'Representante Comercial',tier:'reps',         region:'Região de Cachoeira do Sul',           phone:'(55) 9 9129-7759', initials:'AK', photo: IMG.team.ana_karoline },
  { id:10, name:'Andreas Basso Dalaqua',       role:'Representante Comercial',tier:'reps',         region:'Região de Santa Cruz do Sul',          phone:'(51) 9 9981-7846', initials:'AD', photo: IMG.team.andreas },
  { id:11, name:'Andryara Panizzon',           role:'Representante Comercial',tier:'reps',         region:'Região de Passo Fundo',                phone:'(54) 9 9904-9778', initials:'AP', photo: IMG.team.andryara },
  { id:12, name:'Bruna Rigon',                 role:'Representante Comercial',tier:'reps',         region:'Região de Santiago / Uruguaiana',      phone:'(54) 9 8445-5304', initials:'BR', photo: IMG.team.bruna },
  { id:13, name:'Claudia Verffel',             role:'Representante Comercial',tier:'reps',         region:'Região de Santa Maria',                phone:'(55) 9 9659-6505', initials:'CV', photo: IMG.team.claudia },
  { id:14, name:'Giovani Chiaradia',           role:'Representante Comercial',tier:'reps',         region:'Região de Erechim',                    phone:'(55) 9 9952-4221', initials:'GC', photo: IMG.team.giovani },
  { id:15, name:'Isabela Dartora Pinheiro',    role:'Representante Comercial',tier:'reps',         region:'Região de Soledade',                   phone:'(54) 9 9211-6063', initials:'ID', photo: IMG.team.isabela },
  { id:16, name:'Joana Catapan',               role:'Representante Comercial',tier:'reps',         region:'Região de Frederico Westphalen',       phone:'(54) 9 9906-5702', initials:'JC', photo: IMG.team.joana },
  { id:17, name:'Messias Ratslaff',            role:'Representante Comercial',tier:'reps',         region:'Região de Santa Rosa',                 phone:'(55) 9 9933-5401', initials:'MR', photo: IMG.team.messias },
  { id:18, name:'Newton Luis Bareta',          role:'Representante Comercial',tier:'reps',         region:'Região de Vacaria',                    phone:'(54) 9 9938-3253', initials:'NB', photo: IMG.team.newton },
  { id:19, name:'Sabrina Lopes de Oliveira',   role:'Representante Comercial',tier:'reps',         region:'Região de Bagé / Santana do Livramento',phone:'(55) 9 9654-9020', initials:'SO', photo: IMG.team.sabrina },
  { id:20, name:'Virginia Bensch Raffaelli',   role:'Representante Comercial',tier:'reps',         region:'Região de Ijuí',                       phone:'(41) 9 9616-3928', initials:'VR', photo: IMG.team.virginia },
  { id:21, name:'Gabrieli Proença',            role:'Estagiária Curricular',  tier:'interns',      region:'Região de Passo Fundo',                phone:'(54) 9 9162-6817', initials:'GP', photo: IMG.team.gabrieli },
];

const TIER_LABELS = {
  leadership:   'Liderança',
  coordination: 'Coordenação',
  promoters:    'Promotores Técnicos',
  reps:         'Representantes Comerciais',
  interns:      'Estagiários',
};

const REVIEWS = [
  { id:1, name:'Bichanos Saúde Animal', stars:5, text:'Nossa equipe super alinhada com os produtos. Nossa vendedora e a coordenadora sempre vem fazer treinamento e eventos com a nossa loja, usamos os melhores produtos e com tranquilidade em saber que usamos o melhor!' },
  { id:2, name:'Lilian Ostrowski',      stars:5, text:'Uma empresa ótima para negociar, possui produtos de qualidade e profissionais muito atenciosos, qualificados. Nosso vendedor e promotora técnica estão sempre trazendo informações e tirando dúvidas. Parabéns pelo trabalho incrível!' },
  { id:3, name:'FM Rações',             stars:5, text:'Ótimo atendimento e assessoria, empresa que trabalhamos há anos e só temos a agradecer.' },
];

/* ─── MAPEAMENTO CIDADE → REPRESENTANTE ─────────────────────────── */
const CITY_TO_REP = {
  'agudo':9,'arroio do tigre':9,'cachoeira do sul':9,'candelaria':9,'charqueadas':9,
  'encruzilhada do sul':9,'rio pardo':9,'sobradinho':9,'taquari':9,'triunfo':9,
  'vale do sol':9,'vale verde':9,
  'arroio do meio':10,'bom retiro do sul':10,'cruzeiro do sul':10,'encantado':10,
  'estrela':10,'lajeado':10,'santa cruz do sul':10,'teutonia':10,'venancio aires':10,'vera cruz':10,
  'agua santa':11,'marau':11,'passo fundo':11,'santa cecilia':11,
  'alegrete':12,'itaqui':12,'jaguari':12,'santiago':12,'santo antonio das missoes':12,
  'sao borja':12,'sao francisco de assis':12,'uruguaiana':12,'mata':12,
  'cacapava do sul':13,'santa maria':13,'sao gabriel':13,'sao sepe':13,'itaara':13,
  'aratiba':14,'erechim':14,'getulio vargas':14,'gaurama':14,'machadinho':14,'sananduva':14,'tapejara':14,
  'arvorezinha':15,'espumoso':15,'ibiruba':15,'nao-me-toque':15,'soledade':15,'tapera':15,
  'ametista do sul':16,'frederico westphalen':16,'irai':16,'nonoai':16,'palmitinho':16,
  'planalto':16,'rodeio bonito':16,'sarandi':16,'seberi':16,
  'alecrim':17,'campina das missoes':17,'campo novo':17,'candido godoi':17,'cerro largo':17,
  'crissiumal':17,'horizontina':17,'nova ramada':17,'palmeira das missoes':17,'porto maua':17,
  'porto xavier':17,'redentora':17,'santa rosa':17,'santo angelo':17,'santo augusto':17,
  'santo cristo':17,'sao luiz gonzaga':17,'sao miguel das missoes':17,'sao nicolau':17,
  'tres de maio':17,'tres passos':17,'tuparendi':17,
  'casca':18,'guapore':18,'lagoa vermelha':18,'nova prata':18,'serafina correa':18,
  'vacaria':18,'veranopolis':18,
  'bage':19,'dom pedrito':19,'quarai':19,'rosario do sul':19,'santana do livramento':19,
  'ajuricaba':20,'carazinho':20,'catuipe':20,'condor':20,'cruz alta':20,'ijui':20,
  'joia':20,'julio de castilhos':20,'panambi':20,'tupancireta':20,
};

function findRepByCity(city) {
  if (!city) return null;
  const n = city.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const id = CITY_TO_REP[n] ?? 2;
  return TEAM.find(m => m.id === id);
}

/* ─── COMPONENTE DE IMAGEM COM FALLBACK ─────────────────────────── */
function Avatar({ src, initials, size = 56 }) {
  const [err, setErr] = useState(false);
  if (src && !err) {
    return (
      <img
        src={src}
        alt={initials}
        onError={() => setErr(true)}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', display: 'block', border: `1px solid ${t.teal}40`, flexShrink: 0 }}
      />
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `linear-gradient(135deg,${t.teal}30,${t.anthraciteElevated})`,
      border: `1px solid ${t.teal}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontSize: size * 0.32, fontWeight: 700, color: t.tealLuminous, fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
        {initials}
      </span>
    </div>
  );
}

function Photo({ src, alt, style: extraStyle }) {
  const [err, setErr] = useState(false);
  if (src && !err) {
    return (
      <img
        src={src} alt={alt} onError={() => setErr(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...extraStyle }}
      />
    );
  }
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(135deg,${t.anthracite},${t.anthraciteElevated})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px',
    }}>
      <div style={{ fontSize: '40px' }}>🏢</div>
      <div style={{ fontSize: '12px', color: t.mistSoft }}>{alt}</div>
    </div>
  );
}

/* ─── LOGO ───────────────────────────────────────────────────────── */
function MWLogo() {
  const [err, setErr] = useState(false);
  if (!err) {
    return (
      <img
        src={IMG.logo} alt="MW Comercial Veterinária"
        onError={() => setErr(true)}
        style={{ height: '52px', width: 'auto', display: 'block' }}
      />
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `linear-gradient(135deg,${t.teal},${t.tealDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: '11px', fontWeight: 800, color: t.obsidian, letterSpacing: '-0.04em', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>MW</span>
      </div>
      <span style={{ fontSize: '14px', fontWeight: 700, color: t.mist, letterSpacing: '-0.02em', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', whiteSpace: 'nowrap' }}>
        MW Comercial Veterinária
      </span>
    </div>
  );
}

function MWLogoFooter() {
  const [err, setErr] = useState(false);
  if (!err) {
    return (
      <img
        src={IMG.logoFooter} alt="MW Comercial Veterinária"
        onError={() => setErr(true)}
        style={{ height: '80px', width: 'auto', display: 'block' }}
      />
    );
  }
  return <MWLogo />;
}

/* ─── APP ────────────────────────────────────────────────────────── */
export default function MWSite() {
  const [page, setPage]               = useState('home');
  const [mobileMenu, setMobileMenu]   = useState(false);
  const [quoteItems, setQuoteItems]   = useState([]);
  const [quoteOpen, setQuoteOpen]     = useState(false);
  const [splash, setSplash]           = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  const navigate = (p) => { setPage(p); setMobileMenu(false); setQuoteOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); };

  const addToQuote    = (id) => setQuoteItems(prev => { const ex = prev.find(i => i.id === id); return ex ? prev.map(i => i.id === id ? { ...i, qty: i.qty+1 } : i) : [...prev,{id,qty:1}]; });
  const removeFromQuote = (id) => setQuoteItems(prev => prev.filter(i => i.id !== id));
  const updateQty     = (id, d) => setQuoteItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty+d) } : i));
  const clearQuote    = () => setQuoteItems([]);
  const totalItems    = quoteItems.reduce((s,i) => s+i.qty, 0);

  return (
    <div style={{ backgroundColor: t.obsidian, color: t.mist, fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif", minHeight: '100vh' }}>
      <style>{`
        *{box-sizing:border-box;} body{margin:0;}
        .fd{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;}
        .sm{transition:all 200ms cubic-bezier(.25,.46,.45,.94);}
        .ch:hover{background:${t.surfaceHover};border-color:${t.teal}40;}
        .bp{transition:all 180ms cubic-bezier(.25,.46,.45,.94);}
        .bp:hover:not(:disabled){transform:translateY(-1px);filter:brightness(1.08);}
        .bp:active:not(:disabled){transform:translateY(0);filter:brightness(.95);}
        .nl:hover{color:${t.tealLuminous}!important;}
        .ns::-webkit-scrollbar{display:none;} .ns{-ms-overflow-style:none;scrollbar-width:none;}
        @keyframes wap{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.4);}50%{box-shadow:0 0 0 14px rgba(37,211,102,0);}}
        .wap{animation:wap 2.5s infinite;}
        @keyframes fu{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
        .fu{animation:fu 500ms cubic-bezier(.25,.46,.45,.94) both;}
        @keyframes arteMwIn{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0);}}
        @keyframes arteMwFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
        .arte-mw{animation:arteMwIn 1.2s cubic-bezier(.25,.46,.45,.94) .4s forwards,arteMwFloat 7s ease-in-out 1.6s infinite;}
        @keyframes splashLogoIn{0%{opacity:0;transform:scale(.85);}60%{opacity:1;transform:scale(1.04);}100%{opacity:1;transform:scale(1);}}
        @keyframes splashBarIn{from{width:0;}to{width:100%;}}
        @keyframes splashOut{0%{opacity:1;}100%{opacity:0;pointer-events:none;}}
        .splash-logo{animation:splashLogoIn .8s cubic-bezier(.25,.46,.45,.94) .2s both;}
        .splash-bar{animation:splashBarIn 1.6s cubic-bezier(.25,.46,.45,.94) .4s both;}
        .splash-exit{animation:splashOut .5s cubic-bezier(.25,.46,.45,.94) forwards;}
        .igh:hover{border-color:${t.teal}60!important;transform:scale(1.02);}
      `}</style>

      {/* Splash screen de entrada */}
      {splash && (
        <div className="splash-exit" style={{ position:'fixed',inset:0,zIndex:999,backgroundColor:t.obsidian,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'32px', animationDelay:'1.9s' }}>
          <div className="splash-logo" style={{ width:'clamp(220px,35vw,360px)' }}>
            <img src={IMG.logo} alt="MW Comercial Veterinária" style={{ width:'100%',height:'auto',display:'block' }} onError={e => { e.target.style.display='none'; }} />
          </div>
          <div style={{ width:'clamp(160px,25vw,260px)',height:'2px',background:`${t.teal}20`,borderRadius:'2px',overflow:'hidden' }}>
            <div className="splash-bar" style={{ height:'100%',background:`linear-gradient(90deg,${t.teal},${t.tealLuminous})`,borderRadius:'2px' }} />
          </div>
        </div>
      )}

      <Navbar page={page} navigate={navigate} mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu} totalItems={totalItems} setQuoteOpen={setQuoteOpen} />

      <main style={{ paddingTop:'72px' }}>
        {page==='home'     && <HomePage navigate={navigate} />}
        {page==='about'    && <AboutPage navigate={navigate} />}
        {page==='products' && <ProductsPage addToQuote={addToQuote} quoteItems={quoteItems} />}
        {page==='team'     && <TeamPage />}
        {page==='contact'  && <ContactPage quoteItems={quoteItems} clearQuote={clearQuote} />}
      </main>

      <SiteFooter navigate={navigate} />
      <WhatsAppFloat />
      <QuoteDrawer isOpen={quoteOpen} onClose={() => setQuoteOpen(false)}
        items={quoteItems} removeItem={removeFromQuote} updateQty={updateQty}
        goToContact={() => { setQuoteOpen(false); navigate('contact'); }} />
    </div>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────────────── */
function Navbar({ page, navigate, mobileMenu, setMobileMenu, totalItems, setQuoteOpen }) {
  const links = [
    {id:'home',label:'Início'},{id:'about',label:'Sobre'},
    {id:'products',label:'Produtos'},{id:'team',label:'Equipe'},{id:'contact',label:'Contato'},
  ];
  return (
    <>
      <nav style={{ position:'fixed',top:0,left:0,right:0,zIndex:50,height:'72px', backgroundColor:`${t.obsidian}e6`,backdropFilter:'blur(20px)',borderBottom:`1px solid ${t.divider}` }}>
        <div style={{ maxWidth:'1280px',margin:'0 auto',height:'100%',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
          <button onClick={() => navigate('home')} style={{ background:'none',border:'none',cursor:'pointer',padding:0 }}><MWLogo /></button>
          <div className="dn" style={{ display:'none',gap:'4px',alignItems:'center' }}>
            {links.map(l => (
              <button key={l.id} className="nl sm" onClick={() => navigate(l.id)} style={{ padding:'8px 14px',borderRadius:'8px',background:page===l.id?`${t.teal}18`:'transparent',color:page===l.id?t.tealLuminous:t.mist,border:'none',fontSize:'14px',fontWeight:500,cursor:'pointer' }}>{l.label}</button>
            ))}
          </div>
          <div style={{ display:'flex',alignItems:'center',gap:'8px' }}>
            {totalItems>0 && (
              <button onClick={() => setQuoteOpen(true)} className="sm" style={{ display:'flex',alignItems:'center',gap:'8px',padding:'8px 14px',borderRadius:'8px',backgroundColor:`${t.teal}20`,border:`1px solid ${t.teal}50`,color:t.tealLuminous,cursor:'pointer',fontWeight:600,fontSize:'13px' }}>
                <ShoppingBag size={16}/>{totalItems}
              </button>
            )}
            <button className="mmb" onClick={() => setMobileMenu(true)} style={{ background:'none',border:'none',color:t.mist,cursor:'pointer',padding:'8px' }}><Menu size={22}/></button>
          </div>
        </div>
        <style>{`@media(min-width:900px){.dn{display:flex!important;}.mmb{display:none!important;}}`}</style>
      </nav>
      {mobileMenu && (
        <div style={{ position:'fixed',inset:0,zIndex:60,backgroundColor:t.obsidian,display:'flex',flexDirection:'column' }}>
          <div style={{ padding:'20px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:`1px solid ${t.divider}` }}>
            <MWLogo />
            <button onClick={() => setMobileMenu(false)} style={{ background:'none',border:'none',color:t.mist,cursor:'pointer',padding:'8px' }}><X size={26}/></button>
          </div>
          <div style={{ padding:'32px 24px',flex:1,display:'flex',flexDirection:'column',gap:'6px' }}>
            {links.map(l => (
              <button key={l.id} onClick={() => navigate(l.id)} className="fd" style={{ padding:'16px 20px',borderRadius:'10px',background:page===l.id?`${t.teal}18`:'transparent',color:page===l.id?t.tealLuminous:t.mist,border:'none',fontSize:'22px',fontWeight:600,textAlign:'left',cursor:'pointer' }}>{l.label}</button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ─── HOME ───────────────────────────────────────────────────────── */
function HomePage({ navigate }) {
  return (
    <>
      {/* Hero — só o título com vídeo de fundo */}
      <section style={{ position:'relative',padding:'100px 24px 80px',overflow:'hidden',minHeight:'520px',display:'flex',alignItems:'center' }}>
        {/* Vídeo da equipe — fundo só desta área */}
        <video autoPlay loop muted playsInline
          style={{ position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 30%',zIndex:0,opacity:0.25 }}
        >
          <source src="/images/videoequipe.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div style={{ position:'absolute',inset:0,zIndex:1,background:`linear-gradient(180deg,${t.obsidian}bb 0%,${t.obsidian}88 50%,${t.obsidian}bb 100%)` }} />
        {/* Glow */}
        <div className="hero-glow" style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'700px',height:'700px',borderRadius:'50%',background:`radial-gradient(circle,${t.teal}12 0%,transparent 60%)`,pointerEvents:'none',zIndex:1 }} />
        <div style={{ maxWidth:'1080px',margin:'0 auto',position:'relative',zIndex:2,textAlign:'center',width:'100%' }}>
          <div className="fu" style={{ display:'inline-flex',alignItems:'center',gap:'10px',padding:'8px 16px',borderRadius:'100px',border:`1px solid ${t.teal}40`,background:`${t.teal}0e`,fontSize:'12px',letterSpacing:'.05em',textTransform:'uppercase',color:t.tealLuminous,fontWeight:500,marginBottom:'32px' }}>
            <span style={{ width:'6px',height:'6px',borderRadius:'50%',backgroundColor:t.teal }} />
            Distribuidor Zoetis e Urano · Rio Grande do Sul
          </div>
          <h1 className="fd fu" style={{ fontSize:'clamp(2.25rem,5.5vw,4rem)',fontWeight:700,letterSpacing:'-.025em',lineHeight:1.05,color:t.mist,marginBottom:'24px',animationDelay:'80ms' }}>
            A parceira estratégica<br/>do seu <span style={{ color:t.teal }}>estabelecimento veterinário</span>
          </h1>
          <p className="fu" style={{ fontSize:'clamp(16px,2vw,19px)',lineHeight:1.55,color:t.mistSoft,maxWidth:'640px',margin:'0 auto 40px',animationDelay:'160ms' }}>
            Há mais de 40 anos distribuindo as linhas Zoetis de animais de companhia no interior do Rio Grande do Sul e Urano para todo o estado, com agilidade e suporte técnico especializado.
          </p>
          <div className="fu" style={{ display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',animationDelay:'240ms' }}>
            <PrimaryBtn onClick={() => navigate('contact')}>Solicitar Contato</PrimaryBtn>
            <GhostBtn onClick={() => navigate('products')}>Ver Produtos →</GhostBtn>
          </div>
        </div>
      </section>

      {/* Foto equipe + Stats — fora do vídeo */}
      <section style={{ padding:'48px 24px 64px' }}>
        <div style={{ maxWidth:'1080px',margin:'0 auto',textAlign:'center' }}>
          <div className="fu" style={{ maxWidth:'780px',margin:'0 auto 48px',borderRadius:'20px',overflow:'hidden',border:`1px solid ${t.divider}`,boxShadow:'0 24px 60px rgba(0,0,0,.4)',position:'relative',aspectRatio:'3/2' }}>
            <Photo src={IMG.equipe} alt="Equipe MW Comercial Veterinária" />
            <div style={{ position:'absolute',bottom:0,left:0,right:0,padding:'24px 28px',background:'linear-gradient(180deg,transparent 0%,rgba(0,0,0,.85) 100%)' }}>
              <div style={{ fontSize:'11px',letterSpacing:'.15em',textTransform:'uppercase',color:t.teal,fontWeight:600,marginBottom:'6px' }}>Conexão MW</div>
              <div className="fd" style={{ fontSize:'17px',fontWeight:600,color:t.mist }}>Juntos somos mais fortes</div>
            </div>
          </div>
          <div style={{ display:'grid',gap:'16px',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',maxWidth:'840px',margin:'0 auto' }}>
            {STATS.map((s,i) => (
              <div key={i} style={{ padding:'24px 16px',borderLeft:`2px solid ${t.teal}`,textAlign:'left' }}>
                <div className="fd" style={{ fontSize:'34px',fontWeight:700,color:t.mist,letterSpacing:'-.02em',marginBottom:'2px' }}>{s.value}</div>
                <div style={{ fontSize:'11px',letterSpacing:'.08em',textTransform:'uppercase',color:t.mistSoft }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section style={{ padding:'40px 24px 80px' }}>
        <div style={{ maxWidth:'1080px',margin:'0 auto' }}>
          <div style={{ display:'grid',gap:'48px',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',alignItems:'center' }}>
            <div>
              <div style={{ fontSize:'11px',letterSpacing:'.18em',textTransform:'uppercase',color:t.teal,fontWeight:600,marginBottom:'14px' }}>Sobre Nós</div>
              <h2 className="fd" style={{ fontSize:'clamp(1.6rem,3.5vw,2.2rem)',fontWeight:700,color:t.mist,letterSpacing:'-.02em',marginTop:0,marginBottom:'20px',lineHeight:1.15 }}>
                Há mais de <span style={{ color:t.teal }}>40 anos</span> dando suporte<br/>a estabelecimentos<br/>veterinários do RS
              </h2>
              <p style={{ fontSize:'16px',color:t.mistSoft,lineHeight:1.65,marginBottom:'16px' }}>
                Distribuímos as linhas <strong style={{ color:t.mist }}>Zoetis</strong> de animais de companhia no interior do Rio Grande do Sul e a linha <strong style={{ color:t.mist }}>Urano</strong> para todo o estado, com agilidade na entrega, qualidade no armazenamento e suporte técnico especializado.
              </p>
              <p style={{ fontSize:'16px',color:t.mistSoft,lineHeight:1.65,marginBottom:'28px' }}>
                Nosso objetivo é desenvolver o mercado veterinário e melhorar a qualidade de vida dos pets.
              </p>
              <GhostBtn onClick={() => navigate('about')}>Saiba mais sobre nós →</GhostBtn>
            </div>
            <div style={{ aspectRatio:'4/3',borderRadius:'16px',overflow:'hidden',border:`1px solid ${t.divider}`,boxShadow:'0 16px 48px rgba(0,0,0,.35)',position:'relative' }}>
              <Photo src={IMG.fachada} alt="Sede MW Comercial Veterinária — Santa Rosa, RS" />
              <div style={{ position:'absolute',top:'16px',left:'16px',padding:'6px 12px',borderRadius:'100px',background:`${t.obsidian}cc`,backdropFilter:'blur(10px)',border:`1px solid ${t.teal}40`,fontSize:'11px',letterSpacing:'.05em',color:t.tealLuminous,fontWeight:600,textTransform:'uppercase' }}>
                Nossa sede · Santa Rosa
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos em destaque */}
      <section style={{ padding:'40px 24px 80px' }}>
        <div style={{ maxWidth:'1280px',margin:'0 auto' }}>
          <SectionHeader kicker="Catálogo" title={<>Produtos em <span style={{ color:t.teal }}>destaque</span></>} subtitle="Conheça alguns dos produtos mais procurados que distribuímos." />
          <div style={{ display:'grid',gap:'14px',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',marginBottom:'40px' }}>
            {PRODUCTS.filter(p => [1,17,7,18,22,31].includes(p.id)).map(p => {
              const cl = CATEGORIES.find(c => c.id===p.cat)?.label||'Outros';
              const imgSrc = p.img ? IMG.products[p.img] : null;
              return (
                <FeaturedProductCard key={p.id} product={p} cl={cl} imgSrc={imgSrc} />
              );
            })}
          </div>
          <div style={{ textAlign:'center' }}><PrimaryBtn onClick={() => navigate('products')}>Ver Catálogo Completo →</PrimaryBtn></div>
        </div>
      </section>

      {/* Equipe */}
      <section style={{ padding:'40px 24px 80px' }}>
        <div style={{ maxWidth:'960px',margin:'0 auto',padding:'56px 40px',borderRadius:'20px',background:`linear-gradient(135deg,${t.anthracite} 0%,${t.anthraciteElevated} 100%)`,border:`1px solid ${t.teal}25`,textAlign:'center',position:'relative',overflow:'hidden' }}>
          <div style={{ position:'absolute',top:'-40%',left:'50%',transform:'translateX(-50%)',width:'600px',height:'600px',borderRadius:'50%',background:`radial-gradient(circle,${t.teal}18 0%,transparent 60%)`,pointerEvents:'none' }} />
          <div style={{ position:'relative' }}>
            <div style={{ width:'64px',height:'64px',margin:'0 auto 24px',borderRadius:'14px',background:`${t.teal}15`,border:`1px solid ${t.teal}40`,display:'flex',alignItems:'center',justifyContent:'center' }}>
              <Stethoscope size={30} color={t.tealLuminous} strokeWidth={1.8}/>
            </div>
            <h2 className="fd" style={{ fontSize:'clamp(1.4rem,3.5vw,2rem)',fontWeight:700,color:t.mist,letterSpacing:'-.015em',marginBottom:'24px' }}>
              Equipe formada por Médicos Veterinários.
            </h2>
            <PrimaryBtn onClick={() => navigate('team')}>Conheça Nossa Equipe</PrimaryBtn>
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section style={{ padding:'40px 24px 80px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto' }}>
          <SectionHeader kicker="Vantagens" title="Com a MW você tem" />
          <div style={{ display:'grid',gap:'16px',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))' }}>
            {ADVANTAGES.map((a,i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="ch sm" style={{ padding:'32px 28px',background:t.surface,border:`1px solid ${t.divider}`,borderRadius:'14px' }}>
                  <div style={{ width:'48px',height:'48px',borderRadius:'12px',background:`${t.teal}12`,border:`1px solid ${t.teal}30`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'20px' }}>
                    <Icon size={22} color={t.tealLuminous} strokeWidth={1.8}/>
                  </div>
                  <h3 className="fd" style={{ fontSize:'17px',fontWeight:600,color:t.mist,margin:'0 0 8px' }}>{a.title}</h3>
                  <p style={{ fontSize:'14px',color:t.mistSoft,lineHeight:1.55,margin:0 }}>{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <InstagramSection />

      {/* Avaliações */}
      <section style={{ padding:'40px 24px 80px' }}>
        <div style={{ maxWidth:'1280px',margin:'0 auto' }}>
          <SectionHeader kicker="Avaliações" title="O que dizem nossos parceiros" />
          <div style={{ display:'grid',gap:'20px',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))' }}>
            {REVIEWS.map(r => (
              <div key={r.id} style={{ padding:'28px 26px',background:t.surface,border:`1px solid ${t.divider}`,borderRadius:'16px',display:'flex',flexDirection:'column' }}>
                <div style={{ display:'flex',gap:'3px',marginBottom:'16px' }}>
                  {Array.from({length:r.stars}).map((_,i) => <Star key={i} size={16} fill={t.teal} color={t.teal} strokeWidth={0}/>)}
                </div>
                <p style={{ fontSize:'14px',color:t.mist,lineHeight:1.65,fontStyle:'italic',margin:'0 0 20px',flex:1 }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ paddingTop:'16px',borderTop:`1px solid ${t.divider}` }}>
                  <div className="fd" style={{ fontSize:'14px',fontWeight:600,color:t.mist }}>{r.name}</div>
                  <div style={{ fontSize:'11px',color:t.mistSoft,marginTop:'2px' }}>Cliente MW</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── INSTAGRAM SECTION ──────────────────────────────────────────── */
function InstagramSection() {
  return (
    <section style={{ padding:'40px 24px 80px' }}>
      <div style={{ maxWidth:'1100px',margin:'0 auto' }}>
        <SectionHeader kicker="Redes Sociais" title="Nos acompanhe nas redes sociais" />

        {/* Card estilo Instagram — fundo branco */}
        <div style={{ background:'#ffffff', borderRadius:'20px', overflow:'hidden', maxWidth:'680px', margin:'0 auto', boxShadow:'0 8px 40px rgba(0,0,0,.25)' }}>

          {/* Header do perfil */}
          <div style={{ padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid #efefef' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
              {/* Avatar com logo MW real */}
              <div style={{ width:'48px', height:'48px', borderRadius:'50%', overflow:'hidden', flexShrink:0, border:'2px solid #efefef', background:'#f8f8f8', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <IGAvatar />
              </div>
              <div>
                <div style={{ fontSize:'14px', fontWeight:700, color:'#111', letterSpacing:'-0.01em' }}>mwcomercialveterinaria</div>
                <div style={{ fontSize:'12px', color:'#888', marginTop:'1px' }}>MW Comercial Veterinária</div>
              </div>
            </div>
            <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer"
              style={{ padding:'7px 18px', borderRadius:'8px', background:'#0095f6', color:'white', textDecoration:'none', fontSize:'13px', fontWeight:700 }}
            >
              Seguir
            </a>
          </div>

          {/* Grid 2x2 */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px' }}>
            {IMG.instagram.map((src, i) => (
              <IGPost key={i} src={src} index={i+1} />
            ))}
          </div>

          {/* Footer */}
          <div style={{ padding:'14px 20px', textAlign:'center', borderTop:'1px solid #efefef' }}>
            <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer"
              style={{ fontSize:'13px', color:'#0095f6', textDecoration:'none', fontWeight:700 }}
            >
              Ver todos os posts no Instagram →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function IGAvatar() {
  const [err, setErr] = useState(false);
  if (!err) {
    return <img src={IMG.logoAvatar} alt="MW" onError={() => setErr(true)} style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%' }} />;
  }
  return <span style={{ fontSize:'11px', fontWeight:800, color:'#1A1F27', letterSpacing:'-0.04em', fontFamily:'Helvetica Neue,Helvetica,Arial,sans-serif' }}>MW</span>;
}

function IGPost({ src, index }) {
  const [err, setErr] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer"
      style={{ position:'relative', aspectRatio:'1', display:'block', overflow:'hidden', background:'#f0f0f0', textDecoration:'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {src && !err
        ? <img src={src} alt={`Post ${index}`} onError={() => setErr(true)} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 300ms ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'8px', background:'#f0f0f0' }}>
            <div style={{ fontSize:'24px' }}>📷</div>
            <div style={{ fontSize:'11px', color:'#aaa' }}>Post {index}</div>
          </div>
      }
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center', opacity: hovered ? 1 : 0, transition:'opacity 250ms ease' }}>
        <div style={{ color:'white', fontSize:'13px', fontWeight:700 }}>Ver post</div>
      </div>
    </a>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────────── */
function AboutPage({ navigate }) {
  return (
    <section style={{ padding:'64px 24px 96px' }}>
      <div style={{ maxWidth:'1080px',margin:'0 auto' }}>
        <SectionHeader kicker="Sobre Nós" title={<>Há mais de <span style={{ color:t.teal }}>40 anos</span> no mercado veterinário</>} />
        <div style={{ display:'grid',gap:'56px',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',alignItems:'center',marginBottom:'80px' }}>
          <div>
            <p style={{ fontSize:'17px',color:t.mist,lineHeight:1.7,marginBottom:'20px' }}>
              Estamos há <strong style={{ color:t.teal }}>mais de 40 anos</strong> no mercado veterinário, e ao longo da nossa história fomos lapidando nosso método de trabalho. Desde o armazenamento dos medicamentos até o atendimento, somos referência no Estado.
            </p>
            <p style={{ fontSize:'17px',color:t.mist,lineHeight:1.7,marginBottom:'32px' }}>
              Nosso objetivo principal é desenvolver o mercado veterinário e, com isso, melhorar a qualidade de vida dos pets. Distribuímos as linhas <strong style={{ color:t.teal }}>Zoetis</strong> e <strong style={{ color:t.teal }}>Urano</strong> para todo o Rio Grande do Sul.
            </p>
            <PrimaryBtn onClick={() => navigate('contact')}>Fale Conosco</PrimaryBtn>
          </div>
          <div style={{ aspectRatio:'4/3',borderRadius:'16px',overflow:'hidden',border:`1px solid ${t.divider}`,boxShadow:'0 12px 40px rgba(0,0,0,.3)',position:'relative' }}>
            <Photo src={IMG.fachada} alt="Sede MW Comercial Veterinária — Santa Rosa, RS" />
            <div style={{ position:'absolute',bottom:0,left:0,right:0,padding:'20px',background:'linear-gradient(180deg,transparent 0%,rgba(0,0,0,.7) 100%)' }}>
              <div className="fd" style={{ fontSize:'15px',fontWeight:600,color:t.mist }}>Sede MW · Santa Rosa, RS</div>
              <div style={{ fontSize:'12px',color:t.mistSoft,marginTop:'2px' }}>Av. Tuparendi, 1795 · Bairro Glória</div>
            </div>
          </div>
        </div>
        <SectionHeader kicker="Vantagens" title="Com a MW você tem" />
        <div style={{ display:'grid',gap:'16px',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))' }}>
          {ADVANTAGES.map((a,i) => {
            const Icon = a.icon;
            return (
              <div key={i} className="ch sm" style={{ padding:'32px 28px',background:t.surface,border:`1px solid ${t.divider}`,borderRadius:'14px' }}>
                <div style={{ width:'48px',height:'48px',borderRadius:'12px',background:`${t.teal}12`,border:`1px solid ${t.teal}30`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'20px' }}>
                  <Icon size={22} color={t.tealLuminous} strokeWidth={1.8}/>
                </div>
                <h3 className="fd" style={{ fontSize:'17px',fontWeight:600,color:t.mist,margin:'0 0 8px' }}>{a.title}</h3>
                <p style={{ fontSize:'14px',color:t.mistSoft,lineHeight:1.55,margin:0 }}>{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── PRODUCTS ───────────────────────────────────────────────────── */
function ProductsPage({ addToQuote, quoteItems }) {
  const [species,setSpecies]   = useState('all');
  const [category,setCategory] = useState('all');
  const [search,setSearch]     = useState('');
  const [sort,setSort]         = useState('relevance');

  const filtered = useMemo(() => {
    let r = PRODUCTS.filter(p => {
      const mSp  = species==='all'||p.sp.includes(species);
      const mCat = category==='all'||p.cat===category;
      const q    = search.toLowerCase().trim();
      const mQ   = !q||p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q);
      return mSp&&mCat&&mQ;
    });
    if(sort==='az')  r=[...r].sort((a,b)=>a.name.localeCompare(b.name));
    if(sort==='cat') r=[...r].sort((a,b)=>a.cat.localeCompare(b.cat)||a.name.localeCompare(b.name));
    return r;
  },[species,category,search,sort]);

  return (
    <>
      <section style={{ padding:'56px 24px 32px',textAlign:'center' }}>
        <div style={{ maxWidth:'900px',margin:'0 auto' }}>
          <SectionHeader kicker="Catálogo" title="Produtos" subtitle="Catálogo completo de produtos Zoetis e Urano para animais de companhia, distribuídos pela MW Comercial Veterinária." />
          <div style={{ maxWidth:'720px',margin:'0 auto 32px',padding:'18px 22px',background:`${t.teal}08`,border:`1px solid ${t.teal}25`,borderRadius:'12px',display:'flex',gap:'14px',alignItems:'flex-start',textAlign:'left' }}>
            <div style={{ width:'32px',height:'32px',flexShrink:0,borderRadius:'8px',background:`${t.teal}15`,display:'flex',alignItems:'center',justifyContent:'center' }}>
              <MapPin size={16} color={t.tealLuminous} strokeWidth={2}/>
            </div>
            <div style={{ flex:1,fontSize:'13px',color:t.mistSoft,lineHeight:1.55 }}>
              <strong style={{ color:t.mist,fontWeight:600 }}>Nossa cobertura:</strong> distribuímos a linha <strong style={{ color:t.tealLuminous }}>Zoetis</strong> para o interior do Rio Grande do Sul e a linha <strong style={{ color:t.tealLuminous }}>Urano</strong> para todo o estado. Selecione os produtos e preencha o formulário — você será direcionado ao representante da sua região.
            </div>
          </div>
          <div style={{ maxWidth:'560px',margin:'0 auto 8px' }}>
            <div className="sm" style={{ display:'flex',alignItems:'center',gap:'12px',padding:'0 18px',height:'52px',background:t.surface,border:`1px solid ${t.divider}`,borderRadius:'12px' }}>
              <Search size={18} color={t.mistSoft}/>
              <input type="text" placeholder="Buscar produto, marca ou categoria..." value={search} onChange={e=>setSearch(e.target.value)} style={{ flex:1,background:'transparent',border:'none',color:t.mist,fontSize:'15px' }}/>
              {search && <button onClick={()=>setSearch('')} style={{ background:'none',border:'none',color:t.mistSoft,cursor:'pointer',padding:'4px' }}><X size={16}/></button>}
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding:'0 24px 32px' }}>
        <div style={{ maxWidth:'1280px',margin:'0 auto' }}>
          <div style={{ display:'flex',gap:'8px',justifyContent:'center',marginBottom:'16px',flexWrap:'wrap' }}>
            {[{id:'all',label:'Todos'},{id:'dog',label:'Cães'},{id:'cat',label:'Gatos'}].map(s => (
              <button key={s.id} onClick={()=>setSpecies(s.id)} className="sm" style={{ padding:'10px 22px',borderRadius:'100px',backgroundColor:species===s.id?t.teal:'transparent',color:species===s.id?t.obsidian:t.mist,border:`1.5px solid ${species===s.id?t.teal:t.divider}`,fontSize:'14px',fontWeight:600,cursor:'pointer' }}>{s.label}</button>
            ))}
          </div>
          <div className="ns" style={{ display:'flex',gap:'8px',overflowX:'auto',justifyContent:'center',flexWrap:'wrap',marginBottom:'24px' }}>
            {CATEGORIES.map(c => {
              const Icon=c.icon; const active=category===c.id;
              return (
                <button key={c.id} onClick={()=>setCategory(c.id)} className="sm" style={{ display:'flex',alignItems:'center',gap:'6px',padding:'8px 14px',borderRadius:'100px',backgroundColor:active?`${t.teal}18`:'transparent',color:active?t.tealLuminous:t.mistSoft,border:`1px solid ${active?t.teal+'50':t.divider}`,fontSize:'13px',fontWeight:500,cursor:'pointer',whiteSpace:'nowrap' }}>
                  <Icon size={14}/>{c.label}
                </button>
              );
            })}
          </div>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px',flexWrap:'wrap',gap:'12px' }}>
            <div style={{ fontSize:'13px',color:t.mistSoft }}><span style={{ color:t.mist,fontWeight:600 }}>{filtered.length}</span> {filtered.length===1?'produto':'produtos'}</div>
            <select value={sort} onChange={e=>setSort(e.target.value)} style={{ padding:'8px 14px',borderRadius:'8px',background:t.surface,border:`1px solid ${t.divider}`,color:t.mist,fontSize:'13px',cursor:'pointer' }}>
              <option value="relevance">Ordenar: Relevância</option>
              <option value="az">Ordenar: A–Z</option>
              <option value="cat">Ordenar: Categoria</option>
            </select>
          </div>
          {filtered.length===0
            ? <div style={{ padding:'64px 20px',textAlign:'center',color:t.mistSoft,background:t.surface,borderRadius:'16px',border:`1px solid ${t.divider}` }}>Nenhum produto encontrado com esses filtros.</div>
            : <div style={{ display:'grid',gap:'12px',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))' }}>
                {filtered.map(p => <ProductCard key={p.id} product={p} onAdd={()=>addToQuote(p.id)} inQuote={quoteItems.some(i=>i.id===p.id)}/>)}
              </div>
          }
        </div>
      </section>
    </>
  );
}

function FeaturedProductCard({ product, cl, imgSrc }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="ch sm" style={{ padding:'18px',background:t.surface,border:`1px solid ${t.divider}`,borderRadius:'12px',display:'flex',flexDirection:'column',gap:'10px' }}>
      <div style={{ width:'100%',aspectRatio:'16/9',borderRadius:'8px',background:t.obsidianSoft,border:`1px solid ${t.divider}`,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center' }}>
        {imgSrc && !imgErr
          ? <img src={imgSrc} alt={product.name} onError={() => setImgErr(true)} style={{ width:'100%',height:'100%',objectFit:'contain',padding:'12px' }} />
          : <Pill size={32} color={t.mistGhost} strokeWidth={1.4}/>
        }
      </div>
      <div>
        <div style={{ fontSize:'10px',fontWeight:600,letterSpacing:'.05em',textTransform:'uppercase',color:t.tealLuminous,marginBottom:'4px' }}>{product.brand} · {cl}</div>
        <div className="fd" style={{ fontSize:'15px',fontWeight:600,color:t.mist,marginBottom:'4px' }}>{product.name}</div>
        <div style={{ fontSize:'12px',color:t.mistSoft,lineHeight:1.5 }}>{product.desc.length>80?product.desc.slice(0,80)+'…':product.desc}</div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd, inQuote }) {
  const cl = CATEGORIES.find(c=>c.id===product.cat)?.label||'Outros';
  const sl = product.sp.map(s=>s==='dog'?'Cães':'Gatos').join(' · ');
  const imgSrc = product.img ? IMG.products[product.img] : null;
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="ch sm" style={{ display:'flex',gap:'14px',padding:'16px',background:t.surface,border:`1px solid ${t.divider}`,borderRadius:'14px',minHeight:'140px' }}>
      <div style={{ width:'88px',height:'88px',flexShrink:0,borderRadius:'10px',background:t.obsidianSoft,border:`1px solid ${t.divider}`,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center' }}>
        {imgSrc && !imgErr
          ? <img src={imgSrc} alt={product.name} onError={() => setImgErr(true)} style={{ width:'100%',height:'100%',objectFit:'contain',padding:'6px' }} />
          : <Pill size={26} color={t.mistGhost} strokeWidth={1.4}/>
        }
      </div>
      <div style={{ flex:1,display:'flex',flexDirection:'column',gap:'6px',minWidth:0 }}>
        <div style={{ display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap' }}>
          <span style={{ fontSize:'10px',fontWeight:600,letterSpacing:'.05em',textTransform:'uppercase',color:t.tealLuminous }}>{product.brand}</span>
          <span style={{ fontSize:'10px',color:t.mistGhost }}>·</span>
          <span style={{ fontSize:'10px',color:t.mistSoft,textTransform:'uppercase',letterSpacing:'.05em' }}>{cl}</span>
          <span style={{ fontSize:'10px',color:t.mistGhost }}>·</span>
          <span style={{ fontSize:'10px',color:t.mistSoft }}>{sl}</span>
        </div>
        <h3 className="fd" style={{ fontSize:'16px',fontWeight:600,color:t.mist,margin:0,lineHeight:1.25 }}>{product.name}</h3>
        <p style={{ fontSize:'13px',color:t.mistSoft,lineHeight:1.5,margin:0,flex:1 }}>{product.desc}</p>
        <div style={{ display:'flex',gap:'8px',marginTop:'8px',alignItems:'center' }}>
          <button onClick={onAdd} className="bp" disabled={inQuote} style={{ flex:1,padding:'9px 14px',background:inQuote?`${t.vital}20`:`linear-gradient(180deg,${t.teal} 0%,${t.tealDeep} 100%)`,color:inQuote?t.vital:t.obsidian,border:inQuote?`1px solid ${t.vital}40`:'none',borderRadius:'8px',fontSize:'13px',fontWeight:600,cursor:inQuote?'default':'pointer',fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",display:'flex',alignItems:'center',justifyContent:'center',gap:'6px' }}>
            {inQuote?<><Check size={14} strokeWidth={3}/> No orçamento</>:<><Plus size={14} strokeWidth={2.5}/> Adicionar</>}
          </button>
          <a href={product.link} target="_blank" rel="noopener noreferrer" className="sm" style={{ padding:'9px 12px',background:'transparent',border:`1px solid ${t.divider}`,borderRadius:'8px',color:t.mistSoft,fontSize:'13px',textDecoration:'none',display:'flex',alignItems:'center' }}><ExternalLink size={13}/></a>
        </div>
      </div>
    </div>
  );
}

/* ─── TEAM ───────────────────────────────────────────────────────── */
function TeamPage() {
  const tiers = ['leadership','coordination','promoters','reps','interns'];
  return (
    <>
      <section style={{ padding:'56px 24px 32px',textAlign:'center' }}>
        <div style={{ maxWidth:'900px',margin:'0 auto' }}>
          <SectionHeader kicker="Nossa Equipe" title={<>Profissionais que <span style={{ color:t.teal }}>entendem do assunto</span></>} subtitle="Nossa equipe é formada por Médicos Veterinários." />
        </div>
      </section>
      <section style={{ padding:'0 24px 96px' }}>
        <div style={{ maxWidth:'1280px',margin:'0 auto' }}>
          {tiers.map(tier => {
            const members = TEAM.filter(m=>m.tier===tier);
            if(!members.length) return null;
            return (
              <div key={tier} style={{ marginBottom:'56px' }}>
                <div style={{ fontSize:'11px',letterSpacing:'.15em',textTransform:'uppercase',color:t.teal,fontWeight:600,marginBottom:'20px',paddingBottom:'12px',borderBottom:`1px solid ${t.divider}` }}>
                  {TIER_LABELS[tier]} <span style={{ color:t.mistGhost,marginLeft:'8px' }}>· {members.length}</span>
                </div>
                <div style={{ display:'grid',gap:'12px',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))' }}>
                  {members.map(m => <TeamCard key={m.id} member={m}/>)}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function TeamCard({ member }) {
  const showPhone = !member.hidePhone;
  const wa = showPhone ? `https://wa.me/55${member.phone.replace(/\D/g,'')}` : null;
  const inner = (
    <>
      <Avatar src={member.photo} initials={member.initials} size={56} />
      <div style={{ flex:1,minWidth:0 }}>
        <div className="fd" style={{ fontSize:'15px',fontWeight:600,color:t.mist,marginBottom:'3px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{member.name}</div>
        {member.tier !== 'reps' && (
          <div style={{ fontSize:'12px',color:t.tealLuminous,marginBottom:'4px',lineHeight:1.3 }}>{member.role}</div>
        )}
        {member.region && (
          <div style={{ fontSize:'11px',color:t.mistSoft,display:'flex',alignItems:'center',gap:'4px',marginBottom:showPhone?'4px':0 }}>
            <MapPin size={10}/>{member.region}
          </div>
        )}
        {showPhone && (
          <div style={{ fontSize:'12px',color:t.mistSoft,display:'flex',alignItems:'center',gap:'5px' }}>
            <Phone size={11}/>{member.phone}
          </div>
        )}
      </div>
    </>
  );
  const s = { display:'flex',alignItems:'center',gap:'14px',padding:'16px',background:t.surface,border:`1px solid ${t.divider}`,borderRadius:'12px',textDecoration:'none',color:'inherit' };
  return showPhone
    ? <a href={wa} target="_blank" rel="noopener noreferrer" className="ch sm" style={s}>{inner}</a>
    : <div className="sm" style={s}>{inner}</div>;
}

/* ─── CONTACT ────────────────────────────────────────────────────── */
function ContactPage({ quoteItems, clearQuote }) {
  const hasQuote = quoteItems.length>0;
  const [form,setForm]     = useState({name:'',establishment:'',email:'',phone:'',city:'',message:''});
  const [sent,setSent]     = useState(false);
  const [errors,setErrors] = useState({});
  const qp = quoteItems.map(qi => ({...PRODUCTS.find(p=>p.id===qi.id),qty:qi.qty}));
  const rep = form.city ? findRepByCity(form.city) : null;

  const hc = (f,v) => { setForm(p=>({...p,[f]:v})); if(errors[f]) setErrors(e=>({...e,[f]:null})); };
  const submit = () => {
    const e={};
    if(!form.name.trim())  e.name='Nome é obrigatório';
    if(!form.email.trim()) e.email='E-mail é obrigatório';
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='E-mail inválido';
    if(!form.phone.trim()) e.phone='Telefone é obrigatório';
    if(!form.city.trim())  e.city='Cidade é obrigatória';
    if(!hasQuote&&!form.message.trim()) e.message='Mensagem é obrigatória';
    if(Object.keys(e).length){setErrors(e);return;}
    setSent(true);
    setTimeout(()=>{setSent(false);setForm({name:'',establishment:'',email:'',phone:'',city:'',message:''});clearQuote();},4000);
  };
  return (
    <section style={{ padding:'56px 24px 96px' }}>
      <div style={{ maxWidth:'1100px',margin:'0 auto' }}>
        <SectionHeader kicker="Contato" title={hasQuote?'Finalizar Orçamento':'Fale Conosco'}
          subtitle={hasQuote?`Você tem ${quoteItems.length} produto(s) no orçamento. Preencha seus dados para enviarmos a cotação.`:'Solicite um orçamento ou tire suas dúvidas. Nossa equipe está pronta para atender você.'} />
        <div style={{ display:'grid',gap:'24px',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))' }}>
          <div style={{ display:'flex',flexDirection:'column',gap:'16px' }}>
            {hasQuote && (
              <div style={{ padding:'20px',background:t.surface,border:`1px solid ${t.teal}30`,borderRadius:'14px' }}>
                <div className="fd" style={{ fontSize:'13px',fontWeight:600,color:t.tealLuminous,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:'16px' }}>Produtos no Orçamento</div>
                <div style={{ display:'flex',flexDirection:'column',gap:'10px' }}>
                  {qp.map(p => (
                    <div key={p.id} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:`1px solid ${t.divider}`,fontSize:'13px' }}>
                      <div style={{ flex:1,color:t.mist,fontWeight:500 }}>{p.name}</div>
                      <div style={{ color:t.mistSoft }}>×{p.qty}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <CInfo icon={Phone} label="Telefone / WhatsApp" value={COMPANY.phone} href={`https://wa.me/${COMPANY.whatsapp}`}/>
            <CInfo icon={Mail}  label="E-mail" value={COMPANY.email} href={`mailto:${COMPANY.email}`}/>
            <CInfo icon={MapPin} label="Endereço" value={COMPANY.address.street} sub={`${COMPANY.address.district} — ${COMPANY.address.city}/${COMPANY.address.state}`}/>
            <CInfo icon={Clock} label="Horário" value="Seg a Sex · 08h às 18h"/>
          </div>
          <div style={{ padding:'clamp(24px,4vw,36px)',background:t.surface,border:`1px solid ${t.divider}`,borderRadius:'16px' }}>
            <h2 className="fd" style={{ fontSize:'20px',fontWeight:600,color:t.mist,margin:'0 0 24px' }}>Seus dados</h2>
            {sent?(
              <div style={{ padding:'32px 20px',textAlign:'center' }}>
                <div style={{ width:'56px',height:'56px',margin:'0 auto 16px',borderRadius:'50%',background:`${t.vital}20`,border:`1px solid ${t.vital}50`,display:'flex',alignItems:'center',justifyContent:'center' }}><Check size={28} color={t.vital} strokeWidth={3}/></div>
                <div className="fd" style={{ fontSize:'18px',fontWeight:600,color:t.mist,marginBottom:'8px' }}>Solicitação enviada!</div>
                <div style={{ fontSize:'14px',color:t.mistSoft,lineHeight:1.5 }}>
                  {rep?<>Em breve <strong style={{ color:t.tealLuminous }}>{rep.name}</strong> entrará em contato.</>:'Em breve entraremos em contato.'}
                </div>
              </div>
            ):(
              <div style={{ display:'flex',flexDirection:'column',gap:'14px' }}>
                <Field label="Nome completo" value={form.name} onChange={v=>hc('name',v)} error={errors.name}/>
                <Field label="Estabelecimento" value={form.establishment} onChange={v=>hc('establishment',v)} placeholder="Clínica, pet shop, hospital..."/>
                <Field label="E-mail" type="email" value={form.email} onChange={v=>hc('email',v)} error={errors.email}/>
                <Field label="Telefone / WhatsApp" type="tel" value={form.phone} onChange={v=>hc('phone',v)} error={errors.phone}/>
                <Field label="Cidade" value={form.city} onChange={v=>hc('city',v)} error={errors.city} placeholder="Ex: Santa Rosa"/>
                {rep&&form.city.length>2&&(
                  <div style={{ padding:'12px 14px',background:`${t.teal}10`,border:`1px solid ${t.teal}30`,borderRadius:'10px',display:'flex',alignItems:'center',gap:'12px',fontSize:'13px' }}>
                    <User size={16} color={t.tealLuminous}/>
                    <div>
                      <div style={{ color:t.mistSoft,fontSize:'11px',textTransform:'uppercase',letterSpacing:'.05em' }}>Seu representante será</div>
                      <div style={{ color:t.mist,fontWeight:600,marginTop:'2px' }}>{rep.name}</div>
                    </div>
                  </div>
                )}
                {!hasQuote&&<Field label="Mensagem" textarea value={form.message} onChange={v=>hc('message',v)} error={errors.message}/>}
                <button onClick={submit} className="bp" style={{ marginTop:'8px',padding:'14px 24px',background:`linear-gradient(180deg,${t.teal} 0%,${t.tealDeep} 100%)`,color:t.obsidian,border:'none',borderRadius:'10px',fontSize:'15px',fontWeight:600,cursor:'pointer',fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",display:'flex',alignItems:'center',justifyContent:'center',gap:'8px' }}>
                  <Send size={16}/>{hasQuote?'Enviar Solicitação de Orçamento':'Enviar Mensagem'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SHARED ─────────────────────────────────────────────────────── */
function SectionHeader({ kicker, title, subtitle }) {
  return (
    <div style={{ textAlign:'center',marginBottom:'48px' }}>
      {kicker&&<div style={{ fontSize:'11px',letterSpacing:'.18em',textTransform:'uppercase',color:t.teal,fontWeight:600,marginBottom:'14px' }}>{kicker}</div>}
      <h2 className="fd" style={{ fontSize:'clamp(1.75rem,4vw,2.5rem)',fontWeight:700,color:t.mist,letterSpacing:'-.02em',margin:0,lineHeight:1.15 }}>{title}</h2>
      {subtitle&&<p style={{ fontSize:'17px',color:t.mistSoft,marginTop:'16px',maxWidth:'640px',marginLeft:'auto',marginRight:'auto',lineHeight:1.6 }}>{subtitle}</p>}
    </div>
  );
}
function PrimaryBtn({ children, onClick }) {
  return <button onClick={onClick} className="bp" style={{ padding:'13px 26px',background:`linear-gradient(180deg,${t.teal} 0%,${t.tealDeep} 100%)`,color:t.obsidian,border:'none',borderRadius:'10px',fontSize:'15px',fontWeight:600,cursor:'pointer',fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif" }}>{children}</button>;
}
function GhostBtn({ children, onClick }) {
  return <button onClick={onClick} className="sm" style={{ padding:'13px 22px',background:'transparent',color:t.mist,border:`1px solid ${t.divider}`,borderRadius:'10px',fontSize:'15px',fontWeight:500,cursor:'pointer',fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif" }}
    onMouseEnter={e=>{e.currentTarget.style.borderColor=`${t.teal}60`;e.currentTarget.style.color=t.tealLuminous;}}
    onMouseLeave={e=>{e.currentTarget.style.borderColor=t.divider;e.currentTarget.style.color=t.mist;}}
  >{children}</button>;
}
function CInfo({ icon: Icon, label, value, sub, href }) {
  const W=href?'a':'div'; const p=href?{href,target:href.startsWith('http')?'_blank':undefined,rel:'noopener noreferrer'}:{};
  return <W {...p} className="ch sm" style={{ display:'flex',alignItems:'flex-start',gap:'14px',padding:'16px 18px',borderRadius:'12px',background:t.surface,border:`1px solid ${t.divider}`,textDecoration:'none',color:'inherit' }}>
    <div style={{ width:'40px',height:'40px',borderRadius:'10px',background:`${t.teal}12`,border:`1px solid ${t.teal}30`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}><Icon size={18} color={t.tealLuminous} strokeWidth={1.8}/></div>
    <div style={{ flex:1,minWidth:0 }}>
      <div style={{ fontSize:'11px',color:t.mistSoft,marginBottom:'3px',letterSpacing:'.03em',textTransform:'uppercase' }}>{label}</div>
      <div style={{ fontSize:'14px',color:t.mist,fontWeight:500 }}>{value}</div>
      {sub&&<div style={{ fontSize:'12px',color:t.mistSoft,marginTop:'2px' }}>{sub}</div>}
    </div>
  </W>;
}
function Field({ label, value, onChange, error, type='text', textarea, placeholder }) {
  const [focused,setFocused] = useState(false);
  const s = { width:'100%',padding:'13px 14px',background:t.obsidian,border:`1px solid ${error?t.red:focused?t.teal:t.divider}`,borderRadius:'10px',color:t.mist,fontSize:'14px',transition:'all 160ms ease-out',resize:textarea?'vertical':'none',minHeight:textarea?'100px':'auto',boxShadow:focused&&!error?`0 0 0 3px ${t.teal}20`:'none' };
  return (
    <div>
      <label style={{ display:'block',fontSize:'11px',color:t.mistSoft,marginBottom:'6px',letterSpacing:'.05em',textTransform:'uppercase',fontWeight:500 }}>{label}</label>
      {textarea?<textarea value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={s} placeholder={placeholder||`Digite ${label.toLowerCase()}...`}/>:<input type={type} value={value} onChange={e=>onChange(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={s} placeholder={placeholder||`Digite ${label.toLowerCase()}...`}/>}
      {error&&<div style={{ fontSize:'12px',color:t.red,marginTop:'6px' }}>{error}</div>}
    </div>
  );
}

/* ─── QUOTE DRAWER ───────────────────────────────────────────────── */
function QuoteDrawer({ isOpen, onClose, items, removeItem, updateQty, goToContact }) {
  if(!isOpen) return null;
  const products = items.map(i=>({...PRODUCTS.find(p=>p.id===i.id),qty:i.qty}));
  return (
    <>
      <div onClick={onClose} style={{ position:'fixed',inset:0,zIndex:70,background:'rgba(0,0,0,.6)',backdropFilter:'blur(4px)' }}/>
      <div style={{ position:'fixed',top:0,right:0,bottom:0,zIndex:80,width:'min(420px,100vw)',background:t.obsidianSoft,borderLeft:`1px solid ${t.divider}`,display:'flex',flexDirection:'column',boxShadow:'-16px 0 48px rgba(0,0,0,.4)' }}>
        <div style={{ padding:'20px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:`1px solid ${t.divider}` }}>
          <div><div className="fd" style={{ fontSize:'18px',fontWeight:600,color:t.mist }}>Seu Orçamento</div><div style={{ fontSize:'12px',color:t.mistSoft,marginTop:'2px' }}>{items.length} {items.length===1?'produto':'produtos'}</div></div>
          <button onClick={onClose} style={{ background:'none',border:'none',color:t.mistSoft,cursor:'pointer',padding:'8px' }}><X size={22}/></button>
        </div>
        <div style={{ flex:1,overflowY:'auto',padding:'16px 24px' }}>
          {products.length===0?<div style={{ padding:'40px 20px',textAlign:'center',color:t.mistSoft }}>Nenhum produto no orçamento ainda.</div>
            :<div style={{ display:'flex',flexDirection:'column',gap:'12px' }}>
              {products.map(p=>(
                <div key={p.id} style={{ padding:'14px',background:t.surface,border:`1px solid ${t.divider}`,borderRadius:'10px' }}>
                  <div className="fd" style={{ fontSize:'14px',fontWeight:600,color:t.mist,marginBottom:'4px' }}>{p.name}</div>
                  <div style={{ fontSize:'11px',color:t.mistSoft,marginBottom:'10px' }}>{p.brand}</div>
                  <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
                    <div style={{ display:'flex',alignItems:'center',gap:'8px' }}>
                      <button onClick={()=>updateQty(p.id,-1)} style={{ width:'28px',height:'28px',borderRadius:'6px',background:t.obsidian,border:`1px solid ${t.divider}`,color:t.mist,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}><Minus size={14}/></button>
                      <span style={{ minWidth:'24px',textAlign:'center',fontSize:'14px',color:t.mist,fontWeight:600 }}>{p.qty}</span>
                      <button onClick={()=>updateQty(p.id,1)} style={{ width:'28px',height:'28px',borderRadius:'6px',background:t.obsidian,border:`1px solid ${t.divider}`,color:t.mist,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}><Plus size={14}/></button>
                    </div>
                    <button onClick={()=>removeItem(p.id)} style={{ background:'none',border:'none',color:t.red,cursor:'pointer',padding:'6px' }}><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
        {products.length>0&&<div style={{ padding:'20px 24px',borderTop:`1px solid ${t.divider}` }}>
          <button onClick={goToContact} className="bp" style={{ width:'100%',padding:'14px 20px',background:`linear-gradient(180deg,${t.teal} 0%,${t.tealDeep} 100%)`,color:t.obsidian,border:'none',borderRadius:'10px',fontSize:'15px',fontWeight:600,cursor:'pointer',fontFamily:"'Helvetica Neue',Helvetica,Arial,sans-serif",display:'flex',alignItems:'center',justifyContent:'center',gap:'8px' }}>
            Finalizar Orçamento <ArrowRight size={16}/>
          </button>
        </div>}
      </div>
    </>
  );
}

/* ─── WHATSAPP + FOOTER ──────────────────────────────────────────── */
function WhatsAppFloat() {
  return (
    <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" className="wap"
      style={{ position:'fixed',bottom:'24px',right:'24px',zIndex:40,width:'56px',height:'56px',borderRadius:'50%',backgroundColor:t.whatsapp,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 8px 24px rgba(37,211,102,.4)',textDecoration:'none',transition:'transform 180ms ease-out' }}
      onMouseEnter={e=>e.currentTarget.style.transform='scale(1.08)'}
      onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
    ><MessageCircle size={26} color="white" fill="white" strokeWidth={0}/></a>
  );
}

function SiteFooter({ navigate }) {
  const links = [{label:'Início',id:'home'},{label:'Sobre',id:'about'},{label:'Produtos',id:'products'},{label:'Equipe',id:'team'},{label:'Contato',id:'contact'}];
  return (
    <footer style={{ padding:'64px 24px 32px',borderTop:`1px solid ${t.divider}` }}>
      <div style={{ maxWidth:'1280px',margin:'0 auto' }}>
        <div style={{ display:'grid',gap:'40px',marginBottom:'48px',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))' }}>
          <div>
            <div style={{ marginBottom:'20px' }}><MWLogoFooter/></div>
            <p style={{ fontSize:'13px',color:t.mistSoft,lineHeight:1.6,maxWidth:'280px',margin:'0 0 16px' }}>Distribuição B2B de produtos veterinários no Rio Grande do Sul há mais de 40 anos.</p>
            <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex',alignItems:'center',gap:'7px',fontSize:'13px',color:t.mistSoft,textDecoration:'none' }}
              onMouseEnter={e=>e.currentTarget.style.color=t.tealLuminous}
              onMouseLeave={e=>e.currentTarget.style.color=t.mistSoft}
            >@mwcomercialveterinaria →</a>
          </div>
          <div>
            <div style={{ fontSize:'11px',letterSpacing:'.15em',textTransform:'uppercase',color:t.teal,fontWeight:600,marginBottom:'14px' }}>Navegação</div>
            <ul style={{ listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'10px' }}>
              {links.map(l=><li key={l.id}><button onClick={()=>navigate(l.id)} className="nl" style={{ background:'none',border:'none',color:t.mistSoft,fontSize:'13px',cursor:'pointer',padding:0,fontFamily:'inherit',textAlign:'left' }}>{l.label}</button></li>)}
            </ul>
          </div>
          <div>
            <div style={{ fontSize:'11px',letterSpacing:'.15em',textTransform:'uppercase',color:t.teal,fontWeight:600,marginBottom:'14px' }}>Contato</div>
            <ul style={{ listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'10px' }}>
              {[COMPANY.phone,COMPANY.email,COMPANY.address.street,`${COMPANY.address.city}/${COMPANY.address.state}`].map((v,i)=><li key={i} style={{ color:t.mistSoft,fontSize:'13px',wordBreak:'break-word' }}>{v}</li>)}
            </ul>
          </div>
          <div>
            <div style={{ fontSize:'11px',letterSpacing:'.15em',textTransform:'uppercase',color:t.teal,fontWeight:600,marginBottom:'14px' }}>Distribuidor</div>
            <div style={{ display:'flex',gap:'8px',flexWrap:'wrap' }}>
              {['Zoetis','Urano'].map(d=><div key={d} style={{ padding:'6px 12px',borderRadius:'6px',background:t.surface,border:`1px solid ${t.divider}`,fontSize:'12px',color:t.mist,fontWeight:600 }}>{d}</div>)}
            </div>
          </div>
        </div>
        <div style={{ paddingTop:'32px',borderTop:`1px solid ${t.divider}`,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'12px',fontSize:'12px',color:t.mistGhost }}>
          <div>© {new Date().getFullYear()} MW Comercial Veterinária</div>
          <div>Santa Rosa · RS · +40 anos</div>
        </div>
      </div>
    </footer>
  );
}
