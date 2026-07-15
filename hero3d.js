/* MF Agency Lab — Hero 3D (laptop + smartphone fluttuanti)
   Modulo ES: richiede l'importmap { "three": ... } nella pagina.
   Si aggancia al <canvas id="hero3d"> renderizzato da React (polling). */
import * as THREE from 'three';

const GREEN = '#2E3A23', CREAM = '#FBEFD3', CREAMLT = '#FFF7E4';

function makeTexture(w, h, draw) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const x = cv.getContext('2d'); draw(x, w, h);
  const t = new THREE.CanvasTexture(cv); t.anisotropy = 8; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function rr(x, a, b, w, h, r) { x.beginPath(); x.roundRect(a, b, w, h, r); }

function laptopTexture() {
  return makeTexture(1024, 640, (x, w, h) => {
    x.fillStyle = CREAMLT; x.fillRect(0, 0, w, h);
    x.fillStyle = GREEN; x.font = '800 26px Poppins,Arial'; x.fillText('MF', 46, 56);
    x.fillStyle = 'rgba(46,58,35,.55)'; x.font = '500 16px Poppins,Arial';
    ['Servizi', 'Casi Studio', 'Siti Web', 'Contatti'].forEach((s, i) => x.fillText(s, 420 + i * 120, 52));
    x.fillStyle = GREEN; rr(x, 880, 28, 110, 38, 19); x.fill();
    x.fillStyle = CREAM; x.font = '600 15px Poppins,Arial'; x.fillText('Contatti', 906, 53);
    x.fillStyle = GREEN; x.font = '700 64px Poppins,Arial';
    x.fillText('Diamo voce', 46, 210); x.fillText('ai brand.', 46, 278);
    x.fillStyle = 'rgba(46,58,35,.5)'; x.font = '300 21px Poppins,Arial';
    x.fillText('Siti web, contenuti e advertising', 48, 330);
    x.fillStyle = GREEN; rr(x, 46, 370, 190, 52, 26); x.fill();
    x.fillStyle = CREAM; x.font = '600 19px Poppins,Arial'; x.fillText('Scopri →', 88, 403);
    x.fillStyle = 'rgba(63,81,48,.22)'; rr(x, 560, 140, 400, 300, 24); x.fill();
    x.fillStyle = 'rgba(63,81,48,.55)';
    x.beginPath(); x.moveTo(620, 400); x.lineTo(740, 260); x.lineTo(820, 340); x.lineTo(880, 290); x.lineTo(940, 400); x.closePath(); x.fill();
    x.fillStyle = 'rgba(251,239,211,.95)'; x.beginPath(); x.arc(650, 200, 22, 0, 7); x.fill();
    for (let i = 0; i < 3; i++) {
      x.fillStyle = 'rgba(46,58,35,.12)'; rr(x, 46 + i * 320, 480, 290, 120, 18); x.fill();
      x.fillStyle = 'rgba(46,58,35,.45)'; rr(x, 66 + i * 320, 505, 180, 14, 7); x.fill();
      x.fillStyle = 'rgba(46,58,35,.25)'; rr(x, 66 + i * 320, 530, 220, 11, 6); x.fill();
    }
  });
}

function phoneTexture() {
  return makeTexture(360, 740, (x, w, h) => {
    x.fillStyle = CREAMLT; x.fillRect(0, 0, w, h);
    x.fillStyle = GREEN; x.font = '800 22px Poppins,Arial'; x.fillText('MF', 26, 52);
    x.fillStyle = 'rgba(46,58,35,.6)'; x.font = '500 22px Poppins,Arial'; x.fillText('☰', 314, 50);
    x.fillStyle = GREEN; x.font = '700 40px Poppins,Arial';
    x.fillText('Diamo voce', 26, 140); x.fillText('ai brand.', 26, 184);
    x.fillStyle = 'rgba(46,58,35,.5)'; x.font = '300 16px Poppins,Arial';
    x.fillText('La tua agenzia creativa', 27, 220);
    x.fillStyle = GREEN; rr(x, 26, 250, 150, 44, 22); x.fill();
    x.fillStyle = CREAM; x.font = '600 16px Poppins,Arial'; x.fillText('Scopri →', 58, 278);
    x.fillStyle = 'rgba(63,81,48,.22)'; rr(x, 26, 330, 308, 190, 20); x.fill();
    x.fillStyle = 'rgba(63,81,48,.55)'; x.beginPath(); x.moveTo(60, 490); x.lineTo(150, 380); x.lineTo(210, 440); x.lineTo(250, 405); x.lineTo(300, 490); x.closePath(); x.fill();
    for (let i = 0; i < 2; i++) {
      x.fillStyle = 'rgba(46,58,35,.12)'; rr(x, 26, 545 + i * 84, 308, 70, 16); x.fill();
      x.fillStyle = 'rgba(46,58,35,.45)'; rr(x, 44, 565 + i * 84, 150, 12, 6); x.fill();
      x.fillStyle = 'rgba(46,58,35,.25)'; rr(x, 44, 585 + i * 84, 220, 10, 5); x.fill();
    }
  });
}

