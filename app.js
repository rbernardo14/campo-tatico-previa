/* ============ UTILIDADES ============ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const trackEvent = (nome, dados = {}) => console.log('[track]', nome, dados);

const ICONS = {
  check: 'M20 6 9 17l-5-5',
  menu: 'M4 6h16M4 12h16M4 18h16',
  x: 'M18 6 6 18M6 6l12 12',
  plus: 'M12 5v14M5 12h14',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  ball: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 7l4 3-1.5 5h-5L8 10z',
  film: 'M4 4h16v16H4zM8 4v16M16 4v16M4 9h4M16 9h4M4 15h4M16 15h4',
  cone: 'M12 3 4 21h16zM7.5 14h9',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  toggle: 'M7 7h10a5 5 0 0 1 0 10H7A5 5 0 0 1 7 7zM7 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
  image: 'M3 3h18v18H3zM9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4M21 15l-5-5L5 21',
  drive: 'M22 12H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11zM6 16h.01M10 16h.01',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  mail: 'M3 5h18v14H3zM3 7l9 6 9-6',
  card: 'M2 5h20v14H2zM2 10h20M6 15h4',
  eyeoff: 'M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.2A10 10 0 0 1 12 4c7 0 10 8 10 8a17 17 0 0 1-3.2 4.4M6.6 6.6A17 17 0 0 0 2 12s3 8 10 8a10 10 0 0 0 5.4-1.6',
  repeat: 'M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5',
  share: 'M4 12v8h16v-8M16 6l-4-4-4 4M12 2v13'
};
function paintIcons(root = document) {
  $$('i[data-i]', root).forEach(el => {
    if (el.firstChild) return;
    el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[el.dataset.i] || ''}"/></svg>`;
  });
}

/* ============ PREÇOS / FLAGS ============ */
$$('[data-price-now]').forEach(e => e.textContent = PRICE_NOW);
$$('[data-price-old]').forEach(e => e.textContent = PRICE_OLD);
if (!WINDOWS_TESTED) document.body.classList.add('win-off');

/* ============ FAQ ============ */
const FAQ = [
  ['Funciona em Mac e Windows?', WINDOWS_TESTED
    ? 'Sim, há instalador para Mac e para Windows.'
    : 'Há instalador para Mac. A versão para Windows está em validação — fale com a gente antes de comprar se você usa Windows.'],
  ['Preciso de internet?', 'Para baixar o aplicativo e ativar a chave na primeira vez, sim. Depois de ativado, o Campo Tático continua funcionando sem internet.'],
  ['Onde ficam as minhas táticas?', 'No seu computador. Você também pode salvar e abrir táticas em arquivo.'],
  ['Como recebo o produto?', 'Logo após o pagamento você recebe um e-mail com o link para baixar o aplicativo e a sua chave de ativação.'],
  ['Para que serve a chave de ativação?', 'Você digita a chave na primeira vez que abrir o aplicativo. Ela é pessoal e fica vinculada ao seu computador. Guarde o e-mail com cuidado.'],
  ['Posso trocar de computador?', 'Pode. No computador antigo, abra Arquivo > Desativar este computador e depois digite a chave no novo. Se perder o acesso ao antigo, fale com a gente.'],
  ['Como posso pagar?', 'Por Pix ou cartão de crédito (em até 3x). Não há boleto, porque a chave é enviada assim que o pagamento é aprovado.'],
  ['Tem mensalidade?', 'Não. O pagamento é único.'],
  ['Posso usar a logo do meu clube?', 'Pode. Envie a imagem e o fundo é removido automaticamente.'],
  ['Consigo gerar vídeo da jogada?', 'Sim. Você cria os frames e exporta a animação em MP4, além de imagem PNG.'],
  ['E as atualizações?', 'O Campo Tático abre a versão mais recente quando há internet.'],
  ['Preciso saber de informática?', 'Não. É só arrastar jogadores, bola e objetos.'],
  ['Quero tirar uma dúvida antes de comprar.', (SUPPORT_EMAIL ? `Fale com a gente: ${SUPPORT_EMAIL}.` : 'Fale com a gente pelo e-mail de suporte que aparece na página de compra.')]
];
const faqEl = $('#faq');
FAQ.forEach(([q, a], i) => {
  const d = document.createElement('div');
  d.className = 'qa';
  d.innerHTML = `<button type="button" aria-expanded="false" aria-controls="ans${i}" id="q${i}">${q}<i data-i="plus"></i></button><div class="ans" id="ans${i}" role="region" aria-labelledby="q${i}"><div><p></p></div></div>`;
  $('p', d).textContent = a;
  faqEl.appendChild(d);
});
faqEl.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const item = b.parentElement, open = !item.classList.contains('open');
  $$('.qa', faqEl).forEach(x => { x.classList.remove('open'); $('button', x).setAttribute('aria-expanded', 'false'); });
  if (open) { item.classList.add('open'); b.setAttribute('aria-expanded', 'true'); trackEvent('faq_open', { pergunta: b.textContent.trim() }); }
});

