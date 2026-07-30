import { useState, useEffect } from 'react';

type Tablero = number[];

export const useRompecabezas = () => {
    const [tablero, setTablero] = useState<Tablero>([]);
    const [isWinner, setIsWinner] = useState<boolean>(false);
    const [movimientos, setMovimientos] = useState<number>(0);

    const iniciarJuego = () => {
        const nuevoTablero = [1, 2, 3, 4, 5, 6, 7, 8, 0];

        for (let i = nuevoTablero.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nuevoTablero[i], nuevoTablero[j]] = [nuevoTablero[j], nuevoTablero[i]];
        }

        setTablero(nuevoTablero);
        setMovimientos(0);
        setIsWinner(false);
    };

    const moverPieza = (index: number) => {
        if (isWinner) return;

        const indexHueco = tablero.indexOf(0);
        const filaPieza = Math.floor(index / 3);
        const colPieza = index % 3;
        const filaHueco = Math.floor(indexHueco / 3);
        const colHueco = indexHueco % 3;

        const esAdyacente =
            (Math.abs(filaPieza - filaHueco) === 1 && colPieza === colHueco) ||
            (Math.abs(colPieza - colHueco) === 1 && filaPieza === filaHueco);

        if (esAdyacente) {
            const nuevoTablero = [...tablero];
            nuevoTablero[indexHueco] = tablero[index];
            nuevoTablero[index] = 0;

            setTablero(nuevoTablero);
            setMovimientos((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const partidaGuardada = localStorage.getItem('rompecabezas_estado');
        if (partidaGuardada) {
            const datos = JSON.parse(partidaGuardada);
            setTablero(datos.tablero);
            setMovimientos(datos.movimientos);
            setIsWinner(datos.isWinner);
        } else {
            iniciarJuego();
        }
    }, []);

    useEffect(() => {
        if (tablero.length === 0) return;

        const estadoGanador = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        const gano = tablero.every((val, index) => val === estadoGanador[index]);

        if (gano && !isWinner) {
            setIsWinner(true);
        }

        localStorage.setItem('rompecabezas_estado', JSON.stringify({
            tablero,
            movimientos,
            isWinner: gano
        }));
    }, [tablero, movimientos, isWinner]);

    return {
        tablero,
        isWinner,
        movimientos,
        moverPieza,
        iniciarJuego,
    };
};
