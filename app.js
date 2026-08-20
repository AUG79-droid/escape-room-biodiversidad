const roomMeta = [
  { id: 'room1', phase: 'Fase 1', title: 'Sala 1 · Pérdida de hábitats', short: 'Sala 1', key: '23' },
  { id: 'room2', phase: 'Fase 2', title: 'Sala 2 · Contaminación invisible', short: 'Sala 2', key: 'AZUL' },
  { id: 'room3', phase: 'Fase 3', title: 'Sala 3 · Detectives de la naturaleza', short: 'Sala 3', key: 'FLOR' },
  { id: 'room4', phase: 'Fase 4', title: 'Sala 4 · Ecosistema en equilibrio', short: 'Sala 4', key: 'VERDE' },
  { id: 'room5', phase: 'Fase 5', title: 'Sala 5 · La solución está en nuestras manos', short: 'Sala 5', key: 'NIDOS' },
];

const state = {
  current: 'welcome',
  solvedKeys: {},
  selectedRoom2: null,
  selectedRoom3: null,
  selectedRoom4: null,
  selectedRoom5: null,
  room1Cards: [
    { id: 'reforestacion', title: 'Reforestación con especies locales', subtitle: 'Restauración activa de hábitats con árboles autóctonos.', img: 'img/reforest.webp' },
    { id: 'urbanizacion', title: 'Urbanización intensiva', subtitle: 'Construcción de edificios, carreteras y estructuras permanentes.', img: 'img/urb.webp' },
    { id: 'conservacion', title: 'Conservación de bosques y arbolado', subtitle: 'Protección del hábitat maduro y de la biodiversidad existente.', img: 'img/bosque.webp' },
    { id: 'sellado', title: 'Sellado de suelos', subtitle: 'Pavimentación que impide el ciclo natural del suelo.', img: 'img/sellado.webp' },
    { id: 'charcas', title: 'Recuperación de charcas estacionales', subtitle: 'Generación de microhábitats acuáticos para fauna.', img: 'img/charcas.webp' },
    { id: 'agricultura', title: 'Agricultura ecológica periurbana', subtitle: 'Baja presión sobre el suelo, favorece polinizadores.', img: 'img/agri.webp' },
    { id: 'cesped', title: 'Mantenimiento de césped ornamental', subtitle: 'Uso de especies foráneas sin valor ecológico.', img: 'img/cesped.webp' },
    { id: 'zonas', title: 'Zonas verdes con especies autóctonas', subtitle: 'Vegetación funcional que promueve biodiversidad.', img: 'img/zonas_aut.webp' },
  ],
  room1Feedback: null,
  room2Zones: { acustica: [], luminica: [], quimica: [] },
  room2Bank: ['canto','estres','noct','tort','anfib','tox'],
  room2Feedback: null,
  room3Zones: { autoctona: [], invasora: [] },
  room3Bank: ['abeja','cotorra','encina','galapago','unia','vison'],
  room3Feedback: null,
  room4Zones: { polinizadores: [], plantas: [], depredadores: [], reptiles: [], reguladores: [], estructura: [], agua: [] },
  room4Bank: ['abeja','mariposa','romero','jara','lavanda','zorro','ratonero','lagartija','erizo','encina','charca','roca'],
  room4Feedback: null,
  room5Real: [],
  room5Green: [],
  room5Bank: ['s5_1','s5_2','s5_3','s5_4','s5_5','s5_6','s5_7','s5_8','s5_9','s5_10','s5_hotel','s5_arboles','s5_invasoras','s5_cesped'],
  room5Feedback: null,
  dragId: null,
};

const room1Expected = ['urbanizacion','sellado','cesped','agricultura','zonas','reforestacion','charcas','conservacion'];