/* ============ DEPOIMENTOS (ocultos) ============ */
if (SHOW_TESTIMONIALS && TESTIMONIALS.length) {
  const box = $('#testimonials');
  TESTIMONIALS.forEach(t => {
    const a = document.createElement('article'); a.className = 'card';
    const p = document.createElement('p'); p.textContent = t.texto;
    const s = document.createElement('strong'); s.textContent = t.nome;
    a.append(p, s); box.appendChild(a);
  });
  $('#depoimentos').hidden = false;
}

paintIcons();

/* ============ CONTAGEM REGRESSIVA (só com data real) ============ */
if (PROMO_END_DATE) {
  const end = new Date(PROMO_END_DATE).getTime();
  if (!isNaN(end)) {
    const box = $('#countdown'), out = $('#cd');
    const tick = () => {
      const ms = end - Date.now();
      if (ms <= 0) { box.hidden = true; return; }
      const d = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5), m = Math.floor(ms % 36e5 / 6e4), s = Math.floor(ms % 6e4 / 1e3);
      out.textContent = `${d}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}min ${String(s).padStart(2, '0')}s`;
      box.hidden = false;
    };
    tick(); setInterval(tick, 1000);
  }
}

/* ============ CTAs / MODAL ============ */
const leadModal = $('#leadModal'), pageModal = $('#pageModal');
const checkoutReady = () => CHECKOUT_URL && CHECKOUT_URL !== '#preco';
document.addEventListener('click', e => {
  const a = e.target.closest('[data-cta]'); if (!a) return;
  trackEvent('cta_click', { local: a.dataset.cta });
  if (a.hasAttribute('data-buy')) {
    e.preventDefault();
    if (checkoutReady()) { location.href = CHECKOUT_URL; return; }
    $('#leadOk').hidden = true; $('#leadErr').hidden = true;
    leadModal.showModal(); $('#leadEmail').focus();
  }
});
$('#leadForm').addEventListener('submit', e => {
  const submitter = e.submitter;
  if (submitter && submitter.id !== 'leadBtn') return; // fechar
  e.preventDefault();
  const v = $('#leadEmail').value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { $('#leadErr').hidden = false; $('#leadOk').hidden = true; return; }
  $('#leadErr').hidden = true; $('#leadOk').hidden = false;
  trackEvent('lead'); // FUTURE: enviar o e-mail para a lista de espera
  setTimeout(() => leadModal.close(), 1600);
});
[leadModal, pageModal].forEach(m => m.addEventListener('click', e => { if (e.target === m) m.close(); }));

const PAGES = {
  termos: ['Termos de uso', ['Texto provisório. Estes termos serão publicados antes da abertura das vendas.', 'O Campo Tático é um aplicativo para computador, vendido em pagamento único, com acesso entregue por e-mail.']],
  privacidade: ['Política de privacidade', ['Texto provisório. A política completa será publicada antes da abertura das vendas.', 'O aplicativo salva seus dados no seu próprio computador e não os envia para a internet.']],
  contato: ['Contato', [SUPPORT_EMAIL ? `Dúvidas? Fale com a gente: ${SUPPORT_EMAIL}.` : 'Dúvidas? Fale com a gente pelo e-mail de suporte que aparece na página de compra.']]
};
$$('[data-page]').forEach(b => b.addEventListener('click', () => {
  const [t, ps] = PAGES[b.dataset.page];
  $('#pageTitle').textContent = t;
  $('#pageBody').replaceChildren(...ps.map(x => Object.assign(document.createElement('p'), { textContent: x })));
  pageModal.showModal();
}));

