import { useEffect, useRef, useState } from 'react';
import stylesMove from '@/styles/Move.module.css';
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const containerRef = useRef(null);
  const movableDivRef = useRef(null);
  const primerBoxRef = useRef(null);
  const secondBoxRef = useRef(null);
  
  const keyStateRef = useRef({});
  const pressedKeysRef = useRef([]);
  const [lastKeyPressed, setLastKeyPressed] = useState(null);
  const [movableDivClasses, setMovableDivClasses] = useState(`${stylesMove.sprite} ${stylesMove.spriteNotMoveS}`);
  
  /* Camara */
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 600 });
  
  let animationFrameId;
  
  useEffect(() => {
    const container = containerRef.current;
    const movableDiv = movableDivRef.current;
    const secondBox = secondBoxRef.current;
    const primerBox = primerBoxRef.current;
  
    movableDiv.style.bottom = '100px';
  
    const step = 3;
    const pushFactor = 1;
  
    const isColliding = () => {
      const movableDivLeft = movableDiv.offsetLeft;
      const movableDivRight = movableDivLeft + movableDiv.offsetWidth;
      const movableDivTop = movableDiv.offsetTop;
      const movableDivBottom = movableDivTop + movableDiv.offsetHeight;
  
      const primerBoxLeft = primerBox.offsetLeft;
      const primerBoxRight = primerBoxLeft + primerBox.offsetWidth;
      const primerBoxTop = primerBox.offsetTop;
      const primerBoxBottom = primerBoxTop + primerBox.offsetHeight;
  
      const secondBoxLeft = secondBox.offsetLeft;
      const secondBoxRight = secondBoxLeft + secondBox.offsetWidth;
      const secondBoxTop = secondBox.offsetTop;
      const secondBoxBottom = secondBoxTop + secondBox.offsetHeight;
  
      return (
        movableDivRight > primerBoxLeft &&
        movableDivLeft < primerBoxRight &&
        movableDivBottom > primerBoxTop &&
        movableDivTop < primerBoxBottom
      ) || (
        movableDivRight > secondBoxLeft &&
        movableDivLeft < secondBoxRight &&
        movableDivBottom > secondBoxTop &&
        movableDivTop < secondBoxBottom
      );
    };
  
    function handleKeyDown(event) {
      const { key } = event;
  
      if (!keyStateRef.current[key]) {
        keyStateRef.current[key] = true;
        pressedKeysRef.current.push(key);
        setLastKeyPressed(key);
  
        switch (key) {
          case 'a':
            setMovableDivClasses(`${stylesMove.sprite} ${stylesMove.spriteMoveA}`);
            requestAnimationFrame(moveLeft);
            break;
          case 'w':
            setMovableDivClasses(`${stylesMove.sprite} ${stylesMove.spriteMoveW}`);
            requestAnimationFrame(moveUp);
            break;
          case 's':
            setMovableDivClasses(`${stylesMove.sprite} ${stylesMove.spriteMoveS}`);
            requestAnimationFrame(moveDown);
            break;
          case 'd':
            setMovableDivClasses(`${stylesMove.sprite} ${stylesMove.spriteMoveD}`);
            requestAnimationFrame(moveRight);
            break;
          default:
            break;
        }
      }
    }
  
    function handleKeyUp(event) {
      const { key } = event;
      keyStateRef.current[key] = false;
      const index = pressedKeysRef.current.indexOf(key);
      if (index !== -1) {
        pressedKeysRef.current.splice(index, 1);
      }
    
      if (pressedKeysRef.current.length === 0) {
        const { w, a, s, d } = keyStateRef.current;
        const spriteNotMove = `${stylesMove.sprite} ${stylesMove.spriteNotMove}`;
    
        if (key === 's' && !w) {
          setMovableDivClasses(`${spriteNotMove} ${stylesMove.spriteNotMoveS}`);
        } else if (key === 'd' && !a) {
          setMovableDivClasses(`${spriteNotMove} ${stylesMove.spriteNotMoveD}`);
        } else if (key === 'a' && !d) {
          setMovableDivClasses(`${spriteNotMove} ${stylesMove.spriteNotMoveA}`);
        } else if (key === 'w' && !s) {
          setMovableDivClasses(`${spriteNotMove} ${stylesMove.spriteNotMoveW}`);
        } else if (key === lastKeyPressed) {
          // Si la tecla soltada es la última tecla presionada, actualiza las clases según la última tecla presionada
          switch (lastKeyPressed) {
            case 'a':
              setMovableDivClasses(`${stylesMove.sprite} ${stylesMove.spriteMoveA}`);
              break;
            case 'w':
              setMovableDivClasses(`${stylesMove.sprite} ${stylesMove.spriteMoveW}`);
              break;
            case 's':
              setMovableDivClasses(`${stylesMove.sprite} ${stylesMove.spriteMoveS}`);
              break;
            case 'd':
              setMovableDivClasses(`${stylesMove.sprite} ${stylesMove.spriteMoveD}`);
              break;
            default:
              setMovableDivClasses(stylesMove.sprite);
              break;
          }
        } else {
          setMovableDivClasses(stylesMove.sprite);
        }
      }
    }
  
    function moveLeft() {
      const currentLeft = movableDiv.offsetLeft;
      if (currentLeft > 0) {
        movableDiv.style.left = `${currentLeft - step}px`;
        setCameraPosition((prevPosition) => ({ ...prevPosition, x: currentLeft - step }));
      }
      if (keyStateRef.current['a'] && !isColliding()) {
        animationFrameId = requestAnimationFrame(moveLeft);
      } else if (isColliding()) {
        movableDiv.style.left = `${currentLeft + step * pushFactor}px`;
      }
    }
  
    function moveUp() {
      const currentTop = movableDiv.offsetTop;
      if (currentTop > 0) {
        movableDiv.style.top = `${currentTop - step}px`;
        setCameraPosition((prevPosition) => ({ ...prevPosition, y: currentTop - step }));
      }
      if (keyStateRef.current['w'] && !isColliding()) {
        animationFrameId = requestAnimationFrame(moveUp);
      } else if (isColliding()) {
        movableDiv.style.top = `${currentTop + step * pushFactor}px`;
      }
    }
  
    function moveDown() {
      const currentTop = movableDiv.offsetTop;
      const movableDivHeight = movableDiv.offsetHeight;
      const containerHeight = container.offsetHeight;
      if (currentTop + movableDivHeight < containerHeight) {
        movableDiv.style.top = `${currentTop + step}px`;
        setCameraPosition((prevPosition) => ({ ...prevPosition, y: currentTop + step }));
      }
      if (keyStateRef.current['s'] && !isColliding()) {
        animationFrameId = requestAnimationFrame(moveDown);
      } else if (isColliding()) {
        movableDiv.style.top = `${currentTop - step * pushFactor}px`;
      }
    }
  
    function moveRight() {
      const currentLeft = movableDiv.offsetLeft;
      const movableDivWidth = movableDiv.offsetWidth;
      const containerWidth = container.offsetWidth;
      if (currentLeft + movableDivWidth < containerWidth) {
        movableDiv.style.left = `${currentLeft + step}px`;
        setCameraPosition((prevPosition) => ({ ...prevPosition, x: currentLeft + step }));
      }
      if (keyStateRef.current['d'] && !isColliding()) {
        animationFrameId = requestAnimationFrame(moveRight);
      } else if (isColliding()) {
        movableDiv.style.left = `${currentLeft - step * pushFactor}px`;
      }
    }
  
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  


  const containerStyle = {
    position: 'relative',
    border: '1px solid rgb(22, 22, 22)',
    backgroundColor: 'rgb(199, 196, 196)',
    height: '200vh',
    width: '200vw',
    transform: `translate(-${cameraPosition.x}px, -${cameraPosition.y}px)`
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <div className={styles.center} ref={containerRef} style={containerStyle}>
          <Image src={"/img/casa.gif"} alt="" className={styles.casaImage} width={100} height={100} />
          <div className={styles.obstacle2} ref={secondBoxRef} />
          <div className={styles.obstacle} ref={primerBoxRef} />
          {/* Personaje */}
          <div className={movableDivClasses} ref={movableDivRef}></div>


          {/* Obstaculo */}

          





        

        </div>


        {/* Navegacion */}
      </main>
    </>
  );
}


{/* <Image src={"/img/Sprites.svg"} alt="" ref={movableDivRef} width={400} height={750}/>  */ }
{/* <div className={movableDivClasses} ref={movableDivRef}>
            <Sprite
              animation={animation}
            />
          </div> */}


{/*  <div className={`${styles.caja} ${stylesMove.spriteMoveD}`}></div> */ }