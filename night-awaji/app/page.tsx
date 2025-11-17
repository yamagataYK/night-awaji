import styles from "./page.module.css"
import Link from "next/link";
import Image from "next/image";





export default function Home() {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>夜の淡路島</h1>
            <Link
              href="/experience"
              className={styles.experience}
            >体験する</Link >
          </header>
          <main>
            <h2 className={styles.first_text}>淡路島で心動く体験を。</h2>
          </main>
        </div>
        <section className={styles.int_Wrap}>
          <h3>「夜の淡路島を、ただ知るだけでなく体験するためのサイト。」</h3>
          <p>見るだけの観光ではなく、実際に訪れて体験し、記録できる。<br />
            あなたの夜が、淡路島で動き出します。</p>
        </section>
      </div>
    </>
  );
}
