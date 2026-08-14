#!/usr/bin/env python3
"""
Script de Generación de Audios para la Sección de Feedback / Retroalimentación
con ElevenLabs API para GARDA TOUR Interactivo (MSD).

Este script lee directamente 'js/data.js' para asegurar sincronía total y genera
los 63 archivos MP3 de retroalimentación médica (7 Casos x 3 Objeciones x 3 Opciones A,B,C).

Requisitos:
- Clave API de ElevenLabs.
- Ejecutar: python3 scripts/generate_elevenlabs_feedback_audios.py --api-key TU_API_KEY
"""

import os
import sys
import json
import re
import argparse
import urllib.request
import urllib.error

# Voz del Narrador / Locutor Médico Principal
NARRATOR_VOICE_ID = "pNInz6obpgDQGcFmaJgB"  # Adam / Narrador neutro profesional

def load_feedback_specs_from_data():
    data_path = os.path.join(os.path.dirname(__file__), "..", "js", "data.js")
    with open(data_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    match = re.search(r"const CASOS_DATA = (\[.*\]);", content, re.DOTALL)
    if not match:
        raise ValueError("No se pudo parsear CASOS_DATA desde js/data.js")
    
    casos = json.loads(match.group(1))
    specs = []
    
    for caso in casos:
        for obj in caso["objeciones"]:
            for opt in obj["opciones"]:
                exp = opt.get("explicacion", "")
                mo = opt.get("mejoresOpciones", "")
                letra = opt["letra"]
                obj_id = obj["id"]
                
                if opt["esOptima"]:
                    text = f"Respuesta adecuada. {exp}"
                else:
                    text = f"Respuesta no óptima. {exp} {mo}"
                
                specs.append({
                    "id": f"{obj_id}-{letra}",
                    "text": text
                })
    return specs

def synthesize_feedback_audio(api_key, text, output_path):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{NARRATOR_VOICE_ID}"
    
    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": api_key
    }
    
    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.85,
            "style": 0.15,
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
    parser = argparse.ArgumentParser(description="Generador de Audios de Feedback ElevenLabs")
    parser.add_argument("--api-key", help="Clave API de ElevenLabs", default=os.getenv("ELEVENLABS_API_KEY"))
    args = parser.parse_args()

    api_key = args.api_key
    if not api_key:
        print("\n❌ Error: No se proporcionó la API Key de ElevenLabs.")
        print("Por favor ejecuta el comando pasando tu clave:")
        print("   python3 scripts/generate_elevenlabs_feedback_audios.py --api-key TU_ELEVENLABS_API_KEY\n")
        sys.exit(1)

    specs = load_feedback_specs_from_data()
    output_dir = "assets/audio/feedback"
    os.makedirs(output_dir, exist_ok=True)

    print(f"\n🎙️  Iniciando generación de {len(specs)} audios de retroalimentación desde js/data.js...\n")

    success_count = 0
    for idx, spec in enumerate(specs, 1):
        file_id = spec["id"]
        output_file = os.path.join(output_dir, f"{file_id}.mp3")

        print(f"[{idx}/{len(specs)}] Generando {file_id}.mp3...")
        if synthesize_feedback_audio(api_key, spec["text"], output_file):
            success_count += 1

    print(f"\n✨ ¡Finalizado! {success_count} de {len(specs)} archivos de audio de retroalimentación generados en '{output_dir}'.\n")

if __name__ == "__main__":
    main()
