
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Home.module.css';
import stylesMove from '@/styles/Move.module.css';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Sprite from '../component/Sprite';

export default function Home() {
  const containerRef = useRef(null);
  const movableDivRef = useRef(null);
  const primerBoxRef = useRef(null);
  const secondBoxRef = useRef(null);

  const pjImagen = useRef(null);

  const keyStateRef = useRef({});
  const [lastKeyPressed, setLastKeyPressed] = useState(null);
  const [movableDivClasses, setMovableDivClasses] = useState(`${stylesMove.sprite} ${stylesMove.spriteNotMoveS}`);


  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const movableDiv = movableDivRef.current;
    const secondBox = secondBoxRef.current;
    const primerBox = primerBoxRef.current;

    const step = 2;
    const pushFactor = 1;

    const isColliding = () => {
      const movableDivRect = movableDiv.getBoundingClientRect();
      const secondBoxRect = secondBox.getBoundingClientRect();
      const primerBoxRect = primerBox.getBoundingClientRect();

      return (
        movableDivRect.right > primerBoxRect.left &&
        movableDivRect.left < primerBoxRect.right &&
        movableDivRect.bottom > primerBoxRect.top &&
        movableDivRect.top < primerBoxRect.bottom
      ) || (
          movableDivRect.right > secondBoxRect.left &&
          movableDivRect.left < secondBoxRect.right &&
          movableDivRect.bottom > secondBoxRect.top &&
          movableDivRect.top < secondBoxRect.bottom
        );
    };

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const movableDivWidth = movableDiv.offsetWidth;
    const movableDivHeight = movableDiv.offsetHeight;
    const cameraX = movableDiv.offsetLeft - containerWidth / 2 + movableDivWidth / 2 - movableDivWidth / 2;
    const cameraY = movableDiv.offsetTop - containerHeight / 2 + movableDivHeight / 2 - movableDivHeight / 2;
    setCameraPosition({ x: cameraX, y: cameraY });


    function handleKeyDown(event) {
      const { key } = event;

      if (!keyStateRef.current[key]) {
        keyStateRef.current[key] = true;
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

      if (key === 's' && !keyStateRef.current['w']) {
        setMovableDivClasses(`${stylesMove.sprite} ${stylesMove.spriteNotMoveS}`);
      }

      if (key === 'd' && !keyStateRef.current['a']) {
        setMovableDivClasses(`${stylesMove.sprite} ${stylesMove.spriteNotMoveD}`);
      }

      if (key === 'a' && !keyStateRef.current['d']) {
        setMovableDivClasses(`${stylesMove.sprite} ${stylesMove.spriteNotMoveA}`);
      }

      if (key === 'w' && !keyStateRef.current['s']) {
        setMovableDivClasses(`${stylesMove.sprite} ${stylesMove.spriteNotMoveW}`);
      }
    }
    function moveLeft() {
      const currentLeft = parseInt(movableDiv.style.left || '0');
      if (currentLeft > 0) {
        movableDiv.style.left = `${currentLeft - step}px`;
      }
      if (keyStateRef.current['a'] && !isColliding()) {
        requestAnimationFrame(moveLeft);
      } else if (isColliding()) {
        movableDiv.style.left = `${currentLeft + step * pushFactor}px`;
      }
      setCameraPosition(prevPosition => ({ ...prevPosition, x: currentLeft - step - movableDivWidth / 2 }));
    }
    
    function moveUp() {
      const currentTop = parseInt(movableDiv.style.top || '0');
      if (currentTop > 0) {
        movableDiv.style.top = `${currentTop - step}px`;
      }
      if (keyStateRef.current['w'] && !isColliding()) {
        requestAnimationFrame(moveUp);
      } else if (isColliding()) {
        movableDiv.style.top = `${currentTop + step * pushFactor}px`;
      }
      setCameraPosition(prevPosition => ({ ...prevPosition, y: currentTop - step - movableDivHeight / 2 }));
    }
    
    function moveDown() {
      const currentTop = parseInt(movableDiv.style.top || '0');
      const movableDivHeight = movableDiv.offsetHeight;
      const containerHeight = container.offsetHeight;
      if (currentTop + movableDivHeight < containerHeight) {
        movableDiv.style.top = `${currentTop + step}px`;
      }
      if (keyStateRef.current['s'] && !isColliding()) {
        requestAnimationFrame(moveDown);
      } else if (isColliding()) {
        movableDiv.style.top = `${currentTop - step * pushFactor}px`;
      }
      setCameraPosition(prevPosition => ({ ...prevPosition, y: currentTop + step - movableDivHeight / 2 }));
    }
    
    function moveRight() {
      const currentLeft = parseInt(movableDiv.style.left || '0');
      const movableDivWidth = movableDiv.offsetWidth;
      const containerWidth = container.offsetWidth;
      if (currentLeft + movableDivWidth < containerWidth) {
        movableDiv.style.left = `${currentLeft + step}px`;
      }
      if (keyStateRef.current['d'] && !isColliding()) {
        requestAnimationFrame(moveRight);
      } else if (isColliding()) {
        movableDiv.style.left = `${currentLeft - step * pushFactor}px`;
      }
      setCameraPosition(prevPosition => ({ ...prevPosition, x: currentLeft + step - movableDivWidth / 2 }));
    }
    


    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);



  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center} ref={containerRef} style={{ transform: `translate(-${cameraPosition.x}px, -${cameraPosition.y}px)` }}>

          {/* Personaje */}
          <div className={movableDivClasses} ref={movableDivRef}></div>


          {/* Obstaculo */}

          <div className={styles.obstacle} ref={primerBoxRef} />

          <div className={styles.obstacle2} ref={secondBoxRef} />





          <Image src={"/img/Base.svg"} alt="" className={`${styles.pj}`} width={200} height={200} ref={pjImagen} />
        </div>
        {/* Navegacion */}
        <div className={styles.navegacion}>

          <Link href={'/pj'}>PersonajePrueba</Link>
          <Link href={'/PruebaSprites'}>SpritesPrueba</Link>
        </div>
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