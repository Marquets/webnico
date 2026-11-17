import type { CSSProperties } from "react";
import styles from "./StoryFeed.module.css";

const photo = (name: string) => ({ "--photo": `url("/sobre-mi/${name}.jpg")` }) as CSSProperties;

function Check() {
  return (
    <svg className={styles.check} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" />
      <path d="M6 10.2l2.7 2.6L14 7.6" />
    </svg>
  );
}

// Nico's story told as a feed of square cards, each borrowing a photo from the mosaic above.
export function StoryFeed() {
  return (
    <div className={styles.feed}>
      <article className={`${styles.card} ${styles.photo} ${styles.fadeTop}`} style={photo("agua-luz")}>
        <h3 className={styles.display}>Llevaba varios años viviendo alejado de mí mismo.</h3>
      </article>

      <article className={`${styles.card} ${styles.photo} ${styles.dim} ${styles.centered}`} style={photo("nico-0108")}>
        <p className={styles.serifSmall}>
          Un día la vida me hizo un regalo: tuve un ataque de ansiedad. Fue el detonante de un camino de
          autoconocimiento que seguiré recorriendo toda mi vida.
        </p>
      </article>

      <article className={`${styles.card} ${styles.mist}`}>
        <h3 className={styles.italicTitle}>Lo que aprendí</h3>
        <ul className={styles.shapes}>
          <li className={styles.arch}>Reconocer mis emociones</li>
          <li className={styles.box}>Ver mis patrones</li>
          <li className={styles.arch}>Pedir ayuda</li>
          <li className={styles.pill}>Crear herramientas</li>
          <li className={styles.ring}>Escuchar el silencio</li>
          <li className={styles.pill}>Vivir en la naturaleza</li>
        </ul>
      </article>

      <article className={`${styles.card} ${styles.photo} ${styles.dim}`} style={photo("hojas")}>
        <div className={styles.frame}>
          <h3 className={styles.ruled}>
            <span>Marzo</span>
            <span>de 2020</span>
          </h3>
          <p className={styles.mono}>
            La vida nos impuso una parada. Pasé la pandemia en el campo, solo, rodeado de silencio, de animales y de
            naturaleza.
          </p>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </div>
      </article>

      <article className={`${styles.card} ${styles.ink}`}>
        <h3 className={styles.serifTitle}>Mi primer retiro</h3>
        <div className={styles.balance}>
          <span className={styles.bowl}>Para, siente</span>
          <span className={styles.dome}>y a ver qué pasa</span>
        </div>
        <p className={styles.caption}>Sin expectativas ni juicios</p>
      </article>

      <article className={`${styles.card} ${styles.photo} ${styles.dim}`} style={photo("arena-ondas")}>
        <h3 className={styles.serifTitle}>Terapia Transpersonal</h3>
        <dl className={styles.pills}>
          <div>
            <dt>Presencia</dt>
            <dd>Estar aquí, sin prisa</dd>
          </div>
          <div>
            <dt>Nadie por encima</dt>
            <dd>Todos aprendemos</dd>
          </div>
          <div>
            <dt>Autoconocimiento</dt>
            <dd>Lo que no veía de mí</dd>
          </div>
          <div>
            <dt>Cambios reales</dt>
            <dd>Donde llevaba años estancado</dd>
          </div>
        </dl>
      </article>

      <article className={`${styles.card} ${styles.photo} ${styles.dark}`} style={photo("sombra-palma")}>
        <h3 className={styles.serifTitle}>Mi formación</h3>
        <p className={styles.monoCaps}>Tres años de camino</p>
        <p className={styles.small}>
          Especialista en Terapia Transpersonal por la Escuela de Desarrollo Transpersonal Española (EDTe), en
          colaboración con la UEMC.
        </p>
      </article>

      <article className={`${styles.card} ${styles.sage}`}>
        <h3 className={styles.serifTitle}>El valor que aporto</h3>
        <ul className={styles.checks}>
          {[
            "Un espacio donde no necesitas ser diferente",
            "Reconocer la realidad",
            "Mirar sin juicio",
            "Descubrir tus capacidades",
            "Desarrollar nuevos recursos",
            "Ideas profundas, muy prácticas",
            "Sin superioridad: caminamos juntos",
            "Ver el potencial tras el sufrimiento",
          ].map((item) => (
            <li key={item}>
              {item}
              <Check />
            </li>
          ))}
        </ul>
      </article>

      <article className={`${styles.card} ${styles.photo} ${styles.dark}`} style={photo("tierra")}>
        <div className={styles.circle}>
          <h3 className={styles.script}>
            <span>Mi talento:</span>
            <span>lo complejo,</span>
            <span className={styles.big}>sencillo</span>
          </h3>
        </div>
        <p className={styles.monoCaps}>Claro y práctico</p>
      </article>

      <article className={`${styles.card} ${styles.cream}`}>
        <h3 className={styles.italicTitle}>Tres preguntas</h3>
        <ol className={styles.arcs}>
          <li>¿Cómo te relacionas con esto?</li>
          <li>¿Qué depende de ti?</li>
          <li>¿Qué puedes hacer ahora?</li>
        </ol>
      </article>

      <article className={`${styles.card} ${styles.photo} ${styles.dim}`} style={photo("nico-0151")}>
        <div className={styles.curve}>
          <h3 className={styles.italicTitle}>
            El dolor es <em>inevitable</em>. El sufrimiento podemos aprender a <em>soltarlo</em>.
          </h3>
        </div>
      </article>

      <article className={`${styles.card} ${styles.photo}`} style={photo("nico-0213")}>
        <div className={styles.note}>
          <h3 className={styles.serifTitle}>Hoy he encontrado mi vocación.</h3>
          <p className={styles.small}>
            Acompaño a personas en momentos de crisis o de cambio a mirar su situación con amabilidad, con
            perspectiva, sin juicio.
          </p>
        </div>
      </article>
    </div>
  );
}
