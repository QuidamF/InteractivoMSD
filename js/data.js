/**
 * Base de datos oficial de los 7 Casos Clínicos del Interactivo GARDA TOUR (MSD)
 * Basada en el Árbol de Decisión HCP | GARDASIL®9
 */

const CASOS_DATA = [
  {
    "id": "caso-1",
    "numero": "CASO 01",
    "titulo": "Mujer Joven Abrumada por Redes y ChatGPT",
    "subtitulo": "Camila M. • 22 años",
    "paciente": {
      "nombre": "Camila M.",
      "edad": "22 años",
      "perfil": "Estudiante universitaria abrumada por exceso de información en redes sociales y ChatGPT.",
      "genero": "mujer",
      "avatarId": "camila",
      "avatarBg": "linear-gradient(135deg, #FF4081, #7C4DFF)",
      "avatarImg": "assets/avatars/camila.png"
    },
    "objeciones": [
      {
        "id": "c1-o1",
        "cita": "“He leído demasiadas cosas y ya no sé qué creer”",
        "contexto": "Camila entra a consulta ginecológica manifestando confusión tras leer opiniones contradictorias en redes sobre la vacuna.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Entiendo que pueda sentirse abrumada. Mi rol es ayudarle a navegar esa información con base en evidencia médica. Por ejemplo, Gardasil® 9 está indicada para prevenir lesiones precancerosas, cánceres y verrugas genitales causados por 9 tipos de VPH.”",
            "esOptima": true,
            "explicacion": "Valida la preocupación de la paciente, ofrece contención y redirige hacia información médica confiable basada en la indicación oficial.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“Es normal encontrar información mixta. Podemos revisar juntos sus dudas y contrastarlas con datos de estudios clínicos. Gardasil® 9 ha demostrado una eficacia de hasta el 97.4% en la prevención de lesiones de alto grado causadas por los tipos de VPH 31, 33, 45, 52 y 58.”",
            "esOptima": true,
            "explicacion": "Valida la preocupación y fundamenta la consulta con datos de eficacia de estudios clínicos de GARDASIL®9.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“La verdad es que la mayoría de lo que se lee en internet está exagerado. Lo mejor es seguir las recomendaciones médicas estándar sin darle tantas vueltas; si los doctores la recomiendan es por algo.”",
            "esOptima": false,
            "explicacion": "Aunque bien intencionada, esta respuesta invalida la iniciativa de la paciente y suena paternalista. No educa ni aprovecha la oportunidad de generar confianza. Esta respuesta puede sonar descalificadora y cerrar la conversación.",
            "mejoresOpciones": "Mejores opciones: A o B, porque validan la preocupación y redirigen hacia información médica confiable."
          }
        ]
      },
      {
        "id": "c1-o2",
        "cita": "“Me preocupan los efectos secundarios”",
        "contexto": "Camila expresa inquietud sobre la seguridad y las reacciones adversas de la vacuna.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Es una duda válida. Según los estudios clínicos, las reacciones más comunes son locales y leves, como dolor, hinchazón o enrojecimiento en el sitio de la inyección (reportado en el 84.8% de los participantes) y dolor de cabeza (13.2%). Los efectos graves relacionados a la vacuna son muy raros.”",
            "esOptima": true,
            "explicacion": "Explica la seguridad de la vacuna con datos específicos de la IPP sobre las reacciones locales y generales más frecuentes.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“Podemos revisar sus antecedentes. Es importante saber que Gardasil® 9 no contiene conservadores ni antibióticos, y los efectos adversos suelen ser de intensidad leve a moderada y transitorios.”",
            "esOptima": true,
            "explicacion": "Ofrece evaluación individualizada y aporta tranquilidad sobre los componentes y el carácter transitorio de los efectos secundarios.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Esta vacuna es muy segura, prácticamente como cualquier otra del esquema. Las reacciones son las de siempre, un poco de dolor en el brazo y ya. Si hubiera riesgos importantes, no estaría aprobada.”",
            "esOptima": false,
            "explicacion": "Esta respuesta minimiza la preocupación, generaliza la seguridad sin dar datos específicos de la IPP y no informa sobre las reacciones más frecuentes documentadas (dolor local, cefalea), perdiendo precisión.",
            "mejoresOpciones": "Mejores opciones: A o B, porque explican seguridad, reacciones esperadas y evaluación individual."
          }
        ]
      },
      {
        "id": "c1-o3",
        "cita": "“ChatGPT me dijo otra cosa”",
        "contexto": "Camila consulta una recomendación que obtuvo en una herramienta de Inteligencia Artificial.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Las herramientas de IA son útiles, pero no reemplazan una valoración médica personalizada. La decisión de vacunar se basa en sus antecedentes, su edad y los beneficios potenciales, como la prevención de cerca del 90% de los casos de cáncer cervicouterino.”",
            "esOptima": true,
            "explicacion": "Reconoce la iniciativa de la paciente y posiciona al médico como guía confiable con base clínica e impacto preventivo.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“Interesante, ¿qué leyó? Podemos usarlo para aclarar puntos. Por ejemplo, la vacuna protege contra 9 tipos de VPH (6, 11, 16, 18, 31, 33, 45, 52 y 58), que son responsables de la mayoría de las enfermedades relacionadas con el VPH.”",
            "esOptima": true,
            "explicacion": "Utiliza la inquietud de la paciente para educar sobre la amplia cobertura de 9 tipos de VPH de Gardasil® 9.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“ChatGPT no sirve para temas médicos.”",
            "esOptima": false,
            "explicacion": "La respuesta puede generar resistencia, especialmente si la paciente ya buscó información por su cuenta.",
            "mejoresOpciones": "Mejores opciones: A o B, porque reconocen su iniciativa y posicionan al HCP como guía confiable."
          }
        ]
      }
    ]
  },
  {
    "id": "caso-2",
    "numero": "CASO 02",
    "titulo": "Mujer en Relación Monógama",
    "subtitulo": "Elena R. • 50 años",
    "paciente": {
      "nombre": "Elena R.",
      "edad": "50 años",
      "perfil": "Mujer adulta madura en relación monógama estable por años.",
      "genero": "mujer",
      "avatarId": "elena",
      "avatarBg": "linear-gradient(135deg, #E040FB, #00E5FF)",
      "avatarImg": "assets/avatars/elena.png"
    },
    "objeciones": [
      {
        "id": "c2-o1",
        "cita": "“Estoy casada, no veo por qué vacunarme”",
        "contexto": "Elena cuestiona la necesidad de vacunarse estando en un matrimonio de larga duración.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Entiendo su punto. En adultos, la decisión debe individualizarse según edad, antecedentes, exposición previa y posibles riesgos futuros. Aunque esté en una relación monógama, el VPH puede permanecer latente de exposiciones previas. La vacuna previene infecciones futuras por los tipos que incluye, pero no trata las ya existentes.”",
            "esOptima": true,
            "explicacion": "Abre una decisión compartida e individualizada explicando la latencia viral y el carácter preventivo de la vacuna.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“En personas adultas, la vacunación contra VPH no es una recomendación rutinaria para todos; puede evaluarse mediante una conversación médico-paciente, especialmente entre los 27 y 45 años.”",
            "esOptima": true,
            "explicacion": "Encuadra la toma de decisiones compartida e individualizada en adultos de acuerdo con la IPP.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Dado que usted ha estado en una relación monógama estable por años, su riesgo de adquirir una nueva infección es prácticamente nulo. Estas vacunas se enfocan en poblaciones jóvenes, por lo que en su caso el beneficio realmente no justificaría la aplicación.”",
            "esOptima": false,
            "explicacion": "Esta respuesta hace una suposición riesgosa y cierra la puerta a la decisión compartida, que es clave en este grupo de edad. La IPP respalda la evaluación del beneficio en mujeres de 27-45 años.",
            "mejoresOpciones": "Mejores opciones: A o B, porque abren una decisión compartida e individualizada."
          }
        ]
      },
      {
        "id": "c2-o2",
        "cita": "“A mi edad ya no tiene sentido”",
        "contexto": "Elena piensa que la vacuna solo es útil en adolescentes o jóvenes.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“La eficacia de Gardasil® 9 se ha demostrado en mujeres de 24 a 45 años. Aunque la respuesta inmune puede ser menor que en adolescentes, sigue siendo robusta.”",
            "esOptima": true,
            "explicacion": "Presenta la evidencia clínica de eficacia en mujeres adultas y la respuesta inmune comprobada.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“La decisión depende de una conversación médico-paciente. Los estudios clínicos respaldan la eficacia en este grupo de edad (ej. eficacia del 88.7% contra enfermedad por VPH 6, 11, 16, 18), por lo que vale la pena evaluarlo.”",
            "esOptima": true,
            "explicacion": "Cita datos de eficacia clínica en mujeres adultas para sustentar la evaluación individualizada.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Sí, el beneficio principal de la vacuna se obtiene cuando se aplica antes del inicio de la vida sexual. A su edad, es muy probable que ya haya estado expuesta a varios tipos del virus, por lo que la protección que obtendría sería muy limitada.”",
            "esOptima": false,
            "explicacion": "Aunque contiene una parte de verdad (el beneficio es mayor antes de la exposición), la respuesta es desalentadora y omite que la vacuna aún puede proteger contra los tipos de VPH a los que no ha sido expuesta.",
            "mejoresOpciones": "Mejores opciones: A o B, porque explican el principio preventivo y la necesidad de valoración individual."
          }
        ]
      },
      {
        "id": "c2-o3",
        "cita": "“Nunca he tenido un Papanicolaou anormal”",
        "contexto": "Elena asume que tener citologías ginecológicas normales reemplaza la inmunización.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Es una buena noticia. Aun así, el tamizaje y la vacunación tienen objetivos diferentes: el tamizaje detecta cambios, mientras la vacunación busca prevenir infecciones futuras por ciertos tipos de VPH.”",
            "esOptima": true,
            "explicacion": "Diferencia claramente el objetivo de detección del tamizaje frente a la protección preventiva de la vacunación.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“Que sus estudios hayan salido bien no elimina la importancia de continuar con seguimiento ginecológico según indicación médica.”",
            "esOptima": true,
            "explicacion": "Refuerza la importancia de la continuidad del cuidado ginecológico y el tamizaje regular.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Entonces no hay nada de qué preocuparse.”",
            "esOptima": false,
            "explicacion": "La respuesta puede dar una falsa sensación de seguridad y omitir el valor del seguimiento.",
            "mejoresOpciones": "Mejores opciones: A o B, porque diferencian prevención, detección y continuidad del cuidado."
          }
        ]
      }
    ]
  },
  {
    "id": "caso-3",
    "numero": "CASO 03",
    "titulo": "Madre y Prevención Temprana",
    "subtitulo": "Patricia V. • 42 años",
    "paciente": {
      "nombre": "Patricia V.",
      "edad": "42 años",
      "perfil": "Madre de familia preocupada por la salud y la educación de su hijo preadolescente.",
      "genero": "mujer",
      "avatarId": "patricia",
      "avatarBg": "linear-gradient(135deg, #FF9800, #FF4081)",
      "avatarImg": "assets/avatars/patricia.png"
    },
    "objeciones": [
      {
        "id": "c3-o1",
        "cita": "“No quiero que piense que tiene permiso de iniciar vida sexual”",
        "contexto": "Patricia teme que vacunar a su hijo a edad temprana incentive el inicio de su conducta sexual.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Entiendo perfectamente su preocupación. El objetivo de la vacuna no es hablar sobre la vida sexual, sino de prevención a futuro. Es una medida de salud para proteger a su hijo/a contra cánceres y enfermedades que podría enfrentar en su vida adulta.”",
            "esOptima": true,
            "explicacion": "Valida el sentir de la madre y separa con empatía la inmunización médica del ámbito de conducta sexual.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“Vacunar es una decisión médica que no interfiere con los valores que usted le enseña en casa. Es una herramienta de prevención, similar a ponerle la vacuna del tétanos por si algún día se corta, no porque queramos que se corte.”",
            "esOptima": true,
            "explicacion": "Utiliza una analogía clara para reforzar que la prevención médica respeta la educación y valores del hogar.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Esa es una idea de antes, ya está muy estudiado que la vacuna no acelera el inicio sexual. Son dos temas completamente separados, uno es de salud y el otro es de educación en casa, no hay que mezclarlos.”",
            "esOptima": false,
            "explicacion": "Aunque la afirmación es correcta, el tono puede sonar condescendiente (“es una idea de antes”) y no empatiza con la preocupación genuina de la madre, generando una posible barrera.",
            "mejoresOpciones": "Mejores opciones: A o B, porque validan su inquietud y separan prevención de conducta sexual."
          }
        ]
      },
      {
        "id": "c3-o2",
        "cita": "“Mi hijo todavía es muy joven”",
        "contexto": "Patricia duda de si la edad preadolescente es adecuada para administrar la vacuna.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Precisamente por eso es el mejor momento. La IPP indica que la vacuna se puede administrar desde los 9 años porque buscamos generar protección muchos años antes de una posible exposición al virus. Así, su sistema inmune ya estará preparado.”",
            "esOptima": true,
            "explicacion": "Explica la indicación oficial desde los 9 años de edad para anticipar la protección antes de cualquier exposición.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“El objetivo es protegerlo antes. Los estudios muestran que la respuesta inmune a la vacuna es mucho más fuerte en preadolescentes y adolescentes (9-15 años) que en adultos jóvenes, por lo que estamos en la ventana ideal para lograr la mejor protección posible para él.”",
            "esOptima": true,
            "explicacion": "Fundamenta la ventaja biológica de la mayor inmunogenicidad en el grupo de 9 a 15 años.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Comprendo su preocupación y podemos esperamos a que sea más grande, así no alteramos ni a su hijo ni a usted con temas sexuales.”",
            "esOptima": false,
            "explicacion": "La respuesta retrasa una oportunidad preventiva sin justificar clínicamente.",
            "mejoresOpciones": "Mejores opciones: A o B, porque explican el beneficio de anticiparse a la exposición."
          }
        ]
      },
      {
        "id": "c3-o3",
        "cita": "“Me preocupa la seguridad”",
        "contexto": "Patricia busca garantías sobre los estudios de seguridad en niños y adolescentes.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Es una pregunta importante. Las vacunas contra VPH han sido evaluadas en estudios clínicos y monitoreadas por sistemas de seguridad durante años.”",
            "esOptima": true,
            "explicacion": "Brinda tranquilidad mediante datos de farmacovigilancia y estudios clínicos en población pediátrica y adolescente.",
            "fuente": "cdc.gov / IPP"
          },
          {
            "letra": "B",
            "texto": "“Podemos revisar efectos esperados, antecedentes de alergias y cualquier condición médica antes de decidir.”",
            "esOptima": true,
            "explicacion": "Propone una evaluación médica personalizada previa para resolver cualquier inquietud particular de seguridad.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Todos se la ponen, no debería preocuparse.”",
            "esOptima": false,
            "explicacion": "La respuesta apela a lo que hacen otros, pero no resuelve la preocupación individual.",
            "mejoresOpciones": "Mejores opciones: A o B, porque explican seguridad y valoración médica personalizada."
          }
        ]
      }
    ]
  },
  {
    "id": "caso-4",
    "numero": "CASO 04",
    "titulo": "Varón Adulto y Cánceres no Ginecológicos",
    "subtitulo": "Carlos T. • 40 años",
    "paciente": {
      "nombre": "Carlos T.",
      "edad": "40 años",
      "perfil": "Ejecutivo que considera que el VPH es un tema exclusivo de la salud femenina.",
      "genero": "hombre",
      "avatarId": "carlos",
      "avatarBg": "linear-gradient(135deg, #00E5FF, #3F51B5)",
      "avatarImg": "assets/avatars/carlos.png"
    },
    "objeciones": [
      {
        "id": "c4-o1",
        "cita": "“Eso es un tema de mujeres”",
        "contexto": "Carlos asume que la vacuna contra el VPH no tiene relevancia en hombres.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Es una idea común, pero el VPH también puede afectar a hombres. Algunos tipos se asocian con cáncer anal y orofaríngeo, además de verrugas genitales.”",
            "esOptima": true,
            "explicacion": "Informa de forma directa sobre la carga de enfermedad masculina (cáncer orofaríngeo, anal y verrugas genitales).",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“La infección por VPH es muy común en ambos sexos. En hombres, los tipos 16 y 18 se asocian a cánceres orofaríngeos, y los tipos 6 y 11 causan el 90% de las verrugas genitales. La vacunación es una barrera de protección directa para usted.”",
            "esOptima": true,
            "explicacion": "Detalla los genotipos de VPH implicados en enfermedades masculinas y el beneficio de protección directa.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“No, en realidad los hombres son los principales portadores del virus, por eso es clave que también se vacunen para cortar la cadena de transmisión. Si los hombres se vacunan, protegen indirectamente a las mujeres.”",
            "esOptima": false,
            "explicacion": "Aunque busca un bien mayor (protección comunitaria), este mensaje puede ser percibido como que la única razón para vacunarse es proteger a otros, ignorando los importantes beneficios directos (prevención de sus propios cánceres y verrugas) que la vacuna le ofrece.",
            "mejoresOpciones": "Mejores opciones: A o B, porque educan sin invalidar al paciente."
          }
        ]
      },
      {
        "id": "c4-o2",
        "cita": "“Yo no tengo síntomas”",
        "contexto": "Carlos cree que al no presentar lesiones visibles no corre ningún riesgo.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Muchas infecciones por VPH pueden no causar síntomas visibles. Por eso, no tener síntomas no siempre descarta exposición al virus.”",
            "esOptima": true,
            "explicacion": "Aclara que la portación de VPH suele ser silente o asintomática en los varones.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“Es importante diferenciar ausencia de síntomas de ausencia de riesgo. Podemos revisar si por edad y antecedentes vale la pena considerar vacunación.”",
            "esOptima": true,
            "explicacion": "Establece la diferencia entre asintomático y ausencia de riesgo, orientando la decisión compartida.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Si no tiene síntomas, entonces no hay problema y no tiene nada de qué preocuparse.”",
            "esOptima": false,
            "explicacion": "La respuesta puede ser clínicamente insuficiente y generar falsa tranquilidad.",
            "mejoresOpciones": "Mejores opciones: A o B, porque explican que el VPH puede no ser evidente."
          }
        ]
      },
      {
        "id": "c4-o3",
        "cita": "“A los 40 ya no aplica”",
        "contexto": "Carlos piensa que ha superado el rango de edad indicado para la vacuna.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“La recomendación es similar a la de las mujeres. La vacunación rutinaria es hasta los 26 años, pero la eficacia en hombres de 27 a 45 años se infiere de los sólidos datos en mujeres de la misma edad y de la respuesta inmune comparable, por lo que es una decisión que podemos tomar juntos.”",
            "esOptima": true,
            "explicacion": "Explica la fundamentación clínica de inmunogenicidad y decisión compartida en varones de 27 a 45 años.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“Podemos revisar sus antecedentes. Si no ha sido vacunado, Gardasil® 9 puede ofrecerle protección contra los 9 tipos de VPH. Los estudios muestran una respuesta inmune robusta y persistente en hombres adultos.”",
            "esOptima": true,
            "explicacion": "Resalta la respuesta inmune persistente documentada en varones adultos sin vacunación previa.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Sí, ya se le pasó la edad.”",
            "esOptima": false,
            "explicacion": "La respuesta cierra la posibilidad de decisión compartida.",
            "mejoresOpciones": "Mejores opciones: A o B, porque explican que en adultos se individualiza."
          }
        ]
      }
    ]
  },
  {
    "id": "caso-5",
    "numero": "CASO 05",
    "titulo": "Adolescente e Información Digital",
    "subtitulo": "Diego S. • 17 años",
    "paciente": {
      "nombre": "Diego S.",
      "edad": "17 años",
      "perfil": "Adolescente interesado en cuidar su salud, pero escéptico de las figuras médicas.",
      "genero": "hombre",
      "avatarId": "diego",
      "avatarBg": "linear-gradient(135deg, #FFEB3B, #FF9800)",
      "avatarImg": "assets/avatars/diego.png"
    },
    "objeciones": [
      {
        "id": "c5-o1",
        "cita": "“No confío en los médicos”",
        "contexto": "Diego muestra recelo hacia la autoridad médica y busca autonomía en su salud.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Haces bien en querer estar seguro. La seguridad de Gardasil® 9 se ha monitoreado por más de una década en miles de personas. La información de la IPP, basada en estudios clínicos, muestra que la mayoría de las reacciones son leves, como dolor en el brazo.”",
            "esOptima": true,
            "explicacion": "Valida el sentido crítico del joven e informa sobre el monitoreo de farmacovigilancia por más de 10 años.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“Podemos revisar juntos eso que viste y lo comparamos con la información científica oficial. Así puedes ver los datos por ti mismo y evaluar la fuente de lo que leíste. Mi objetivo es que tomes una decisión con la que te sientas tranquilo y bien informado.”",
            "esOptima": true,
            "explicacion": "Construye un puente de diálogo transparente guiándolo a analizar evidencia oficial sin autoritarismo.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Ten mucho cuidado con lo que lees en redes, el 90% son noticias falsas. Si la vacuna fuera peligrosa, agencias como la FDA o COFEPRIS no la habrían aprobado para su uso en millones de personas. Es más seguro confiar en la ciencia que en un post.”",
            "esOptima": false,
            "explicacion": "Esta respuesta descalifica la fuente del paciente de forma tajante y apela a la autoridad (“confiar en la ciencia”) sin construir un puente de confianza. Puede generar más resistencia en un adolescente ya escéptico.",
            "mejoresOpciones": "Mejores opciones: A o B, porque abren diálogo y respetan su autonomía."
          }
        ]
      },
      {
        "id": "c5-o2",
        "cita": "“Leí en redes que la vacuna puede ser peligrosa”",
        "contexto": "Diego refiere haber visto publicaciones alarmistas en redes sociales.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Es válido que quieras estar seguro. La seguridad de las vacunas contra VPH ha sido monitoreada durante años, y los efectos más comunes suelen ser locales o transitorios.”",
            "esOptima": true,
            "explicacion": "Acoge la duda sin confrontar y aclara la transitoriedad de los efectos esperados.",
            "fuente": "cdc.gov / IPP"
          },
          {
            "letra": "B",
            "texto": "“Podemos revisar qué viste en redes y compararlo con información de fuentes médicas confiables.”",
            "esOptima": true,
            "explicacion": "Propone un ejercicio de pensamiento crítico evaluando las fuentes médicas confiables.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Eso es falso, no creas en redes.”",
            "esOptima": false,
            "explicacion": "Aunque busque corregir, puede sonar impositivo y generar más desconfianza.",
            "mejoresOpciones": "Mejores opciones: A o B, porque validan la inquietud y proponen revisar evidencia."
          }
        ]
      },
      {
        "id": "c5-o3",
        "cita": "“Quiero vacunarme, pero no sé cómo pedirlo”",
        "contexto": "Diego desea vacunarse pero le falta lenguaje asertivo para gestionarlo.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Puedes decirlo de forma directa: ‘Quiero saber si la vacuna contra VPH es adecuada para mí y qué esquema me corresponde’.”",
            "esOptima": true,
            "explicacion": "Le brinda un guión asertivo y directo para desenvolverse en la consulta médica.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“A los 17 años, preguntar por prevención es responsable. Podemos resolver tus dudas y revisar el esquema que corresponde por edad.”",
            "esOptima": true,
            "explicacion": "Refuerza positivamente la iniciativa preventiva y orienta sobre el esquema de dosificación según la edad.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Solo pídesela a tus papás.”",
            "esOptima": false,
            "explicacion": "La respuesta no acompaña al adolescente ni le da herramientas para la conversación.",
            "mejoresOpciones": "Mejores opciones: A o B, porque le dan lenguaje concreto y refuerzan una conducta preventiva."
          }
        ]
      }
    ]
  },
  {
    "id": "caso-6",
    "numero": "CASO 06",
    "titulo": "Profesional Adulto que Posiciona Prevención",
    "subtitulo": "Javier L. • 30 años",
    "paciente": {
      "nombre": "Javier L.",
      "edad": "30 años",
      "perfil": "Profesional activo que posterga la vacunación por agenda y falta de urgencia percibida.",
      "genero": "hombre",
      "avatarId": "javier",
      "avatarBg": "linear-gradient(135deg, #00BCD4, #3F51B5)",
      "avatarImg": "assets/avatars/javier.png"
    },
    "objeciones": [
      {
        "id": "c6-o1",
        "cita": "“Sí me interesa, pero luego lo veo”",
        "contexto": "Javier reconoce el interés pero difiere la acción preventiva a un futuro incierto.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Entiendo. El primer paso no tiene que ser vacunarse hoy mismo. Lo que podemos hacer ahora es confirmar si eres un buen candidato, qué esquema de 3 dosis te aplicaría y resolver cualquier duda pendiente. Así ya tienes la información clara para cuando decidas actuar.”",
            "esOptima": true,
            "explicacion": "Reduce la fricción proponiendo resolver la evaluación del esquema de 3 dosis de forma inmediata sin presionar.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“La prevención a veces se siente así, como algo que puede esperar. Para que no se quede en el aire, ¿qué te parece si lo dejamos como una meta y agendamos una cita de valoración en las próximas semanas? Así le damos un espacio formal.”",
            "esOptima": true,
            "explicacion": "Ayuda a concretar la intención en una cita formal de valoración médica.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Bueno, es tu decisión, pero ten en cuenta que mientras más tiempo dejes pasar, más riesgo tienes de exponerte a alguno de los 9 tipos de VPH. La protección es más efectiva cuando te anticipas.”",
            "esOptima": false,
            "explicacion": "Esta respuesta utiliza el miedo (“más riesgo tienes”) como un motivador, lo cual puede ser contraproducente. Es mejor enfocarse en facilitar el siguiente paso de manera positiva que en presionar con consecuencias negativas.",
            "mejoresOpciones": "Mejores opciones: A o B, porque proponen un siguiente paso claro."
          }
        ]
      },
      {
        "id": "c6-o2",
        "cita": "“No lo veo urgente”",
        "contexto": "Javier no percibe apremio al no sentirse enfermo.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“La prevención suele sentirse menos urgente porque no hay síntomas. Pero la vacunación busca prevenir infecciones futuras por tipos de VPH incluidos en la vacuna.”",
            "esOptima": true,
            "explicacion": "Explica por qué la vacunación preventiva debe considerarse antes de que ocurran exposiciones futuras.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“En adultos de su edad, vale la pena conversar si hay beneficio potencial según antecedentes y riesgo futuro.”",
            "esOptima": true,
            "explicacion": "Enmarca el análisis del beneficio potencial según el perfil de salud del adulto.",
            "fuente": "cancer.gov / IPP"
          },
          {
            "letra": "C",
            "texto": "“Si no lo ve urgente, no pasa nada.”",
            "esOptima": false,
            "explicacion": "La respuesta refuerza la postergación y no educa sobre prevención.",
            "mejoresOpciones": "Mejores opciones: A o B, porque explican por qué la prevención debe evaluarse antes de que exista exposición futura."
          }
        ]
      },
      {
        "id": "c6-o3",
        "cita": "“No tengo tiempo”",
        "contexto": "Javier argumenta falta de tiempo en su rutina diaria.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Lo entiendo. Podemos resolver en pocos minutos si tiene sentido considerarla y qué preguntas llevaría a una próxima consulta.”",
            "esOptima": true,
            "explicacion": "Respeta el tiempo del paciente ofreciendo una síntesis clínica breve y efectiva.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“Para hacerlo práctico, podemos definir hoy si requiere valoración, revisar edad y antecedentes, y programar el siguiente paso.”",
            "esOptima": true,
            "explicacion": "Optimiza el espacio de consulta para avanzar en la evaluación de sus antecedentes.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Entonces mejor lo vemos cuando tenga tiempo.”",
            "esOptima": false,
            "explicacion": "La respuesta pierde la oportunidad de facilitar la acción.",
            "mejoresOpciones": "Mejores opciones: A o B, porque reducen fricción y proponen una acción concreta."
          }
        ]
      }
    ]
  },
  {
    "id": "caso-7",
    "numero": "CASO 07",
    "titulo": "Acompañante y Salud Compartida",
    "subtitulo": "Fernando G. • 25 años",
    "paciente": {
      "nombre": "Fernando G.",
      "edad": "25 años",
      "perfil": "Joven que acompaña a su novia a consulta y desconoce el alcance del VPH.",
      "genero": "hombre",
      "avatarId": "fernando",
      "avatarBg": "linear-gradient(135deg, #4CAF50, #00E5FF)",
      "avatarImg": "assets/avatars/fernando.png"
    },
    "objeciones": [
      {
        "id": "c7-o1",
        "cita": "“No sé nada del VPH”",
        "contexto": "Fernando admite falta de conocimiento sobre el virus durante la consulta.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“El VPH es una infección común que puede afectar a mujeres y hombres. Algunos tipos se asocian con verrugas genitales y ciertos tipos de cáncer.”",
            "esOptima": true,
            "explicacion": "Brinda una definición clara, neutral y libre de estigmas sobre el VPH en ambos sexos.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“Es normal no conocerlo si nunca se lo han explicado. Podemos empezar por lo básico: qué es, cómo se previene y cuándo considerar vacunación.”",
            "esOptima": true,
            "explicacion": "Acoge con empatía la duda del paciente e inicia un proceso educativo incluyente.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Debería informarse más.”",
            "esOptima": false,
            "explicacion": "La respuesta puede sonar juzgadora y generar incomodidad.",
            "mejoresOpciones": "Mejores opciones: A o B, porque educan sin culpar."
          }
        ]
      },
      {
        "id": "c7-o2",
        "cita": "“Pensé que era un tema de mi novia”",
        "contexto": "Fernando cree que la consulta de VPH solo concierne a las mujeres.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Muchas personas lo piensan porque suele hablarse del VPH en ginecología, pero también puede ser relevante para hombres.”",
            "esOptima": true,
            "explicacion": "Aclara la percepción común integrando la relevancia de la salud del varón.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“La prevención del VPH puede involucrar a ambos. Si usted no fue vacunado previamente, podemos revisar si por edad corresponde hablar de vacunación.”",
            "esOptima": true,
            "explicacion": "Promueve la corresponsabilidad en la pareja y revisa su criterio de edad (hasta los 26 años de rutina).",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“No, también es su problema.”",
            "esOptima": false,
            "explicacion": "La respuesta puede sonar acusatoria.",
            "mejoresOpciones": "Mejores opciones: A o B, porque integran al paciente sin hacerlo sentir señalado."
          }
        ]
      },
      {
        "id": "c7-o3",
        "cita": "“¿Yo también debería vacunarme?”",
        "contexto": "Fernando pregunta si la vacuna está indicada para él.",
        "opciones": [
          {
            "letra": "A",
            "texto": "“Es una excelente pregunta. La respuesta depende de tu edad y de si te vacunaste previamente. La IPP recomienda la vacunación en hombres para prevenir diversas enfermedades, incluyendo verrugas genitales y algunos tipos de cáncer.”",
            "esOptima": true,
            "explicacion": "Explica que la vacunación en varones previene verrugas genitales y cánceres, evaluando edad y antecedentes.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "B",
            "texto": "“Qué bueno que lo preguntas. La vacunación con Gardasil® 9 está recomendada de rutina hasta los 26 años. En hombres de 27 a 45, se evalúa en una conversación con el médico. Podemos revisar tu caso para ver si es una opción beneficiosa para ti.”",
            "esOptima": true,
            "explicacion": "Precisa la recomendación de rutina hasta los 26 años (como el caso de Fernando de 25 años) e individualización en adultos.",
            "fuente": "IPP GARDASIL®9"
          },
          {
            "letra": "C",
            "texto": "“Sí, claro. Hoy en día la recomendación es universal, tanto para hombres como para mujeres. así que podrías considerarlo.”",
            "esOptima": false,
            "explicacion": "La respuesta es demasiado directa (“Sí, claro”) y da una recomendación sin evaluar primero los factores clave (edad, historial de vacunación). La recomendación debe ser individualizada, no una afirmación general.",
            "mejoresOpciones": "Mejores opciones: A o B, porque consideran edad, antecedentes y decisión médica individual."
          }
        ]
      }
    ]
  }
];
