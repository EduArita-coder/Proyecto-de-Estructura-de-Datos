import { useState, useEffect } from "react";

// Lista de palabras relacionadas con Estructuras de Datos y Programación
const PALABRAS_TEMATICAS = [
  "PILA",
  "COLA",
  "GRAFO",
  "MATRIZ",
  "ARBOL",
  "RECURSION",
  "MEMORIA",
  "ALGORITMO",
  "PUNTERO",
  "NODO",
  "LISTA",
  "BACKTRACKING",
  "ORDENAMIENTO",
  "BUSQUEDA",
  "VECTOR",
];

export const useAhorcado = () => {
  const [palabra, setPalabra] = useState("");
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<Set<string>>(new Set());
  const [intentosRestantes, setIntentosRestantes] = useState(6);
  
  // Estadísticas del jugador
  const [partidasGanadas, setPartidasGanadas] = useState(0);
  const [partidasJugadas, setPartidasJugadas] = useState(0);

  // Seleccionar una palabra aleatoria
  const obtenerPalabraAleatoria = () => {
    const indice = Math.floor(Math.random() * PALABRAS_TEMATICAS.length);
    return PALABRAS_TEMATICAS[indice];
  };

  // Inicializar juego y cargar estadísticas de localStorage
  useEffect(() => {
    setPalabra(obtenerPalabraAleatoria());

    const ganadasGuardadas = localStorage.getItem("ahorcado_ganadas");
    const jugadasGuardadas = localStorage.getItem("ahorcado_jugadas");

    if (ganadasGuardadas) setPartidasGanadas(Number(ganadasGuardadas));
    if (jugadasGuardadas) setPartidasJugadas(Number(jugadasGuardadas));
  }, []);

  // Determinar estados del juego
  const letrasDePalabra = palabra.split("");
  const juegoGanado = palabra !== "" && letrasDePalabra.every((letra) => letrasAdivinadas.has(letra));
  const juegoPerdido = intentosRestantes <= 0;

  // Actualizar estadísticas al finalizar la partida
  useEffect(() => {
    if (juegoGanado) {
      const nuevasGanadas = partidasGanadas + 1;
      const nuevasJugadas = partidasJugadas + 1;
      setPartidasGanadas(nuevasGanadas);
      setPartidasJugadas(nuevasJugadas);
      localStorage.setItem("ahorcado_ganadas", String(nuevasGanadas));
      localStorage.setItem("ahorcado_jugadas", String(nuevasJugadas));
    } else if (juegoPerdido) {
      const nuevasJugadas = partidasJugadas + 1;
      setPartidasJugadas(nuevasJugadas);
      localStorage.setItem("ahorcado_jugadas", String(nuevasJugadas));
    }
  }, [juegoGanado, juegoPerdido]);

  // Manejar el intento de una letra
  const intentarLetra = (letra: string) => {
    const letraNormalizada = letra.toUpperCase();
    
    // Si ya fue intentada o el juego ya terminó, no hacer nada
    if (letrasAdivinadas.has(letraNormalizada) || juegoGanado || juegoPerdido) {
      return;
    }

    // Agregar la letra a las intentadas
    setLetrasAdivinadas((prev) => {
      const nuevoSet = new Set(prev);
      nuevoSet.add(letraNormalizada);
      return nuevoSet;
    });

    // Si la letra no pertenece a la palabra, restar un intento
    if (!palabra.includes(letraNormalizada)) {
      setIntentosRestantes((prev) => prev - 1);
    }
  };

  // Reiniciar el juego
  const reiniciarJuego = () => {
    setPalabra(obtenerPalabraAleatoria());
    setLetrasAdivinadas(new Set());
    setIntentosRestantes(6);
  };

  // Restablecer estadísticas completas
  const restablecerEstadisticas = () => {
    setPartidasGanadas(0);
    setPartidasJugadas(0);
    localStorage.setItem("ahorcado_ganadas", "0");
    localStorage.setItem("ahorcado_jugadas", "0");
  };

  // Retornar palabra oculta en formato para mostrar (ej: "P _ L _")
  const palabraOculta = letrasDePalabra.map((letra) =>
    letrasAdivinadas.has(letra) ? letra : "_"
  );

  return {
    palabra,
    palabraOculta,
    letrasAdivinadas,
    intentosRestantes,
    juegoGanado,
    juegoPerdido,
    partidasGanadas,
    partidasJugadas,
    intentarLetra,
    reiniciarJuego,
    restablecerEstadisticas,
  };
};
