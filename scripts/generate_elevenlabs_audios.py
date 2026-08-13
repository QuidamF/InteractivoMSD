#!/usr/bin/env python3
"""
Script de Generación de Audios Narrados con ElevenLabs API
para GARDA TOUR Interactivo (MSD).

Este script genera los archivos MP3 para cada objeción clínica combinando:
1. Voz del Narrador (locución médica introductoria).
2. Voz del Personaje Paciente (emulando género, edad y tono del caso).

Requisitos:
- Tener una clave API de ElevenLabs (ELEVENLABS_API_KEY).
- Ejecutar: python3 scripts/generate_elevenlabs_audios.py --api-key TU_API_KEY
"""

import os
import sys
import json
import argparse
import urllib.request
import urllib.error

# Configuración de Voces de ElevenLabs en Español (Model: eleven_multilingual_v2)
VOICE_MAP = {
    # Narrador principal (Voz médica neutra profesional)
    "narrator": "pNInz6obpgDQGcFmaJgB",  # Adam / Narrador claro
    
    # Voces de Personajes Pacientes
    "camila": "cgSgspJ2msm6clMCkdW9",   # Jessica / Mujer joven (Caso 01: 22 años)
    "elena": "21m00Tcm4TlvDq8ikWAM",    # Rachel / Mujer madura (Caso 02: 50 años)
    "patricia": "EXAVITQu4vr4xnSDxMaL", # Bella / Mujer materna (Caso 03: 42 años)
    "carlos": "VR6AewLTigWG4xTkhBnG",   # Arnold / Hombre ejecutivo (Caso 04: 40 años)
    "diego": "IKne3meq5aSn9XLyUdCD",    # Charlie / Hombre joven (Caso 05: 17 años)
    "javier": "ErXwobaYiN019PkySvjV",   # Antoni / Hombre profesional 30s (Caso 06)
    "fernando": "N2l1vC51M03qxH2Z5AOm"  # Josh / Hombre casual (Caso 07: 25 años)
}

# Base de datos de las 21 objeciones clínicas (7 Casos x 3 Objeciones)
CASOS_AUDIO_SPECS = [
    # Caso 01 - Camila M. (Mujer 22 años)
    {
        "id": "c1-o1",
        "character_voice": "camila",
        "intro": "Caso 01. Paciente Camila, 22 años. Objeción 1.",
        "quote": "He leído demasiadas cosas y ya no sé qué creer."
    },
    {
        "id": "c1-o2",
        "character_voice": "camila",
        "intro": "Caso 01. Paciente Camila, 22 años. Objeción 2.",
        "quote": "Me preocupan los efectos secundarios."
    },
    {
        "id": "c1-o3",
        "character_voice": "camila",
        "intro": "Caso 01. Paciente Camila, 22 años. Objeción 3.",
        "quote": "ChatGPT me dijo otra cosa."
    },

    # Caso 02 - Elena R. (Mujer 50 años)
    {
        "id": "c2-o1",
        "character_voice": "elena",
        "intro": "Caso 02. Paciente Elena, 50 años. Objeción 1.",
        "quote": "Estoy casada, no veo por qué vacunarme."
    },
    {
        "id": "c2-o2",
        "character_voice": "elena",
        "intro": "Caso 02. Paciente Elena, 50 años. Objeción 2.",
        "quote": "A mi edad ya no tiene sentido."
    },
    {
        "id": "c2-o3",
        "character_voice": "elena",
        "intro": "Caso 02. Paciente Elena, 50 años. Objeción 3.",
        "quote": "Nunca he tenido un Papanicolaou anormal."
    },

    # Caso 03 - Patricia V. (Mujer 42 años, Mamá)
    {
        "id": "c3-o1",
        "character_voice": "patricia",
        "intro": "Caso 03. Paciente Patricia, 42 años. Objeción 1.",
        "quote": "No quiero que piense que tiene permiso de iniciar vida sexual."
    },
    {
        "id": "c3-o2",
        "character_voice": "patricia",
        "intro": "Caso 03. Paciente Patricia, 42 años. Objeción 2.",
        "quote": "Mi hijo todavía es muy joven."
    },
    {
        "id": "c3-o3",
        "character_voice": "patricia",
        "intro": "Caso 03. Paciente Patricia, 42 años. Objeción 3.",
        "quote": "Me preocupa la seguridad."
    },

    # Caso 04 - Carlos T. (Hombre 40 años)
    {
        "id": "c4-o1",
        "character_voice": "carlos",
        "intro": "Caso 04. Paciente Carlos, 40 años. Objeción 1.",
        "quote": "Eso es un tema de mujeres."
    },
    {
        "id": "c4-o2",
        "character_voice": "carlos",
        "intro": "Caso 04. Paciente Carlos, 40 años. Objeción 2.",
        "quote": "Yo no tengo síntomas."
    },
    {
        "id": "c4-o3",
        "character_voice": "carlos",
        "intro": "Caso 04. Paciente Carlos, 40 años. Objeción 3.",
        "quote": "A los 40 ya no aplica."
    },

    # Caso 05 - Diego S. (Hombre 17 años)
    {
        "id": "c5-o1",
        "character_voice": "diego",
        "intro": "Caso 05. Paciente Diego, 17 años. Objeción 1.",
        "quote": "No confío en los médicos."
    },
    {
        "id": "c5-o2",
        "character_voice": "diego",
        "intro": "Caso 05. Paciente Diego, 17 años. Objeción 2.",
        "quote": "Leí en redes que la vacuna puede ser peligrosa."
    },
    {
        "id": "c5-o3",
        "character_voice": "diego",
        "intro": "Caso 05. Paciente Diego, 17 años. Objeción 3.",
        "quote": "Quiero vacunarme, pero no sé cómo pedirlo."
    },

    # Caso 06 - Javier L. (Hombre 30 años)
    {
        "id": "c6-o1",
        "character_voice": "javier",
        "intro": "Caso 06. Paciente Javier, 30 años. Objeción 1.",
        "quote": "Sí me interesa, pero luego lo veo."
    },
    {
        "id": "c6-o2",
        "character_voice": "javier",
        "intro": "Caso 06. Paciente Javier, 30 años. Objeción 2.",
        "quote": "No lo veo urgente."
    },
    {
        "id": "c6-o3",
        "character_voice": "javier",
        "intro": "Caso 06. Paciente Javier, 30 años. Objeción 3.",
        "quote": "No tengo tiempo."
    },

    # Caso 07 - Fernando G. (Hombre 25 años)
    {
        "id": "c7-o1",
        "character_voice": "fernando",
        "intro": "Caso 07. Paciente Fernando, 25 años. Objeción 1.",
        "quote": "No sé nada del VPH."
    },
    {
        "id": "c7-o2",
        "character_voice": "fernando",
        "intro": "Caso 07. Paciente Fernando, 25 años. Objeción 2.",
        "quote": "Pensé que era un tema de mi novia."
    },
    {
        "id": "c7-o3",
        "character_voice": "fernando",
        "intro": "Caso 07. Paciente Fernando, 25 años. Objeción 3.",
        "quote": "¿Yo también debería vacunarme?"
    }
]

def synthesize_elevenlabs_audio(api_key, voice_id, text, output_path):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": api_key
    }
    
    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.45,
            "similarity_boost": 0.85,
            "style": 0.2,
            "use_speaker_boost": True
        }
    }
    
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    
    try:
        with urllib.request.urlopen(req) as response:
            audio_bytes = response.read()
            with open(output_path, "wb") as f:
                f.write(audio_bytes)
            print(f"  [OK] Guardado: {output_path} ({len(audio_bytes)} bytes)")
            return True
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8")
        print(f"  [ERROR API] HTTP {e.code}: {err_msg}")
        return False
    except Exception as e:
        print(f"  [ERROR] Excepción: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Generador de Audios ElevenLabs para Interactivo MSD")
    parser.add_argument("--api-key", help="Clave API de ElevenLabs", default=os.getenv("ELEVENLABS_API_KEY"))
    args = parser.parse_args()

    api_key = args.api_key
    if not api_key:
        print("\n❌ Error: No se proporcionó la API Key de ElevenLabs.")
        print("Por favor ejecuta el comando pasando tu clave:")
        print("   python3 scripts/generate_elevenlabs_audios.py --api-key TU_ELEVENLABS_API_KEY\n")
        sys.exit(1)

    output_dir = "assets/audio/cases"
    os.makedirs(output_dir, exist_ok=True)

    print(f"\n🎙️  Iniciando generación de {len(CASOS_AUDIO_SPECS)} audios narrados con ElevenLabs...\n")

    success_count = 0
    for idx, spec in enumerate(CASOS_AUDIO_SPECS, 1):
        objection_id = spec["id"]
        voice_key = spec["character_voice"]
        voice_id = VOICE_MAP.get(voice_key, VOICE_MAP["narrator"])
        
        # Texto completo que simula primero al narrador y luego a la voz del paciente
        full_text = f"{spec['intro']}... \"{spec['quote']}\""
        output_file = os.path.join(output_dir, f"{objection_id}.mp3")

        print(f"[{idx}/{len(CASOS_AUDIO_SPECS)}] Generando {objection_id} (Voz: {voice_key})...")
        if synthesize_elevenlabs_audio(api_key, voice_id, full_text, output_file):
            success_count += 1

    print(f"\n✨ ¡Finalizado! {success_count} de {len(CASOS_AUDIO_SPECS)} archivos de audio generados en '{output_dir}'.\n")

if __name__ == "__main__":
    main()
