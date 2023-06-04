import React, { useEffect, useRef, useState } from 'react';
import Sprite from '../component/Sprite';
import styles from '@/styles/sprite.module.css';

const PruebaSprites = () => {
  const containerRef = useRef(null);
  const movableDivRef = useRef(null);
  const secondBoxRef = useRef(null);
  const keyStateRef = useRef({});
  const [lastKeyPressed, setLastKeyPressed] = useState(null);
  const [animation, setAnimation] = useState([5, 0]);

  useEffect(() => {
    const container = containerRef.current;
    const movableDiv = movableDivRef.current;
    const secondBox = secondBoxRef.current;
    const step = 2;
    const pushFactor = 1;

    const isColliding = () => {
      const movableDivRect = movableDiv.getBoundingClientRect();
      const secondBoxRect = secondBox.getBoundingClientRect();

      return (
        movableDivRect.right > secondBoxRect.left &&
        movableDivRect.left < secondBoxRect.right &&
        movableDivRect.bottom > secondBoxRect.top &&
        movableDivRect.top < secondBoxRect.bottom
      );
    };

    function handleKeyDown(event) {
      const { key } = event;

      if (!keyStateRef.current[key]) {
        keyStateRef.current[key] = true;
        setLastKeyPressed(key);

        switch (key) {
          case 'a':
            requestAnimationFrame(moveLeft);
            break;
          case 'w':
            requestAnimationFrame(moveUp);
            break;
          case 's':
            requestAnimationFrame(moveDown);
            break;
          case 'd':
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
      }

      if (key === 'd' && !keyStateRef.current['a']) {
      }

      if (key === 'a' && !keyStateRef.current['d']) {
      }

      if (key === 'w' && !keyStateRef.current['s']) {
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
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation((prevAnimation) => {
        const [x, y] = prevAnimation;
        const nextX = x === 101 ? 5 : x + 32;
        return [nextX, y];
      });
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.secondBox} ref={secondBoxRef}>
        <div className={styles.caja2}></div>
      </div>

      <div className={styles.containerPj} ref={movableDivRef}>
        <Sprite animation={`${animation[0]} ${animation[1]} 20 32`} />
      </div>
    </div>
  );
};

export default PruebaSprites;
