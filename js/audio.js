/**
 * Módulo de síntesis de audio con Web Audio API para GARDA TOUR Interactivo.
 * Genera sonidos limpios en tiempo real sin requerir archivos mp3 externos.
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.currentAudio = null;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopObjectionVoice();
    }
    return this.isMuted;
  }

  playObjectionVoice(caso, objecion, onStart, onEnd) {
    if (this.isMuted) return;
    this.stopObjectionVoice();

    const audioPath = `assets/audio/cases/${objecion.id}.mp3`;
    this.currentAudio = new Audio(audioPath);

    this.currentAudio.onplay = () => {
      if (onStart) onStart();
    };

    this.currentAudio.onended = () => {
      this.currentAudio = null;
      if (onEnd) onEnd();
    };

    this.currentAudio.onerror = () => {
      this.playObjectionSpeechSynthesis(caso, objecion, onStart, onEnd);
    };

    this.currentAudio.play().catch(() => {
      this.playObjectionSpeechSynthesis(caso, objecion, onStart, onEnd);
    });
  }

  stopObjectionVoice() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  playObjectionSpeechSynthesis(caso, objecion, onStart, onEnd) {
    if (!('speechSynthesis' in window)) return;
    
    if (onStart) onStart();

    const introText = `${caso.numero}: ${caso.paciente.nombre}, ${caso.paciente.edad}.`;
    const quoteText = objecion.cita;

    const utterIntro = new SpeechSynthesisUtterance(introText);
    utterIntro.lang = 'es-MX';
    utterIntro.rate = 1.0;

    const utterQuote = new SpeechSynthesisUtterance(quoteText);
    utterQuote.lang = 'es-MX';

    if (caso.paciente.genero === 'mujer') {
      utterQuote.pitch = 1.25;
      utterQuote.rate = 1.0;
    } else {
      utterQuote.pitch = 0.85;
      utterQuote.rate = 0.95;
    }

    utterIntro.onend = () => {
      window.speechSynthesis.speak(utterQuote);
    };

    utterQuote.onend = () => {
      if (onEnd) onEnd();
    };

    utterQuote.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterIntro);
  }

  playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.04);
  }

  playSuccess() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);

      gain.gain.setValueAtTime(0.15, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + i * 0.07);
      osc.stop(now + i * 0.07 + 0.25);
    });
  }

  playSuboptimal() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const notes = [440, 392]; // A4, G4 neutral tone

    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);

      gain.gain.setValueAtTime(0.15, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.3);
    });
  }

  playFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const arpeggio = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    arpeggio.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.09);

      gain.gain.setValueAtTime(0.2, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.4);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.4);
    });
  }
}

window.soundEngine = new SoundEngine();
