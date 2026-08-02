import { Link } from "react-router";
import { useAhorcado } from "../../assets/Hooks/Ahorcado Hooks/useAhorcado";
import { RotateCcw, Trophy, ArrowLeft, Trash2, HelpCircle } from "lucide-react";

export const AhorcadoGame = () => {
  const {
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
  } = useAhorcado();

  // El abecedario en español
  const TECLADO = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

  // Calcular la efectividad
  const efectividad = partidasJugadas > 0 
    ? Math.round((partidasGanadas / partidasJugadas) * 100) 
    : 0;

  // Renderizar las partes del ahorcado según los fallos
  const renderAhorcadoSVG = () => {
    const fallos = 6 - intentosRestantes;

    return (
      <svg className="w-64 h-64 mx-auto drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" viewBox="0 0 200 200">
        {/* Base, poste principal, barra horizontal superior, cuerda (Siempre visibles) */}
        <line x1="20" y1="180" x2="180" y2="180" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="180" x2="60" y2="20" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="20" x2="140" y2="20" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
        <line x1="140" y1="20" x2="140" y2="50" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />

        {/* Cabeza */}
        {fallos >= 1 && (
          <circle cx="140" cy="65" r="15" stroke="#f43f5e" strokeWidth="3" fill="transparent" />
        )}
        
        {/* Cuerpo */}
        {fallos >= 2 && (
          <line x1="140" y1="80" x2="140" y2="125" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Brazo Izquierdo */}
        {fallos >= 3 && (
          <line x1="140" y1="95" x2="115" y2="110" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Brazo Derecho */}
        {fallos >= 4 && (
          <line x1="140" y1="95" x2="165" y2="110" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Pierna Izquierda */}
        {fallos >= 5 && (
          <line x1="140" y1="125" x2="115" y2="155" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Pierna Derecha */}
        {fallos >= 6 && (
          <line x1="140" y1="125" x2="165" y2="155" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
        )}
      </svg>
    );
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 flex flex-col justify-between min-h-[85vh]">
      {/* Botón de Regresar y Título */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/games"
          className="flex items-center gap-2 rounded-lg border border-blue-500/10 bg-zinc-900/60 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-900/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Juegos
        </Link>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2">
          Ahorcado Temático
        </h2>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-zinc-900/40 p-6 rounded-2xl border border-blue-500/5 backdrop-blur-sm">
        
        {/* Lado Izquierdo: SVG del Ahorcado */}
        <div className="flex flex-col items-center justify-center p-4">
          {renderAhorcadoSVG()}
          
          <div className="mt-4 text-center">
            <span className="text-xs text-zinc-400 uppercase tracking-widest font-mono">
              Intentos restantes
            </span>
            <p className={`text-3xl font-extrabold mt-1 font-mono ${
              intentosRestantes <= 2 ? "text-rose-500" : "text-blue-400"
            }`}>
              {intentosRestantes} / 6
            </p>
          </div>
        </div>

        {/* Lado Derecho: Lógica del Juego */}
        <div className="flex flex-col justify-center">
          
          {/* Palabra a adivinar */}
          <div className="flex justify-center gap-2 md:gap-3 flex-wrap mb-8">
            {palabraOculta.map((letra, index) => (
              <span
                key={index}
                className="w-8 h-10 md:w-10 md:h-12 border-b-4 border-blue-500 flex items-center justify-center text-xl md:text-2xl font-bold font-mono text-white"
              >
                {letra !== "_" ? letra : ""}
              </span>
            ))}
          </div>

          {/* Tablero del Teclado */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {TECLADO.map((letra) => {
              const fuePresionada = letrasAdivinadas.has(letra);
              const esCorrecta = fuePresionada && palabra.includes(letra);

              let botonClase = "border-blue-500/20 bg-zinc-900/60 text-zinc-300 hover:border-blue-500 hover:text-white";
              if (fuePresionada) {
                botonClase = esCorrecta
                  ? "bg-emerald-600/30 border-emerald-500 text-emerald-400 cursor-not-allowed"
                  : "bg-rose-600/30 border-rose-500 text-rose-400 cursor-not-allowed";
              }

              return (
                <button
                  key={letra}
                  onClick={() => intentarLetra(letra)}
                  disabled={fuePresionada || juegoGanado || juegoPerdido}
                  className={`border rounded-lg py-2 text-sm font-bold font-mono transition-all duration-200 ${botonClase}`}
                >
                  {letra}
                </button>
              );
            })}
          </div>

          {/* Mensajes de Victoria / Derrota */}
          {juegoGanado && (
            <div className="text-center p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl mb-4">
              <h3 className="text-lg font-bold text-emerald-400">¡Felicidades, ganaste! 🎉</h3>
              <p className="text-xs text-zinc-300 mt-1">Has adivinado la palabra técnica.</p>
            </div>
          )}

          {juegoPerdido && (
            <div className="text-center p-4 bg-rose-950/40 border border-rose-500/30 rounded-xl mb-4">
              <h3 className="text-lg font-bold text-rose-400">¡Fin del juego! 💀</h3>
              <p className="text-xs text-zinc-300 mt-1">
                La palabra era: <span className="font-bold text-white tracking-widest">{palabra}</span>
              </p>
            </div>
          )}

          {/* Botones de Control del juego */}
          <div className="flex gap-4">
            <button
              onClick={reiniciarJuego}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500"
            >
              <RotateCcw className="h-4 w-4" />
              {juegoGanado || juegoPerdido ? "Jugar de Nuevo" : "Reiniciar Palabra"}
            </button>
          </div>

        </div>
      </div>

      {/* Sección de Estadísticas */}
      <div className="mt-8 border-t border-zinc-800/40 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-950/20 p-4 rounded-xl border border-blue-500/5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase font-mono">Ganadas</span>
                <span className="text-lg font-bold text-white font-mono">{partidasGanadas}</span>
              </div>
            </div>

            <div className="h-8 w-px bg-zinc-800" />

            <div>
              <span className="text-[10px] text-zinc-400 block uppercase font-mono">Jugadas</span>
              <span className="text-lg font-bold text-white font-mono">{partidasJugadas}</span>
            </div>

            <div className="h-8 w-px bg-zinc-800" />

            <div>
              <span className="text-[10px] text-zinc-400 block uppercase font-mono">Efectividad</span>
              <span className="text-lg font-bold text-white font-mono">{efectividad}%</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Pista de estructuras */}
            <div className="flex items-center gap-1.5 text-zinc-400 text-xs bg-zinc-900/60 px-3 py-1.5 rounded-lg border border-zinc-800">
              <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
              <span>Estructura de Datos: Set (Conjunto)</span>
            </div>

            <button
              onClick={restablecerEstadisticas}
              className="text-rose-400 hover:text-rose-300 p-2 rounded-lg hover:bg-rose-500/10 transition"
              title="Restablecer Estadísticas"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AhorcadoGame;