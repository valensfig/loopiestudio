/* ================================================================
   LOOPIESTUDIO — app.js v7.0 (Persistencia de Hilos + Proyectos)
   ================================================================ */
'use strict';

const GLOSSARY = [{ es: 'am', en: 'mr', name: 'Anillo Mágico', short: 'Inicio sin hueco visible', desc: 'Técnica para comenzar tejido circular.', tip: '💡 Tira del hilo cola para cerrar el anillo', icon: '⭕' }, { es: 'pb', en: 'sc', name: 'Punto Bajo', short: 'El punto básico del crochet', desc: 'Punto más simple y corto.', tip: '💡 Ideal para amigurumis', icon: '↗️' }, { es: 'pa', en: 'dc', name: 'Punto Alto', short: 'Punto más alto y abierto', desc: 'Hacer una lazada ANTES de insertar la aguja.', tip: '💡 Forma tejidos con más altura', icon: '⬆️' }, { es: 'pm', en: 'hdc', name: 'Punto Medio / Semipunto', short: 'Entre punto bajo y punto alto', desc: 'Hacer una lazada antes de insertar. Sacar 3 lazadas juntas.', tip: '💡 Perfecto para gorros y bufandas', icon: '↗️' }, { es: 'dpa', en: 'tr', name: 'Doble Punto Alto', short: 'Punto muy alto para encajes', desc: 'Hacer DOS lazadas antes de insertar la aguja.', tip: '💡 Muy usado en motivos calados', icon: '⬆️⬆️' }, { es: 'cad', en: 'ch', name: 'Cadeneta', short: 'La base de todo patrón', desc: 'Lazada sobre aguja y sacar por la lazada.', tip: '💡 No aprietes demasiado', icon: '〰️' }, { es: 'sm', en: 'sl st', name: 'Punto Deslizado / Cierre', short: 'Para unir y cerrar filas', desc: 'Insertar la aguja, sacar una lazada directamente por el punto.', tip: '💡 Cierra siempre las vueltas con sm', icon: '↩️' }, { es: 'aum', en: 'inc', name: 'Aumento', short: '2 puntos en 1 mismo punto', desc: 'Trabajar DOS puntos en el mismo punto base.', tip: '💡 Esencial para dar volumen', icon: '➕' }, { es: 'dis', en: 'dec', name: 'Disminución', short: '2 puntos unidos en 1', desc: 'Trabajar 2 puntos juntos para reducir el conteo.', tip: '💡 Disminución invisible para amigurumis', icon: '➖' }, { es: 'rep', en: 'rep', name: 'Repetir', short: 'Repetir la secuencia', desc: 'Repetir la secuencia entre asteriscos.', tip: '💡 Lee toda la secuencia antes', icon: '🔄' }, { es: 'bo', en: 'bo', name: 'Punto Garbanzo / Mota', short: 'Punto abultado en 3D (Bobble)', desc: 'Varios puntos altos incompletos en el mismo punto base.', tip: '💡 Empuja la bolita hacia el frente.', icon: '🍿' }];
const GLOSSARY_EN = [{ es: 'mr', en: 'mr', name: 'Magic Ring', short: 'Adjustable start', desc: 'Technique to start circular crochet.', tip: '💡 Pull the tail to close tightly', icon: '⭕' }, { es: 'sc', en: 'sc', name: 'Single Crochet', short: 'Basic crochet stitch', desc: 'Insert hook, pull up a loop, pull through both loops.', tip: '💡 Essential for amigurumis', icon: '↗️' }, { es: 'dc', en: 'dc', name: 'Double Crochet', short: 'Taller, more open stitch', desc: 'Yarn over BEFORE inserting hook.', tip: '💡 Creates fabric with more height', icon: '⬆️' }, { es: 'hdc', en: 'hdc', name: 'Half Double Crochet', short: 'Between sc and dc in height', desc: 'Yarn over before inserting hook.', tip: '💡 Great for hats', icon: '↗️' }, { es: 'tr', en: 'tr', name: 'Treble Crochet', short: 'Very tall stitch', desc: 'Yarn over TWICE before inserting hook.', tip: '💡 Often used in openwork', icon: '⬆️⬆️' }, { es: 'ch', en: 'ch', name: 'Chain Stitch', short: 'Foundation of pattern', desc: 'Yarn over and pull through loop.', tip: '💡 Don’t pull too tightly', icon: '〰️' }, { es: 'sl st', en: 'sl st', name: 'Slip Stitch', short: 'Used to join rows', desc: 'Insert hook, pull up a loop directly through loop.', tip: '💡 Always close rounds with sl st', icon: '↩️' }, { es: 'inc', en: 'inc', name: 'Increase', short: '2 stitches in 1', desc: 'Work TWO stitches in the same base stitch.', tip: '💡 Essential for adding volume', icon: '➕' }, { es: 'dec', en: 'dec', name: 'Decrease', short: '2 stitches combined', desc: 'Work 2 stitches together.', tip: '💡 Use invisible dec for amigurumis', icon: '➖' }, { es: 'rep', en: 'rep', name: 'Repeat', short: 'Repeat sequence', desc: 'Repeat the sequence between asterisks.', tip: '💡 Read the whole sequence', icon: '🔄' }, { es: 'bo', en: 'bo', name: 'Bobble Stitch', short: '3D puffed stitch', desc: 'Work several incomplete double crochets.', tip: '💡 Push the bobble to the right side.', icon: '🍿' }];
const TRANSLATION_MAP = { '\\bam\\b': 'mr', '\\bpb\\b': 'sc', '\\bpa\\b': 'dc', '\\bpm\\b': 'hdc', '\\bdpa\\b': 'tr', '\\bcad\\b': 'ch', '\\bsm\\b': 'sl st', '\\baum\\b': 'inc', '\\bdis\\b': 'dec', '\\brep\\b': 'rep', '\\bpto\\b': 'st', '\\bbo\\b': 'bo', 'vuelta': 'round', 'vueltas': 'rounds', 'punto': 'stitch', 'puntos': 'stitches', 'anillo mágico': 'magic ring', 'cadeneta': 'chain', 'cerrar': 'fasten off', 'hilo': 'yarn', 'aguja': 'hook', 'unir': 'join', 'repetir': 'repeat', 'alrededor': 'around', 'mismo punto': 'same stitch', 'siguiente': 'next', 'último': 'last', 'pb': 'sc' };

