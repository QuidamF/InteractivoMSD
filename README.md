# Interactivo GARDA TOUR (MSD) — Módulo Clínico HCP | GARDASIL®9

Aplicación web interactiva desarrollada para **MSD (Merck Sharp & Dohme)** y optimizada para la capacitación de profesionales de la salud (**HCP**) mediante **tótems interactivos de pantalla táctil y quioscos verticales Full HD (1080 x 1920 px)**.

La aplicación simula consultas médicas reales con 7 perfiles de pacientes, evaluando el abordaje clínico del médico ante objeciones frecuentes sobre la vacuna **GARDASIL®9**, ofreciendo retroalimentación inmediata basada en la **Información para Prescribir Amplia (IPP)** y locuciones de voz narradas en alta definición mediante Inteligencia Artificial (**ElevenLabs**).

---

## 🌟 Características Principales

- **7 Casos Clínicos y Avatares 3D**: Avatares tridimensionales estilo Apple Memoji con anillos neón cian.
- **21 Objeciones y 63 Respuestas de Retroalimentación**: Basados en el Árbol de Decisión oficial de GARDASIL®9 (`arbol_decision_HCP_GARDASIL9-2.md`).
- **84 Audios HD Narrados con ElevenLabs**: Locuciones de narrador médico y voces caracterizadas por edad, género y tono de cada paciente.
- **Protector de Pantalla (Screensaver)**: Modo ahorro de pantalla para quioscos que regresa al inicio tras inactividad y se reanima con un toque.
- **Formato Responsivo Híbrido**: Optimizado para pantallas horizontales de escritorio y tótems verticales de eventos (1080 x 1920 px).
- **Modo Kiosco de Producción**: Totalmente compatible con la ejecución desatendida en **Firefox Kiosk Mode** administrada con **PM2**.

---

## 📁 Estructura del Proyecto

```
InteractivoMSD/
├── assets/
│   ├── audio/
│   │   ├── cases/            # 21 Audios MP3 de objeciones narradas por caso
│   │   └── feedback/         # 63 Audios MP3 de retroalimentación médica (A, B, C)
│   ├── avatars/              # 7 Avatares 3D en alta resolución (.png)
│   └── icons/                # Iconos del sistema (Sound, Touch, Hand)
├── js/
│   ├── app.js                # Lógica principal de la aplicación y flujo de pantallas
│   ├── audio.js              # Motor de sonido (SoundEngine), reproducción MP3 y Web Speech API fallback
│   ├── data.js               # Base de datos JSON oficial de los 7 Casos Clínicos
│   └── screensaver.js        # Gestor de inactividad y protector de pantalla
├── scripts/
│   ├── generate_elevenlabs_audios.py          # Generador de audios MP3 para objeciones
│   └── generate_elevenlabs_feedback_audios.py # Generador de audios MP3 para retroalimentación
├── index.html                # Estructura HTML5 semántica de las 5 ventanas del interactivo
├── styles.css                # Sistema de diseño CSS3 (Glassmorphism, Neon Cyan/Magenta y Kiosk Responsive)
├── start_kiosk.sh            # Script Shell de inicio automático en modo Kiosco (Firefox)
├── pm2.json                  # Configuración del gestor de procesos PM2
└── README.md                 # Documentación del proyecto
```

---

## 💻 Requisitos Previos

1. **Navegador Web**: Firefox (Recomendado para modo Kiosco), Chrome, Edge o Safari.
2. **Entorno de Ejecución**:
   - **Para pruebas locales**: Servidor web básico (Python 3, Node.js `serve` o VS Code Live Server).
   - **Para quiosco/tótem en producción**: Linux / macOS / Raspberry Pi con Node.js y **PM2** instalado.

---

## 🚀 Instalación y Prueba Local

### 1. Clonar el Repositorio
```bash
git clone https://github.com/QuidamF/InteractivoMSD.git
cd InteractivoMSD
```

### 2. Probar Localmente en el Navegador

#### Opción A: Con Servidor HTTP de Python 3 (Recomendado)
Ejecuta en la terminal:
```bash
python3 -m http.server 8080
```
Luego abre en tu navegador:
[http://localhost:8080](http://localhost:8080)

#### Opción B: Con Node.js (`serve`)
```bash
npx serve .
```

#### Opción C: Apertura directa
Puedes abrir directamente el archivo `index.html` en tu navegador.

---

## 🖥️ Configuración del Modo Kiosco en Producción (PM2 + Bash)

Para eventos y exhibiciones donde el tótem deba iniciar automáticamente a pantalla completa sin barras de navegador ni interrupciones del sistema operativo.

### Explicación de los archivos de Kiosco

1. **`start_kiosk.sh`**: Script en Bash que asigna la pantalla display (`DISPLAY=:0`), cierra cualquier proceso previo de Firefox y lanza una nueva instancia a pantalla completa sin bordes ni menús mediante el flag `--kiosk`.
2. **`pm2.json`**: Archivo de configuración para el administrador de procesos **PM2** de Node.js. Garantiza que si el navegador o el quiosco se cierran o la máquina se reinicia, el interactivo se vuelva a levantar automáticamente en 3 segundos (`autorestart: true`).

---

### Instrucciones de Despliegue con PM2

#### 1. Otorgar Permisos de Ejecución al Script
```bash
chmod +x start_kiosk.sh
```

#### 2. Verificar la Ruta del Proyecto en `start_kiosk.sh`
Asegúrate de que la variable `APP_DIR` apunte a la ubicación correcta en el equipo donde se desplegará. Por ejemplo, en `start_kiosk.sh`:
```bash
APP_DIR="$HOME/InteractivoMSD"
```

#### 3. Instalar PM2 Globalmente (si aún no está instalado)
```bash
npm install -g pm2
```

#### 4. Iniciar el servicio con PM2
```bash
pm2 start pm2.json
```

#### 5. Comandos Útiles de Control en PM2
- **Ver el estado del quiosco**:
  ```bash
  pm2 status
  ```
- **Ver logs de ejecución**:
  ```bash
  pm2 logs interactivo-msd-kiosk
  ```
- **Reiniciar el quiosco**:
  ```bash
  pm2 restart interactivo-msd-kiosk
  ```
- **Detener el quiosco**:
  ```bash
  pm2 stop interactivo-msd-kiosk
  ```

#### 6. Iniciar automáticamente con el Arranque del Sistema Operativo
Para que el interactivo encienda solo al conectar la pantalla/tótem:
```bash
pm2 startup
pm2 save
```

---

## 🎙️ Regeneración de Audios con ElevenLabs (Para Desarrolladores)

Si se modifican los textos en `js/data.js` y se requiere regenerar la locución de voz oficial con la API de **ElevenLabs**:

### 1. Audios de Objeciones (21 MP3s):
```bash
python3 scripts/generate_elevenlabs_audios.py --api-key TU_ELEVENLABS_API_KEY
```

### 2. Audios de Retroalimentación Médica (63 MP3s):
```bash
python3 scripts/generate_elevenlabs_feedback_audios.py --api-key TU_ELEVENLABS_API_KEY
```

---

## 📄 Créditos y Licencia

Desarrollado para el interactivo **GARDA TOUR - MSD**.  
Todos los derechos reservados © MSD (Merck Sharp & Dohme).
