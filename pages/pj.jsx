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

  const saveSvg = async () => {
    try {
      await fetch('http://localhost:3000/api/svg', {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          color: color,
          color2: color2
        })
      }).then((res) => res.json())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.cajas}>
        <div onClick={() => changeColor('#eb74ed', '#6f2f76')} className={[styles.rosa]}></div>
        <div onClick={() => changeColor('#74ed7a', '#40823a')} className={[styles.verde]}></div>
        <div onClick={() => changeColor('#7490ed', '#3d4270')} className={[styles.azul]}></div>
        <div onClick={() => changeColor('#ede174', '#994b37')} className={[styles.amarrillo]}></div>
        <div onClick={() => changeColor('#e44848', '#7c1e1e')} className={[styles.rojo]}></div>
        <div onClick={() => changeColor('#87c5c7', '#202f37')} className={[styles.celeste]}></div>
        <div onClick={() => changeColor('#ee663c', '#794617')} className={[styles.marron]}></div>
        <div onClick={() => changeColor('#2E425A', '#17283B')} className={[styles.default]}></div>
        <button onClick={() => saveSvg()}>Save</button>
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
