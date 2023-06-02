import React from 'react'
import personaje from '../img/Base.svg';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

const pj = () => {
    return (
        <div>

            <Image src={personaje} alt="" className={`${styles.pj}`} width={200} height={200} ref={pjImagen} />

        </div>
    )
}

export default pj