let isTranslated = false;
let originalPatternHTML = '';

function parseMarkdown(text) { 
  if (!text) return text; 
  return text.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>').replace(/(?<!\*)\*(?!\*)([^*\n]+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>'); 
}

function compressImage(file, maxWidth = 600, quality = 0.7) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) { height = Math.round((height * maxWidth) / width); width = maxWidth; }
        } else {
          if (height > maxWidth) { width = Math.round((width * maxWidth) / height); height = maxWidth; }
        }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

const I18N = {
  es: { 'nav.work': 'Trabajo', 'nav.projects': 'Proyectos', 'nav.yarns': 'Hilos', 'nav.calc': 'Calculadora', 'nav.glossary': 'Glosario', 'view.projects': 'Proyectos', 'view.materials': 'Mis Hilos', 'view.glossary': 'Glosario', 'lang.es': 'ES', 'lang.en': 'EN', 'palette.label': '✨ Paleta sugerida', 'palette.btn': 'Nueva', 'panel.tutorial': 'Tutorial', 'panel.pattern': 'Patrón', 'btn.addTutorial': 'Agregar tutorial', 'video.hint': 'El video no se puede embeber aquí', 'btn.openApp': 'Abrir video en la App', 'btn.changeLink': 'Cambiar enlace', 'pattern.meta': 'Principiante · DK · Aguja 4.0mm', 'phase.materials': 'Detalles', 'mat.tools': 'Aguja recomendada: X', 'notes.title': '📝 Notas', 'notes.desc': 'Mantén la tensión uniforme.', 'status.wip': 'En progreso', 'counter.current': 'VUELTA ACTUAL', 'counter.stitches': 'PUNTOS', 'counter.note': '📝 Nota para vuelta', 'btn.new': 'Nuevo', 'tab.todo': 'Por hacer', 'tab.wip': 'En proceso', 'tab.redo': 'Volviendo', 'calc.tabTitle': 'Calculadora', 'calc.title': 'Cierre de Proyecto', 'calc.yarnSmart': '🧵 Precio de madeja ÷ Gramos totales', 'calc.yarnUsed': '⚖️ Gramos usados en tu tejido', 'calc.labor': '⏱ Horas × tarifa/hr', 'calc.extras': '📦 Materiales extras', 'calc.price': '🏷️ Precio final de venta', 'calc.total': 'Costo total:', 'calc.profit': 'Ganancia neta:', 'btn.calculate': 'Calcular', 'btn.copyQuote': '📲 WhatsApp', 'btn.add': 'Agregar', 'glossary.search': '🔍 Buscar punto o abreviatura...', 'toast.lang': '🇪🇸 Idioma cambiado a español', 'modal.videoTitle': '🎬 Agregar Tutorial', 'btn.cancel': 'Cancelar', 'btn.load': 'Cargar', 'modal.projTitle': '🌟 Proyecto', 'opt.level': 'Nivel...', 'modal.pastePattern': '📋 Patrón', 'btn.format': 'Formatear', 'btn.saveProj': 'Guardar', 'btn.photo': '📷 Foto', 'modal.threadTitle': '🧶 Agregar Nuevo Hilo', 'btn.saveThread': 'Guardar' },
  en: { 'nav.work': 'Workspace', 'nav.projects': 'Projects', 'nav.yarns': 'Yarns', 'nav.calc': 'Calculator', 'nav.glossary': 'Glossary', 'view.projects': 'Projects', 'view.materials': 'My Yarns', 'view.glossary': 'Glossary', 'lang.es': 'ES', 'lang.en': 'EN', 'palette.label': '✨ Suggested Palette', 'palette.btn': 'Refresh', 'panel.tutorial': 'Tutorial', 'panel.pattern': 'Pattern', 'btn.addTutorial': 'Add tutorial', 'video.hint': 'Video cannot be embedded here', 'btn.openApp': 'Open video in App', 'btn.changeLink': 'Change link', 'pattern.meta': 'Beginner · DK · 4.0mm Hook', 'phase.materials': 'Details', 'mat.tools': 'Recommended hook: X', 'notes.title': '📝 Notes', 'notes.desc': 'Keep your tension even.', 'status.wip': 'In progress', 'counter.current': 'CURRENT ROUND', 'counter.stitches': 'STITCHES', 'counter.note': '📝 Note for round', 'btn.new': 'New', 'tab.todo': 'To do', 'tab.wip': 'In progress', 'tab.redo': 'Redo', 'calc.tabTitle': 'Calculator', 'calc.title': 'Project Wrap-up', 'calc.yarnSmart': '🧵 Skein price ÷ Total grams', 'calc.yarnUsed': '⚖️ Grams used in project', 'calc.labor': '⏱ Hours × rate/hr', 'calc.extras': '📦 Extra materials', 'calc.price': '🏷️ Final sale price', 'calc.total': 'Total cost:', 'calc.profit': 'Net profit:', 'btn.calculate': 'Calculate', 'btn.copyQuote': '📲 WhatsApp', 'btn.add': 'Add', 'glossary.search': '🔍 Search stitch or abbreviation...', 'toast.lang': '🇺🇸 Language changed to English', 'modal.videoTitle': '🎬 Add Tutorial', 'btn.cancel': 'Cancel', 'btn.load': 'Load', 'modal.projTitle': '🌟 Project', 'opt.level': 'Level...', 'modal.pastePattern': '📋 Pattern', 'btn.format': 'Format', 'btn.saveProj': 'Save', 'btn.photo': '📷 Photo', 'modal.threadTitle': '🧶 Add New Yarn', 'btn.saveThread': 'Save' }
};

