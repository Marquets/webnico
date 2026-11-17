import { BrandMark } from "../BrandMark/BrandMark";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import { SiteNav } from "../SiteNav/SiteNav";
import styles from "./AboutPage.module.css";
import { StoryFeed } from "./StoryFeed";

const STORY_BEFORE = [
  "Llevaba varios años viviendo alejado de mí mismo cuando un día, la vida me hizo un regalo: tuve un ataque de ansiedad. Fue el detonante que me llevó, casi sin darme cuenta, a emprender un apasionante camino de autoconocimiento y transformación que seguiré recorriendo toda mi vida.",
  "En ese momento entendí que no podía seguir viviendo mi vida como lo estaba haciendo. Busqué ayuda y empecé a trabajar con una psicóloga. Aprendí a reconocer mis emociones, mis patrones de pensamiento y a desarrollar herramientas para gestionar todo eso.",
  "Poco después, en marzo de 2020, la vida nos impuso una parada obligatoria. Tuve la suerte de poder irme a vivir al campo, donde pasé toda la pandemia viviendo solo, rodeado de silencio, de animales y de naturaleza. Fue en ese contexto donde empecé a cultivar con mayor profundidad mi interés por el autoconocimiento y el desarrollo personal.",
  "Descubrí la Terapia Transpersonal casi por casualidad, cuando decidí asistir a un retiro que despertó mi curiosidad. Era el primero al que iba, pero algo en su propuesta resonó profundamente conmigo: no prometía soluciones mágicas ni respuestas absolutas, sino una invitación a estar presente, sin expectativas ni juicios.",
];

const STORY_AFTER = [
  "Me conmovió descubrir que nadie estaba por encima de nadie. No había expertos con todas las respuestas ni personas más avanzadas que otras; todos compartíamos el mismo camino de aprendizaje y descubrimiento.",
  "Sentí que esa forma de comprender al ser humano y de acompañar los procesos personales era justo la perspectiva que llevaba tiempo buscando.",
  "A partir de ahí inicié un proceso terapéutico con un terapeuta transpersonal. Desde las primeras sesiones comencé a descubrir aspectos de mí mismo a los que nunca antes había tenido acceso. Para mi sorpresa, esta mirada empezó muy pronto a traducirse en cambios reales en aspectos esenciales de mi vida que llevaban años estancados.",
  "Con el tiempo fui construyendo una relación mucho más amable, consciente y proactiva conmigo mismo y con la vida. Lo que durante años había sentido como una carga empezó a transformarse en una oportunidad de crecimiento y aprendizaje. Hoy comprendo que muchas de las dificultades que atravesamos pueden convertirse en grandes oportunidades para nuestro desarrollo.",
  "Todo lo aprendido a lo largo de mi propio proceso, unido al deseo de seguir profundizando en este camino, me llevó a dar el paso de formarme como Terapeuta Transpersonal. Decidí cursar la formación de tres años de Especialista en Terapia Transpersonal en la Escuela de Desarrollo Transpersonal Española (EDTe), en colaboración con la UEMC.",
];

const VOCATION = [
  "Me apasiona y me nutre profundamente crear espacios en los que personas que están atravesando momentos de crisis, de cambio, o están experimentando alguna dificultad que no están logrando resolver puedan darse la oportunidad de mirar su situación con amabilidad, con perspectiva, sin juicio.",
  "También me honra profundamente compartir estos espacios de presencia con personas que se atreven a mirar lo que les duele y que están dispuestas a cambiar lo que está en su mano para vivir una vida más plena.",
];

