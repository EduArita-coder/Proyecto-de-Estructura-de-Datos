import { Link } from "react-router-dom";
import { useRompecabezas } from "../../assets/Hooks/Rompecabezas Hooks/useRompecabezas";
import { Trophy, Trash2, HelpCircle, ArrowLeft } from "lucide-react";

export const RompecabezasGames = () => {
  const { tablero, isWinner, movimientos, moverPieza, iniciarJuego, partidasGanadas, partidasJugadas, restablecerEstadisticas } = useRompecabezas();

  const efectividad = partidasJugadas > 0 ? Math.round((partidasGanadas / partidasJugadas) * 100) : 0;

  return (
    
    <div className="flex w-full flex-col items-center justify-start px-3 py-4 sm:px-4 sm:py-6 min-w-0">
      <div className="w-full max-w-[calc(100vw-1.5rem)] rounded-xl border border-blue-500/5 bg-zinc-900/50 p-4 text-center shadow-2xl sm:max-w-lgshadow-2xl backdrop-blur-sm sm:max-w-lg sm:p-6">
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <Link
            to="/games"
            className="flex items-center gap-2 rounded-lg border border-blue-500/10 bg-zinc-950/70 px-3 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-900/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </div>

        <h2 className="mb-4 bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-2xl font-extrabold text-transparent sm:mb-6 sm:text-3xl">
          Rompecabezas Deslizante
        </h2>

        <div className="mb-4 flex flex-col items-start justify-between gap-3 px-1 sm:mb-6 sm:flex-row sm:items-center">
          <span className="text-sm font-mono text-zinc-400">
            Movimientos: <span className="text-blue-400 font-bold text-lg ml-1">{movimientos}</span>
          </span>
          <button 
            onClick={iniciarJuego}
            className="cursor-pointer rounded-2xl bg-linear-to-r from-purple-900 to-indigo-400 px-4 py-2 text-sm text-white transition-all hover:bg-purple-600"
          >
            Reiniciar
          </button>
        </div>

        {isWinner && (
          <div className="mb-6 p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-xl">
            <p className="text-emerald-400 font-bold text-sm">¡Felicidades, armaste el rompecabezas!</p>
          </div>
        )}

        {/* Tablero (Grid de 3x3) */}
        <div className="grid grid-cols-3 gap-2 rounded-xl border border-blue-500/5 bg-zinc-950/30 p-3 sm:gap-3 sm:p-4">
          {tablero.map((numero, index) => (
            <button
              key={index}
              onClick={() => moverPieza(index)}
              disabled={isWinner}
              className={`
                h-12 text-2xl font-mono font-bold rounded-xl flex items-center justify-center transition-all duration-200 sm:h-16-3xl 
                ${numero === 0 
                  ? 'bg-transparent shadow-none border border-dashed border-zinc-700/30 cursor-default' 
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-white border border-blue-500/10 cursor-pointer transform hover:scale-[1.02] active:scale-95 shadow-md shadow-blue-500/5'
                }
              `}
            >
              {numero !== 0 ? numero : ''}
            </button>
          ))}
        </div>

        <div className="mt-6 border-t border-zinc-800/40 pt-4 sm:mt-8 sm:pt-6">
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-blue-500/5 bg-zinc-950/20 p-3 sm:flex-row sm:items-center sm:p-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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

            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs bg-zinc-900/60 px-3 py-1.5 rounded-lg border border-zinc-800">
                <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-[11px] sm:text-xs">Movimientos óptimos: menor es mejor</span>
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
    </div>
  );
};
