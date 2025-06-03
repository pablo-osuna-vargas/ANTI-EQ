// corrupcion.js

let corruption = 0;
let feed = document.querySelector('.feed');

// Scroll: aumenta corrupción + scroll infinito
if (feed) {
  feed.addEventListener('scroll', () => {
    corruption += 0.3;
    aplicarCorrupcion(corruption);

    // Scroll infinito: duplicar posts al llegar al fondo
    if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 50) {
      duplicarPosts();
    }
  });
}

// Tiempo: aumenta corrupción
setInterval(() => {
  corruption += 1;
  aplicarCorrupcion(corruption);
}, 10000);

// Crear fondo binario oculto
const binario = document.createElement('div');
binario.id = 'binario-fondo';
binario.style.position = 'fixed';
binario.style.top = '0';
binario.style.left = '0';
binario.style.width = '100%';
binario.style.height = '100%';
binario.style.pointerEvents = 'none';
binario.style.zIndex = '0';
binario.style.fontFamily = 'monospace';
binario.style.fontSize = '12px';
binario.style.color = '#0f0';
binario.style.background = 'black';
binario.style.opacity = '0';
binario.style.whiteSpace = 'pre';
binario.style.padding = '20px';
binario.style.lineHeight = '1.2';
document.body.appendChild(binario);

function generarBinario() {
  let texto = '';
  for (let i = 0; i < 1000; i++) {
    texto += Math.random() > 0.5 ? '1' : '0';
    if (i % 80 === 0) texto += '\n';
  }
  return texto;
}

function duplicarPosts() {
  const posts = document.querySelectorAll('.post');
  posts.forEach(post => {
    const clone = post.cloneNode(true);
    feed.appendChild(clone);
  });
}

function aplicarCorrupcion(level) {
  const body = document.body;
  const glitchElems = document.querySelectorAll('.glitch-effect');

  // Glitch visual creciente
  glitchElems.forEach(el => {
    el.classList.remove('glitch-level-1', 'glitch-level-2', 'glitch-level-3');
    if (level > 5 && level <= 10) el.classList.add('glitch-level-1');
    if (level > 10 && level <= 20) el.classList.add('glitch-level-2');
    if (level > 20) el.classList.add('glitch-level-3');
  });

  // Glitch textual
  if (level > 10) {
    document.querySelectorAll('.post-caption').forEach(el => {
      if (!el.dataset.original) el.dataset.original = el.textContent;
      el.textContent = el.dataset.original.replace(/[aeiou]/gi, '█');
    });
  }

  // Botones que caen
  if (level > 15) {
    document.querySelectorAll('.action-btn').forEach(btn => {
      if (!btn.classList.contains('falling')) {
        btn.classList.add('falling');
        btn.style.transition = 'transform 1s ease-in, opacity 1s';
        btn.style.transform = 'translateY(200px) rotate(720deg)';
        btn.style.opacity = '0';
        setTimeout(() => btn.remove(), 1200);
      }
    });
  }

  // Activar fondo binario
  if (level > 18) {
    binario.style.opacity = '0.15';
    binario.textContent = generarBinario();
  }

  // Inversión y mensaje final
  if (level > 25) {
    body.style.transform = 'scaleX(-1)';
    const mensaje = document.createElement('div');
    mensaje.textContent = '⚠ Error: El contenido ha sido desviado...';
    mensaje.style.position = 'fixed';
    mensaje.style.top = '50%';
    mensaje.style.left = '50%';
    mensaje.style.transform = 'translate(-50%, -50%)';
    mensaje.style.background = 'rgba(0,0,0,0.8)';
    mensaje.style.padding = '20px';
    mensaje.style.border = '2px solid #ff00ff';
    mensaje.style.color = '#fff';
    mensaje.style.zIndex = 9999;
    document.body.appendChild(mensaje);

    setTimeout(() => {
      window.location.href = 'ecualizador.html';
    }, 5000);
  }
}
