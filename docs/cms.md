# Que Nico pueda editar la web (CMS)

Idea para más adelante: que Nico cambie textos y fotos sin saber programar, sin tocar el diseño.

## Decisión

Mantener el código actual (Vite + React en Netlify) y añadir **TinaCMS**, conectado al repo de GitHub.

- Nico entra en `tuweb.com/admin`: a un lado ve su web, al otro un panel con los campos. Lo que escribe cambia en directo; al pulsar "Guardar" se hace un commit y Netlify publica solo en 1–2 minutos.
- Diseño, colores, tipografía, ondas y animaciones quedan fijos: no puede romper la web sin querer.
- Plan gratuito de Tina Cloud: 2 usuarios (Nico y Marco). Nico necesita una cuenta de Tina Cloud.

### Qué podrá editar
- Cualquier texto que dejemos editable: frases, párrafos, títulos, preguntas de Sesiones y su texto, teléfono, email, tarifas.
- Fotos (subir y sustituir).
- Listas: añadir, quitar o reordenar (tarjetas de la rejilla de Sesiones, talleres de Encuentros, puntos de "¿Cómo sé si esto es para mí?").
- Formato básico en textos largos: negrita, cursiva, enlaces.

### Qué no (salvo que se lo preparemos)
- Cambiar el diseño.
- Crear páginas nuevas con otro diseño. Si hace falta (p. ej. una página por taller), se le prepara una plantilla.

## Alternativas descartadas
- **Decap CMS**: gratis y más sencillo de montar, pero son formularios sin vista previa y pide cuenta de GitHub.
- **Storyblok / Sanity**: más potentes de lo necesario para 5 páginas.
- **Rehacer en Webflow / Framer / Wix / Squarespace**: Nico podría mover el diseño, pero habría que reconstruir la web casi de cero, se perderían las ondas WebGL y las ventanas animadas, y cuesta 15–30 €/mes.

## Pasos
1. Sacar textos y fotos de los componentes a archivos de contenido, uno por página. Ahora están escritos dentro de los `.tsx` (p. ej. `src/components/SessionsPage/content.ts`).
2. Que cada página lea su archivo de contenido. El aspecto no cambia.
3. Configurar Tina: qué campos son editables y cuáles no.
4. Conectar el repo a Netlify (build y publicación ya están en `netlify.toml`) para que cada guardado se publique solo.
5. Opcional: edición en directo dentro de la página (hook `useTina` en cada página). Sin esto, Nico edita con el panel y ve el resultado al publicar.

Empezar por **Sesiones**: es la página con más texto y sirve de prueba antes del resto.

## Notas de contenido
- Los textos de la web son los de `Web Nico/1. WEB POR APARTADOS/*.docx`, con las erratas corregidas.
- Encuentros está oculta (fuera del menú y del pie, con `noindex`); solo se ve entrando a `/encuentros/`.
