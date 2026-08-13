/**
 * Base de datos oficial de Casos Clínicos para el Interactivo GARDA TOUR (MSD)
 * Basado en el árbol de decisión HCP para GARDASIL®9
 * Estilo de avatar unificado para coherencia gráfica de marca.
 */

const CASOS_DATA = [
  {
    id: "caso-1",
    numero: "Caso 01",
    titulo: "Mujer joven abrumada por información en redes y ChatGPT",
    subtitulo: "Paciente de 22 años • Consulta general / Prevención",
    paciente: {
      nombre: "Camila M.",
      edad: "22 años",
      genero: "mujer",
      avatarId: "camila",
      perfil: "Estudiante universitaria. Busca activamente temas de salud en TikTok, Instagram y ChatGPT, pero se siente confundida y con dudas sobre la vacuna del VPH.",
      avatarBg: "linear-gradient(135deg, rgba(0, 229, 255, 0.45), rgba(0, 136, 255, 0.65))"
    },
    objeciones: [
      {
        id: "c1-o1",
        numeroObjecion: 1,
        cita: "“He leído demasiadas cosas y ya no sé qué creer”",
        contexto: "La paciente llega a la consulta mencionando que en redes sociales ha visto opiniones encontradas sobre la vacunación y el VPH.",
        opciones: [
          {
            letra: "A",
            texto: "“Entiendo que pueda sentirse abrumada. Lo más recomendable es revisar información validada y resolver sus dudas en consulta, para tomar una decisión informada con base médica.”",
            esOptima: true,
            explicacion: "Valida la emoción de la paciente, ofrece contención y establece el espacio de consulta como la fuente confiable para guiar la toma de decisiones basada en evidencia."
          },
          {
            letra: "B",
            texto: "“Es normal encontrar información contradictoria en redes. Podemos revisar juntos sus principales dudas y diferenciar qué viene de evidencia médica y qué puede ser desinformación.”",
            esOptima: true,
            explicacion: "Normaliza la experiencia, genera empatía y propone un trabajo colaborativo médico-paciente para filtrar mitos y realidades sobre la salud."
          },
          {
            letra: "C",
            texto: "“No haga caso a redes, eso solo confunde.”",
            esOptima: false,
            explicacion: "Invalida las inquietudes de la paciente de forma tajante, lo que puede generar barreras de comunicación y desconfianza hacia la recomendación médica.",
            mejoresOpciones: "Las respuestas A y B son óptimas porque empatizan con la paciente y la orientan a analizar la evidencia científica en consulta sin juzgar sus búsquedas."
          }
        ]
      },
      {
        id: "c1-o2",
        numeroObjecion: 2,
        cita: "“Me preocupan los efectos secundarios”",
        contexto: "Durante la plática, manifiesta temor a sufrir reacciones adversas graves que leyó en comentarios de internet.",
        opciones: [
          {
            letra: "A",
            texto: "“Es una duda válida. Las vacunas contra VPH cuentan con años de monitoreo de seguridad; los efectos más comunes suelen ser dolor, enrojecimiento o inflamación en el sitio de aplicación, mareo, náusea o dolor de cabeza.”",
            esOptima: true,
            fuente: "cdc.gov",
            explicacion: "Brinda información transparente y respaldada por vigilancia epidemiológica, detallando las reacciones locales y leves más frecuentes."
          },
          {
            letra: "B",
            texto: "“Podemos revisar sus antecedentes y explicarle qué reacciones son esperadas, cuáles requieren atención y si hay alguna contraindicación en su caso.”",
            esOptima: true,
            explicacion: "Personaliza la atención evaluando el historial clínico individual y enseñando a la paciente a identificar eventos esperados vs signos de alarma."
          },
          {
            letra: "C",
            texto: "“No se preocupe, no pasa nada.”",
            esOptima: false,
            explicacion: "Minimiza la duda médica de la paciente sin fundamentación. Esto transmite falta de rigor y no proporciona claridad sobre la seguridad del biológico.",
            mejoresOpciones: "Las respuestas A y B abordan directamente la inquietud con datos transparentes de farmacovigilancia e historia clínica."
          }
        ]
      },
      {
        id: "c1-o3",
        numeroObjecion: 3,
        cita: "“ChatGPT me dijo otra cosa”",
        contexto: "Muestra su teléfono con una respuesta generada por Inteligencia Artificial que sugiere que no todos necesitan vacunarse a su edad.",
        opciones: [
          {
            letra: "A",
            texto: "“Las herramientas digitales pueden orientar, pero no sustituyen una valoración médica. Lo importante es revisar su caso, edad, antecedentes y dudas específicas.”",
            esOptima: true,
            explicacion: "Enmarca de forma respetuosa el alcance de la tecnología sin descartarla agresivamente, resaltando el valor insustituible del criterio clínico individualizado."
          },
          {
            letra: "B",
            texto: "“Podemos usar esa información como punto de partida. Si me comparte qué leyó, le ayudo a identificar qué está alineado con evidencia médica y qué requiere contexto.”",
            esOptima: true,
            explicacion: "Utiliza la inquietud generada por IA como puente para la educación médica activa y la aclaración de conceptos clínicos."
          },
          {
            letra: "C",
            texto: "“ChatGPT no sirve para temas médicos.”",
            esOptima: false,
            explicacion: "Una postura rígida puede hacer que la paciente se sienta descalificada y busque respuestas fuera del consultorio.",
            mejoresOpciones: "Las opciones A y B integran la consulta digital de la paciente como oportunidad pedagógica para afianzar la evidencia médica."
          }
        ]
      }
    ]
  },
  {
    id: "caso-2",
    numero: "Caso 02",
    titulo: "Mujer de 50 años, casada, relación monógama",
    subtitulo: "Paciente de 50 años • Control ginecológico anual",
    paciente: {
      nombre: "Elena R.",
      edad: "50 años",
      genero: "mujer",
      avatarId: "elena",
      perfil: "Casada desde hace 22 años en relación monógama. Considera que a su edad y estilo de vida la prevención de VPH carece de relevancia.",
      avatarBg: "linear-gradient(135deg, rgba(224, 64, 251, 0.45), rgba(124, 77, 255, 0.65))"
    },
    objeciones: [
      {
        id: "c2-o1",
        numeroObjecion: 1,
        cita: "“Estoy casada, no veo por qué vacunarme”",
        contexto: "Al mencionar la vacunación dentro del esquema de salud integral del adulto, la paciente cuestiona el motivo de la sugerencia.",
        opciones: [
          {
            letra: "A",
            texto: "“Entiendo su punto. En adultos, la decisión debe individualizarse según edad, antecedentes, exposición previa y posibles riesgos futuros.”",
            esOptima: true,
            explicacion: "Plantea el marco de toma de decisiones compartida en medicina del adulto, evaluando el perfil clínico particular."
          },
          {
            letra: "B",
            texto: "“En personas adultas, la vacunación contra VPH no es una recomendación rutinaria para todos; puede evaluarse mediante una conversación médico-paciente, especialmente entre los 27 y 45 años.”",
            esOptima: true,
            fuente: "cancer.gov",
            explicacion: "Explica las guías clínicas para adultos mayores de 26 años, indicando que el beneficio se analiza caso a caso de forma transparente."
          },
          {
            letra: "C",
            texto: "“Si está casada, probablemente no la necesita.”",
            esOptima: false,
            explicacion: "Asume falsamente un estado inmunológico sin indagar antecedentes de exposición previa o riesgos futuros, perdiendo la oportunidad de evaluar el caso con rigor.",
            mejoresOpciones: "Las respuestas A y B explican que la valoración en adultos requiere un diálogo individualizado acorde a las recomendaciones científicas."
          }
        ]
      },
      {
        id: "c2-o2",
        numeroObjecion: 2,
        cita: "“A mi edad ya no tiene sentido”",
        contexto: "Expresa el mito extendido de que la prevención del VPH solo aplica en adolescentes o adultos muy jóvenes.",
        opciones: [
          {
            letra: "A",
            texto: "“La vacuna ayuda a prevenir infecciones futuras por tipos de VPH incluidos en la vacuna, pero no trata infecciones previas o lesiones existentes.”",
            esOptima: true,
            explicacion: "Aclara el mecanismo profiláctico de la vacuna: protección ante nuevos tipos de VPH incluidos, diferenciando prevención de tratamiento."
          },
          {
            letra: "B",
            texto: "“Lo recomendable es valorar si en su caso existe un beneficio potencial. Para eso revisamos antecedentes, tamizaje, edad y factores de riesgo.”",
            esOptima: true,
            explicacion: "Invita a un análisis clínico ordenado para determinar si el perfil de la paciente se beneficia de la protección profiláctica."
          },
          {
            letra: "C",
            texto: "“Sí, ya está grande para eso.”",
            esOptima: false,
            explicacion: "Refuerza prejuicios erróneos y desinforma sobre los criterios médicos vigentes para la toma de decisión compartida en adultos.",
            mejoresOpciones: "Las opciones A y B esclarecen el alcance profiláctico y los criterios médicos para evaluar el beneficio real."
          }
        ]
      },
      {
        id: "c2-o3",
        numeroObjecion: 3,
        cita: "“Nunca he tenido un Papanicolaou anormal”",
        contexto: "Muestra satisfacción con sus resultados históricos de citología cervical y no comprende la diferencia entre tamizaje y vacunación.",
        opciones: [
          {
            letra: "A",
            texto: "“Es una buena noticia. Aun así, el tamizaje y la vacunación tienen objetivos diferentes: el tamizaje detecta cambios, mientras la vacunación busca prevenir infecciones futuras por ciertos tipos de VPH.”",
            esOptima: true,
            explicacion: "Diferencia con precisión científica la prevención secundaria (tamizaje/Papanicolau) de la prevención primaria (vacunación)."
          },
          {
            letra: "B",
            texto: "“Que sus estudios hayan salido bien no elimina la importancia de continuar con seguimiento ginecológico según indicación médica.”",
            esOptima: true,
            explicacion: "Refuerza la continuidad del cuidado ginecológico sin desestimar sus buenos hábitos de salud."
          },
          {
            letra: "C",
            texto: "“Entonces no hay nada de qué preocuparse.”",
            esOptima: false,
            explicacion: "Confunde tamizaje normal con inmunidad ante futuras infecciones o tipos de VPH a los que no ha estado expuesta.",
            mejoresOpciones: "Las opciones A y B aclaran la complementariedad entre la citología periódica y la inmunización preventiva."
          }
        ]
      }
    ]
  },
  {
    id: "caso-3",
    numero: "Caso 03",
    titulo: "Mamá que teme que vacunar a su hijo incentive el inicio sexual",
    subtitulo: "Madre de un adolescente de 11 años • Consulta pediátrica / preventiva",
    paciente: {
      nombre: "Patricia V.",
      edad: "42 años (Mamá de Mateo, 11 años)",
      genero: "mujer",
      avatarId: "patricia",
      perfil: "Madre comprometida con la salud de su hijo. Le preocupa que aplicar una vacuna ligada a una infección de transmisión sexual envíe un mensaje equivocado.",
      avatarBg: "linear-gradient(135deg, rgba(0, 230, 118, 0.45), rgba(0, 176, 255, 0.65))"
    },
    objeciones: [
      {
        id: "c3-o1",
        numeroObjecion: 1,
        cita: "“No quiero que piense que tiene permiso de iniciar vida sexual”",
        contexto: "La madre duda en autorizar la vacuna recomendada en la cartilla adolescente por temor a influir en la conducta de su hijo.",
        opciones: [
          {
            letra: "A",
            texto: "“Entiendo su preocupación. La vacuna no busca hablar de inicio sexual, sino de prevención anticipada frente a una posible exposición futura.”",
            esOptima: true,
            explicacion: "Desvincula la inmunización preventiva del comportamiento moral o sexual, enfocándose en la biología del sistema inmune."
          },
          {
            letra: "B",
            texto: "“Vacunar no cambia los valores familiares ni las conversaciones sobre sexualidad. Es una medida preventiva, igual que otras vacunas aplicadas antes de que exista un riesgo.”",
            esOptima: true,
            explicacion: "Compara de forma clara la vacuna contra VPH con otras vacunas del esquema infantil (como hepatitis o tétanos) aplicadas anticipadamente."
          },
          {
            letra: "C",
            texto: "“No tiene nada que ver, no se preocupe.”",
            esOptima: false,
            explicacion: "Desestimar el sentimiento materno puede provocar rechazo y el abandono de la vacunación oportuna del adolescente.",
            mejoresOpciones: "Las opciones A y B abordan el dilema ético/educativo con empatía y analogías clínicas efectivas."
          }
        ]
      },
      {
        id: "c3-o2",
        numeroObjecion: 2,
        cita: "“Mi hijo todavía es muy joven”",
        contexto: "Argumenta que prefiere esperar a que su hijo sea mayor de edad para plantear el tema de la vacuna.",
        opciones: [
          {
            letra: "A",
            texto: "“Precisamente se recomienda hablarlo antes de una posible exposición al VPH. La vacunación contra VPH se recomienda de forma rutinaria en adolescentes, y puede iniciarse desde edades tempranas según la recomendación médica local.”",
            esOptima: true,
            fuente: "cancer.gov / aap.org",
            explicacion: "Explica el fundamento inmunológico: mayor respuesta de anticuerpos y máxima eficacia al aplicarse antes del inicio de vida sexual."
          },
          {
            letra: "B",
            texto: "“El objetivo es proteger antes, no después. Podemos revisar qué esquema corresponde según su edad y antecedentes.”",
            esOptima: true,
            explicacion: "Resalta el principio básico de la salud pública: la protección oportuna precede al riesgo."
          },
          {
            letra: "C",
            texto: "“Mejor espérese a que sea más grande.”",
            esOptima: false,
            explicacion: "Postergar la vacuna en la ventana de edad ideal reduce el beneficio de una mejor respuesta inmunogénica.",
            mejoresOpciones: "Las respuestas A y B enfatizan la ventana biológica óptima para una respuesta inmune robusta."
          }
        ]
      },
      {
        id: "c3-o3",
        numeroObjecion: 3,
        cita: "“Me preocupa la seguridad”",
        contexto: "Pregunta si la vacuna es adecuada para el cuerpo de un menor de edad en desarrollo.",
        opciones: [
          {
            letra: "A",
            texto: "“Es una pregunta importante. Las vacunas contra VPH han sido evaluadas en estudios clínicos y monitoreadas por sistemas de seguridad durante años.”",
            esOptima: true,
            fuente: "cdc.gov",
            explicacion: "Respalda la indicación pediátrica y adolescente en millones de dosis administradas a nivel global con estricto seguimiento."
          },
          {
            letra: "B",
            texto: "“Podemos revisar efectos esperados, antecedentes de alergias y cualquier condición médica antes de decidir.”",
            esOptima: true,
            explicacion: "Ofrece un triaje clínico previo a la aplicación para asegurar la tranquilidad de la familia."
          },
          {
            letra: "C",
            texto: "“Todos se la ponen, no debería preocuparse.”",
            esOptima: false,
            explicacion: "Recurrir a la masa sin brindar razones médicas no resuelve el temor materno sobre la salud de su hijo.",
            mejoresOpciones: "Las respuestas A y B entregan certidumbre con base en evidencia epidemiológica e historia clínica."
          }
        ]
      }
    ]
  },
  {
    id: "caso-4",
    numero: "Caso 04",
    titulo: "Hombre de 40 años que cree que VPH es cosa de mujeres",
    subtitulo: "Paciente masculino de 40 años • Chequeo médico ejecutivo",
    paciente: {
      nombre: "Carlos T.",
      edad: "40 años",
      genero: "hombre",
      avatarId: "carlos",
      perfil: "Ejecutivo. Asocia el VPH de forma exclusiva con el cáncer de cuello uterino y desconoce las repercusiones en la salud masculina.",
      avatarBg: "linear-gradient(135deg, rgba(255, 179, 0, 0.45), rgba(255, 109, 0, 0.65))"
    },
    objeciones: [
      {
        id: "c4-o1",
        numeroObjecion: 1,
        cita: "“Eso es un tema de mujeres”",
        contexto: "Reacciona con sorpresa e incredulidad cuando en la consulta se menciona la prevención del VPH en hombres.",
        opciones: [
          {
            letra: "A",
            texto: "“Es una idea común, pero el VPH también puede afectar a hombres. Algunos tipos se asocian con cáncer anal, peneano y orofaríngeo, además de verrugas genitales.”",
            esOptima: true,
            fuente: "cancer.gov",
            explicacion: "Informa sobre la carga de enfermedad por VPH en varones, mencionando neoplasias no ginecológicas y lesiones benignas recurrentes."
          },
          {
            letra: "B",
            texto: "“Muchas veces se habla más del VPH en mujeres por el cáncer cervicouterino, pero la prevención también puede ser relevante para hombres.”",
            esOptima: true,
            explicacion: "Contextualiza por qué la difusión mediática se centró en las mujeres, aclarando el beneficio preventivo en la salud del hombre."
          },
          {
            letra: "C",
            texto: "“No, está equivocado.”",
            esOptima: false,
            explicacion: "Un tono correctivo brusco bloquea la recepción de información médica en un paciente con conceptos preconcebidos.",
            mejoresOpciones: "Las respuestas A y B desmitifican la creencia explicando los riesgos oncológicos y cutáneos reales en varones."
          }
        ]
      },
      {
        id: "c4-o2",
        numeroObjecion: 2,
        cita: "“Yo no tengo síntomas”",
        contexto: "Sostiene que al no observar ningún malestar, verruga o lesión, se encuentra libre de cualquier riesgo.",
        opciones: [
          {
            letra: "A",
            texto: "“Muchas infecciones por VPH pueden no causar síntomas visibles. Por eso, no tener síntomas no siempre descarta exposición.”",
            esOptima: true,
            explicacion: "Explica la naturaleza asintomática y subclínica de la mayoría de las infecciones por VPH en hombres."
          },
          {
            letra: "B",
            texto: "“Es importante diferenciar ausencia de síntomas de ausencia de riesgo. Podemos revisar si por edad y antecedentes vale la pena considerar vacunación.”",
            esOptima: true,
            explicacion: "Establece la distinción epidemiológica entre enfermedad sintomática y portación o riesgo de transmisión futura."
          },
          {
            letra: "C",
            texto: "“Si no tiene síntomas, entonces no hay problema.”",
            esOptima: false,
            explicacion: "Confirma erróneamente un supuesto falso, ya que el VPH suele ser silente en el varón pero transmisible o persistente.",
            mejoresOpciones: "Las opciones A y B educan sobre la historia natural del VPH y la portación subclínica."
          }
        ]
      },
      {
        id: "c4-o3",
        numeroObjecion: 3,
        cita: "“A los 40 ya no aplica”",
        contexto: "Considera que haber cumplido 40 años lo excluye automáticamente de cualquier opción preventiva.",
        opciones: [
          {
            letra: "A",
            texto: "“En adultos, la decisión depende del caso. No se recomienda de rutina para todos después de los 26 años, pero puede evaluarse en algunos adultos mediante conversación médico-paciente.”",
            esOptima: true,
            fuente: "cancer.gov",
            explicacion: "Alinea la sugerencia con las guías de toma de decisión compartida para adultos de 27 a 45 años."
          },
          {
            letra: "B",
            texto: "“Podemos revisar si usted fue vacunado previamente, sus antecedentes y si existe beneficio potencial en su caso.”",
            esOptima: true,
            explicacion: "Propone analizar el historial personal para determinar la conveniencia clínica de la inmunización."
          },
          {
            letra: "C",
            texto: "“Sí, ya se le pasó la edad.”",
            esOptima: false,
            explicacion: "Ignora la ventana médica hasta los 45 años donde la toma de decisión compartida es válida e indicada."
          }
        ]
      }
    ]
  },
  {
    id: "caso-5",
    numero: "Caso 05",
    titulo: "Hombre adolescente de 17 años interesado, pero no confía en médicos",
    subtitulo: "Paciente masculino de 17 años • Consulta de orientación en salud",
    paciente: {
      nombre: "Diego S.",
      edad: "17 años",
      genero: "hombre",
      avatarId: "diego",
      perfil: "Adolescente informado en redes sociales. Le interesa proteger su salud, pero se muestra escéptico y desconfiado ante la figura del médico.",
      avatarBg: "linear-gradient(135deg, rgba(255, 64, 129, 0.45), rgba(255, 110, 64, 0.65))"
    },
    objeciones: [
      {
        id: "c5-o1",
        numeroObjecion: 1,
        cita: "“No confío en los médicos”",
        contexto: "Expresa su recelo de manera abierta al inicio de la sesión clínica.",
        opciones: [
          {
            letra: "A",
            texto: "“Gracias por decirlo con honestidad. Mi objetivo no es presionarte, sino darte información clara para que puedas tomar una decisión informada.”",
            esOptima: true,
            explicacion: "Agradece la sinceridad, desescala la tensión y posiciona al médico como un facilitador de decisiones de salud sin autoritarismo."
          },
          {
            letra: "B",
            texto: "“Podemos revisar tus dudas una por una. También puedo explicarte qué se sabe, qué no se sabe y qué fuentes médicas respaldan la recomendación.”",
            esOptima: true,
            explicacion: "Ofrece transparencia radical en la evidencia científica para construir confianza paso a paso."
          },
          {
            letra: "C",
            texto: "“Si no confías en médicos, entonces no puedo ayudarte.”",
            esOptima: false,
            explicacion: "Reacciona a la defensiva y fractura la alianza terapéutica con un joven que buscaba orientación.",
            mejoresOpciones: "Las respuestas A y B construyen empatía, autonomía y transparencia desde el respeto."
          }
        ]
      },
      {
        id: "c5-o2",
        numeroObjecion: 2,
        cita: "“Leí en redes que la vacuna puede ser peligrosa”",
        contexto: "Menciona haber visto videos que afirman efectos adversos graves e irreversibles.",
        opciones: [
          {
            letra: "A",
            texto: "“Es válido que quieras estar seguro. La seguridad de las vacunas contra VPH ha sido monitoreada durante años, y los efectos más comunes suelen ser locales o transitorios.”",
            esOptima: true,
            fuente: "cdc.gov",
            explicacion: "Acepta la inquietud sin calificar al joven, aportando datos objetivos de seguridad y eventos leves transitorios."
          },
          {
            letra: "B",
            texto: "“Podemos revisar qué viste en redes y compararlo con información de fuentes médicas confiables.”",
            esOptima: true,
            explicacion: "Propone un análisis comparativo crítico para desarrollar pensamiento evaluativo en salud."
          },
          {
            letra: "C",
            texto: "“Eso es falso, no creas en redes.”",
            esOptima: false,
            explicacion: "Invalidar la fuente sin dar contraargumentos científicos aumenta el escepticismo del adolescente.",
            mejoresOpciones: "Las respuestas A y B abren la discusión basada en evidencia de seguridad clínica comprobada."
          }
        ]
      },
      {
        id: "c5-o3",
        numeroObjecion: 3,
        cita: "“Quiero vacunarme, pero no sé cómo pedirlo”",
        contexto: "Muestra verdadero interés en prevenir, pero siente timidez ante el trámite clínico o familiar.",
        opciones: [
          {
            letra: "A",
            texto: "“Puedes decirlo de forma directa: ‘Quiero saber si la vacuna contra VPH es adecuada para mí y qué esquema me corresponde’.”",
            esOptima: true,
            explicacion: "Modelaje y guión de asertividad directo para empoderar al joven en sus consultas de salud."
          },
          {
            letra: "B",
            texto: "“A los 17 años, preguntar por prevención es responsable. Podemos resolver tus dudas y revisar el esquema que corresponde por edad.”",
            esOptima: true,
            explicacion: "Refuerza positivamente la madurez y responsabilidad de cuidar su salud futura."
          },
          {
            letra: "C",
            texto: "“Solo pídesela a tus papás.”",
            esOptima: false,
            explicacion: "Delega la responsabilidad sin brindar orientación ni guiarlo en cómo abordar la conversación.",
            mejoresOpciones: "Las opciones A y B validan la autonomía del joven y le proporcionan un lenguaje clínico asertivo."
          }
        ]
      }
    ]
  },
  {
    id: "caso-6",
    numero: "Caso 06",
    titulo: "Hombre de 30 años que sabe que puede beneficiarse, pero lo deja para después",
    subtitulo: "Paciente masculino de 30 años • Consulta preventiva / check-up",
    paciente: {
      nombre: "Javier L.",
      edad: "30 años",
      genero: "hombre",
      avatarId: "javier",
      perfil: "Profesional joven. Conoce la existencia del VPH y reconoce la utilidad de vacunarse, pero siempre prioriza sus pendientes laborales y pospone su salud.",
      avatarBg: "linear-gradient(135deg, rgba(124, 77, 255, 0.45), rgba(0, 229, 255, 0.65))"
    },
    objeciones: [
      {
        id: "c6-o1",
        numeroObjecion: 1,
        cita: "“Sí me interesa, pero luego lo veo”",
        contexto: "Acepta la utilidad de la medida preventiva pero pospone la toma de acción para un futuro indefinido.",
        opciones: [
          {
            letra: "A",
            texto: "“Entiendo. Si ya tiene interés, el siguiente paso no necesariamente es vacunarse hoy, sino confirmar si es candidato y qué esquema aplicaría.”",
            esOptima: true,
            explicacion: "Desglosa la decisión en pasos sencillos, reduciendo la presión inmediata pero manteniendo el avance del proceso de valoración."
          },
          {
            letra: "B",
            texto: "“Podemos dejar una acción concreta: agendar la consulta o resolver hoy las dudas principales para que no se quede como pendiente.”",
            esOptima: true,
            explicacion: "Establece un compromiso accionable en el presente para evitar que la intención se diluya por postergación."
          },
          {
            letra: "C",
            texto: "“Está bien, cuando quiera.”",
            esOptima: false,
            explicacion: "Actitud pasiva que permite la desatención en salud de un paciente interesado en protegerse.",
            mejoresOpciones: "Las opciones A y B facilitan la concreción de un plan preventivo claro y manejable."
          }
        ]
      },
      {
        id: "c6-o2",
        numeroObjecion: 2,
        cita: "“No lo veo urgente”",
        contexto: "Argumenta que al sentirse totalmente sano y activo, la vacunación no requiere atención en su agenda actual.",
        opciones: [
          {
            letra: "A",
            texto: "“La prevención suele sentirse menos urgente porque no hay síntomas. Pero la vacunación busca prevenir infecciones futuras por tipos de VPH incluidos en la vacuna.”",
            esOptima: true,
            explicacion: "Explica la paradoja de la prevención: su valor radica en actuar antes de la aparición de riesgos u oportunidades de contagio."
          },
          {
            letra: "B",
            texto: "“En adultos de su edad, vale la pena conversar si hay beneficio potencial según antecedentes y riesgo futuro.”",
            esOptima: true,
            fuente: "cancer.gov",
            explicacion: "Invita a evaluar el beneficio a mediano y largo plazo dentro del marco de vida adulta activa."
          },
          {
            letra: "C",
            texto: "“Si no lo ve urgente, no pasa nada.”",
            esOptima: false,
            explicacion: "Valida la procrastinación en salud preventiva, perdiendo la oportunidad de protegerlo a tiempo."
          }
        ]
      },
      {
        id: "c6-o3",
        numeroObjecion: 3,
        cita: "“No tengo tiempo”",
        contexto: "Menciona su agenda saturada como la principal barrera para concretar su esquema.",
        opciones: [
          {
            letra: "A",
            texto: "“Lo entiendo. Podemos resolver en pocos minutos si tiene sentido considerarla y qué preguntas llevaría a una próxima consulta.”",
            esOptima: true,
            explicacion: "Adapta la intervención al tiempo del paciente ofreciendo una síntesis clínica eficiente de 3 minutos."
          },
          {
            letra: "B",
            texto: "“Para hacerlo práctico, podemos definir hoy si requiere valoración, revisar edad y antecedentes, y programar el siguiente paso.”",
            esOptima: true,
            explicacion: "Optimiza la consulta presencial para dejar definido el perfil y la recomendación médica."
          },
          {
            letra: "C",
            texto: "“Entonces mejor lo vemos cuando tenga tiempo.”",
            esOptima: false,
            explicacion: "Abandona el consejo médico estructurado ante una barrera de tiempo superable con una breve orientación."
          }
        ]
      }
    ]
  },
  {
    id: "caso-7",
    numero: "Caso 07",
    titulo: "Hombre que acompaña a su novia al ginecólogo y no sabe nada del VPH",
    subtitulo: "Acompañante masculino de 25 años • Consulta de ginecología",
    paciente: {
      nombre: "Fernando G.",
      edad: "25 años",
      genero: "hombre",
      avatarId: "fernando",
      perfil: "Acompañante masculino. Escucha hablar de VPH por primera vez y muestra curiosidad pero desconoce el tema.",
      avatarBg: "linear-gradient(135deg, rgba(0, 176, 255, 0.45), rgba(0, 230, 118, 0.65))"
    },
    objeciones: [
      {
        id: "c7-o1",
        numeroObjecion: 1,
        cita: "“No sé nada del VPH”",
        contexto: "Admite abiertamente su desconocimiento cuando el médico menciona la importancia de la prevención en la pareja.",
        opciones: [
          {
            letra: "A",
            texto: "“El VPH es una infección común que puede afectar a mujeres y hombres. Algunos tipos se asocian con verrugas genitales y ciertos tipos de cáncer.”",
            esOptima: true,
            fuente: "cancer.gov",
            explicacion: "Proporciona una definición sintética, clara y sin estigmas de la infección y sus posibles manifestaciones clínicas."
          },
          {
            letra: "B",
            texto: "“Es normal no conocerlo si nunca se lo han explicado. Podemos empezar por lo básico: qué es, cómo se previene y cuándo considerar vacunación.”",
            esOptima: true,
            explicacion: "Acoge la falta de conocimiento con empatía pedagógica e inicia un diálogo informativo incluyente."
          },
          {
            letra: "C",
            texto: "“Debería informarse más.”",
            esOptima: false,
            explicacion: "Culpabiliza o avergüenza al paciente por no poseer conocimientos médicos previos."
          }
        ]
      },
      {
        id: "c7-o2",
        numeroObjecion: 2,
        cita: "“Pensé que era un tema de mi novia”",
        contexto: "Se muestra desorientado de por qué el tema podría involucrarlo a él en lugar de ser únicamente de interés femenino.",
        opciones: [
          {
            letra: "A",
            texto: "“Muchas personas lo piensan porque suele hablarse del VPH en ginecología, pero también puede ser relevante para hombres.”",
            esOptima: true,
            explicacion: "Aclara la brecha de difusión histórica y reposiciona al varón como actor clave en la salud sexual compartida."
          },
          {
            letra: "B",
            texto: "“La prevención del VPH puede involucrar a ambos. Si usted no fue vacunado previamente, podemos revisar si por edad corresponde hablar de vacunación.”",
            esOptima: true,
            explicacion: "Promueve la corresponsabilidad en la pareja y abre la oportunidad de revisar su propio esquema de vacunación."
          },
          {
            letra: "C",
            texto: "“No, también es su problema.”",
            esOptima: false,
            explicacion: "Usa un tono confrontativo que genera rechazo en lugar de incentivar la corresponsabilidad preventiva."
          }
        ]
      },
      {
        id: "c7-o3",
        numeroObjecion: 3,
        cita: "“¿Yo también debería vacunarme?”",
        contexto: "Muestra interés directo en saber si la vacuna está indicada para él a sus 25 años.",
        opciones: [
          {
            letra: "A",
            texto: "“Depende de su edad, antecedentes y si fue vacunado previamente. Podemos revisar esos puntos para saber si tiene sentido considerarlo.”",
            esOptima: true,
            explicacion: "Define la necesidad de una evaluación médica express considerando su rango de edad (25 años) e historial."
          },
          {
            letra: "B",
            texto: "“En personas hasta 26 años no vacunadas adecuadamente, la vacunación está recomendada; en adultos de 27 a 45 años, puede evaluarse mediante conversación médico-paciente.”",
            esOptima: true,
            fuente: "cancer.gov",
            explicacion: "Detalla la recomendación clínica estándar en su grupo de edad (< 26 años) respaldada por guías médicas de inmunización."
          },
          {
            letra: "C",
            texto: "“Sí, debería vacunarse.”",
            esOptima: false,
            explicacion: "Prescribe o indica la vacuna de manera automática sin verificar previamente su historial vacunal previo o contraindicaciones."
          }
        ]
      }
    ]
  }
];

// Mensaje normativo y disclaimer estándar
const DISCLAIMER_MSD = {
  mensajeFinal: "“La vacunación contra VPH debe evaluarse de acuerdo con edad, antecedentes, historial de vacunación y criterio médico. Consulte la información aprobada de GARDASIL®9 y confirme el esquema correspondiente según la indicación local vigente.”",
  cta: "Continúe la conversación y evalúe si GARDASIL®9 es una opción adecuada para este paciente."
};
