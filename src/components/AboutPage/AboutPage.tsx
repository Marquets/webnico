import { useState, type CSSProperties, type MouseEvent } from "react";
import { BrandMark } from "../BrandMark/BrandMark";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import { SiteNav } from "../SiteNav/SiteNav";
import { StoryDialog, type Story } from "../StoryDialog/StoryDialog";
import styles from "./AboutPage.module.css";

/** Text from Nico's "Sobre mí" doc. */
const TALENT: Story = {
  title: "¿Cuál es mi talento?",
  body: [
    "Mi talento consiste en convertir lo complejo en algo sencillo, claro y práctico.",
    "Acompaño a personas a comprender mejor lo que están viviendo, a poner su energía donde realmente importa y a transformar las experiencias difíciles en oportunidades de aprendizaje y crecimiento.",
  ],
};

const VALUE: Story = {
  title: "¿Cuál es el valor que aporto?",
  body: [
    { heading: "1. Creo un espacio en el que no necesitas ser diferente para empezar a cambiar." },
    "No se trata de arreglarte, se trata de:",
    { list: ["reconocer la realidad", "mirar sin juicio", "descubrir tus capacidades", "desarrollar nuevos recursos"] },
    { heading: "2. Traduzco ideas profundas a algo muy práctico." },
    "Aunque hablemos de sentimientos, de consciencia, de presencia, de aceptación... la terapia que ofrezco es rotundamente práctica. No nos vamos a centrar en conceptos filosóficos, sino en preguntas como:",
    { list: ["¿Cómo te relacionas con esto?", "¿Qué depende de ti?", "¿Qué puedes hacer ahora?"] },
    { heading: "3. No acompaño desde la superioridad." },
    "No estoy aquí porque sepa más que tú. Ambos estamos recorriendo el mismo camino de aprendizaje hacia una forma de vivir más consciente. Como llevo algunos años caminando, hay algunos tramos que ya he transitado y de los que he podido aprender.",
    "Hubo un momento en el que el sufrimiento ocupaba gran parte de mi vida. Con el tiempo aprendí a relacionarme con él de otra manera y a transformarlo en una oportunidad para crecer. Ese aprendizaje no me convirtió en alguien que \"ya llegó\", sino en alguien que sigue caminando con más herramientas y más conciencia.",
    { heading: "4. Sé reconocer el potencial que se esconde detrás del sufrimiento." },
    "Entender la diferencia entre el dolor y el sufrimiento es una de las claves de este viaje hacia una vida más consciente. El dolor es inevitable y puede ser profundamente transformador, mientras que gran parte del sufrimiento que experimentamos nace de nuestra relación con ese dolor. El primero no siempre depende de nosotros; el segundo, en gran medida, sí.",
    "No se trata de negar el dolor, pero tampoco de convertirlo en nuestro enemigo. Más bien nos toca aprender a aceptarlo para conocerlo y comprender lo que nos está mostrando.",
    "El sufrimiento sin embargo, podemos aprender a soltarlo. Pero para ello necesitamos primero reconocerlo. Y es justo ahí dónde reside todo el potencial para desarrollar nuestras capacidades y una nueva actitud frente a la vida.",
  ],
};

const BUBBLES = [
  { story: TALENT, photo: "/sobre-mi/agua-luz-circulo.jpg" },
  { story: VALUE, photo: "/sobre-mi/luz-arte.jpg" },
];

