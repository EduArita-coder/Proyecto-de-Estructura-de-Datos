import { Link } from "react-router";
import { useRompecabezas } from "../../assets/Hooks/Rompecabezas Hooks/useRompecabezas";
import { Trophy, Trash2, HelpCircle, ArrowLeft } from "lucide-react";

export const RompecabezasGames = () => {
  const { tablero, isWinner, movimientos, moverPieza, iniciarJuego, partidasGanadas, partidasJugadas, restablecerEstadisticas } = useRompecabezas();

  const efectividad = partidasJugadas > 0 ? Math.round((partidasGanadas / partidasJugadas) * 100) : 0;

  return (
    
    <div className="flex flex-col items-center justify-center w-full py-10">
      <div className="bg-zinc-900/50 backdrop-blur-sm border border-blue-500/5 p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/games"
            className="flex items-center gap-2 rounded-lg border border-blue-500/10 bg-zinc-950/70 px-3 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-900/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </div>

        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400 mb-6">
          Rompecabezas Deslizante
        </h2>

        <div className="flex justify-between items-center mb-6 px-2">
          <span className="text-zinc-400 text-sm font-mono">
            Movimientos: <span className="text-blue-400 font-bold text-lg ml-1">{movimientos}</span>
          </span>
          <button 
            onClick={iniciarJuego}
            className="bg-linear-to-r from-purple-900 to-indigo-400 hover:bg-purple-600 text-white px-5 py-2 rounded-2xl text-sm cursor-pointer transition-all"
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
        <div className="grid grid-cols-3 gap-3 bg-zinc-950/30 p-4 rounded-xl border border-blue-500/5">
          {tablero.map((numero, index) => (
            <button
              key={index}
              onClick={() => moverPieza(index)}
              disabled={isWinner}
              className={`
                h-24 text-3xl font-mono font-bold rounded-xl flex items-center justify-center transition-all duration-200 
                ${numero === 0 
                  ? 'bg-transparent shadow-none border border-dashed border-zinc-700/30 cursor-default' 
                  // Fichas usando el estilo de GamesView
                  : 'bg-zinc-900/80 hover:bg-zinc-800 text-white border border-blue-500/10 cursor-pointer transform hover:scale-[1.02] active:scale-95 shadow-md shadow-blue-500/5'
                }
              `}
            >
              {numero !== 0 ? numero : ''}
            </button>
          ))}
        </div>

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
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs bg-zinc-900/60 px-3 py-1.5 rounded-lg border border-zinc-800">
                <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
                <span>Movimientos óptimos: menor es mejor</span>
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
