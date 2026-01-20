import styles from "./page.module.css"
import Link from "next/link";
import Image from "next/image";
import SecondView from "../public/secondView.jpeg"
import MainView from "../public/mainView.jpeg"
import SectionView from "../public/section.jpeg"





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

          <h2 className={styles.first_text}>淡路島で心動く体験を。</h2>

        </div>
        <section className={styles.int_Wrap}>
          <h3>「夜の淡路島を、ただ知るだけでなく体験するためのサイト。」</h3>
          <p>見るだけの観光ではなく、実際に訪れて体験し、記録できる。<br />
            あなたの夜が、淡路島で動き出します。</p>
        </section>
      </div>
      <div className={styles.second_view}>
        <Image
          src={SecondView}
          alt="景色の写真"
          fill
          className={styles.second_image}
        ></Image>
      </div>

      <section className={styles.info_wrap}>
        <div className={styles.inner}>
          <div className={styles.photoGrid}>

            <div className={`${styles.photo} ${styles.photoTop}`}>
              <Image src={MainView} alt="top" />
            </div>


            <div className={`${styles.photo} ${styles.photoMid}`}>
              <Image src={SecondView} alt="mid" />
            </div>


            <div className={`${styles.photo} ${styles.photoBottom}`}>
              <Image src={SectionView} alt="bottom" />
            </div>
          </div>
          <div className={styles.textBox}>
            <p className={styles.info_text}>夜景・海・橋・自然が揃っていて、渋滞も
              少なく、<br />
              夜の海沿いドライブやツーリングが最高</p>
          </div>
        </div>
        <p className={styles.sub_title}>淡路島にはこんな魅力がある。</p>
      </section>


    </>
  );
}
