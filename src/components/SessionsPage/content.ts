import type { Story } from "../StoryDialog/StoryDialog";

/** Text from Nico's "Sesiones de terapia" doc. */

export type Tile = Story & { photo: string };

export const QUESTIONS: Story[] = [
  {
    title: "¿Cómo sé si esto es para mí?",
    body: [
      {
        list: [
          "Si sientes cierta confusión o desorden con respecto a lo que estás viviendo y sintiendo en este momento.",
          "Si estás atravesando un momento de cambio o de crisis y quieres transitarlo de una manera más amable y consciente.",
          "Si quieres dejar de mirar tu vida desde el mismo lugar.",
          "Si te sientes desempoderada/o y quieres coger las riendas de tu vida.",
          "Si quieres entender por qué sigues repitiendo patrones y haciendo cosas que sabes que no te hacen bien.",
          "Si estás lidiando con algún tipo de dependencia, ya sea a sustancias, comportamientos o dependencia emocional a personas.",
          "Si te sientes sin energía y no sabes por qué.",
          "Si quieres cultivar la libertad de elegir cómo quieres responder.",
          "Si quieres dedicarte un espacio de plena acogida en el que puedes hablar de lo que estás viviendo sin tener que esconder ninguna parte de ti.",
          "Si gastas mucha energía analizando tu vida constantemente y tratando de buscar soluciones desde el análisis mental.",
          "Si quieres estar más a gusto contigo, confiar más en ti y elegir libremente cómo quieres vivir tu vida.",
        ],
      },
    ],
  },
  {
    title: "¿Qué me puede aportar?",
    body: [
      "Vas a aprender a estar más a gusto contigo y a confiar más en ti.",
      "Vas a dejar de vivir la vida como una lucha y aprender a colaborar con ella.",
      "Las personas que han trabajado conmigo se han encontrado:",
      {
        list: [
          "Con más energía.",
          "Sonriendo más.",
          "Disfrutando de cosas sencillas.",
          "Estando más presentes.",
          "Sintiéndose más conectadas con ellas mismas.",
          "Teniendo relaciones más satisfactorias.",
          "Tomando decisiones.",
          "Poniendo límites.",
          "Cosechando mejores resultados en su vida.",
          "Dejando de luchar constantemente.",
        ],
      },
      "… y han empezado a experimentar la vida no como una sucesión de obstáculos, sino como algo con lo que se puede colaborar.",
    ],
  },
  {
    title: "¿Cómo sé si me hace falta ir a terapia?",
    body: [
      "Si estás en un momento de crisis, no tienes por qué vivirlo solo ni poder con todo, pide ayuda! Simplemente hablar de lo que te está pasando, sentirte escuchada y comprendida puede ayudarte profundamente a transitar este momento y a vivirlo con más claridad.",
      "Por otro lado, ir a terapia no es algo reservado únicamente a personas que están en lo más hondo del pozo. Es útil para cualquier persona dispuesta a mirarse desde fuera y descubrir nuevas posibilidades para afrontar aquellas cosas que generan tensión en su vida.",
      "El espacio terapéutico no solamente ayuda a encajar mejor tus \"problemas\" sino que te permite extraer el potencial de aprendizaje que contienen y te permite desarrollarte para entrar en la siguiente etapa de tu vida habiendo aprendido lo que te ofrecía la anterior.",
    ],
  },
];