function t(key) { return I18N[state.lang]?.[key] ?? I18N.es[key] ?? key; }
function applyLanguage() {
  const isEN = state.lang === 'en'; dom.btnLang.classList.toggle('en-active', isEN);
  document.querySelectorAll('[data-i18n]').forEach(el => { const val = t(el.dataset.i18n); if (val) el.textContent = val; });
  if (dom.glossarySearch) dom.glossarySearch.placeholder = t('glossary.search');
  if (dom.quickNoteInput) dom.quickNoteInput.placeholder = `${t('counter.note')} ${state.currentRound}...`;
  document.querySelectorAll('.round-stitches').forEach(el => { el.textContent = el.textContent.replace(/\bpb\b/gi, isEN ? 'sc' : 'pb'); });
  if (state.currentView === 'viewGlossary') renderGlossary(isEN ? GLOSSARY_EN : GLOSSARY);
  document.documentElement.lang = isEN ? 'en' : 'es'; showToast(t('toast.lang'));
}

const PALETTES = [['#f4a8b8', '#fff3c4', '#d4b5d8'], ['#ffd6e0', '#fff9cc', '#c8e6c9'], ['#ffb3c6', '#ffe5a0', '#b8d4f0'], ['#f9c6d0', '#ffeaa8', '#c9e0bc'], ['#f7a8c4', '#fff0b0', '#a8d8ea'], ['#fdb8d0', '#fef3be', '#b8d8d8']];
let currentPaletteIdx = 0;
let localProjects = []; 
let localThreads = [];

const state = {
  currentView: 'viewWorkstation', currentRound: 1, totalRounds: 1, stitchCount: 0,
  videoLoaded: false, quickNotes: {}, isDarkMode: false, paletteOpen: false, lang: 'es',
  timerSeconds: 0, isTimerRunning: false, timerInterval: null
};

let wakeLock = null;
async function requestWakeLock() { if ('wakeLock' in navigator) { try { wakeLock = await navigator.wakeLock.request('screen'); } catch (err) {} } }
function releaseWakeLock() { if (wakeLock !== null) { wakeLock.release(); wakeLock = null; } }
document.addEventListener('visibilitychange', () => { if (wakeLock !== null && document.visibilityState === 'visible') requestWakeLock(); });
function saveLocalProgress() { localStorage.setItem('loopie_progress', JSON.stringify({ round: state.currentRound, stitches: state.stitchCount, timer: state.timerSeconds, notes: state.quickNotes })); }

const $ = id => document.getElementById(id);
const dom = {
  btnTheme: $('btnTheme'), btnPalette: $('btnPalette'), btnPaletteRefresh: $('btnPaletteRefresh'), btnLang: $('btnLang'), paletteStrip: $('paletteStrip'), palDots: [0,1,2].map(i => $(`palDot${i}`)), navItems: document.querySelectorAll('[data-view]'),
  videoToggleHeader: $('videoToggleHeader'), videoCollapseBody: $('videoCollapseBody'), btnAddVideo: $('btnAddVideo'), btnChangeVideo: $('btnChangeVideo'), videoWrapper: $('videoWrapper'), videoPlaceholder: $('videoPlaceholder'), externalLinkWrapper: $('externalLinkWrapper'), externalIcon: $('externalIcon'), externalPlatform: $('externalPlatform'), openExternalBtn: $('openExternalBtn'), btnChangeExternal: $('btnChangeExternal'), modalOverlay: $('modalOverlay'), videoUrlInput: $('videoUrlInput'), btnModalCancel: $('btnModalCancel'), btnModalConfirm: $('btnModalConfirm'),
  btnTranslate: $('btnTranslate'), patternContent: $('patternContent'), patternProgressBadge: $('patternProgressBadge'), patternScrollArea: $('patternScrollArea'),
  counterNumber: $('counterNumber'), counterTotal: $('counterTotal'), counterProgressFill: $('counterProgressFill'), btnPlus: $('btnPlus'), btnMinus: $('btnMinus'), btnReset: $('btnReset'), stitchCount: $('stitchCount'), btnStitchPlus: $('btnStitchPlus'), btnStitchMinus: $('btnStitchMinus'), quickNoteInput: $('quickNoteInput'),
  timerDisplay: $('timerDisplay'), btnTimerToggle: $('btnTimerToggle'),
  projectTabs: document.querySelectorAll('.project-tab'), btnNewProject: $('btnNewProject'),
  calcYarnPrice: $('calcYarnPrice'), calcYarnTotalG: $('calcYarnTotalG'), calcYarnUsedG: $('calcYarnUsedG'), calcYarnCostResult: $('calcYarnCostResult'), calcHours: $('calcHours'), calcRate: $('calcRate'), calcExtras: $('calcExtras'), calcPrice: $('calcPrice'), calcTotal: $('calcTotal'), calcProfit: $('calcProfit'), btnCalc: $('btnCalc'), btnCopyQuote: $('btnCopyQuote'),
  modalNewProject: $('modalNewProject'), btnNpCancel: $('btnNpCancel'), btnNpSave: $('btnNpSave'), btnFormatPattern: $('btnFormatPattern'), npPattern: $('npPattern'), npPhotoUpload: $('npPhotoUpload'), npPhotoPreview: $('npPhotoPreview'), npId: $('npId'), npName: $('npName'), npLevel: $('npLevel'), npStatus: $('npStatus'), npTags: $('npTags'), npHook: $('npHook'), npVideo: $('npVideo'),
  modalNewThread: $('modalNewThread'), btnAddThread: $('btnAddThread'), btnThCancel: $('btnThCancel'), btnThSave: $('btnThSave'), thName: $('thName'), thType: $('thType'), thGrams: $('thGrams'), thColor: $('thColor'), materialsList: $('materialsList'),
  glossarySearch: $('glossarySearch'), glossaryList: $('glossaryList'), toast: $('toast'),
  tabTodo: $('tab-todo'), tabWip: $('tab-wip'), tabRedo: $('tab-redo'),
  wsProjName: $('wsProjName'), wsProjMeta: $('wsProjMeta'), wsProjTags: $('wsProjTags'), patternRounds: $('patternRounds'), wsCounterName: $('wsCounterName')
};

