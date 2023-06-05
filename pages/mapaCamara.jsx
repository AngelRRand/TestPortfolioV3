import React from 'react'
import stylesMove from '@/styles/Move.module.css';
import { useState } from 'react';

const mapaCamara = () => {


    const [movableDivClasses, setMovableDivClasses] = useState(`${stylesMove.sprite} ${stylesMove.spriteNotMoveS}`);
    return (
        <div>
            <div className={movableDivClasses} ref={movableDivRef}></div>
        </div>
    )
}

export default mapaCamara