function softShadow(w) {
  const t = makeTexture(256, 256, (x) => {
    const g = x.createRadialGradient(128, 128, 10, 128, 128, 120);
    g.addColorStop(0, 'rgba(46,58,35,.30)'); g.addColorStop(1, 'rgba(46,58,35,0)');
    x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, w * .42),
    new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  return m;
}

// Alcuni browser/ambienti hanno WebGL disabilitato (accelerazione hardware
// spenta, driver bloccato, sandbox aziendale, sessioni remote/VM). In quel
// caso NON montiamo la scena 3D: il canvas resta nascosto e il video di
// fallback sotto rimane visibile, invece di lasciare l'hero vuoto.
function webglAvailable() {
  try {
    const test = document.createElement('canvas');
    return !!(test.getContext('webgl2') || test.getContext('webgl') || test.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}

function init(canvas) {
  if (!webglAvailable()) {
    canvas.style.display = 'none';
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    canvas.style.display = 'none';
    return;
  }

  // WebGL ha funzionato: la scena 3D ha sfondo trasparente (si vedono solo
  // laptop/telefono fluttuanti), quindi il video di fallback sotto va nascosto
  // esplicitamente — altrimenti resterebbe visibile dietro ai dispositivi.
  const fallbackVideo = canvas.parentElement && canvas.parentElement.querySelector('video');
  if (fallbackVideo) {
    fallbackVideo.style.display = 'none';
    fallbackVideo.pause();
  }

  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  // Se il contesto WebGL viene perso a runtime (crash driver, GPU throttling),
  // torna al video invece di lasciare il canvas bloccato su un frame vuoto
  // (e senza video visibile, dato che l'abbiamo appena nascosto sopra).
  canvas.addEventListener('webglcontextlost', () => {
    canvas.style.display = 'none';
    if (fallbackVideo) {
      fallbackVideo.style.display = '';
      const p = fallbackVideo.play(); if (p && p.catch) p.catch(() => {});
    }
  });

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, .1, 100);
  camera.position.set(0, 0.7, 10.5);

  scene.add(new THREE.AmbientLight(0xFFF7E4, 1.5));
  const key = new THREE.DirectionalLight(0xFFFFFF, 1.8); key.position.set(5, 7, 7); scene.add(key);
  const fill = new THREE.DirectionalLight(0xDCC9A0, .7); fill.position.set(-5, 2, -4); scene.add(fill);

  // LAPTOP
  const laptop = new THREE.Group();
  const alu = new THREE.MeshStandardMaterial({ color: 0x35402a, metalness: .55, roughness: .35 });
  const lid = new THREE.Group();
  const lidBody = new THREE.Mesh(new THREE.BoxGeometry(4.3, 2.75, 0.09), alu);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(4.06, 2.54), new THREE.MeshBasicMaterial({ map: laptopTexture() }));
  screen.position.z = 0.051;
  lid.add(lidBody, screen);
  lid.position.y = 1.375;
  const lidPivot = new THREE.Group(); lidPivot.add(lid); lidPivot.rotation.x = -0.12;
  const baseBody = new THREE.Mesh(new THREE.BoxGeometry(4.3, 0.10, 2.85), alu);
  baseBody.position.set(0, -0.05, 1.42);
  const kb = new THREE.Mesh(new THREE.PlaneGeometry(3.9, 2.4),
    new THREE.MeshStandardMaterial({ color: 0x2a3320, metalness: .3, roughness: .6 }));
  kb.rotation.x = -Math.PI / 2; kb.position.set(0, 0.006, 1.42);
  laptop.add(lidPivot, baseBody, kb);
  laptop.position.set(2.75, -0.55, 0);
  laptop.rotation.y = -0.5;

  // PHONE
  const phone = new THREE.Group();
  const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(1.06, 2.12, 0.07),
    new THREE.MeshStandardMaterial({ color: 0x2a3320, metalness: .6, roughness: .3 }));
  const phoneScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.94, 1.98),
    new THREE.MeshBasicMaterial({ map: phoneTexture() }));
  phoneScreen.position.z = 0.041;
  phone.add(phoneBody, phoneScreen);
  phone.position.set(5.05, 0.15, 0.85);
  phone.rotation.set(0.02, -0.55, -0.06);

  // OMBRE + GRIGLIA + PARTICELLE
  const shL = softShadow(5.4); shL.position.set(2.75, -1.15, 0.8);
  const shP = softShadow(1.7); shP.position.set(5.05, -1.15, 0.95);
  const grid = new THREE.GridHelper(40, 40, 0x3F5130, 0x3F5130);
  grid.material.transparent = true; grid.material.opacity = 0.10; grid.position.y = -1.16;
  scene.add(grid);
  const N = 200, pp = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pp[i * 3] = (Math.random() - .5) * 24; pp[i * 3 + 1] = Math.random() * 8 - 1; pp[i * 3 + 2] = (Math.random() - .5) * 8 - 2; }
  scene.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pp, 3)),
    new THREE.PointsMaterial({ color: 0x3F5130, size: .04, transparent: true, opacity: .35 })));

  const devices = new THREE.Group();
  devices.add(laptop, phone, shL, shP);
  scene.add(devices);

  let mx = 0, my = 0;
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
  function layout() {
    if (innerWidth < 760) { devices.position.set(-2.0, 2.3, -2.6); devices.scale.setScalar(.62); }
    else { devices.position.set(0, 0, 0); devices.scale.setScalar(1); }
  }
  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight); layout();
  });
  layout();

  // Pausa quando la pagina è nascosta o l'hero è fuori dallo schermo
  let visible = true, onScreen = true;
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; });
  new IntersectionObserver((es) => { es.forEach(e => { onScreen = e.isIntersecting; }); }, { threshold: 0.02 })
    .observe(canvas);

  const clock = new THREE.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    if (!visible || !onScreen) return;
    const t = clock.getElapsedTime();
    laptop.position.y = -0.55 + Math.sin(t * 0.9) * 0.22;
    laptop.position.x = 2.75 + Math.sin(t * 0.42) * 0.30;
    laptop.position.z = Math.sin(t * 0.6 + 1.2) * 0.35;
    laptop.rotation.y = -0.5 + Math.sin(t * 0.55) * 0.22 + mx * 0.35;
    laptop.rotation.x = Math.sin(t * 0.7) * 0.07 + my * 0.14;
    laptop.rotation.z = Math.sin(t * 0.5 + 0.7) * 0.05;
    lidPivot.rotation.x = -0.12 + Math.sin(t * 0.65) * 0.06;
    phone.position.x = 5.05 + Math.cos(t * 0.8) * 0.35;
    phone.position.y = 0.15 + Math.sin(t * 1.25 + 0.8) * 0.30;
    phone.position.z = 0.85 + Math.sin(t * 0.9 + 2.0) * 0.30;
    phone.rotation.y = -0.55 + Math.sin(t * 0.8 + 1.3) * 0.28 + mx * 0.4;
    phone.rotation.z = -0.06 + Math.sin(t * 1.1) * 0.12;
    phone.rotation.x = 0.02 + Math.sin(t * 0.95 + 0.4) * 0.08;
    shL.position.x = laptop.position.x; shL.position.z = laptop.position.z + 0.8;
    shP.position.x = phone.position.x; shP.position.z = phone.position.z + 0.1;
    const hL = (laptop.position.y + 0.77) / 0.44, hP = (phone.position.y + 0.15) / 0.6;
    shL.scale.setScalar(1 - hL * 0.18); shL.material.opacity = .95 - hL * 0.35;
    shP.scale.setScalar(1 - hP * 0.22); shP.material.opacity = .9 - hP * 0.4;
    camera.position.x += (mx * 0.9 - camera.position.x) * 0.05;
    camera.position.y += (0.7 - my * 0.6 - camera.position.y) * 0.05;
    camera.lookAt(2.6, 0.15, 0);
    renderer.render(scene, camera);
  })();
}

// il canvas è renderizzato da React: attendi che compaia
(function waitForCanvas(tries) {
  const cv = document.getElementById('hero3d');
  if (cv) {
    try { init(cv); } catch (e) { cv.style.display = 'none'; }
    return;
  }
  if (tries > 200) return;
  setTimeout(() => waitForCanvas((tries || 0) + 1), 50);
})(0);
