/**
 * Control del protector de pantalla (Screensaver / Home.jpg) por inactividad.
 * Corregido para evitar desactivaciones accidentales por movimiento del ratón al refrescar.
 */

class ScreensaverManager {
  constructor(timeoutMs = 45000) {
    this.timeoutMs = timeoutMs;
    this.idleTimer = null;
    this.isActive = true; // Empieza activo en la pantalla de inicio
    this.onActivateCallback = null;
    this.onDeactivateCallback = null;

    this.initEvents();
  }

  initEvents() {
    // Escuchar eventos para REINICIAR el temporizador de inactividad mientras el usuario interactúa
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    activityEvents.forEach(evt => {
      window.addEventListener(evt, () => {
        // Solo reinicia el temporizador de inactividad si la app NO está en modo protector de pantalla
        if (!this.isActive) {
          this.startTimer();
        }
      }, { passive: true });
    });
  }

  setCallbacks(onActivate, onDeactivate) {
    this.onActivateCallback = onActivate;
    this.onDeactivateCallback = onDeactivate;
  }

  startTimer() {
    this.clearTimer();
    this.idleTimer = setTimeout(() => {
      this.activate();
    }, this.timeoutMs);
  }

  clearTimer() {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
  }

  activate() {
    if (this.isActive) return;
    this.isActive = true;
    this.clearTimer();
    if (this.onActivateCallback) {
      this.onActivateCallback();
    }
  }

  deactivate() {
    if (!this.isActive) return;
    this.isActive = false;
    this.startTimer();
    if (this.onDeactivateCallback) {
      this.onDeactivateCallback();
    }
  }
}

window.screensaverManager = new ScreensaverManager(45000);
