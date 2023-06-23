import React, { useState } from 'react';
import styles from '@/styles/PruebaCambioDeColor.module.css';
import Personaje from '../component/personaje';

const Pj = () => {
  const [color, setColor] = useState('#2E425A')
  const [color2, setColor2] = useState('#17283B')

  const changeColor = (primero, segundo) => {
    setColor(primero)
    setColor2(segundo)
  }
  return (
    <div className={styles.container}>
      <div className={styles.cajas}>
        <div onClick={() => changeColor('#eb74ed', '#d861e5')} className={[styles.rosa]}></div>
        <div onClick={() => changeColor('#74ed7a', '#6ce561')} className={[styles.verde]}></div>
        <div onClick={() => changeColor('#7490ed', '#616ee5')} className={[styles.azul]}></div>
        <div onClick={() => changeColor('#ede174', '#e57b61')} className={[styles.amarrillo]}></div>
        <div onClick={() => changeColor('#e44848', '#bb1717')} className={[styles.rojo]}></div>
        <div onClick={() => changeColor('#74e9ed', '#2a5fc0')} className={[styles.celeste]}></div>
        <div onClick={() => changeColor('#ee663c', '#794617')} className={[styles.marron]}></div>
        <div onClick={() => changeColor('#2E425A', '#17283B')} className={[styles.default]}></div>
      </div>
      <div className={styles.pj}>

      <Personaje
        color={color}
        segundoColor={color2}
      />
      </div>
    </div>
  );
};

export default Pj;
