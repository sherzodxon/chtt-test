"use client";

import Image from "next/image";
import { useRef } from "react";
import type { QuestionImage as QuestionImageData } from "@/data/questions";
import styles from "./QuestionImage.module.css";

export function QuestionImage({ image }: { image: QuestionImageData }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <figure className={styles.figure}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => dialogRef.current?.showModal()}
          aria-label="Rasmni kattalashtirish"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 880px) 100vw, 800px"
            className={styles.image}
            priority
          />
          <span className={styles.zoomHint} aria-hidden>
            Kattalashtirish
          </span>
        </button>
      </figure>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label="Rasm"
        onClick={() => dialogRef.current?.close()}
      >
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className={styles.full} />
        <button type="button" className={`btn btn-secondary ${styles.close}`}>
          Yopish
        </button>
      </dialog>
    </>
  );
}