/* ============ MENU / ÂNCORAS ============ */
const burger = $('#burger'), nav = $('#nav');
burger.addEventListener('click', () => {
  const o = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', o);
});
nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); } });

/* ============ PROGRESSO + SCROLL_75 ============ */
let sent75 = false;
const prog = $('#progress');
addEventListener('scroll', () => {
  const h = document.documentElement, p = h.scrollTop / Math.max(1, h.scrollHeight - innerHeight);
  prog.style.transform = `scaleX(${p})`;
  if (!sent75 && p >= .75) { sent75 = true; trackEvent('scroll_75'); }
}, { passive: true });

/* ============ REVEAL + CONTAGEM ============ */
function countUp(el) {
  const to = +el.dataset.count; if (reduce) { el.textContent = to; return; }
  const t0 = performance.now(), dur = 1100;
  const step = t => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
const rio = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add('in'); rio.unobserve(en.target);
  $$('[data-count]', en.target).forEach(countUp);
}), { threshold: .15 });
$$('.reveal').forEach(el => rio.observe(el));

/* ============ VÍDEOS: toca só na tela ============ */
/* toca o vídeo; se o navegador bloquear, mostra um botão de play sobre ele */
function safePlay(v) {
  v.muted = true; v.defaultMuted = true; v.setAttribute('playsinline', '');
  const p = v.play();
  if (p && p.then) p.then(() => hidePlayBtn(v)).catch(() => showPlayBtn(v));
}
function showPlayBtn(v) {
  const box = v.parentElement; if ($('.playbtn', box)) return;
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'playbtn'; b.setAttribute('aria-label', 'Reproduzir vídeo');
  b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z"/></svg>';
  b.addEventListener('click', e => { e.stopPropagation(); v.play().then(() => hidePlayBtn(v)).catch(() => {}); });
  box.appendChild(b);
}
function hidePlayBtn(v) { const b = $('.playbtn', v.parentElement); if (b) b.remove(); }

$$('.lazyvideo').forEach(v => {
  let visible = false;
  const tryPlay = () => { if (visible && !reduce && v.paused) safePlay(v); };
  v.addEventListener('loadeddata', tryPlay);
  v.addEventListener('canplay', tryPlay);
  new IntersectionObserver(es => es.forEach(en => {
    visible = en.isIntersecting;
    if (visible) { if (reduce) showPlayBtn(v); else tryPlay(); } else v.pause();
  }), { threshold: .2 }).observe(v);
});

/* tilt do hero (desktop) */
const tilt = $('#tilt'), hv = $('#heroVisual');
if (!reduce && matchMedia('(hover:hover) and (min-width:980px)').matches) {
  hv.addEventListener('mousemove', e => {
    const r = hv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    tilt.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
  });
  hv.addEventListener('mouseleave', () => tilt.style.transform = '');
}