function navigateTo(viewId) {
  if (state.currentView === viewId) return;
  $(state.currentView)?.classList.remove('active'); $(viewId)?.classList.add('active');
  state.currentView = viewId;
  dom.navItems.forEach(item => item.classList.toggle('active-nav', item.dataset.view === viewId));
  if (viewId === 'viewGlossary') renderGlossary(state.lang === 'en' ? GLOSSARY_EN : GLOSSARY);
  if (viewId === 'viewMaterials') renderMaterialsList();
  if (viewId === 'viewWorkstation') requestWakeLock(); else releaseWakeLock();
}

dom.navItems.forEach(item => item.addEventListener('click', e => { rippleEffect(e, item); navigateTo(item.dataset.view); }));
dom.btnTheme.addEventListener('click', () => { document.documentElement.classList.add('theme-transition'); state.isDarkMode = !state.isDarkMode; document.documentElement.setAttribute('data-theme', state.isDarkMode ? 'dark' : 'light'); showToast(state.isDarkMode ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado'); setTimeout(() => document.documentElement.classList.remove('theme-transition'), 450); });
dom.btnLang.addEventListener('click', e => { rippleEffect(e, dom.btnLang); state.lang = state.lang === 'es' ? 'en' : 'es'; applyLanguage(); });

function applyPalette(idx) { const p = PALETTES[idx % PALETTES.length]; dom.palDots.forEach((dot, i) => { dot.style.background = p[i]; dot.title = p[i]; }); }
dom.btnPalette.addEventListener('click', () => { state.paletteOpen = !state.paletteOpen; dom.paletteStrip.classList.toggle('open', state.paletteOpen); if (state.paletteOpen) applyPalette(currentPaletteIdx); });
dom.btnPaletteRefresh.addEventListener('click', () => { currentPaletteIdx = (currentPaletteIdx + 1) % PALETTES.length; applyPalette(currentPaletteIdx); dom.palDots.forEach((dot, i) => { dot.style.transform = 'scale(0)'; setTimeout(() => dot.style.transform = 'scale(1)', i * 60); }); });
dom.palDots.forEach(dot => dot.addEventListener('click', () => navigator.clipboard?.writeText(dot.title).then(() => showToast(`📋 Copiado: ${dot.title}`))));

dom.videoToggleHeader.addEventListener('click', (e) => { if (e.target.closest('#btnChangeVideo')) return; const isCollapsed = dom.videoCollapseBody.classList.contains('collapsed'); dom.videoCollapseBody.classList.toggle('collapsed', !isCollapsed); dom.videoToggleHeader.classList.toggle('collapsed', !isCollapsed); });
function openVideoModal() { dom.modalOverlay.classList.add('open'); setTimeout(() => dom.videoUrlInput.focus(), 320); }
function closeVideoModal() { dom.modalOverlay.classList.remove('open'); dom.videoUrlInput.value = ''; }
function resetVideoPanel() { dom.videoPlaceholder.style.display = 'flex'; dom.externalLinkWrapper.style.display = 'none'; dom.videoWrapper.querySelector('iframe')?.remove(); }
function loadVideo(url) {
  const platform = /youtube|youtu\.be/i.test(url) ? 'youtube' : /tiktok/i.test(url) ? 'tiktok' : /instagram/i.test(url) ? 'instagram' : /pinterest/i.test(url) ? 'pinterest' : 'unknown';
  resetVideoPanel();
  if (platform === 'youtube') {
    const videoId = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i)?.[1];
    if (!videoId) return showToast('❌ URL de YouTube no válida');
    dom.videoPlaceholder.style.display = 'none';
    const iframe = document.createElement('iframe'); iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`; iframe.allowFullscreen = true; dom.videoWrapper.appendChild(iframe);
  } else if (platform !== 'unknown') {
    dom.videoPlaceholder.style.display = 'none'; dom.externalLinkWrapper.style.display = 'flex';
    dom.externalIcon.textContent = {tiktok:'🎵', instagram:'📸', pinterest:'📌'}[platform]; dom.externalPlatform.textContent = platform.charAt(0).toUpperCase() + platform.slice(1); dom.openExternalBtn.href = url;
  }
  closeVideoModal();
}
dom.btnAddVideo.addEventListener('click', openVideoModal); dom.btnChangeVideo.addEventListener('click', openVideoModal); dom.btnChangeExternal.addEventListener('click', openVideoModal); dom.btnModalCancel.addEventListener('click', closeVideoModal); dom.btnModalConfirm.addEventListener('click', () => { if (dom.videoUrlInput.value) loadVideo(dom.videoUrlInput.value); }); dom.modalOverlay.addEventListener('click', e => { if (e.target === dom.modalOverlay) closeVideoModal(); });

function bindPhaseToggles() { 
  document.querySelectorAll('.phase-toggle').forEach(toggle => { 
    toggle.addEventListener('click', () => { 
      const body = $(toggle.dataset.target); 
      const isCollapsed = body.classList.contains('collapsed'); 
      body.classList.toggle('collapsed', !isCollapsed); 
      toggle.classList.toggle('collapsed', !isCollapsed); 
      toggle.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false'); 
    }); 
  }); 
}
bindPhaseToggles();

function updateCounterUI() {
  const { currentRound, totalRounds } = state; 
  dom.counterNumber.textContent = currentRound; 
  dom.counterTotal.textContent = `de ${totalRounds}`;
  dom.counterProgressFill.style.width = `${Math.min(100, (currentRound / Math.max(1, totalRounds)) * 100)}%`; 
  dom.patternProgressBadge.textContent = `V. ${currentRound}`; 
  highlightActiveRound(currentRound);
  
  dom.counterNumber.classList.remove('bump'); void dom.counterNumber.offsetWidth; dom.counterNumber.classList.add('bump');
  dom.btnMinus.style.opacity = currentRound <= 1 ? '0.4' : '1'; 
  dom.btnPlus.style.opacity = currentRound >= totalRounds ? '0.4' : '1'; 
  dom.quickNoteInput.value = state.quickNotes[currentRound] || ''; 
  dom.quickNoteInput.placeholder = `${t('counter.note')} ${currentRound}...`;
}

function highlightActiveRound(round) {
  document.querySelectorAll('.pattern-round').forEach(el => {
    const r = parseInt(el.dataset.round, 10); 
    el.classList.remove('active-round', 'completed-round');
    if (r === round) { 
      el.classList.add('active-round'); 
      const phase = el.closest('.phase-body'); 
      if (phase && phase.classList.contains('collapsed')) { 
        phase.classList.remove('collapsed'); 
        document.querySelector(`[data-target="${phase.id}"]`)?.classList.remove('collapsed'); 
      } 
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150); 
    } else if (r < round) {
      el.classList.add('completed-round');
    }
  });
}

dom.btnPlus.addEventListener('click', e => { 
  rippleEffect(e, dom.btnPlus); 
  if (state.currentRound < state.totalRounds) { 
    state.quickNotes[state.currentRound] = dom.quickNoteInput.value; 
    state.currentRound++; 
    state.stitchCount = 0; 
    dom.stitchCount.textContent = '0'; 
    updateCounterUI(); 
    saveLocalProgress(); 
  } 
});

dom.btnMinus.addEventListener('click', e => { 
  rippleEffect(e, dom.btnMinus); 
  if (state.currentRound > 1) { 
    state.quickNotes[state.currentRound] = dom.quickNoteInput.value; 
    state.currentRound--; 
    state.stitchCount = 0; 
    dom.stitchCount.textContent = '0'; 
    updateCounterUI(); 
    saveLocalProgress(); 
  } 
});

dom.btnReset.addEventListener('click', () => { 
  if (confirm('¿Reiniciar el contador?')) { 
    state.currentRound = 1; 
    state.stitchCount = 0; 
    state.quickNotes = {}; 
    dom.stitchCount.textContent = '0'; 
    updateCounterUI(); 
    saveLocalProgress(); 
  } 
});

dom.btnStitchPlus.addEventListener('click', () => { state.stitchCount++; dom.stitchCount.textContent = state.stitchCount; pulseElement(dom.stitchCount); saveLocalProgress(); });
dom.btnStitchMinus.addEventListener('click', () => { if (state.stitchCount > 0) { state.stitchCount--; dom.stitchCount.textContent = state.stitchCount; pulseElement(dom.stitchCount); saveLocalProgress(); } });
dom.quickNoteInput.addEventListener('input', () => { state.quickNotes[state.currentRound] = dom.quickNoteInput.value; saveLocalProgress(); });

function formatTimer(sec) { const h = Math.floor(sec / 3600).toString().padStart(2, '0'), m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0'), s = (sec % 60).toString().padStart(2, '0'); return `${h}:${m}:${s}`; }
dom.btnTimerToggle.addEventListener('click', () => { 
  state.isTimerRunning = !state.isTimerRunning; 
  if (state.isTimerRunning) { 
    dom.btnTimerToggle.textContent = '⏸️'; 
    state.timerInterval = setInterval(() => { 
      state.timerSeconds++; 
      dom.timerDisplay.textContent = formatTimer(state.timerSeconds); 
      saveLocalProgress(); 
      if (dom.calcHours) { 
        dom.calcHours.value = (state.timerSeconds / 3600).toFixed(2); 
        dom.btnCalc.click(); 
      } 
    }, 1000); 
  } else { 
    dom.btnTimerToggle.textContent = '▶️'; 
    clearInterval(state.timerInterval); 
  } 
});

dom.btnTranslate.addEventListener('click', () => {
  const rounds = document.querySelectorAll('.round-instructions'); const isEN = state.lang === 'en';
  if (!isTranslated) { 
    originalPatternHTML = dom.patternContent.innerHTML; 
    rounds.forEach(el => { 
      let html = el.innerHTML; 
      for (const [pattern, rep] of Object.entries(TRANSLATION_MAP)) { 
        html = html.replace(new RegExp(pattern, 'gi'), m => m[0] === m[0].toUpperCase() ? rep.charAt(0).toUpperCase() + rep.slice(1) : rep); 
      } 
      el.innerHTML = html; 
    }); 
    document.querySelectorAll('.round-stitches').forEach(el => el.textContent = el.textContent.replace(/\bpb\b/gi, 'sc')); 
    dom.btnTranslate.style.background = 'rgba(255,216,64,0.40)'; 
    isTranslated = true; 
    showToast('🌐 Patrón traducido'); 
  } else { 
    dom.patternContent.innerHTML = originalPatternHTML; 
    bindPhaseToggles(); 
    dom.btnTranslate.style.background = ''; 
    isTranslated = false; 
    showToast('🔤 Patrón restaurado'); 
    highlightActiveRound(state.currentRound); 
  } 
});

dom.btnCalc.addEventListener('click', () => {
  const pYarn = parseFloat(dom.calcYarnPrice.value) || 0; const tYarn = parseFloat(dom.calcYarnTotalG.value) || 1; const uYarn = parseFloat(dom.calcYarnUsedG.value) || 0; const yarnCost = (pYarn / tYarn) * uYarn; dom.calcYarnCostResult.textContent = `$${yarnCost.toFixed(2)} en hilo`;
  const h = parseFloat(dom.calcHours.value) || 0; const r = parseFloat(dom.calcRate.value) || 0; const e = parseFloat(dom.calcExtras.value) || 0; const p = parseFloat(dom.calcPrice.value) || 0; const total = yarnCost + (h * r) + e; const profit = p - total;
  dom.calcTotal.textContent = `$${total.toFixed(2)}`; dom.calcProfit.textContent = `$${profit.toFixed(2)}`; dom.calcProfit.style.color = profit >= 0 ? '' : '#e03030'; pulseElement($('calcResult'));
  dom.btnCopyQuote.style.display = 'block';
});
[dom.calcYarnPrice, dom.calcYarnTotalG, dom.calcYarnUsedG, dom.calcHours, dom.calcRate, dom.calcExtras, dom.calcPrice].forEach(inp => inp?.addEventListener('input', () => dom.btnCalc.click()));
dom.btnCopyQuote.addEventListener('click', () => { const p = parseFloat(dom.calcPrice.value) || 0; if(p === 0) return showToast('⚠️ Define Precio de venta'); navigator.clipboard.writeText(`🧶 *LoopieStudio - Cotización*\n\n✅ *Precio Final:* $${p.toFixed(2)}\n\n_Hecho a mano con dedicación ✨_`).then(() => showToast('✅ Copiado al portapapeles!')); });

function renderGlossary(items) {
  dom.glossaryList.innerHTML = ''; if (items.length === 0) return dom.glossaryList.innerHTML = `<div class="empty-state">🔍<p>Sin resultados</p></div>`;
  items.forEach(item => { const card = document.createElement('div'); card.className = 'glossary-card'; card.innerHTML = `<div class="glossary-card-header"><div class="glossary-abbrev"><span class="abbrev-es">${item.es}</span><span class="abbrev-en">${item.en}</span></div><div class="glossary-info"><div class="glossary-term">${item.name}</div><div class="glossary-short">${item.short}</div></div><svg class="glossary-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></div><div class="glossary-card-body"><div class="glossary-card-content"><div class="glossary-img"><img src="img/${item.es}.jpg" onerror="this.style.display='none';this.parentNode.textContent='${item.icon}'" /></div><div class="glossary-desc">${item.desc}<br><span class="glossary-tip">${item.tip}</span></div></div></div>`; card.querySelector('.glossary-card-header').addEventListener('click', () => { document.querySelectorAll('.glossary-card.open').forEach(c => c !== card && c.classList.remove('open')); card.classList.toggle('open'); }); dom.glossaryList.appendChild(card); });
}
dom.glossarySearch.addEventListener('input', () => { const q = dom.glossarySearch.value.toLowerCase().trim(); const ds = state.lang === 'en' ? GLOSSARY_EN : GLOSSARY; renderGlossary(q ? ds.filter(i => i.es.includes(q) || i.en.includes(q) || i.name.toLowerCase().includes(q)) : ds); });

dom.projectTabs.forEach(tab => tab.addEventListener('click', () => { dom.projectTabs.forEach(t => t.classList.toggle('active-tab', t === tab)); document.querySelectorAll('.tab-panel').forEach(p => p.style.display = p.id === `tab-${tab.dataset.tab}` ? 'grid' : 'none'); }));

// CARGA EXCLUSIVAMENTE DESDE EL CACHÉ LOCAL (PROYECTOS)
function fetchProjectsFromDB() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('offline_proj_')) {
      localStorage.removeItem(key);
      i--;
    }
  }

  let saved = [];
  try {
    const cached = localStorage.getItem('loopie_projects_cache');
    if (cached) saved = JSON.parse(cached);
  } catch(e) { saved = []; }

  const map = new Map();
  saved.forEach(p => {
    if (!p.id) p.id = `proj_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    map.set(p.id, p);
  });

  localProjects = Array.from(map.values());
  localStorage.setItem('loopie_projects_cache', JSON.stringify(localProjects));
  renderProjectsGrid();
}

function renderProjectsGrid() {
  dom.tabTodo.innerHTML = ''; dom.tabWip.innerHTML = ''; dom.tabRedo.innerHTML = '';
  if (localProjects.length === 0) { 
    dom.tabTodo.innerHTML = `<div class="empty-state"><span class="empty-icon">📁</span><p>No tienes proyectos aquí.</p></div>`; 
    return; 
  }
  
  localProjects.forEach((proj) => {
    const bgStyle = proj.foto ? `background-image: url('${proj.foto}');` : `background: linear-gradient(135deg, #f4a8b8, #ffe8d0);`;
    let tagsHTML = ''; if(proj.tags) { proj.tags.split(',').slice(0, 2).forEach(t => tagsHTML += `<span class="tag tag-pink">${t.trim()}</span>`); }
    
    const card = document.createElement('article'); card.className = 'project-card';
    card.innerHTML = `
      <button class="delete-proj-btn" title="Eliminar proyecto">🗑️</button>
      <button class="edit-proj-btn" title="Editar proyecto">✏️</button>
      <div class="project-card-img" style="${bgStyle}"></div>
      <div class="project-card-body">
        <h3 class="project-card-name">${proj.nombre}</h3>
        <p class="project-card-meta">${proj.nivel || ''}</p>
        <div class="project-tags">${tagsHTML}</div>
      </div>
    `;
    
    card.querySelector('.delete-proj-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if(confirm(`¿Eliminar "${proj.nombre}"?`)) {
        localProjects = localProjects.filter(p => p.id !== proj.id);
        localStorage.setItem('loopie_projects_cache', JSON.stringify(localProjects));
        renderProjectsGrid();
        showToast('🗑️ Proyecto eliminado');
      }
    });

    card.querySelector('.edit-proj-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      dom.npId.value = proj.id; 
      dom.npName.value = proj.nombre || ''; 
      dom.npLevel.value = proj.nivel || ''; 
      dom.npStatus.value = proj.estado || 'todo'; 
      dom.npTags.value = proj.tags || ''; 
      dom.npHook.value = proj.hook || ''; 
      dom.npVideo.value = proj.video_url || ''; 
      dom.npPattern.value = proj.patron_texto || '';
      currentProjPhotoBase64 = proj.foto || '';
      if(proj.foto) { 
        dom.npPhotoPreview.src = proj.foto; 
        dom.npPhotoPreview.style.display = 'block'; 
      } else { 
        dom.npPhotoPreview.style.display = 'none'; 
      }
      dom.modalNewProject.classList.add('open');
    });

    card.addEventListener('click', () => {
      dom.wsProjName.textContent = proj.nombre; 
      dom.wsCounterName.textContent = proj.nombre; 
      dom.wsProjMeta.textContent = `${proj.nivel || ''} · Aguja ${proj.hook || 'No definida'}`; 
      dom.wsProjTags.innerHTML = `<li><span>Aguja recomendada: ${proj.hook || 'X'}</span></li>`;
      
      const lines = (proj.patron_texto || '').split('\n').filter(l => l.trim() !== '');
      let globalRoundCounter = 0;
      let phaseIdCounter = 1;
      let currentPhaseName = 'Instrucciones Principales';
      let currentPhaseRoundsHTML = '';
      let phasesHTML = '';
      let partRoundNumber = 0;

      lines.forEach(line => {
        const trimmed = line.trim();
        const sectionMatch = trimmed.match(/^\[(.*)\]$/);
        
        if (sectionMatch) {
          if (currentPhaseRoundsHTML) {
            phasesHTML += `
              <div class="pattern-phase">
                <button class="phase-toggle" data-target="phase-${phaseIdCounter}" aria-expanded="true">
                  <span class="phase-label"><span class="phase-ico">🌸</span> <span>${currentPhaseName}</span></span>
                  <svg class="phase-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="phase-body" id="phase-${phaseIdCounter}"><div class="pattern-rounds">${currentPhaseRoundsHTML}</div></div>
              </div>`;
            phaseIdCounter++;
            currentPhaseRoundsHTML = '';
          }
          currentPhaseName = sectionMatch[1].toUpperCase();
          partRoundNumber = 0;
        } else {
          globalRoundCounter++;
          partRoundNumber++;
          
          const roundLabelMatch = trimmed.match(/^(?:r|round|vuelta|v)\s*(\d+)[\s:.-]*/i);
          let displayRoundNumber = partRoundNumber;
          let instructionClean = trimmed;

          if (roundLabelMatch) {
            displayRoundNumber = roundLabelMatch[1];
            instructionClean = trimmed.replace(/^(?:r|round|vuelta|v)\s*\d+[\s:.-]*/i, '').trim();
          }

          currentPhaseRoundsHTML += `
            <div class="pattern-round" data-round="${globalRoundCounter}" id="round-${globalRoundCounter}">
              <div class="round-header">
                <span class="round-number">R${displayRoundNumber}</span>
                <span class="round-stitches">${currentPhaseName}</span>
              </div>
              <p class="round-instructions">${parseMarkdown(instructionClean)}</p>
            </div>`;
        }
      });

      if (currentPhaseRoundsHTML) {
        phasesHTML += `
          <div class="pattern-phase">
            <button class="phase-toggle" data-target="phase-${phaseIdCounter}" aria-expanded="true">
              <span class="phase-label"><span class="phase-ico">🌸</span> <span>${currentPhaseName}</span></span>
              <svg class="phase-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="phase-body" id="phase-${phaseIdCounter}"><div class="pattern-rounds">${currentPhaseRoundsHTML}</div></div>
          </div>`;
      }

      const materialesHTML = `
        <div class="pattern-phase">
          <button class="phase-toggle" data-target="phase-mat" aria-expanded="true">
            <span class="phase-label"><span class="phase-ico">🧵</span> <span data-i18n="phase.materials">Detalles</span></span>
            <svg class="phase-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="phase-body" id="phase-mat"><ul class="pattern-list" id="wsProjTags"><li><span>Aguja recomendada: ${proj.hook || 'X'}</span></li></ul></div>
        </div>`;

      dom.patternContent.innerHTML = `<div class="pattern-intro"><h3 class="pattern-name" id="wsProjName">${proj.nombre}</h3><p class="pattern-meta" id="wsProjMeta">${proj.nivel || ''} · Aguja ${proj.hook || 'No definida'}</p></div>` + materialesHTML + phasesHTML;
      bindPhaseToggles();
      
      resetVideoPanel();
      if(proj.video_url) { loadVideo(proj.video_url); }
      
      state.totalRounds = Math.max(1, globalRoundCounter); 
      state.currentRound = 1; 
      state.stitchCount = 0; 
      state.timerSeconds = 0; 
      updateCounterUI(); 
      navigateTo('viewWorkstation'); 
      showToast('🧶 Proyecto cargado');
    });

    if(proj.estado === 'todo') dom.tabTodo.appendChild(card); else if(proj.estado === 'wip') dom.tabWip.appendChild(card); else dom.tabRedo.appendChild(card);
  });
}