export function AboutPage() {
  return (
    <div className={styles.page}>
      <SiteNav light />
      <a className={styles.home} href="/" aria-label="Nicolás Aguilera Velasco, inicio">
        <BrandMark compact />
      </a>
      <main>

        <header className={styles.hero}>
          <h1 className="visually-hidden">Sobre mí</h1>
          <p className={styles.heroLine}>
            Entré en esto del desarrollo personal por necesidad y me quedé por el amor que descubrí dentro de mí.
          </p>
        </header>
        <section className={styles.feedSection} aria-labelledby="mi-historia">
          <h2 id="mi-historia" className="visually-hidden">
            Mi historia
          </h2>
          <StoryFeed />
        </section>

        {/* The whole text from the brief, for whoever wants to read it all. */}
        <details className={styles.more}>
          <summary>Leer mi historia completa</summary>
          <section className={styles.full} aria-labelledby="historia">
            <div className={styles.column}>
              <h2 id="historia" className={styles.lead}>
                Entré en esto del desarrollo personal por necesidad y me quedé por el amor que descubrí dentro de mí.
              </h2>
              {STORY_BEFORE.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <blockquote className={styles.quote}>
                <p>«Para, siente y a ver qué pasa».</p>
                <footer>El lema de aquel primer retiro</footer>
              </blockquote>
              {STORY_AFTER.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className={styles.lead}>A día de hoy, he encontrado mi vocación en el acompañamiento terapéutico.</p>
              {VOCATION.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className={styles.full} aria-labelledby="talento">
            <div className={styles.column}>
              <h2 id="talento" className={styles.heading}>
                ¿Cuál es mi talento?
              </h2>
              <p className={styles.lead}>
                Mi talento consiste en convertir lo complejo en algo sencillo, claro y práctico.
              </p>
              <p>
                Acompaño a personas a comprender mejor lo que están viviendo, a poner su energía donde realmente importa
                y a transformar las experiencias difíciles en oportunidades de aprendizaje y crecimiento.
              </p>
            </div>
          </section>

          <section className={styles.full} aria-labelledby="valor">
            <div className={styles.wide}>
              <h2 id="valor" className={styles.heading}>
                ¿Cuál es el valor que aporto?
              </h2>
              <ol className={styles.values}>
                <li>
                  <h3>Creo un espacio en el que no necesitas ser diferente para empezar a cambiar.</h3>
                  <p>No se trata de arreglarte, se trata de:</p>
                  <ul className={styles.tags}>
                    <li>reconocer la realidad</li>
                    <li>mirar sin juicio</li>
                    <li>descubrir tus capacidades</li>
                    <li>desarrollar nuevos recursos</li>
                  </ul>
                </li>
                <li>
                  <h3>Traduzco ideas profundas a algo muy práctico.</h3>
                  <p>
                    Aunque hablemos de sentimientos, de consciencia, de presencia, de aceptación... la terapia que ofrezco
                    es rotundamente práctica. Tengo la capacidad de traducir conceptos profundos a un lenguaje sencillo y
                    de encontrar las aplicaciones prácticas que tienen en nuestra vida. No nos vamos a centrar en
                    conceptos filosóficos, sino en preguntas como:
                  </p>
                  <ul className={styles.questions}>
                    <li>¿Cómo te relacionas con esto?</li>
                    <li>¿Qué depende de ti?</li>
                    <li>¿Qué puedes hacer ahora?</li>
                  </ul>
                </li>
                <li>
                  <h3>No acompaño desde la superioridad.</h3>
                  <p>
                    No estoy aquí porque sepa más que tú. Ambos estamos recorriendo el mismo camino de aprendizaje hacia
                    una forma de vivir más consciente. Como llevo algunos años caminando, hay algunos tramos que ya he
                    transitado y de los que he podido aprender.
                  </p>
                  <p>
                    Hubo un momento en el que el sufrimiento ocupaba gran parte de mi vida. Con el tiempo aprendí a
                    relacionarme con él de otra manera y a transformarlo en una oportunidad para crecer. Ese aprendizaje
                    no me convirtió en alguien que «ya llegó», sino en alguien que sigue caminando con más herramientas y
                    más conciencia.
                  </p>
                </li>
                <li>
                  <h3>Sé reconocer el potencial que se esconde detrás del sufrimiento.</h3>
                  <p>
                    Entender la diferencia entre el dolor y el sufrimiento es una de las claves de este viaje hacia una
                    vida más consciente. El dolor es inevitable y puede ser profundamente transformador, mientras que gran
                    parte del sufrimiento que experimentamos nace de nuestra relación con ese dolor. El primero no siempre
                    depende de nosotros; el segundo, en gran medida, sí.
                  </p>
                  <p>
                    No se trata de negar el dolor, pero tampoco de convertirlo en nuestro enemigo. Más bien nos toca
                    aprender a aceptarlo para conocerlo y comprender lo que nos está mostrando.
                  </p>
                  <p>
                    El sufrimiento, sin embargo, podemos aprender a soltarlo. Pero para ello necesitamos primero
                    reconocerlo. Y es justo ahí donde reside todo el potencial para desarrollar nuestras capacidades y
                    una nueva actitud frente a la vida.
                  </p>
                </li>
              </ol>
            </div>
          </section>
        </details>
      </main>
      <SiteFooter />
    </div>
  );
}
