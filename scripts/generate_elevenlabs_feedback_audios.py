#!/usr/bin/env python3
"""
Script de Generación de Audios para la Sección de Feedback / Retroalimentación
con ElevenLabs API para GARDA TOUR Interactivo (MSD).

Este script genera los 63 archivos MP3 de retroalimentación médica (7 Casos x 3 Objeciones x 3 Opciones A,B,C).

Requisitos:
- Clave API de ElevenLabs.
- Ejecutar: python3 scripts/generate_elevenlabs_feedback_audios.py --api-key TU_API_KEY
"""

import os
import sys
import json
import argparse
import urllib.request
import urllib.error

# Voz del Narrador / Locutor Médico Principal
NARRATOR_VOICE_ID = "pNInz6obpgDQGcFmaJgB"  # Adam / Narrador neutro profesional

# Importar CASOS_DATA leyendo los datos estructurados o usando el esquema oficial
CASOS_FEEDBACK_SPECS = [
    # CASO 01 - Camila M.
    {
        "id": "c1-o1-A",
        "text": "Respuesta adecuada. Valida la emoción de la paciente, ofrece contención y establece el espacio de consulta como la fuente confiable para guiar la toma de decisiones basada en evidencia."
    },
    {
        "id": "c1-o1-B",
        "text": "Respuesta adecuada. Normaliza la experiencia, genera empatía y propone un trabajo colaborativo médico-paciente para filtrar mitos y realidades sobre la salud."
    },
    {
        "id": "c1-o1-C",
        "text": "Respuesta no óptima. Invalida las inquietudes de la paciente de forma tajante, lo que puede generar barreras de comunicación. Recomendación: Las respuestas A y B son óptimas porque empatizan con la paciente y la orientan a analizar la evidencia científica en consulta."
    },
    {
        "id": "c1-o2-A",
        "text": "Respuesta adecuada. Brinda información transparente y respaldada por vigilancia epidemiológica, detallando las reacciones locales y leves más frecuentes."
    },
    {
        "id": "c1-o2-B",
        "text": "Respuesta adecuada. Personaliza la atención evaluando el historial clínico individual y enseñando a la paciente a identificar eventos esperados versus signos de alarma."
    },
    {
        "id": "c1-o2-C",
        "text": "Respuesta no óptima. Minimiza la duda médica de la paciente sin fundamentación. Recomendación: Las respuestas A y B abordan directamente la inquietud con datos transparentes de farmacovigilancia e historia clínica."
    },
    {
        "id": "c1-o3-A",
        "text": "Respuesta adecuada. Enmarca de forma respetuosa el alcance de la tecnología sin descartarla agresivamente, resaltando el valor insustituible del criterio clínico."
    },
    {
        "id": "c1-o3-B",
        "text": "Respuesta adecuada. Utiliza la inquietud generada por IA como puente para la educación médica activa y la aclaración de conceptos clínicos."
    },
    {
        "id": "c1-o3-C",
        "text": "Respuesta no óptima. Una postura rígida puede hacer que la paciente se sienta descalificada. Recomendación: Las opciones A y B integran la consulta digital de la paciente como oportunidad pedagógica."
    },

    # CASO 02 - Elena R.
    {
        "id": "c2-o1-A",
        "text": "Respuesta adecuada. Plantea el marco de toma de decisiones compartida en medicina del adulto, evaluando el perfil clínico particular."
    },
    {
        "id": "c2-o1-B",
        "text": "Respuesta adecuada. Explica las guías clínicas para adultos mayores de 26 años, indicando que el beneficio se analiza caso a caso de forma transparente."
    },
    {
        "id": "c2-o1-C",
        "text": "Respuesta no óptima. Asume falsamente un estado inmunológico sin indagar antecedentes. Recomendación: Las respuestas A y B explican que la valoración en adultos requiere un diálogo individualizado."
    },
    {
        "id": "c2-o2-A",
        "text": "Respuesta adecuada. Aclara el mecanismo profiláctico de la vacuna: protección ante nuevos tipos de VPH incluidos, diferenciando prevención de tratamiento."
    },
    {
        "id": "c2-o2-B",
        "text": "Respuesta adecuada. Invita a un análisis clínico ordenado para determinar si el perfil de la paciente se beneficia de la protección profiláctica."
    },
    {
        "id": "c2-o2-C",
        "text": "Respuesta no óptima. Refuerza prejuicios erróneos y desinforma sobre los criterios médicos vigentes. Recomendación: Las opciones A y B esclarecen el alcance profiláctico y los criterios médicos."
    },
    {
        "id": "c2-o3-A",
        "text": "Respuesta adecuada. Diferencia con precisión científica la prevención secundaria del tamizaje de la prevención primaria de la vacunación."
    },
    {
        "id": "c2-o3-B",
        "text": "Respuesta adecuada. Refuerza la continuidad del cuidado ginecológico sin desestimar sus buenos hábitos de salud."
    },
    {
        "id": "c2-o3-C",
        "text": "Respuesta no óptima. Confunde tamizaje normal con inmunidad ante futuras infecciones. Recomendación: Las opciones A y B aclaran la complementariedad entre la citología periódica y la inmunización."
    },

    # CASO 03 - Patricia V.
    {
        "id": "c3-o1-A",
        "text": "Respuesta adecuada. Desvincula la inmunización preventiva del comportamiento moral o sexual, enfocándose en la biología del sistema inmune."
    },
    {
        "id": "c3-o1-B",
        "text": "Respuesta adecuada. Compara de forma clara la vacuna contra VPH con otras vacunas del esquema infantil aplicadas anticipadamente."
    },
    {
        "id": "c3-o1-C",
        "text": "Respuesta no óptima. Desestimar el sentimiento materno puede provocar rechazo. Recomendación: Las opciones A y B abordan el dilema ético y educativo con empatía y analogías clínicas efectivas."
    },
    {
        "id": "c3-o2-A",
        "text": "Respuesta adecuada. Explica el fundamento inmunológico: mayor respuesta de anticuerpos y máxima eficacia al aplicarse antes del inicio de vida sexual."
    },
    {
        "id": "c3-o2-B",
        "text": "Respuesta adecuada. Resalta el principio básico de la salud pública: la protección oportuna precede al riesgo."
    },
    {
        "id": "c3-o2-C",
        "text": "Respuesta no óptima. Postergar la vacuna en la ventana de edad ideal reduce el beneficio inmunogénico. Recomendación: Las respuestas A y B enfatizan la ventana biológica óptima."
    },
    {
        "id": "c3-o3-A",
        "text": "Respuesta adecuada. Respalda la indicación pediátrica y adolescente en millones de dosis administradas a nivel global con estricto seguimiento."
    },
    {
        "id": "c3-o3-B",
        "text": "Respuesta adecuada. Ofrece un triaje clínico previo a la aplicación para asegurar la tranquilidad de la familia."
    },
    {
        "id": "c3-o3-C",
        "text": "Respuesta no óptima. Recurrir a la masa sin brindar razones médicas no resuelve el temor materno. Recomendación: Las respuestas A y B entregan certidumbre con base en evidencia e historia clínica."
    },

    # CASO 04 - Carlos T.
    {
        "id": "c4-o1-A",
        "text": "Respuesta adecuada. Informa sobre la carga de enfermedad por VPH en varones, mencionando neoplasias no ginecológicas y lesiones benignas recurrentes."
    },
    {
        "id": "c4-o1-B",
        "text": "Respuesta adecuada. Contextualiza por qué la difusión mediática se centró en las mujeres, aclarando el beneficio preventivo en la salud del hombre."
    },
    {
        "id": "c4-o1-C",
        "text": "Respuesta no óptima. Un tono correctivo brusco bloquea la recepción de información médica. Recomendación: Las respuestas A y B desmitifican la creencia explicando los riesgos oncológicos reales."
    },
    {
        "id": "c4-o2-A",
        "text": "Respuesta adecuada. Explica la naturaleza asintomática y subclínica de la mayoría de las infecciones por VPH en hombres."
    },
    {
        "id": "c4-o2-B",
        "text": "Respuesta adecuada. Establece la distinción epidemiológica entre enfermedad sintomática y portación o riesgo de transmisión futura."
    },
    {
        "id": "c4-o2-C",
        "text": "Respuesta no óptima. Confirma erróneamente un supuesto falso, ya que el VPH suele ser silente en el varón. Recomendación: Las opciones A y B educan sobre la portación subclínica."
    },
    {
        "id": "c4-o3-A",
        "text": "Respuesta adecuada. Alinea la sugerencia con las guías de toma de decisión compartida para adultos de 27 a 45 años."
    },
    {
        "id": "c4-o3-B",
        "text": "Respuesta adecuada. Propone analizar el historial personal para determinar la conveniencia clínica de la inmunización."
    },
    {
        "id": "c4-o3-C",
        "text": "Respuesta no óptima. Ignora la ventana médica hasta los 45 años donde la toma de decisión compartida es válida e indicada."
    },

    # CASO 05 - Diego S.
    {
        "id": "c5-o1-A",
        "text": "Respuesta adecuada. Agradece la sinceridad, desescala la tensión y posiciona al médico como un facilitador de decisiones de salud sin autoritarismo."
    },
    {
        "id": "c5-o1-B",
        "text": "Respuesta adecuada. Ofrece transparencia radical en la evidencia científica para construir confianza paso a paso."
    },
    {
        "id": "c5-o1-C",
        "text": "Respuesta no óptima. Reacciona a la defensiva y fractura la alianza terapéutica. Recomendación: Las respuestas A y B construyen empatía, autonomía y transparencia desde el respeto."
    },
    {
        "id": "c5-o2-A",
        "text": "Respuesta adecuada. Acepta la inquietud sin calificar al joven, aportando datos objetivos de seguridad y eventos leves transitorios."
    },
    {
        "id": "c5-o2-B",
        "text": "Respuesta adecuada. Propone un análisis comparativo crítico para desarrollar pensamiento evaluativo en salud."
    },
    {
        "id": "c5-o2-C",
        "text": "Respuesta no óptima. Invalidar la fuente sin dar contraargumentos científicos aumenta el escepticismo. Recomendación: Las respuestas A y B abren la discusión basada en evidencia."
    },
    {
        "id": "c5-o3-A",
        "text": "Respuesta adecuada. Modelaje y guión de asertividad directo para empoderar al joven en sus consultas de salud."
    },
    {
        "id": "c5-o3-B",
        "text": "Respuesta adecuada. Refuerza positivamente la madurez y responsabilidad de cuidar su salud futura."
    },
    {
        "id": "c5-o3-C",
        "text": "Respuesta no óptima. Delega la responsabilidad sin brindar orientación. Recomendación: Las opciones A y B validan la autonomía del joven y le proporcionan lenguaje asertivo."
    },

    # CASO 06 - Javier L.
    {
        "id": "c6-o1-A",
        "text": "Respuesta adecuada. Desglosa la decisión en pasos sencillos, reduciendo la presión inmediata pero manteniendo el avance del proceso de valoración."
    },
    {
        "id": "c6-o1-B",
        "text": "Respuesta adecuada. Establece un compromiso accionable en el presente para evitar que la intención se diluya por postergación."
    },
    {
        "id": "c6-o1-C",
        "text": "Respuesta no óptima. Actitud pasiva que permite la desatención en salud. Recomendación: Las opciones A y B facilitan la concreción de un plan preventivo claro y manejable."
    },
    {
        "id": "c6-o2-A",
        "text": "Respuesta adecuada. Explica la paradoja de la prevención: su valor radica en actuar antes de la aparición de riesgos u oportunidades de contagio."
    },
    {
        "id": "c6-o2-B",
        "text": "Respuesta adecuada. Invita a evaluar el beneficio a mediano y largo plazo dentro del marco de vida adulta activa."
    },
    {
        "id": "c6-o2-C",
        "text": "Respuesta no óptima. Valida la procrastinación en salud preventiva, perdiendo la oportunidad de protegerlo a tiempo."
    },
    {
        "id": "c6-o3-A",
        "text": "Respuesta adecuada. Adapta la intervención al tiempo del paciente ofreciendo una síntesis clínica eficiente de 3 minutos."
    },
    {
        "id": "c6-o3-B",
        "text": "Respuesta adecuada. Optimiza la consulta presencial para dejar definido el perfil y la recomendación médica."
    },
    {
        "id": "c6-o3-C",
        "text": "Respuesta no óptima. Abandona el consejo médico estructurado ante una barrera de tiempo superable."
    },

    # CASO 07 - Fernando G.
    {
        "id": "c7-o1-A",
        "text": "Respuesta adecuada. Proporciona una definición sintética, clara y sin estigmas de la infección y sus posibles manifestaciones clínicas."
    },
    {
        "id": "c7-o1-B",
        "text": "Respuesta adecuada. Acoge la falta de conocimiento con empatía pedagógica e inicia un diálogo informativo incluyente."
    },
    {
        "id": "c7-o1-C",
        "text": "Respuesta no óptima. Culpabiliza o avergüenza al paciente por no poseer conocimientos médicos previos."
    },
    {
        "id": "c7-o2-A",
        "text": "Respuesta adecuada. Aclara la brecha de difusión histórica y reposiciona al varón como actor clave en la salud sexual compartida."
    },
    {
        "id": "c7-o2-B",
        "text": "Respuesta adecuada. Promueve la corresponsabilidad en la pareja y abre la oportunidad de revisar su propio esquema de vacunación."
    },
    {
        "id": "c7-o2-C",
        "text": "Respuesta no óptima. Usa un tono confrontativo que genera rechazo en lugar de incentivar la corresponsabilidad preventiva."
    },
    {
        "id": "c7-o3-A",
        "text": "Respuesta adecuada. Define la necesidad de una evaluación médica express considerando su rango de edad e historial."
    },
    {
        "id": "c7-o3-B",
        "text": "Respuesta adecuada. Detalla la recomendación clínica estándar en su grupo de edad respaldada por guías médicas de inmunización."
    },
    {
        "id": "c7-o3-C",
        "text": "Respuesta no óptima. Prescribe o indica la vacuna de manera automática sin verificar previamente su historial vacunal."
    }
]

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

    output_dir = "assets/audio/feedback"
    os.makedirs(output_dir, exist_ok=True)

    print(f"\n🎙️  Iniciando generación de {len(CASOS_FEEDBACK_SPECS)} audios de retroalimentación con ElevenLabs...\n")

    success_count = 0
    for idx, spec in enumerate(CASOS_FEEDBACK_SPECS, 1):
        file_id = spec["id"]
        output_file = os.path.join(output_dir, f"{file_id}.mp3")

        print(f"[{idx}/{len(CASOS_FEEDBACK_SPECS)}] Generando {file_id}.mp3...")
        if synthesize_feedback_audio(api_key, spec["text"], output_file):
            success_count += 1

    print(f"\n✨ ¡Finalizado! {success_count} de {len(CASOS_FEEDBACK_SPECS)} archivos de audio de retroalimentación generados en '{output_dir}'.\n")

if __name__ == "__main__":
    main()