let currentProjPhotoBase64 = ''; 
dom.npPhotoUpload.addEventListener('change', async (e) => { 
  const f = e.target.files[0]; 
  if(f) { 
    showToast('⏳ Procesando foto...');
    currentProjPhotoBase64 = await compressImage(f, 600, 0.7); 
    dom.npPhotoPreview.src = currentProjPhotoBase64; 
    dom.npPhotoPreview.style.display = 'block'; 
  }
});

dom.btnNewProject.addEventListener('click', () => { 
  dom.npId.value = ''; 
  dom.npName.value = ''; 
  dom.npLevel.value = ''; 
  dom.npStatus.value = 'todo'; 
  dom.npTags.value = ''; 
  dom.npHook.value = ''; 
  dom.npVideo.value = ''; 
  dom.npPattern.value = ''; 
  currentProjPhotoBase64 = ''; 
  dom.npPhotoPreview.style.display = 'none'; 
  dom.npPhotoUpload.value = '';
  dom.modalNewProject.classList.add('open'); 
  setTimeout(() => dom.npName.focus(), 320); 
});

dom.btnNpCancel.addEventListener('click', () => dom.modalNewProject.classList.remove('open'));

dom.btnNpSave.addEventListener('click', () => {
  const isEditing = Boolean(dom.npId.value);
  const targetId = isEditing ? dom.npId.value : `proj_${Date.now()}`;
  
  const data = { 
    id: targetId, 
    nombre: dom.npName.value.trim(), 
    nivel: dom.npLevel.value, 
    estado: dom.npStatus.value, 
    tags: dom.npTags.value, 
    hook: dom.npHook.value, 
    video_url: dom.npVideo.value.trim(), 
    patron_texto: dom.npPattern.value, 
    foto: currentProjPhotoBase64 
  };
  
  if (!data.nombre) return showToast('⚠️ Ingresa el nombre del proyecto');
  dom.modalNewProject.classList.remove('open');

  const existingIndex = localProjects.findIndex(p => p.id === targetId);
  if (existingIndex >= 0) {
    localProjects[existingIndex] = data;
    showToast('✏️ Proyecto actualizado');
  } else {
    localProjects.unshift(data);
    showToast('✅ Proyecto guardado');
  }

  localStorage.setItem('loopie_projects_cache', JSON.stringify(localProjects));
  renderProjectsGrid();
});