const room2Cards = {
  canto: { id:'canto', label:'Alteración del canto y rutas migratorias en aves', target:'acustica', img:'img/ef_canto.webp' },
  estres: { id:'estres', label:'Estrés fisiológico en fauna urbana', target:'acustica', img:'img/ef_estres.webp' },
  noct: { id:'noct', label:'Alteración del comportamiento de especies nocturnas', target:'luminica', img:'img/ef_noct.webp' },
  tort: { id:'tort', label:'Desorientación de tortugas y otros reptiles', target:'luminica', img:'img/ef_tort.webp' },
  anfib: { id:'anfib', label:'Mortalidad de anfibios por toxicidad en el agua', target:'quimica', img:'img/ef_anfib.webp' },
  tox: { id:'tox', label:'Aumento de toxicidad en agua y suelo', target:'quimica', img:'img/tipo_quim.webp' },
};

const room3Cards = {
  abeja: { id:'abeja', title:'Abeja ibérica', latin:'Apis mellifera iberiensis', correct:'autoctona', img:'img/s3_abeja.webp' },
  cotorra: { id:'cotorra', title:'Cotorra argentina', latin:'Myiopsitta monachus', correct:'invasora', img:'img/s3_cotorra.webp' },
  encina: { id:'encina', title:'Encina', latin:'Quercus ilex', correct:'autoctona', img:'img/s3_encina.webp' },
  galapago: { id:'galapago', title:'Galápago europeo', latin:'Emys orbicularis', correct:'autoctona', img:'img/s3_galapago.webp' },
  unia: { id:'unia', title:'Uña de gato', latin:'Carpobrotus edulis', correct:'invasora', img:'img/s3_una.webp' },
  vison: { id:'vison', title:'Visón americano', latin:'Neogale vison', correct:'invasora', img:'img/s3_vison.webp' },
};

const room4Cards = {
  abeja: { id:'abeja', title:'Abeja ibérica', subtitle:'Polinizador clave', type:'fauna', correct:'polinizadores', img:'img/s4_abeja.webp' },
  mariposa: { id:'mariposa', title:'Mariposa', subtitle:'Lepidóptero polinizador', type:'fauna', correct:'polinizadores', img:'img/s4_mariposa.webp' },
  romero: { id:'romero', title:'Romero', subtitle:'Arbusto melífero', type:'flora', correct:'plantas', img:'img/s4_romero.webp' },
  jara: { id:'jara', title:'Jara', subtitle:'Flora mediterránea', type:'flora', correct:'plantas', img:'img/s4_jara.webp' },
  lavanda: { id:'lavanda', title:'Lavanda', subtitle:'Atracción de polinizadores', type:'flora', correct:'plantas', img:'img/s4_lavanda.webp' },
  zorro: { id:'zorro', title:'Zorro rojo', subtitle:'Depredador generalista', type:'fauna', correct:'depredadores', img:'img/s4_zorro.webp' },
  ratonero: { id:'ratonero', title:'Ratonero común', subtitle:'Ave rapaz', type:'fauna', correct:'depredadores', img:'img/s4_ratonero.webp' },
  lagartija: { id:'lagartija', title:'Lagartija', subtitle:'Reptil heliófilo', type:'fauna', correct:'reptiles', img:'img/s4_lagartija.webp' },
  erizo: { id:'erizo', title:'Erizo europeo', subtitle:'Control de insectos', type:'fauna', correct:'reguladores', img:'img/s4_erizo.webp' },
  encina: { id:'encina', title:'Encina', subtitle:'Estructura y refugio', type:'habitat', correct:'estructura', img:'img/s4_encina.webp' },
  charca: { id:'charca', title:'Charca temporal', subtitle:'Microhábitat acuático', type:'habitat', correct:'agua', img:'img/s4_charca.webp' },
  roca: { id:'roca', title:'Roca soleada', subtitle:'Zona de termorregulación', type:'habitat', correct:'reptiles', img:'img/s4_roca.webp' },
};