/* ============ DEMONSTRAÇÃO ============ */
(function demo() {
  const tabs = $$('.tab'), slides = $$('#stage .slide'), stage = $('#stage');
  const names = ['animacao', 'sem-bola', 'circuito', 'logo'];
  let cur = 0, timer = null, started = false;
  function setBar(i, k) { $('.bar b', tabs[i]).style.width = (k * 100) + '%'; }
  function go(i, user) {
    cur = i; clearTimeout(timer);
    tabs.forEach((t, j) => {
      const on = j === i; t.classList.toggle('active', on); t.setAttribute('aria-selected', on);
      if (!on) { setBar(j, 0); }
    });
    slides.forEach((s, j) => {
      s.classList.toggle('on', j === i);
      if (s.tagName === 'VIDEO') { if (j !== i) { s.pause(); } }
    });
    if (user) trackEvent('demo_tab', { aba: names[i] });
    const s = slides[i];
    if (s.tagName === 'VIDEO') {
      if (!s.src) s.src = s.dataset.src;
      s.currentTime = 0; s.loop = false;
      s.ontimeupdate = () => s.duration && setBar(i, s.currentTime / s.duration);
      s.onended = () => go((i + 1) % tabs.length);
      s.onerror = () => { timer = setTimeout(() => go((i + 1) % tabs.length), 4000); };
      s.muted = true; hidePlayBtn(s);
      if (!reduce) s.play().catch(() => { showPlayBtn(s); });
      else showPlayBtn(s);
    } else {
      const t0 = performance.now(), dur = 5000;
      const step = t => { if (cur !== i) return; const k = Math.min(1, (t - t0) / dur); setBar(i, k); if (k < 1) requestAnimationFrame(step); else go(0); };
      requestAnimationFrame(step);
    }
  }
  tabs.forEach((t, i) => t.addEventListener('click', () => { started = true; go(i, true); }));
  new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting && !started) { started = true; go(0); }
    else if (!en.isIntersecting && started) { const s = slides[cur]; if (s.tagName === 'VIDEO') s.pause(); }
    else if (en.isIntersecting && started) { const s = slides[cur]; if (s.tagName === 'VIDEO' && !reduce && !s.ended) s.play().catch(() => showPlayBtn(s)); }
  }), { threshold: .35 }).observe(stage);
})();

/* ============ SIMULADOR DE FORMAÇÃO ============ */
(function sim() {
  const FORMS = ['4-4-2', '4-3-3', '4-2-3-1', '3-5-2', '5-3-2', '4-1-4-1'];
  const W = 940, H = 580, OX = 30, OY = 30;
  let form = '4-3-3', withBall = true;
  const chips = $('#formChips'), g = $('#players'), tag = $('#pitchTag');
  const NS = 'http://www.w3.org/2000/svg';

  function positions(f, ball) {
    const lines = f.split('-').map(Number), n = lines.length;
    const x0 = ball ? .17 : .16, x1 = ball ? .47 : .37;
    const pts = [[.05, .5]];
    lines.forEach((k, i) => {
      const x = n === 1 ? x0 : x0 + i * (x1 - x0) / (n - 1);
      for (let j = 0; j < k; j++) pts.push([x, .5 + (j - (k - 1) / 2) * Math.min(.24, .8 / k)]);
    });
    return pts;
  }
  const nodes = [];
  for (let i = 0; i < 11; i++) {
    const grp = document.createElementNS(NS, 'g');
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('r', 17); c.setAttribute('class', 'pd' + (i === 0 ? ' gk' : ''));
    grp.appendChild(c); g.appendChild(grp); nodes.push(grp);
  }
  function render(initial) {
    positions(form, withBall).forEach(([x, y], i) => {
      nodes[i].style.transform = `translate(${OX + x * W}px, ${OY + y * H}px)`;
    });
    tag.textContent = `${form} · ${withBall ? 'com bola' : 'sem bola'}`;
  }
  FORMS.forEach(f => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'fchip'; b.textContent = f; b.setAttribute('aria-pressed', f === form);
    b.addEventListener('click', () => {
      form = f; $$('.fchip', chips).forEach(x => x.setAttribute('aria-pressed', x === b));
      render(); trackEvent('formation_change', { formacao: f, posse: withBall ? 'com' : 'sem' });
    });
    chips.appendChild(b);
  });
  $('#posse').addEventListener('change', e => {
    withBall = e.target.checked; $('#posseLabel').textContent = withBall ? 'Com bola' : 'Sem bola';
    render(); trackEvent('formation_change', { formacao: form, posse: withBall ? 'com' : 'sem' });
  });
  render(true);
})();

/* ============ BARRA DE COMPRA FIXA (celular) ============ */
(function buybar() {
  const bar = $('#buybar'); let heroOut = false, priceIn = false;
  const upd = () => { const show = heroOut && !priceIn; bar.classList.toggle('show', show); bar.setAttribute('aria-hidden', !show); $('a', bar).tabIndex = show ? 0 : -1; };
  new IntersectionObserver(([e]) => { heroOut = !e.isIntersecting; upd(); }).observe($('#hero'));
  new IntersectionObserver(([e]) => { priceIn = e.isIntersecting; upd(); }, { threshold: .15 }).observe($('#preco'));
})();