dom.btnFormatPattern.addEventListener('click', () => { 
  if (!dom.npPattern.value.trim()) return showToast('⚠️ Patrón vacío'); 
  dom.npPattern.value = dom.npPattern.value.replace(/\r\n/g, '\n').replace(/^\s+|\s+$/gm, l=>l.trim()).replace(/\n{3,}/g, '\n\n').replace(/^(vuelta|round|r)\s*(\d+)/gim, (_,w,n) => `R${n}`); 
  showToast('✨ Patrón formateado'); 
});

// ================= GESTIÓN DE HILOS (PERSISTENCIA LOCAL) =================
function loadThreads() {
  try {
    const cached = localStorage.getItem('loopie_threads_cache');
    localThreads = cached ? JSON.parse(cached) : [];
  } catch (e) {
    localThreads = [];
  }
  renderMaterialsList();
}

function saveThreads() {
  localStorage.setItem('loopie_threads_cache', JSON.stringify(localThreads));
}

function renderMaterialsList() {
  dom.materialsList.innerHTML = '';
  if (localThreads.length === 0) {
    dom.materialsList.innerHTML = `<div class="empty-state"><span class="empty-icon">🧶</span><p>No tienes hilos registrados todavía.</p></div>`;
    return;
  }

  localThreads.forEach((th, idx) => {
    const item = document.createElement('div');
    item.className = 'material-item';
    item.innerHTML = `
      <div class="material-swatch" style="background:${th.color}"></div>
      <div class="material-info">
        <span class="material-name">${th.name}</span>
        <span class="material-meta">${th.type} · ${th.grams}g</span>
      </div>
      <div class="material-qty-control">
        <button class="mat-btn btn-minus-g" data-idx="${idx}">-</button>
        <span class="material-qty">${th.grams}g</span>
        <button class="mat-btn btn-plus-g" data-idx="${idx}">+</button>
      </div>
      <button class="delete-proj-btn" style="position:static; margin-left:6px; background:rgba(220,50,50,0.15); color:var(--rose-500);" title="Eliminar hilo" data-del="${idx}">🗑️</button>
    `;

    // Reducir gramos
    item.querySelector('.btn-minus-g').addEventListener('click', (e) => {
      e.stopPropagation();
      const i = parseInt(e.target.dataset.idx, 10);
      localThreads[i].grams = Math.max(0, localThreads[i].grams - 10);
      saveThreads();
      renderMaterialsList();
    });

    // Aumentar gramos
    item.querySelector('.btn-plus-g').addEventListener('click', (e) => {
      e.stopPropagation();
      const i = parseInt(e.target.dataset.idx, 10);
      localThreads[i].grams += 10;
      saveThreads();
      renderMaterialsList();
    });

    // Eliminar hilo
    item.querySelector('[data-del]').addEventListener('click', (e) => {
      e.stopPropagation();
      const i = parseInt(e.currentTarget.dataset.del, 10);
      if (confirm(`¿Eliminar hilo "${localThreads[i].name}"?`)) {
        localThreads.splice(i, 1);
        saveThreads();
        renderMaterialsList();
        showToast('🗑️ Hilo eliminado');
      }
    });

    dom.materialsList.appendChild(item);
  });
}

