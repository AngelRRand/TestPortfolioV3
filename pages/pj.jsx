import React, { useState, useRef } from 'react';
import styles from '@/styles/Home.module.css';
import Personaje from '../component/personaje';

const Pj = () => {
  const [color, setColor] = useState('#2E425A')
  const [color2, setColor2] = useState('#17283B')

  const changeColor = () => {
    setColor('#eb74ed')
    setColor2('#d861e5')
  }
  return (
    <div>
      <div onClick={()=> changeColor()} className={styles.caja2}></div>
      <Personaje 
        color={color}
        segundoColor={color2}
      />
    </div>
  );
};

export default Pj;