const room5Cards = {
  s5_1: { id:'s5_1', label:'Plantar especies autóctonas adaptadas al clima local', kind:'real', img:'img/s5_1.png' },
  s5_2: { id:'s5_2', label:'Reducir el uso de fitosanitarios y fertilizantes químicos', kind:'real', img:'img/s5_2.png' },
  s5_3: { id:'s5_3', label:'Formar a los trabajadores en biodiversidad local', kind:'real', img:'img/s5_3.png' },
  s5_8: { id:'s5_8', label:'Integración de setos autóctonos en vallas perimetrales', kind:'real', img:'img/s5_8.png' },
  s5_10: { id:'s5_10', label:'Colocación de cajas-nido para aves locales', kind:'real', img:'img/s5_10.png' },
  s5_hotel: { id:'s5_hotel', label:'Instalar hoteles de insectos en zonas ajardinadas', kind:'real', img:'img/s5_hotel_de_insectos_(1).png' },
  s5_arboles: { id:'s5_arboles', label:'Conservar estructuras viejas y huecos para refugio de fauna', kind:'real', img:'img/s5_Conservacion_de_arboles_viejos_(1).png' },
  s5_4: { id:'s5_4', label:'Etiquetar los productos como “eco”', kind:'green', img:'img/s5_4.png' },
  s5_5: { id:'s5_5', label:'Colocar plantas decorativas sin valor ecológico', kind:'green', img:'img/s5_5.png' },
  s5_6: { id:'s5_6', label:'Promocionar biodiversidad solo con carteles o fotos', kind:'green', img:'img/s5_6.png' },
  s5_7: { id:'s5_7', label:'Aplicar herbicidas sintéticos certificados', kind:'green', img:'img/s5_7.png' },
  s5_9: { id:'s5_9', label:'Instalación de jardineras sin riego ni mantenimiento', kind:'green', img:'img/s5_9.png' },
  s5_invasoras: { id:'s5_invasoras', label:'Introducir cualquier especie para aumentar la biodiversidad', kind:'green', img:'img/s5_especies_invasoras_(1).png' },
  s5_cesped: { id:'s5_cesped', label:'Usar césped artificial como solución ecológica', kind:'green', img:'img/s5_cesped_artificial_(1).png' },
};

const roleLabels = {
  polinizadores: 'Polinizadores',
  plantas: 'Plantas nectaríferas',
  depredadores: 'Depredadores',
  reptiles: 'Reptiles',
  reguladores: 'Reguladores de insectos',
  estructura: 'Estructura / Refugio',
  agua: 'Agua / Microhábitats',
};

function q(id){ return document.getElementById(id); }
function getProgress(){ return Math.round(Object.keys(state.solvedKeys).length / 5 * 100); }
function isSolved(id){ return Boolean(state.solvedKeys[id]); }
function pageHead(kicker, title, desc, actionHtml=''){ return `
  <div class="page-head">
    <div>
      <div class="page-kicker headline">${kicker}</div>
      <h1 class="page-title headline">${title}</h1>
      <div class="page-desc">${desc}</div>
    </div>
    ${actionHtml}
  </div>`;
}
function feedbackHtml(fb){ if(!fb) return ''; return `<div class="feedback ${fb.ok ? 'ok':'bad'}">${fb.text}</div>`; }
function markSolved(roomId, key){ state.solvedKeys[roomId] = key; updateShell(); }
function updateShell(){ render(); }
function img(src, alt){ return `<img src="${src}" alt="${alt}" loading="lazy">`; }

function renderWelcome(){
  return `<div class="page">
    <section class="hero">
      <div>
        <div class="page-kicker headline">Iniciativa de sostenibilidad</div>
        <h1 class="page-title headline">Misión de Aviación <span style="color:var(--cyan)">Sostenible</span></h1>
        <div class="page-desc">Explora los ecosistemas, identifica amenazas y asegura el futuro ambiental de nuestras instalaciones. Una experiencia interactiva de Airbus inspirada en la estética final conseguida en Stitch.</div>
        <div class="welcome-actions">
          <button class="primary-btn" onclick="go('hub')">Iniciar misión</button>
          <button class="secondary-btn" onclick="go('hub')">Ver guía</button>
        </div>
      </div>
      <div class="hero-card">
        <div class="page-kicker" style="color:rgba(255,255,255,.72)">Corredor Verde</div>
        <div class="headline" style="font-size:40px;font-weight:800;line-height:1.08;max-width:520px">Una app visual, profesional y lista para proyectar en sesiones de sensibilización.</div>
        <div class="metric-grid">
          <div class="metric"><div class="metric-num headline">5</div><div class="metric-label">salas interactivas</div></div>
          <div class="metric"><div class="metric-num headline">3</div><div class="metric-label">mecánicas distintas</div></div>
          <div class="metric"><div class="metric-num headline">26</div><div class="metric-label">tarjetas visuales</div></div>
          <div class="metric"><div class="metric-num headline">1</div><div class="metric-label">palabra final</div></div>
        </div>
      </div>
    </section>
  </div>`;
}