dom.btnAddThread.addEventListener('click', () => { dom.modalNewThread.classList.add('open'); setTimeout(() => dom.thName.focus(), 320); });
dom.btnThCancel.addEventListener('click', () => dom.modalNewThread.classList.remove('open'));

dom.btnThSave.addEventListener('click', () => {
  const name = dom.thName.value.trim(); 
  const type = dom.thType.value.trim() || 'Algodón'; 
  const grams = parseInt(dom.thGrams.value.trim(), 10) || 100; 
  const color = dom.thColor.value || '#f4a8b8';
  
  if (!name) return showToast('⚠️ Ingresa el nombre del hilo');

  const nuevoHilo = {
    id: `th_${Date.now()}`,
    name,
    type,
    grams,
    color
  };

  localThreads.unshift(nuevoHilo);
  saveThreads();
  renderMaterialsList();

  dom.modalNewThread.classList.remove('open'); 
  dom.thName.value = ''; 
  dom.thType.value = ''; 
  dom.thGrams.value = ''; 
  showToast('🧶 Hilo guardado');
});

function rippleEffect(e, btn) { const r = btn.getBoundingClientRect(), x = (e.touches?.[0].clientX||e.clientX)-r.left, y = (e.touches?.[0].clientY||e.clientY)-r.top; const w = document.createElement('span'); w.className = 'ripple-wave'; w.style.left=`${x}px`; w.style.top=`${y}px`; btn.appendChild(w); setTimeout(() => w.remove(), 600); }
function pulseElement(el) { el.style.transition='transform 0.1s'; el.style.transform='scale(1.1)'; setTimeout(() => el.style.transform='scale(1)', 120); }
let toastTimeout; function showToast(msg) { clearTimeout(toastTimeout); dom.toast.textContent = msg; dom.toast.classList.add('show'); toastTimeout = setTimeout(() => dom.toast.classList.remove('show'), 2500); }

function initApp() {
  document.querySelectorAll('.round-instructions').forEach(el => el.innerHTML = parseMarkdown(el.innerHTML));
  fetchProjectsFromDB(); 
  loadThreads(); // Cargar hilos almacenados

  const saved = JSON.parse(localStorage.getItem('loopie_progress'));
  if(saved) { state.currentRound = saved.round || 1; state.stitchCount = saved.stitches || 0; state.timerSeconds = saved.timer || 0; state.quickNotes = saved.notes || {}; dom.stitchCount.textContent = state.stitchCount; dom.timerDisplay.textContent = formatTimer(state.timerSeconds); }
  updateCounterUI(); if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) dom.btnTheme.click(); applyPalette(0); requestWakeLock();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('SW registrado'))
      .catch(err => console.warn('SW aviso:', err));
  }
}
initApp();
