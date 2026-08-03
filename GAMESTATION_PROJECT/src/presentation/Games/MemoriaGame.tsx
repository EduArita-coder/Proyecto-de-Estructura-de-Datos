import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Trophy, HelpCircle } from "lucide-react";
import { useMemoriaHooks } from "../../assets/Hooks/Memoria Hooks/useMemoria";

const MemoriaGame = () => {
  const { cartas, movimientos, mejorPuntaje, juegoGanado, voltearCarta, reiniciar } =
    useMemoriaHooks();

  return (
    <div className="mx-auto flex w-full max-w-[min(100vw-1.5rem,720px)] min-w-0 flex-col justify-start px-3 py-4 sm:px-4 sm:py-5 md:px-5 md:py-7">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <Link
          to="/games"
          className="flex items-center gap-2 rounded-lg border border-blue-500/10 bg-zinc-900/60 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-900/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Juegos
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 rounded-2xl border border-blue-500/5 bg-zinc-900/40 p-4 backdrop-blur-sm sm:gap-5 sm:p-4 md:grid-cols-[1.1fr_0.9fr] min-w-0">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 text-center">
            <h1 className="text-xl font-bold text-white sm:text-2xl">Memoria</h1>
            <p className="mt-2 text-sm text-zinc-300 sm:text-base">
              Encuentra todas las parejas en el menor número de movimientos.
            </p>
          </div>

      <div className="mx-auto grid w-full max-w-[min(100vw-1rem,420px)] grid-cols-2 gap-1.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-3 min-w-0">
            {cartas.map((carta, index) => (
              <button
                key={carta.id}
                onClick={() => voltearCarta(index)}
                className="aspect-square touch-manipulation rounded-lg border border-blue-500/20 bg-zinc-900/60 text-base font-bold text-white shadow-lg transition-all duration-200 hover:border-blue-500 hover:bg-zinc-800/80 active:scale-[0.97] sm:rounded-xl sm:text-lg"
              >
                {carta.volteada || carta.emparejada ? carta.simbolo : "❓"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-blue-500/10 bg-zinc-950/40 p-3 text-center">
              <p className="text-[10px] uppercase tracking-widest text-zinc-400">Movimientos</p>
              <p className="mt-1 text-2xl font-bold text-white">{movimientos}</p>
            </div>
            <div className="rounded-xl border border-blue-500/10 bg-zinc-950/40 p-3 text-center">
              <p className="text-[10px] uppercase tracking-widest text-zinc-400">Mejor</p>
              <p className="mt-1 text-sm font-semibold text-white">
                {mejorPuntaje === null ? "Sin récord" : `${mejorPuntaje} mov.`}
              </p>
            </div>
          </div>

          {juegoGanado && (
            <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-center">
              <h3 className="text-lg font-bold text-emerald-400">¡Felicidades, ganaste! 🎉</h3>
              <p className="mt-1 text-xs text-zinc-300">Completaste todas las parejas.</p>
            </div>
          )}

          <button
            onClick={reiniciar}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500"
          >
            <RotateCcw className="h-4 w-4" />
            {juegoGanado ? "Jugar de Nuevo" : "Nueva Partida"}
          </button>
        </div>
      </div>

      <div className="mt-6 border-t border-zinc-800/40 pt-4 sm:mt-8 sm:pt-6">
        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-blue-500/5 bg-zinc-950/20 p-3 sm:flex-row sm:items-center sm:p-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-zinc-400">Mejor</span>
                <span className="text-lg font-bold text-white">{mejorPuntaje === null ? "—" : `${mejorPuntaje}`}</span>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-zinc-800 sm:block" />

            <div>
              <span className="block text-[10px] uppercase tracking-widest text-zinc-400">Movimientos</span>
              <span className="text-lg font-bold text-white">{movimientos}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-[11px] text-zinc-400 sm:text-xs">
            <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
            <span>memoriza la posición de cada símbolo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriaGame;