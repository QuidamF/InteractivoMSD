#!/usr/bin/env python3
"""
Script de Generación de Audios Narrados con ElevenLabs API
para GARDA TOUR Interactivo (MSD).

Este script lee directamente 'js/data.js' para asegurar sincronía total y genera
los 21 archivos MP3 para cada objeción clínica combinando:
1. Voz del Narrador (locución médica introductoria).
2. Voz del Personaje Paciente (emulando género, edad y tono del caso).

Requisitos:
- Tener una clave API de ElevenLabs (ELEVENLABS_API_KEY).
- Ejecutar: python3 scripts/generate_elevenlabs_audios.py --api-key TU_API_KEY
"""

import os
import sys
import json
import re
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
    "carlos": "pNInz6obpgDQGcFmaJgB",   # Adam / Hombre ejecutivo (Caso 04: 40 años)
    "diego": "IKne3meq5aSn9XLyUdCD",    # Charlie / Hombre joven (Caso 05: 17 años)
    "javier": "ErXwobaYiN019PkySvjV",   # Antoni / Hombre profesional 30s (Caso 06)
    "fernando": "TxGEqnHWrfWFTfGW9XjX"  # Josh / Hombre casual (Caso 07: 25 años)
}

def load_objection_specs_from_data():
    data_path = os.path.join(os.path.dirname(__file__), "..", "js", "data.js")
    with open(data_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    match = re.search(r"const CASOS_DATA = (\[.*\]);", content, re.DOTALL)
    if not match:
        raise ValueError("No se pudo parsear CASOS_DATA desde js/data.js")
    
    casos = json.loads(match.group(1))
    specs = []
    
    for caso in casos:
        paciente = caso["paciente"]
        avatar_id = paciente.get("avatarId", "narrator")
        for idx_obj, obj in enumerate(caso["objeciones"], 1):
            intro = f"{caso['numero']}. Paciente {paciente['nombre']}, {paciente['edad']}. Objeción {idx_obj}."
            quote = obj["cita"]
            specs.append({
                "id": obj["id"],
                "character_voice": avatar_id,
                "intro": intro,
                "quote": quote
            })
    return specs

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

    specs = load_objection_specs_from_data()
    output_dir = "assets/audio/cases"
    os.makedirs(output_dir, exist_ok=True)

    print(f"\n🎙️  Iniciando generación de {len(specs)} audios narrados desde js/data.js con ElevenLabs...\n")

    success_count = 0
    for idx, spec in enumerate(specs, 1):
        objection_id = spec["id"]
        voice_key = spec["character_voice"]
        voice_id = VOICE_MAP.get(voice_key, VOICE_MAP["narrator"])
        
        full_text = f"{spec['intro']}... \"{spec['quote']}\""
        output_file = os.path.join(output_dir, f"{objection_id}.mp3")

        print(f"[{idx}/{len(specs)}] Generando {objection_id} (Voz: {voice_key})...")
        if synthesize_elevenlabs_audio(api_key, voice_id, full_text, output_file):
            success_count += 1

    print(f"\n✨ ¡Finalizado! {success_count} de {len(specs)} archivos de audio generados en '{output_dir}'.\n")

if __name__ == "__main__":
    main()
