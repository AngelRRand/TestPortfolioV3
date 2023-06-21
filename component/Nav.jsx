import React from 'react'
import Image from 'next/image';
import styles from '@/styles/nav.module.css';
import Link from 'next/link';
const Nav = () => {
    return (
        <div className={styles.navegacion}>

            <Image src={"/img/Base.svg"} alt="" className={`${styles.pj}`} width={200} height={200} />
            <div className={styles.links}>
                <Link className={styles.link} href={'/pj'}>PersonajePrueba</Link>
                <Link className={styles.link} href={'/PruebaSprites'}>SpritesPrueba</Link>
                <Link className={styles.link} href={'/mapa'}>mapaCamara</Link>

            </div>
        </div>
    )
}

export default Nav