function renderHub(){
  return `<div class="page">${pageHead('Centro de operaciones','Módulos de misión','Completa los desafíos en cada sala para desbloquear la palabra final del Corredor Verde.')}<div class="hub-grid">${roomMeta.map((r,i)=>`
    <div class="module-card">
      <div class="module-top"><div class="module-num">0${i+1}</div><div class="module-status">${isSolved(r.id) ? 'Completada':'Pendiente'}</div></div>
      <h3 class="module-title headline">${r.short}</h3>
      <div class="module-desc">${r.title}</div>
      <button class="module-link" onclick="go('${r.id}')">Iniciar análisis <span>→</span></button>
    </div>`).join('')}</div></div>`;
}

function renderRoom1(){
  return `<div class="page">${pageHead('Módulo 01 / Análisis de suelo','Impacto Ambiental','Ordena las acciones de MÁXIMO a MÍNIMO impacto negativo sobre la biodiversidad local.', '<button class="primary-btn" onclick="validateRoom1()">Validar impacto</button>')}<div class="room1-list">${state.room1Cards.map((card,i)=>`
    <div class="order-card">
      <img class="order-thumb" src="${card.img}" alt="${card.title}">
      <div class="order-body">
        <h3 class="order-title headline">${card.title}</h3>
        <div class="order-sub">${card.subtitle}</div>
      </div>
      <div class="order-badge">Posición ${i+1}</div>
      <div class="order-actions">
        <button class="icon-btn" ${i===0?'disabled':''} onclick="moveRoom1(${i},-1)">↑</button>
        <button class="icon-btn" ${i===state.room1Cards.length-1?'disabled':''} onclick="moveRoom1(${i},1)">↓</button>
      </div>
    </div>`).join('')}</div>${feedbackHtml(state.room1Feedback)}</div>`;
}

function renderRoom2(){
  const zoneCfg = {
    acustica:{title:'Acústica', img:'img/tipo_acu.webp', cls:'acustica'},
    luminica:{title:'Lumínica', img:'img/tipo_lum.webp', cls:'luminica'},
    quimica:{title:'Química', img:'img/tipo_quim.webp', cls:'quimica'},
  };
  return `<div class="page">${pageHead('Módulo 02 / Control de emisiones','Contaminación','Relaciona cada efecto ambiental con su fuente de contaminación correspondiente.', '<button class="primary-btn" onclick="validateRoom2()">Validar categorías</button>')}
    <div class="room2-zones">${Object.entries(zoneCfg).map(([id,z])=>`
      <div class="zone ${z.cls}" onclick="dropSelectedRoom2('${id}')">
        <img class="zone-top-img" src="${z.img}" alt="${z.title}">
        <h3 class="zone-title headline">${z.title}</h3>
        <div class="zone-hint">Arrastra aquí</div>
        <div class="zone-items">${state.room2Zones[id].map(cid=>`<button class="small-pill" onclick="backRoom2('${cid}');event.stopPropagation()">${room2Cards[cid].label}</button>`).join('')}</div>
      </div>`).join('')}</div>
      <div class="card-bank" style="margin-top:22px">
        <div class="bank-title">Efectos detectados</div>
        <div class="chip-grid">${state.room2Bank.map(id=>{
          const c=room2Cards[id];
          return `<button class="effect-chip" onclick="selectRoom2('${id}')"><img src="${c.img}" alt="${c.label}"><div class="txt">${c.label}</div></button>`;
        }).join('')}</div>
      </div>
      ${feedbackHtml(state.room2Feedback)}
    </div>`;
}

