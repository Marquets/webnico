import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./StoryDialog.module.css";

/** A plain string is a paragraph; `{ list }` is a bulleted list; `{ heading }` titles a part of a longer story. */
export type Block = string | { list: string[] } | { heading: string };

export type Story = { title: string; body: Block[] };

type StoryDialogProps = {
  story: Story | null;
  /** Where the story was opened from: the panel grows out of it and shrinks back into it. */
  origin: DOMRect | null;
  onClose: () => void;
};

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

/** The transform that lays the centred panel over the element it came from. */
function fromOrigin(panel: HTMLElement, origin: DOMRect) {
  const box = panel.getBoundingClientRect();
  const dx = origin.left + origin.width / 2 - (box.left + box.width / 2);
  const dy = origin.top + origin.height / 2 - (box.top + box.height / 2);
  const scale = Math.max(Math.min(origin.width / box.width, origin.height / box.height), 0.15);
  return `translate(${dx}px, ${dy}px) scale(${scale})`;
}

export function StoryDialog({ story, origin, onClose }: StoryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);

  const still = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  useEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!story || !dialog || !panel) return;
    closing.current = false;
    dialog.showModal();
    panel.scrollTop = 0;
    if (origin && !still()) {
      panel.animate?.(
        [
          { transform: fromOrigin(panel, origin), opacity: 0, borderRadius: "40px" },
          { transform: "none", opacity: 1, borderRadius: "18px" },
        ],
        { duration: 650, easing: EASE },
      );
    }
  }, [story, origin]);

  const close = () => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (!dialog || !panel || closing.current) return;
    closing.current = true;
    const finish = () => {
      dialog.close();
      onClose();
    };
    const animation =
      origin && !still()
        ? panel.animate?.([{ transform: "none", opacity: 1 }, { transform: fromOrigin(panel, origin), opacity: 0 }], {
            duration: 420,
            easing: EASE,
          })
        : undefined;
    dialog.classList.add(styles.leaving);
    if (animation) animation.onfinish = finish;
    else finish();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="story-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={() => dialogRef.current?.classList.remove(styles.leaving)}
      onClick={(event) => {
        // A click that lands on the dialog itself is a click on the backdrop around the panel.
        if (event.target === dialogRef.current) close();
      }}
    >
      <div ref={panelRef} className={styles.panel}>
        <button type="button" className={styles.close} onClick={close} aria-label="Cerrar">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {story && (
          <>
            <h2 id="story-title" className={styles.title}>
              {story.title}
            </h2>
            {story.body.map((block, index) =>
              typeof block === "string" ? (
                <p key={index} className={styles.block} style={{ "--i": index } as CSSProperties}>
                  {block}
                </p>
              ) : "heading" in block ? (
                <h3 key={index} className={`${styles.block} ${styles.subheading}`} style={{ "--i": index } as CSSProperties}>
                  {block.heading}
                </h3>
              ) : (
                <ul key={index} className={`${styles.block} ${styles.list}`} style={{ "--i": index } as CSSProperties}>
                  {block.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ),
            )}
          </>
        )}
      </div>
    </dialog>
  );
}
