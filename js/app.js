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
    if (window.soundEngine) window.soundEngine.stopObjectionVoice();
    state.currentCaseIndex = 0;
    state.currentObjectionIndex = 0;
    state.currentCaseAnswers = [];
  }

  // Cambio de Vistas
  function showView(viewName) {
    if (window.soundEngine) window.soundEngine.stopObjectionVoice();
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

  // Helper para renderizar icono SVG de Avatar de Paciente ÚNICO por Personaje
  function getAvatarSvg(pacienteInfo) {
    const avatarId = typeof pacienteInfo === 'object' ? pacienteInfo.avatarId : pacienteInfo;
    
    switch (avatarId) {
      case 'camila': // 1. Camila M. (Mujer 22 años - Estudiante universitaria)
        return `<svg class="patient-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C9.2 2 7 4.2 7 7c0 1.8 1 3.4 2.5 4.3C6.1 12.5 4 15.4 4 19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1c0-3.6-2.1-6.5-5.5-7.7C16 10.4 17 8.8 17 7c0-2.8-2.2-5-5-5zm-3.5 5c0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5c0 1.2-.6 2.2-1.5 2.8C13.2 10.3 12.6 11 12 11.5c-.6-.5-1.2-1.2-2-1.7-.9-.6-1.5-1.6-1.5-2.8z"/>
          <path d="M6 7.5c-1.2 2-1.4 4.5-.6 7 .2.5.8.8 1.3.6.5-.2.8-.8.6-1.3-.6-1.9-.4-3.8.5-5.3.3-.5.1-1.1-.4-1.3-.5-.3-1.1-.1-1.4.3z"/>
          <path d="M18 7.5c1.2 2 1.4 4.5.6 7-.2.5-.8.8-1.3.6-.5-.2-.8-.8-.6-1.3.6-1.9.4-3.8-.5-5.3-.3-.5-.1-1.1.4-1.3.5-.3 1.1-.1 1.4.3z"/>
        </svg>`;

      case 'elena': // 2. Elena R. (Mujer 50 años - Adulta elegante)
        return `<svg class="patient-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-3.3 0-6 2.7-6 6 0 2.1 1.1 3.9 2.8 5C5.8 14.3 4 17 4 20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1c0-3-1.8-5.7-4.8-7 1.7-1.1 2.8-2.9 2.8-5 0-3.3-2.7-6-6-6zm-4 6c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.4-.7 2.6-1.8 3.3l-.7.4V13h-3v-1.3l-.7-.4C8.7 10.6 8 9.4 8 8z"/>
          <path d="M6.5 6.5C5.5 8 5.5 10 6.5 11.5c.3.4.9.5 1.3.2.4-.3.5-.9.2-1.3-.6-1-.6-2.4 0-3.4.3-.4.2-1-.2-1.3-.4-.3-1-.2-1.3.3z"/>
          <path d="M17.5 6.5c1 1.5 1 3.5 0 5-.3.4-.2 1 .2 1.3.4.3 1 .2 1.3-.2 1.4-1.8 1.4-4.2 0-6-.3-.4-.9-.5-1.3-.2-.4.3-.5.9-.2 1.3z"/>
        </svg>`;

      case 'patricia': // 3. Patricia V. (Mujer 42 años - Mamá con moño/recogido)
        return `<svg class="patient-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="2.5" r="2.2"/>
          <path d="M12 4.5C9.5 4.5 7.5 6.5 7.5 9c0 1.8 1 3.4 2.5 4.2-3.2 1.2-5.5 4.1-5.5 7.8 0 .6.4 1 1 1h13c.6 0 1-.4 1-1 0-3.7-2.3-6.6-5.5-7.8 1.5-.8 2.5-2.4 2.5-4.2 0-2.5-2-4.5-4.5-4.5zm-3 4.5c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.1-.6 2.1-1.5 2.6l-.5.3V13h-2v-1.1l-.5-.3C9.6 11.1 9 10.1 9 9z"/>
        </svg>`;

      case 'carlos': // 4. Carlos T. (Hombre 40 años - Ejecutivo con cuello de vestir)
        return `<svg class="patient-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.8 1.1 3.4 2.7 4.1C6.7 11.9 4.5 14.8 4.5 18.5V20c0 .6.4 1 1 1h13c.6 0 1-.4 1-1v-1.5c0-3.7-2.2-6.6-5.7-7.9 1.6-.7 2.7-2.3 2.7-4.1C16.5 4 14.5 2 12 2zm-3 4.5c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.2-.7 2.2-1.7 2.7l-.3.2V11h-2V9.4l-.3-.2C9.7 8.7 9 7.7 9 6.5z"/>
          <path d="M12 13.5l-2 4.5h4l-2-4.5z"/>
        </svg>`;

      case 'diego': // 5. Diego S. (Hombre 17 años - Adolescente / peinado juvenil desordenado)
        return `<svg class="patient-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.7 2 6 4.7 6 8c0 2.2 1.2 4.1 3 5.1-3.5 1.3-6 4.4-6 8.4 0 .6.4 1 1 1h16c.6 0 1-.4 1-1 0-4-2.5-7.1-6-8.4 1.8-1 3-2.9 3-5.1 0-3.3-2.7-6-6-6zm0 2c2.2 0 4 1.8 4 4 0 1.3-.6 2.4-1.6 3.1l-.4.3V13h-4v-1.6l-.4-.3C8.6 10.4 8 9.3 8 8c0-2.2 1.8-4 4-4z"/>
          <path d="M10 4.5c1-1 3.5-1 4.5.5.3.4.9.5 1.3.2.4-.3.5-.9.2-1.3C18.5 2.5 16 1.5 13.5 1.5c-2 0-4 1-5 2.5-.3.4-.2 1 .2 1.3.4.3 1 .2 1.3-.3z"/>
        </svg>`;

      case 'javier': // 6. Javier L. (Hombre 30 años - Profesional joven con sombra de barba)
        return `<svg class="patient-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.7 1 3.2 2.5 4C6.5 11.7 4 14.7 4 18.5V20c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-1.5c0-3.8-2.5-6.8-6-8 1.5-.8 2.5-2.3 2.5-4C16.5 4 14.5 2 12 2zm-3 4.5c0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.1-.6 2.1-1.5 2.6l-.5.3V12h-2V9.4l-.5-.3C9.6 8.6 9 7.6 9 6.5z"/>
          <path d="M9.5 9.5c0 1.8 1.1 3 2.5 3s2.5-1.2 2.5-3h-5z"/>
        </svg>`;

      case 'fernando': // 7. Fernando G. (Hombre 25 años - Acompañante con cabello abundante/rizado)
      default:
        if (avatarId === 'mujer' || avatarId === 'femenino') {
          return `<svg class="patient-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 1.76 1.02 3.28 2.5 4.02C6.7 11.75 4 14.8 4 18.5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1c0-3.7-2.7-6.75-6-7.98 1.48-.74 2.5-2.26 2.5-4.02A4.5 4.5 0 0 0 12 2zm-3.5 10c-1.5 1.2-2.5 3-2.5 5h2c0-1.3.6-2.4 1.5-3.1L8.5 12zm7 0l-1.5 1.9c.9.7 1.5 1.8 1.5 3.1h2c0-2-1-3.8-2.5-5z"/>
          </svg>`;
        }
        return `<svg class="patient-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1.8c-3.6 0-6.5 2.5-6.5 6.2 0 1.9 1 3.6 2.6 4.7-3.4 1.3-5.7 4.3-5.7 7.8 0 .6.4 1 1 1h17.2c.6 0 1-.4 1-1 0-3.5-2.3-6.5-5.7-7.8 1.6-1.1 2.6-2.8 2.6-4.7 0-3.7-2.9-6.2-6.5-6.2zm-3.5 6.2c0-2 1.6-3.7 3.5-3.7s3.5 1.7 3.5 3.7c0 1.2-.6 2.3-1.6 3l-.4.3V13h-3v-1.7l-.4-.3c-1-.7-1.6-1.8-1.6-3z"/>
          <path d="M8.5 4C9.5 2.8 11 2 12.5 2c1.2 0 2.5.6 3.3 1.5.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4C16 1 14.3.2 12.5.2 10.5.2 8.7 1.2 7.3 2.7c-.4.4-.3 1 .1 1.4.4.3 1 .3 1.1-.1z"/>
        </svg>`;
    }
  }

  // Helper para renderizar el Avatar Memoji 3D o SVG del Paciente
  function getAvatarHtml(pacienteInfo) {
    let paciente = pacienteInfo;
    if (typeof pacienteInfo === 'string') {
      const casoEncontrado = CASOS_DATA.find(c => c.paciente.avatarId === pacienteInfo || c.paciente.genero === pacienteInfo);
      if (casoEncontrado) paciente = casoEncontrado.paciente;
    }
    
    if (paciente && paciente.avatarImg) {
      return `<img src="${paciente.avatarImg}" alt="${paciente.nombre || 'Paciente'}" class="patient-avatar-img" />`;
    }

    return getAvatarSvg(pacienteInfo);
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
            ${getAvatarHtml(caso.paciente)}
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
    avatarElem.innerHTML = getAvatarHtml(caso.paciente);
    avatarElem.style.background = caso.paciente.avatarBg;

    document.getElementById('objection-quote').textContent = objecion.cita;
    document.getElementById('objection-context').textContent = objecion.contexto;

    // Configuración del Botón de Audio para la Objeción del Paciente
    const audioBtn = document.getElementById('btn-play-audio');
    if (audioBtn) {
      window.soundEngine.stopObjectionVoice();
      audioBtn.classList.remove('playing');
      const labelElem = document.getElementById('btn-play-audio-label');
      if (labelElem) labelElem.textContent = 'Escuchar Voz';

      const newAudioBtn = audioBtn.cloneNode(true);
      audioBtn.parentNode.replaceChild(newAudioBtn, audioBtn);

      newAudioBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (newAudioBtn.classList.contains('playing')) {
          window.soundEngine.stopObjectionVoice();
          newAudioBtn.classList.remove('playing');
          const lbl = document.getElementById('btn-play-audio-label');
          if (lbl) lbl.textContent = 'Escuchar Voz';
        } else {
          window.soundEngine.playObjectionVoice(
            caso,
            objecion,
            () => {
              newAudioBtn.classList.add('playing');
              const lbl = document.getElementById('btn-play-audio-label');
              if (lbl) lbl.textContent = 'Reproduciendo...';
            },
            () => {
              newAudioBtn.classList.remove('playing');
              const lbl = document.getElementById('btn-play-audio-label');
              if (lbl) lbl.textContent = 'Escuchar Voz';
            }
          );
        }
      });
    }

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

    // Configuración de Botón de Audio para la Explicación de Retroalimentación
    const feedbackAudioBtn = document.getElementById('btn-play-feedback-audio');
    if (feedbackAudioBtn) {
      window.soundEngine.stopObjectionVoice();
      feedbackAudioBtn.classList.remove('playing');
      const labelElem = document.getElementById('btn-play-feedback-label');
      if (labelElem) labelElem.textContent = 'Escuchar Explicación';

      const newFeedbackAudioBtn = feedbackAudioBtn.cloneNode(true);
      feedbackAudioBtn.parentNode.replaceChild(newFeedbackAudioBtn, feedbackAudioBtn);

      newFeedbackAudioBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (newFeedbackAudioBtn.classList.contains('playing')) {
          window.soundEngine.stopObjectionVoice();
          newFeedbackAudioBtn.classList.remove('playing');
          const lbl = document.getElementById('btn-play-feedback-label');
          if (lbl) lbl.textContent = 'Escuchar Explicación';
        } else {
          window.soundEngine.playFeedbackVoice(
            opt,
            objecion,
            caso,
            () => {
              newFeedbackAudioBtn.classList.add('playing');
              const lbl = document.getElementById('btn-play-feedback-label');
              if (lbl) lbl.textContent = 'Reproduciendo...';
            },
            () => {
              newFeedbackAudioBtn.classList.remove('playing');
              const lbl = document.getElementById('btn-play-feedback-label');
              if (lbl) lbl.textContent = 'Escuchar Explicación';
            }
          );
        }
      });
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
