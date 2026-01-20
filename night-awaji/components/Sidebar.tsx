"use client";

import { ReactNode, useEffect } from "react";
import styles from "./Sidebar.module.css";

type SidebarProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    side?: "left" | "right";
    widthPx?: number;
    children: ReactNode;
};

export default function Sidebar({
    open,
    onClose,
    title = "メニュー",
    side = "left",
    widthPx = 450,
    children,
}: SidebarProps) {

    const sideClass = side === "left" ? styles.left : styles.right;


    return (
        <>
            <div
                className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
                onClick={onClose}
            />

            <aside
                className={`${styles.panel} ${sideClass} ${open ? styles.open : ""}`}
                style={{ width: `${widthPx}px` }}
                aria-hidden={!open}
            >
                <div className={styles.titleWrap}>
                    <h2 className={styles.title}>{title}</h2>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="閉じる">
                        ×
                    </button>
                </div>

                <div className={styles.back}>{children}</div>
            </aside>
        </>
    );
}