function renderRoom3(){
  return `<div class="page">${pageHead('Módulo 03 / Detectives de la naturaleza','Identificación de especies','Clasifica cada especie según su origen e impacto en el ecosistema local.', '<button class="primary-btn" onclick="validateRoom3()">Validar clasificación</button>')}
    <div class="room3-wrap">
      <div>
        <div class="bank-title">Especies a clasificar</div>
        <div class="species-grid">${state.room3Bank.map(id=>{
          const c=room3Cards[id];
          return `<button class="species-card" onclick="selectRoom3('${id}')">${img(c.img,c.title)}<div class="species-meta"><h3 class="species-title headline">${c.title}</h3><div class="species-sub">${c.latin}</div></div></button>`;
        }).join('')}</div>
      </div>
      <div class="side-drops">
        <div class="drop-box auto" onclick="dropSelectedRoom3('autoctona')"><h3 class="headline">Autóctona</h3><p>Especies propias de la región.</p><div class="drop-items">${state.room3Zones.autoctona.map(id=>`<button class="small-pill" onclick="backRoom3('${id}');event.stopPropagation()">${room3Cards[id].title}</button>`).join('')}</div></div>
        <div class="drop-box inv" onclick="dropSelectedRoom3('invasora')"><h3 class="headline">Invasora</h3><p>Amenazan el equilibrio local.</p><div class="drop-items">${state.room3Zones.invasora.map(id=>`<button class="small-pill" onclick="backRoom3('${id}');event.stopPropagation()">${room3Cards[id].title}</button>`).join('')}</div></div>
      </div>
    </div>
    ${feedbackHtml(state.room3Feedback)}
  </div>`;
}

function renderRoom4(){
  return `<div class="page">${pageHead('Módulo 04 / Ecosistema en equilibrio','Roles ecológicos','Asigna cada organismo a su función vital dentro del ecosistema para restaurar el equilibrio.', '<button class="primary-btn" onclick="validateRoom4()">Validar equilibrio</button>')}
    <div class="room4-wrap">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div class="bank-title" style="margin:0">Banco de especies y elementos</div><div class="legend"><span class="fauna">Fauna</span><span class="flora">Flora</span><span class="habitat">Hábitat</span></div></div>
        <div class="role-grid">${state.room4Bank.map(id=>{
          const c=room4Cards[id];
          return `<button class="role-card ${c.type}" onclick="selectRoom4('${id}')">${img(c.img,c.title)}<div class="meta"><div class="rtitle headline">${c.title}</div><div class="rsub">${c.subtitle}</div></div></button>`;
        }).join('')}</div>
      </div>
      <div class="role-drops">${Object.entries(roleLabels).map(([zoneId,label])=>`
        <div class="role-zone" onclick="dropSelectedRoom4('${zoneId}')"><h3 class="headline">${label}</h3><p>Esperando asignación...</p><div class="drop-items">${state.room4Zones[zoneId].map(id=>`<button class="small-pill" onclick="backRoom4('${id}');event.stopPropagation()">${room4Cards[id].title}</button>`).join('')}</div></div>`).join('')}</div>
    </div>
    ${feedbackHtml(state.room4Feedback)}
  </div>`;
}

function renderRoom5(){
  return `<div class="page">${pageHead('Módulo 05 / Estrategia final','La solución está en nuestras manos','Separa las acciones reales de biodiversidad del greenwashing para activar la fase final.', '<button class="primary-btn" onclick="validateRoom5()">Validar solución</button>')}
    <div class="room5-wrap">
      <div class="decision-board real" onclick="dropSelectedRoom5('real')"><h3 class="headline">Acciones efectivas</h3><p>Impacto real, medible y útil para la biodiversidad.</p><div class="drop-items">${state.room5Real.map(id=>`<button class="small-pill" onclick="backRoom5('${id}');event.stopPropagation()">${room5Cards[id].label}</button>`).join('')}</div></div>
      <div class="decision-board green" onclick="dropSelectedRoom5('green')"><h3 class="headline">Descartar greenwashing</h3><p>Acciones vacías, cosméticas o engañosas.</p><div class="drop-items">${state.room5Green.map(id=>`<button class="small-pill" onclick="backRoom5('${id}');event.stopPropagation()">${room5Cards[id].label}</button>`).join('')}</div></div>
    </div>
    <div class="card-bank" style="margin-top:22px"><div class="bank-title">Banco de acciones</div><div class="action-grid">${state.room5Bank.map(id=>{
      const c=room5Cards[id];
      return `<button class="action-card ${c.kind==='real'?'real':'green'}" onclick="selectRoom5('${id}')">${img(c.img,c.label)}<div class="meta"><div class="atitle headline">${c.label}</div><span class="atag">${c.kind==='real'?'Impacto real':'Greenwashing'}</span></div></button>`;
    }).join('')}</div></div>
    ${feedbackHtml(state.room5Feedback)}
  </div>`;
}

