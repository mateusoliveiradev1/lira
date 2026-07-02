// =============================================
// UI Sound Effects — Micro-interações sonoras
// Sons sintetizados em Base64 (zero network requests)
// =============================================

let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Som sutil de hover — "tick" tech ultra curto
 */
export function playHover() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(4200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(2800, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.06);
  } catch (e) {
    // Silently fail — audio is non-critical
  }
}

/**
 * Som sutil de click — "pop" tech satisfatório
 */
export function playClick() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Silently fail
  }
}

/**
 * Som contínuo da chuva do Matrix
 */
let matrixNodes = null;

export function playMatrixSound() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filtro para soar como chiado digital / dados
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 1.5;

    // Modulação para dar o efeito de pulso
    const lfo = ctx.createOscillator();
    lfo.type = 'sawtooth';
    lfo.frequency.value = 4; // pulsa rápido
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 1500;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start(ctx.currentTime);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1); // Fade-in suave

    whiteNoise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);
    whiteNoise.start(ctx.currentTime);

    matrixNodes = { whiteNoise, filter, lfo, lfoGain, masterGain, ctx };
  } catch(e) {
    //
  }
}

export function stopMatrixSound() {
  if (!matrixNodes) return;
  try {
    const { whiteNoise, lfo, masterGain, ctx } = matrixNodes;
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1); // Fade-out suave
    setTimeout(() => {
      whiteNoise.stop();
      lfo.stop();
      matrixNodes = null;
    }, 1000);
  } catch(e) {
    //
  }
}