export const TILES: Tile[] = [
  {
    title: "No necesitas arreglarte",
    photo: "/sesiones/nico-camisa.jpg",
    body: [
      "No tienes que convertirte en otra persona para empezar a cambiar.",
      "El verdadero cambio empieza cuando dejas de luchar contra quien eres y empiezas a reconocer todo el potencial que tienes disponible.",
      "No hay nada que arreglar en ti. Solo necesitas darte permiso para cultivar paso a paso la vida que quieres vivir.",
    ],
  },
  {
    title: "No necesitas esforzarte más",
    photo: "/sesiones/rincon-sombra.jpg",
    body: [
      "Quizás llevas mucho tiempo esforzándote para cambiar pero acabas volviendo a repetir las mismas situaciones.",
      "Déjame darte una buena noticia: todo puede ser mucho más sencillo de lo que imaginas. No se trata de hacer más, sino de soltar lo que mantiene el problema.",
      "Todo cambia de verdad cuando consigues reconocer aquello que a día de hoy te impide vivir con más tranquilidad y lo atiendes.",
    ],
  },
  {
    title: "Una nueva mirada lo cambia todo",
    photo: "/sesiones/bajo-el-agua.jpg",
    body: [
      "Tal vez el cambio que estás buscando no empieza haciendo algo diferente, sino mirando las cosas de otra manera.",
      "Cuando cambia tu forma de ver una situación, aparecen posibilidades que antes no contemplabas.",
      "A veces, un pequeño cambio de perspectiva puede transformar por completo la forma en que vives lo que está ocurriendo.",
    ],
  },
  {
    title: "¿Sientes que te falta energía?",
    photo: "/sesiones/luz-verde.jpg",
    body: [
      "Es muy posible que el problema no esté tanto en cuánta energía tienes, sino en qué la estás gastando.",
      "Imagina que tu energía es una batería totalmente recargada.",
      {
        list: [
          "¿Cuánta gastas dándole vueltas una y otra vez a las mismas ideas?",
          "¿Cuánta pierdes luchando contra lo que está ocurriendo?",
          "¿Cuánta consumes intentando cambiar cosas que no dependen de ti?",
        ],
      },
      "¿Cómo sería tu vida si pudieses recuperar toda esa energía para ponerla al servicio de lo que sí está en tu mano cambiar?",
      "Deja de gastar energía luchando contra lo que no puedes controlar y empieza a utilizarla para construir la vida que realmente quieres vivir.",
    ],
  },
  {
    title: "¿Y si pudieras confiar en ti pase lo que pase?",
    photo: "/sesiones/espuma-olas.jpg",
    body: [
      "La confianza se cultiva. No nace de poder controlar las circunstancias, sino de saber que eres capaz de responder a ellas de una forma coherente contigo.",
      'No es "sé que todo va a salir como yo quiero". Sino "sé que, pase lo que pase, voy a poder elegir cómo quiero actuar".',
      "Desarrollar esa capacidad de elegir cómo respondes a la vida y adquirir las herramientas para hacerlo es algo que trabajamos en terapia.",
      "Cuanto más confías en tu capacidad para elegir, más aprendes a confiar en ti, pase lo que pase.",
    ],
  },
  {
    title: "¿Qué significa aceptar algo?",
    photo: "/sesiones/nico-retrato.jpg",
    body: [
      "Aceptar no es resignarse ni quedarse de brazos cruzados. Tiene que ver con darse espacio y aprender a soltar.",
      "Soltar por un momento nuestra forma rígida de interpretar la realidad: desde la escasez, la separación, la sensación de ataque, la necesidad de juzgar y etiquetar todo lo que ocurre…",
      "Para abrirnos a una perspectiva más amplia.",
      "Aceptar no significa que nos guste lo que ocurre ni que tengamos que dejarlo como está. Significa reconocer la realidad tal como es para poder decidir qué hacer con ella.",
    ],
  },
  {
    title: "Tienes muchos recursos disponibles dentro de ti",
    photo: "/sesiones/rincon-hojas.jpg",
    body: [
      "Imagina que estás de excursión y llevas una mochila que pesa mucho.",
      "Está llena de cosas, pero no te has parado a mirar lo que contiene.",
      "Sin duda, soltar es uno de los gestos más liberadores que podemos hacer en terapia. Dejamos ir cosas que no nos sirven y que nos impiden avanzar.",
      "Pero no es lo único que hay en la mochila... También hay un montón de capacidades y herramientas útiles.",
      "El trabajo consiste en soltar lo que nos pesa, pero también en reconocer los recursos que ya tenemos y aprender a utilizarlos en nuestra vida diaria.",
    ],
  },
  {
    title: "Adicción y dependencias",
    photo: "/sesiones/tronco.jpg",
    body: [
      "Cuando pensamos en una adicción o en conductas dependientes solemos poner nuestra atención en la sustancia o en la conducta. Sin embargo, eso no es más que el síntoma de algo más profundo.",
      "Mi mirada sobre las dependencias, gracias a mi experiencia personal, se enfoca en lo que hay detrás de ese comportamiento.",
      "La recuperación empieza cuando eliminamos el consumo, pero no termina ahí. Esa es la puerta de entrada a una nueva manera de estar en el mundo.",
      "Recuperarse de una adicción es una oportunidad profundamente valiosa para desarrollar una relación mucho más satisfactoria con la vida.",
    ],
  },
  {
    title: "La verdadera libertad es poder elegir",
    photo: "/sesiones/ola-oscura.jpg",
    body: [
      "Ser libre no depende de poder elegir mis circunstancias ni de hacer siempre lo que me apetece.",
      "Significa poder elegir cómo quiero relacionarme con lo que está pasando. Elegir por ejemplo:",
      {
        list: [
          "Dónde pongo mi atención",
          "Qué pensamientos decido alimentar",
          "Qué relaciones quiero mantener",
          "Qué decisiones tomo",
          "Qué límites establezco",
        ],
      },
      "La verdadera libertad es una decisión interna. Por eso todos tenemos acceso a ella y podemos aprender a cultivarla.",
    ],
  },
  {
    title: "¿Te crees tus propios pensamientos?",
    photo: "/sesiones/olas-lineas.jpg",
    body: [
      "Te propongo un juego. Coge un papel y un boli.",
      "Escribe una idea que tengas y que des por cierta.",
      "Ahora hazte esta pregunta: ¿Estoy completamente seguro de que esto es verdad, siempre, sí o sí?",
      "Busca los matices, las excepciones, otras formas de verlo. Y observa cómo, quizá, eso que dabas por una verdad absoluta es solo una manera de interpretar la realidad.",
      "Repítelo con todas las ideas que quieras.",
      "Ahora observa tu respiración. Cierra los ojos y siente el aire entrando y saliendo.",
      "Ese flujo de aire no es una idea. ¿Ves la diferencia?",
      "Percibimos la realidad a través de las sensaciones, no de los pensamientos.",
    ],
  },
  {
    title: "Un espacio de escucha sin juicio",
    photo: "/sesiones/bosque.jpg",
    body: [
      "¿Te das permiso para hacer una pausa, respirar y escucharte?",
      "Aquí te ofrezco un espacio de plena acogida, en el que comprender lo que estás viviendo, sin juicio, desde la amabilidad.",
      "A veces, necesitamos dejar de intentar resolverlo todo y permitirnos escuchar lo que sentimos. Basta con hacer espacio a lo que nos pasa, sin presionarnos para encontrarle un sentido.",
      "Porque cuando dejamos de juzgar lo que sentimos y empezamos a escucharlo, algo cambia.",
      "Podemos empezar a entender nuestras necesidades, recuperar el contacto con nosotros mismos y encontrar nuevas formas de relacionarnos con lo que estamos viviendo.",
    ],
  },
  {
    title: "Vivimos a contracorriente",
    photo: "/sesiones/ventana-luz.jpg",
    body: [
      "La mayoría de personas vive peleando contra sí mismas y contra la vida.",
      "Pero tú puedes aprender a usar la realidad a tu favor en lugar de oponerte a ella.",
      "Puedes establecer una relación de colaboración con la vida, aprovechando lo que ocurre para avanzar y cosechar resultados más coherentes.",
      "Desde ahí, vivir se vuelve mucho más fácil, satisfactorio e incluso divertido.",
    ],
  },
];
