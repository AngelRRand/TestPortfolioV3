import { useEffect, useState } from 'react';
import stylesMove from '@/styles/Move.module.css';

export const Player = ({ containerRef, movableDivRef, sombraDivRef, boxesRefs, keyStateRef, pressedKeysRef, setMovableDivClasses, setCameraPosition }) => {

    const [lastKeyPressed, setLastKeyPressed] = useState(null);

    let animationFrameId;
    const step = 3;
    const pushFactor = 1.5;

    useEffect(() => {
        const container = containerRef.current;
        const movableDiv = movableDivRef.current;


        movableDiv.style.bottom = '55vh';
        movableDiv.style.left = '65vw';
        const boxes = boxesRefs.map(ref => ref.current);

        const isColliding = () => {
            const movableDivLeft = movableDiv.offsetLeft;
            const movableDivRight = movableDivLeft + movableDiv.offsetWidth;
            const movableDivTop = movableDiv.offsetTop;
            const movableDivBottom = movableDivTop + movableDiv.offsetHeight;

            for (let i = 0; i < boxes.length; i++) {
                const box = boxes[i];
                const boxLeft = box.offsetLeft;
                const boxRight = boxLeft + box.offsetWidth;
                const boxTop = box.offsetTop;
                const boxBottom = boxTop + box.offsetHeight;

                if (
                    movableDivRight > boxLeft &&
                    movableDivLeft < boxRight &&
                    movableDivBottom > boxTop &&
                    movableDivTop < boxBottom
                ) {
                    return true;
                }
            }

            return false;
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
                sombraDivRef.current.style.left = `${currentLeft - step}px`;
            }
            if (keyStateRef.current['a'] && !isColliding()) {
                animationFrameId = requestAnimationFrame(moveLeft);
            } else if (isColliding()) {
                movableDiv.style.left = `${currentLeft + step * pushFactor}px`;
                sombraDivRef.current.style.left = `${currentLeft + step * pushFactor}px`;
            }
        }

        function moveUp() {
            const currentTop = movableDiv.offsetTop;
            if (currentTop > 0) {
                movableDiv.style.top = `${currentTop - step}px`;
                setCameraPosition((prevPosition) => ({ ...prevPosition, y: currentTop - step }));
                sombraDivRef.current.style.top = `${currentTop - step}px`;

            }
            if (keyStateRef.current['w'] && !isColliding()) {
                animationFrameId = requestAnimationFrame(moveUp);
            } else if (isColliding()) {
                movableDiv.style.top = `${currentTop + step * pushFactor}px`;
                sombraDivRef.current.style.top = `${currentTop + step * pushFactor}px`;

            }
        }

        function moveDown() {
            const currentTop = movableDiv.offsetTop;
            const movableDivHeight = movableDiv.offsetHeight;
            const containerHeight = container.offsetHeight;
            if (currentTop + movableDivHeight < containerHeight) {
                movableDiv.style.top = `${currentTop + step}px`;
                setCameraPosition((prevPosition) => ({ ...prevPosition, y: currentTop + step }));
                sombraDivRef.current.style.top = `${currentTop + step}px`;

            }
            if (keyStateRef.current['s'] && !isColliding()) {
                animationFrameId = requestAnimationFrame(moveDown);
            } else if (isColliding()) {
                movableDiv.style.top = `${currentTop - step * pushFactor}px`;
                sombraDivRef.current.style.top = `${currentTop - step * pushFactor}px`;

            }
        }

        function moveRight() {
            const currentLeft = movableDiv.offsetLeft;
            const movableDivWidth = movableDiv.offsetWidth;
            const containerWidth = container.offsetWidth;
            if (currentLeft + movableDivWidth < containerWidth) {
                movableDiv.style.left = `${currentLeft + step}px`;
                setCameraPosition((prevPosition) => ({ ...prevPosition, x: currentLeft + step }));
                sombraDivRef.current.style.left = `${currentLeft + step}px`;

            }
            if (keyStateRef.current['d'] && !isColliding()) {
                animationFrameId = requestAnimationFrame(moveRight);
            } else if (isColliding()) {
                movableDiv.style.left = `${currentLeft - step * pushFactor}px`;
                sombraDivRef.current.style.left = `${currentLeft - step}px`;

            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Este componente no retorna ningún JSX, por lo que simplemente retorna null
    return null;
};