function renderFinal(){
  return `<div class="page"><div class="final-wrap">
    <div class="page-kicker headline">Última fase activada</div>
    <h1 class="page-title headline">Misión <span style="color:var(--cyan)">cumplida</span></h1>
    <div class="page-desc">El ecosistema ha recuperado su equilibrio. Gracias a tu intervención, el Corredor Verde vuelve a ser un refugio funcional para la biodiversidad local.</div>
    <div class="final-banner"><div class="page-kicker" style="color:rgba(255,255,255,.7)">Palabra final</div><div class="final-word headline">CORREDOR VERDE</div></div>
    <div class="final-grid">${roomMeta.map(r=>`<div class="final-card"><div class="ft">${r.short}</div><div class="fv headline">${state.solvedKeys[r.id] || '—'}</div></div>`).join('')}</div>
    <div class="welcome-actions"><button class="secondary-btn" onclick="go('hub')">Ver resumen</button><button class="primary-btn" onclick="resetAll()">Reiniciar misión</button></div>
  </div></div>`;
}

function renderMainContent(){
  switch(state.current){
    case 'welcome': return renderWelcome();
    case 'hub': return renderHub();
    case 'room1': return renderRoom1();
    case 'room2': return renderRoom2();
    case 'room3': return renderRoom3();
    case 'room4': return renderRoom4();
    case 'room5': return renderRoom5();
    case 'final': return renderFinal();
    default: return renderHub();
  }
}