export function AboutPage() {
  const [open, setOpen] = useState<{ story: Story; origin: DOMRect } | null>(null);

  const openFrom = (story: Story) => (event: MouseEvent<HTMLElement>) =>
    setOpen({ story, origin: event.currentTarget.getBoundingClientRect() });

  return (
    <div className={styles.page}>
      <SiteNav light current="/sobre-mi/" />
      <a className={styles.home} href="/" aria-label="Nicolás Aguilera Velasco, inicio">
        <BrandMark compact />
      </a>
      <main>
        <header className={styles.hero} role="img" aria-label="Nicolás, retrato entre la vegetación">
          <h1 className="visually-hidden">Sobre mí</h1>
        </header>

        <p className={styles.motto}>
          Entré en esto del desarrollo personal por necesidad y me quedé por el amor que descubrí dentro de mí.
        </p>

        <section className={`${styles.band} ${styles.olive}`}>
          <div className={styles.text}>
            <p>
              Llevaba varios años viviendo alejado de mí mismo cuando un día, la vida me hizo un regalo: tuve un ataque
              de ansiedad. Fue el detonante que me llevó, casi sin darme cuenta, a emprender un apasionante camino de
              autoconocimiento y transformación que seguiré recorriendo toda mi vida.
            </p>
            <p>
              En ese momento entendí que no podía seguir viviendo mi vida como lo estaba haciendo. Busqué ayuda y
              empecé a trabajar con una psicóloga. Aprendí a reconocer mis emociones, mis patrones de pensamiento y a
              desarrollar herramientas para gestionar todo eso.
            </p>
            <p>
              Poco después, en marzo de 2020, la vida nos impuso una parada obligatoria. Tuve la suerte de poder irme
              al campo, donde pasé toda la pandemia viviendo solo, rodeado de silencio, de animales y de naturaleza. Fue
              en ese contexto donde empecé a cultivar con mayor profundidad mi interés por el autoconocimiento y el
              desarrollo personal.
            </p>
          </div>
          <div className={styles.photo} style={{ "--photo": "url(/sobre-mi/nico-taza.jpg)" } as CSSProperties} />
        </section>

        <section className={`${styles.band} ${styles.lavender}`}>
          <div className={`${styles.text} ${styles.centered}`}>
            <p>
              Descubrí la Terapia Transpersonal casi por casualidad, cuando decidí asistir a un retiro que despertó mi
              curiosidad. Era el primero al que iba, pero algo en su propuesta resonó profundamente conmigo: no prometía
              soluciones mágicas ni respuestas absolutas, sino una invitación a estar presente, sin expectativas ni
              juicios.
            </p>
            <p className={styles.quote}>El lema del retiro era: «Para, siente y a ver qué pasa».</p>
            <p>
              Me conmovió descubrir que nadie estaba por encima de nadie. No había expertos con todas las respuestas ni
              personas más avanzadas que otras; todos compartíamos el mismo camino de aprendizaje y descubrimiento.
            </p>
            <p>
              Sentí que esa forma de comprender al ser humano y de acompañar los procesos personales era justo la
              perspectiva que llevaba tiempo buscando.
            </p>
            <p>
              A partir de ahí inicié un proceso terapéutico con un terapeuta transpersonal. Desde las primeras sesiones
              comencé a descubrir aspectos de mí mismo a los que nunca antes había tenido acceso. Esta mirada empezó muy
              pronto a traducirse en cambios reales en aspectos esenciales de mi vida que llevaban años estancados.
            </p>
            <p>
              Con el tiempo fui construyendo una relación mucho más amable, consciente y proactiva conmigo mismo y con
              la vida. Lo que durante años había sentido como una carga empezó a transformarse en una oportunidad de
              crecimiento y aprendizaje. Hoy comprendo que muchas de las dificultades que atravesamos pueden convertirse
              en grandes oportunidades para nuestro desarrollo.
            </p>
          </div>
        </section>

        <section className={`${styles.band} ${styles.peach}`}>
          <div className={styles.photo} style={{ "--photo": "url(/sobre-mi/nico-puerta.jpg)" } as CSSProperties} />
          <div className={styles.text}>
            <p>
              Todo lo aprendido a lo largo de mi propio proceso, unido al deseo de seguir profundizando en este camino,
              me llevó a dar el paso de formarme como Terapeuta Transpersonal. Decidí cursar la formación de tres años de
              Especialista en Terapia Transpersonal en la Escuela de Desarrollo Transpersonal Española (EDTe), en
              colaboración con la UEMC.
            </p>
            <p>A día de hoy, he encontrado mi vocación en el acompañamiento terapéutico.</p>
            <p>
              Me apasiona y me nutre profundamente crear espacios en los que personas que están atravesando momentos de
              crisis, de cambio, o están experimentando alguna dificultad que no están logrando resolver puedan darse la
              oportunidad de mirar su situación con amabilidad, con perspectiva, sin juicio.
            </p>
            <p>
              También me honra profundamente compartir estos espacios de presencia con personas que se atreven a mirar
              lo que les duele y que están dispuestas a cambiar lo que está en su mano para vivir una vida más plena.
            </p>
            <div className={styles.bubbles}>
              {BUBBLES.map(({ story, photo }) => (
                <button
                  key={story.title}
                  type="button"
                  className={styles.bubble}
                  style={{ "--photo": `url(${photo})` } as CSSProperties}
                  onClick={openFrom(story)}
                >
                  <span>{story.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <div className={styles.end}>
        <p className={styles.ask}>
          ¿Hablamos?
          <a className={styles.phone} href="tel:+34679667357">
            +34 679 667 357
          </a>
        </p>
        <SiteFooter />
      </div>
      <StoryDialog story={open?.story ?? null} origin={open?.origin ?? null} onClose={() => setOpen(null)} />
    </div>
  );
}
