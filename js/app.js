/**
 * Controlador Principal del Interactivo GARDA TOUR - MSD
 * Iconos del header simplificados en SVG.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Estado Global Simple
  const state = {
    currentCaseIndex: 0,
    currentObjectionIndex: 0,
    currentCaseAnswers: []
  };

  // Elementos DOM
  const views = {
    screensaver: document.getElementById('view-screensaver'),
    caseMenu: document.getElementById('view-case-menu'),
    objection: document.getElementById('view-objection'),
    feedback: document.getElementById('view-feedback'),
    summary: document.getElementById('view-summary')
  };

  const navHeader = document.getElementById('main-nav');
  const muteBtn = document.getElementById('btn-mute');
  const homeNavBtn = document.getElementById('btn-nav-home');

  // Función para resetear completamente el estado de la sesión
  function resetState() {
    state.currentCaseIndex = 0;
    state.currentObjectionIndex = 0;
    state.currentCaseAnswers = [];
  }

  // Cambio de Vistas
  function showView(viewName) {
    Object.keys(views).forEach(key => {
      if (views[key]) {
        views[key].classList.toggle('active', key === viewName);
      }
    });

    if (viewName === 'screensaver') {
      if (navHeader) navHeader.style.display = 'none';
    } else {
      if (navHeader) navHeader.style.display = 'flex';
    }
  }

  // Configuración de Callbacks del Protector de Pantalla (Screensaver)
  window.screensaverManager.setCallbacks(
    // 1. Al ACTIVARSE por inactividad (45s)
    () => {
      resetState();
      showView('screensaver');
    },
    // 2. Al DESACTIVARSE (por toque o clic del usuario)
    () => {
      resetState();
      showView('caseMenu');
      renderCaseMenu();
    }
  );

  // Inicializar SIEMPRE en la Pantalla de Inicio (Screensaver) al refrescar o cargar
  resetState();
  showView('screensaver');

  // Clic en cualquier parte de la pantalla de inicio o en el botón para entrar a la app
  if (views.screensaver) {
    views.screensaver.addEventListener('click', () => {
      if (window.screensaverManager.isActive) {
        window.soundEngine.playClick();
        window.screensaverManager.deactivate();
      }
    });
  }

  // Navegación Header con Iconos SVG Simplificados
  if (muteBtn) {
    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isMuted = window.soundEngine.toggleMute();
      muteBtn.classList.toggle('muted', isMuted);
      const soundOn = document.getElementById('icon-sound-on');
      const soundOff = document.getElementById('icon-sound-off');
      if (soundOn && soundOff) {
        soundOn.style.display = isMuted ? 'none' : 'block';
        soundOff.style.display = isMuted ? 'block' : 'none';
      }
    });
  }

  if (homeNavBtn) {
    homeNavBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.soundEngine.playClick();
      resetState();
      showView('caseMenu');
      renderCaseMenu();
    });
  }

  // Helper para renderizar icono SVG de Avatar de Paciente (Hombre / Mujer)
  function getAvatarSvg(genero) {
    if (genero === 'mujer' || genero === 'femenino') {
      return `<svg class="patient-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 1.76 1.02 3.28 2.5 4.02C6.7 11.75 4 14.8 4 18.5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1c0-3.7-2.7-6.75-6-7.98 1.48-.74 2.5-2.26 2.5-4.02A4.5 4.5 0 0 0 12 2zm-3.5 10c-1.5 1.2-2.5 3-2.5 5h2c0-1.3.6-2.4 1.5-3.1L8.5 12zm7 0l-1.5 1.9c.9.7 1.5 1.8 1.5 3.1h2c0-2-1-3.8-2.5-5z"/>
      </svg>`;
    } else {
      return `<svg class="patient-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 11c-4.42 0-8 2.24-8 5v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.76-3.58-5-8-5z"/>
      </svg>`;
    }
  }

  // -------------------------------------------------------------
  // 1. VENTANA 1: MENÚ DE CASOS (Lista de Selección)
  // -------------------------------------------------------------
  function renderCaseMenu() {
    const listContainer = document.getElementById('cases-list');
    listContainer.innerHTML = '';

    CASOS_DATA.forEach((caso, index) => {
      const listItem = document.createElement('div');
      listItem.className = 'case-list-item glass-card';
      
      listItem.innerHTML = `
        <div class="case-item-left">
          <div class="patient-avatar-sm" style="background: ${caso.paciente.avatarBg};">
            ${getAvatarSvg(caso.paciente.genero)}
          </div>
          <div class="case-item-content">
            <span class="case-number">${caso.numero}</span>
            <h3 class="case-title-text">${caso.titulo}</h3>
            <p class="case-subtitle-text">${caso.subtitulo}</p>
          </div>
        </div>
        <div class="case-item-right">
          <button class="btn btn-primary btn-select-case">
            Comenzar Caso →
          </button>
        </div>
      `;

      listItem.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundEngine.playClick();
        startCase(index);
      });

      listContainer.appendChild(listItem);
    });
  }

  // Iniciar un Caso
  function startCase(index) {
    state.currentCaseIndex = index;
    state.currentObjectionIndex = 0;
    state.currentCaseAnswers = [];

    showView('objection');
    renderObjection();
  }

  // -------------------------------------------------------------
  // 2. VENTANA 2: SITUACIÓN Y OBJECIÓN
  // -------------------------------------------------------------
  function renderObjection() {
    const caso = CASOS_DATA[state.currentCaseIndex];
    const objecion = caso.objeciones[state.currentObjectionIndex];

    // Header del Caso
    document.getElementById('case-current-num').textContent = `${caso.numero} — ${caso.titulo}`;
    document.getElementById('objection-step-indicator').textContent = `Objeción ${state.currentObjectionIndex + 1} de ${caso.objeciones.length}`;
    
    // Barra de Progreso
    const pct = ((state.currentObjectionIndex + 1) / caso.objeciones.length) * 100;
    document.getElementById('objection-progress-bar').style.width = `${pct}%`;

    // Perfil del Paciente y Cita
    document.getElementById('patient-name').textContent = caso.paciente.nombre;
    document.getElementById('patient-details').textContent = `${caso.paciente.edad} • ${caso.paciente.perfil}`;
    const avatarElem = document.getElementById('patient-avatar-lg');
    avatarElem.innerHTML = getAvatarSvg(caso.paciente.genero);
    avatarElem.style.background = caso.paciente.avatarBg;

    document.getElementById('objection-quote').textContent = objecion.cita;
    document.getElementById('objection-context').textContent = objecion.contexto;

    // Render Opciones A, B, C
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    objecion.opciones.forEach(opt => {
      const card = document.createElement('div');
      card.className = 'option-card glass-card';
      card.setAttribute('tabindex', '0');
      
      card.innerHTML = `
        <div class="option-badge">${opt.letra}</div>
        <div class="option-text-wrap">
          <p class="option-text">${opt.texto}</p>
        </div>
      `;

      card.addEventListener('click', (e) => {
        e.stopPropagation();
        handleOptionSelect(opt, objecion);
      });

      optionsContainer.appendChild(card);
    });
  }

  // Selección de Respuesta
  function handleOptionSelect(opt, objecion) {
    window.soundEngine.playClick();

    state.currentCaseAnswers[state.currentObjectionIndex] = {
      objectionId: objecion.id,
      cita: objecion.cita,
      optionChosen: opt.letra,
      textoRespuesta: opt.texto,
      esOptima: opt.esOptima,
      explicacion: opt.explicacion,
      fuente: opt.fuente || null,
      mejoresOpciones: opt.mejoresOpciones || null
    };

    if (opt.esOptima) {
      window.soundEngine.playSuccess();
    } else {
      window.soundEngine.playSuboptimal();
    }

    showView('feedback');
    renderFeedback(opt, objecion);
  }

  // -------------------------------------------------------------
  // 3. VENTANA 3: FEEDBACK INMEDIATO
  // -------------------------------------------------------------
  function renderFeedback(opt, objecion) {
    const caso = CASOS_DATA[state.currentCaseIndex];
    const isLastObjection = state.currentObjectionIndex === caso.objeciones.length - 1;

    const banner = document.getElementById('feedback-banner');
    const badge = document.getElementById('feedback-type-badge');
    const title = document.getElementById('feedback-title');
    const selectedOptionText = document.getElementById('feedback-selected-option');
    const explanationText = document.getElementById('feedback-explanation');
    const recommendationBox = document.getElementById('feedback-recommendation-box');
    const recommendationText = document.getElementById('feedback-recommendation');
    const sourceTag = document.getElementById('feedback-source');
    const nextBtn = document.getElementById('btn-next-objection');

    selectedOptionText.textContent = `[Opción ${opt.letra}] ${opt.texto}`;
    explanationText.textContent = opt.explicacion;

    if (opt.fuente) {
      sourceTag.style.display = 'inline-block';
      sourceTag.textContent = `Evidencia: ${opt.fuente}`;
    } else {
      sourceTag.style.display = 'none';
    }

    if (opt.esOptima) {
      banner.className = 'feedback-banner banner-success';
      badge.textContent = '✓ Respuesta Adecuada';
      title.textContent = '¡Excelente abordaje clínico!';
      recommendationBox.style.display = 'none';
    } else {
      banner.className = 'feedback-banner banner-warning';
      badge.textContent = '✕ Respuesta No Óptima';
      title.textContent = 'Puedes mejorar esta respuesta';
      recommendationBox.style.display = 'block';
      recommendationText.textContent = opt.mejoresOpciones || 'Recuerda validar las emociones del paciente y orientarlo con base científica.';
    }

    nextBtn.textContent = isLastObjection ? 'Ver Resumen del Caso →' : 'Siguiente Objeción →';

    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

    newNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.soundEngine.playClick();
      if (isLastObjection) {
        finishCase();
      } else {
        state.currentObjectionIndex++;
        showView('objection');
        renderObjection();
      }
    });
  }

  // Concluir un Caso
  function finishCase() {
    window.soundEngine.playFanfare();
    showView('summary');
    renderCaseSummary();
  }

  // -------------------------------------------------------------
  // 4. VENTANA 4: RESUMEN FINAL DEL CASO
  // -------------------------------------------------------------
  function renderCaseSummary() {
    const caso = CASOS_DATA[state.currentCaseIndex];
    const answers = state.currentCaseAnswers;

    document.getElementById('summary-case-title').textContent = `${caso.numero} — ${caso.titulo}`;

    const breakdownContainer = document.getElementById('summary-breakdown');
    breakdownContainer.innerHTML = '';

    answers.forEach((ans, idx) => {
      const item = document.createElement('div');
      item.className = `breakdown-card glass-card ${ans.esOptima ? 'optimal' : 'suboptimal'}`;

      item.innerHTML = `
        <div class="breakdown-header">
          <span class="breakdown-num">Objeción ${idx + 1}</span>
          <span class="breakdown-status">${ans.esOptima ? '✓ Adecuada' : '✕ No óptima'}</span>
        </div>
        <p class="breakdown-quote">${ans.cita}</p>
        <div class="breakdown-chosen">
          <strong>Tu respuesta (Opción ${ans.optionChosen}):</strong> ${ans.textoRespuesta}
        </div>
        <p class="breakdown-exp">${ans.explicacion}</p>
      `;

      breakdownContainer.appendChild(item);
    });

    document.getElementById('summary-disclaimer-text').textContent = DISCLAIMER_MSD.mensajeFinal;
    document.getElementById('summary-cta-text').textContent = DISCLAIMER_MSD.cta;

    const retryBtn = document.getElementById('btn-retry-case');
    const backMenuBtn = document.getElementById('btn-back-menu');
    const nextCaseBtn = document.getElementById('btn-next-case');

    retryBtn.onclick = (e) => {
      e.stopPropagation();
      window.soundEngine.playClick();
      startCase(state.currentCaseIndex);
    };

    backMenuBtn.onclick = (e) => {
      e.stopPropagation();
      window.soundEngine.playClick();
      resetState();
      showView('caseMenu');
      renderCaseMenu();
    };

    if (state.currentCaseIndex < CASOS_DATA.length - 1) {
      nextCaseBtn.style.display = 'inline-flex';
      nextCaseBtn.onclick = (e) => {
        e.stopPropagation();
        window.soundEngine.playClick();
        startCase(state.currentCaseIndex + 1);
      };
    } else {
      nextCaseBtn.style.display = 'none';
    }
  }

});