function render(){
  const progress = getProgress();
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand"><div class="brand-badge">A</div><div><div class="brand-title headline">AIRBUS</div><div class="brand-sub">Misión de aviación sostenible</div></div></div>
        <div class="progress-block"><h4>Estado de misión</h4><div class="progress-meta"><span>${progress}%</span><span>${Object.keys(state.solvedKeys).length}/5</span></div><div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div></div>
        <div class="keys-block"><h4>Claves de acceso</h4><div class="keys-list">${roomMeta.map((r,i)=>`<div class="key-card"><div class="key-left"><div class="key-num">${i+1}</div><div><div class="key-title">${r.short}</div><div class="key-value">${state.solvedKeys[r.id] || 'bloqueada'}</div></div></div><div>${state.solvedKeys[r.id] ? '<span class="key-check">✓</span>' : '🔒'}</div></div>`).join('')}</div></div>
        <div class="nav-actions"><button class="nav-link" onclick="go('hub')">⌂ Volver al hub</button><button class="nav-link danger" onclick="resetAll()">↺ Reiniciar</button>${Object.keys(state.solvedKeys).length===5 ? '<button class="primary-btn" onclick="go(\'final\')">Abrir misión cumplida</button>':''}</div>
      </aside>
      <div class="main">
        <header class="topbar"><div><div class="top-title headline">Misión de Aviación Sostenible</div><div class="top-sub">Escape room digital sobre sostenibilidad aplicada · Airbus Getafe</div></div><nav class="phase-nav">${roomMeta.map(r=>`<button class="phase-btn ${state.current===r.id?'active':''}" onclick="go('${r.id}')">${r.phase}</button>`).join('')}</nav></header>
        <main class="content">${renderMainContent()}</main>
      </div>
    </div>`;
}

function go(view){ state.current=view; render(); }
function resetAll(){
  state.current='welcome';
  state.solvedKeys={};
  state.selectedRoom2 = state.selectedRoom3 = state.selectedRoom4 = state.selectedRoom5 = null;
  state.room1Cards = [...state.room1Cards].sort((a,b)=>0); // keep current order before reset? reset properly next lines
  state.room1Cards = [
    { id: 'reforestacion', title: 'Reforestación con especies locales', subtitle: 'Restauración activa de hábitats con árboles autóctonos.', img: 'img/reforest.webp' },
    { id: 'urbanizacion', title: 'Urbanización intensiva', subtitle: 'Construcción de edificios, carreteras y estructuras permanentes.', img: 'img/urb.webp' },
    { id: 'conservacion', title: 'Conservación de bosques y arbolado', subtitle: 'Protección del hábitat maduro y de la biodiversidad existente.', img: 'img/bosque.webp' },
    { id: 'sellado', title: 'Sellado de suelos', subtitle: 'Pavimentación que impide el ciclo natural del suelo.', img: 'img/sellado.webp' },
    { id: 'charcas', title: 'Recuperación de charcas estacionales', subtitle: 'Generación de microhábitats acuáticos para fauna.', img: 'img/charcas.webp' },
    { id: 'agricultura', title: 'Agricultura ecológica periurbana', subtitle: 'Baja presión sobre el suelo, favorece polinizadores.', img: 'img/agri.webp' },
    { id: 'cesped', title: 'Mantenimiento de césped ornamental', subtitle: 'Uso de especies foráneas sin valor ecológico.', img: 'img/cesped.webp' },
    { id: 'zonas', title: 'Zonas verdes con especies autóctonas', subtitle: 'Vegetación funcional que promueve biodiversidad.', img: 'img/zonas_aut.webp' },
  ];
  state.room1Feedback=null;
  state.room2Zones={acustica:[],luminica:[],quimica:[]}; state.room2Bank=Object.keys(room2Cards); state.room2Feedback=null;
  state.room3Zones={autoctona:[],invasora:[]}; state.room3Bank=Object.keys(room3Cards); state.room3Feedback=null;
  state.room4Zones={ polinizadores: [], plantas: [], depredadores: [], reptiles: [], reguladores: [], estructura: [], agua: [] }; state.room4Bank=Object.keys(room4Cards); state.room4Feedback=null;
  state.room5Real=[]; state.room5Green=[]; state.room5Bank=Object.keys(room5Cards); state.room5Feedback=null;
  render();
}

function moveRoom1(index, delta){
  const to = index + delta; if(to<0 || to>=state.room1Cards.length) return;
  const arr=[...state.room1Cards]; const [item]=arr.splice(index,1); arr.splice(to,0,item); state.room1Cards=arr; render();
}
function validateRoom1(){
  const ok = JSON.stringify(state.room1Cards.map(c=>c.id))===JSON.stringify(room1Expected);
  state.room1Feedback = { ok, text: ok ? 'Secuencia correcta. Has obtenido la clave 23.' : 'El orden no es correcto. Revisa de máximo a mínimo impacto negativo.' };
  if(ok) markSolved('room1','23');
  render();
}

function selectRoom2(id){ state.selectedRoom2=id; }
function dropSelectedRoom2(zone){ if(!state.selectedRoom2) return; const id=state.selectedRoom2; state.room2Bank=state.room2Bank.filter(x=>x!==id); Object.keys(state.room2Zones).forEach(k=>state.room2Zones[k]=state.room2Zones[k].filter(x=>x!==id)); state.room2Zones[zone].push(id); state.selectedRoom2=null; render(); }
function backRoom2(id){ Object.keys(state.room2Zones).forEach(k=>state.room2Zones[k]=state.room2Zones[k].filter(x=>x!==id)); if(!state.room2Bank.includes(id)) state.room2Bank.push(id); render(); }
function validateRoom2(){ const ok = Object.values(room2Cards).every(c=>state.room2Zones[c.target].includes(c.id)); state.room2Feedback={ok,text:ok?'Clasificación correcta. Has obtenido la clave AZUL.':'Hay efectos mal clasificados. Revisa las categorías.'}; if(ok) markSolved('room2','AZUL'); render(); }

function selectRoom3(id){ state.selectedRoom3=id; }
function dropSelectedRoom3(zone){ if(!state.selectedRoom3) return; const id=state.selectedRoom3; state.room3Bank=state.room3Bank.filter(x=>x!==id); Object.keys(state.room3Zones).forEach(k=>state.room3Zones[k]=state.room3Zones[k].filter(x=>x!==id)); state.room3Zones[zone].push(id); state.selectedRoom3=null; render(); }
function backRoom3(id){ Object.keys(state.room3Zones).forEach(k=>state.room3Zones[k]=state.room3Zones[k].filter(x=>x!==id)); if(!state.room3Bank.includes(id)) state.room3Bank.push(id); render(); }
function validateRoom3(){ const ok = Object.values(room3Cards).every(c=>state.room3Zones[c.correct].includes(c.id)); state.room3Feedback={ok,text:ok?'Clasificación correcta. Has obtenido la clave FLOR.':'Revisa la clasificación entre autóctona e invasora.'}; if(ok) markSolved('room3','FLOR'); render(); }

function selectRoom4(id){ state.selectedRoom4=id; }
function dropSelectedRoom4(zone){ if(!state.selectedRoom4) return; const id=state.selectedRoom4; state.room4Bank=state.room4Bank.filter(x=>x!==id); Object.keys(state.room4Zones).forEach(k=>state.room4Zones[k]=state.room4Zones[k].filter(x=>x!==id)); state.room4Zones[zone].push(id); state.selectedRoom4=null; render(); }
function backRoom4(id){ Object.keys(state.room4Zones).forEach(k=>state.room4Zones[k]=state.room4Zones[k].filter(x=>x!==id)); if(!state.room4Bank.includes(id)) state.room4Bank.push(id); render(); }
function validateRoom4(){ const ok = Object.values(room4Cards).every(c=>state.room4Zones[c.correct].includes(c.id)); state.room4Feedback={ok,text:ok?'Ecosistema equilibrado. Has obtenido la clave VERDE.':'Hay elementos en roles incorrectos. Revisa las relaciones ecológicas.'}; if(ok) markSolved('room4','VERDE'); render(); }

function selectRoom5(id){ state.selectedRoom5=id; }
function dropSelectedRoom5(zone){ if(!state.selectedRoom5) return; const id=state.selectedRoom5; state.room5Bank=state.room5Bank.filter(x=>x!==id); state.room5Real=state.room5Real.filter(x=>x!==id); state.room5Green=state.room5Green.filter(x=>x!==id); if(zone==='real') state.room5Real.push(id); else state.room5Green.push(id); state.selectedRoom5=null; render(); }
function backRoom5(id){ state.room5Real=state.room5Real.filter(x=>x!==id); state.room5Green=state.room5Green.filter(x=>x!==id); if(!state.room5Bank.includes(id)) state.room5Bank.push(id); render(); }
function validateRoom5(){ const ok = Object.values(room5Cards).every(c => c.kind==='real' ? state.room5Real.includes(c.id) : state.room5Green.includes(c.id)); state.room5Feedback={ok,text:ok?'Solución final correcta. Has obtenido la clave NIDOS.':'Todavía hay acciones mal clasificadas entre impacto real y greenwashing.'}; if(ok) markSolved('room5','NIDOS'); render(); }

window.go = go;
window.resetAll = resetAll;
window.moveRoom1 = moveRoom1;
window.validateRoom1 = validateRoom1;
window.selectRoom2 = selectRoom2;
window.dropSelectedRoom2 = dropSelectedRoom2;
window.backRoom2 = backRoom2;
window.validateRoom2 = validateRoom2;
window.selectRoom3 = selectRoom3;
window.dropSelectedRoom3 = dropSelectedRoom3;
window.backRoom3 = backRoom3;
window.validateRoom3 = validateRoom3;
window.selectRoom4 = selectRoom4;
window.dropSelectedRoom4 = dropSelectedRoom4;
window.backRoom4 = backRoom4;
window.validateRoom4 = validateRoom4;
window.selectRoom5 = selectRoom5;
window.dropSelectedRoom5 = dropSelectedRoom5;
window.backRoom5 = backRoom5;
window.validateRoom5 = validateRoom5;

render();
