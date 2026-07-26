import {useNavigate } from "react-router";

interface GameCardProps {
  title: string;
  description: string;
  onPlay:() => void;
  status: "Completado" | "En Desarrollo" | "Planificado";
  icon: React.ReactNode;
}
const GameCard = ({ title, description, status, icon,onPlay}: GameCardProps) => {
  const statusColors = {
    Completado: "border-emerald-500/20 bg-emerald-950/30 text-emerald-400",
    "En Desarrollo": "border-amber-500/20 bg-amber-950/30 text-amber-400",
    Planificado: "border-zinc-500/20 bg-zinc-950/30 text-zinc-400",
  };

  return (
    <div className="group relative rounded-xl border border-blue-500/5 bg-zinc-900/50 p-6 backdrop-blur-sm flex flex-col">
      <div className={`absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${statusColors[status]}`}>
        {status}
      </div>
      
      <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
        {icon}
      </div>

      <h3 className="text-lg font-bold text-white mb-2">
        {title}
      </h3>
      
      <p className="text-zinc-400 text-xs mb-4 leading-relaxed">
        {description}
      </p>

      <div className="border-t border-zinc-800/40 pt-3 mt-auto">
        <span className="text-[20px] text-white font-mono">
          <button onClick={onPlay} className="mt-auto bg-linear-to-r from-purple-900 to-indigo-400 rounded-2xl ml-auto w-auto h-10 cursor-pointer hover:bg-purple-600">Empezar</button>
        </span>
      </div>
    </div>
  );
};

export const GamesView = () => {
  const navigate = useNavigate();
  const games: GameCardProps[] = [
    {
      title: "Ahorcado",
      description: "Adivina la palabra oculta letra por letra antes de que se complete el dibujo del ahorcado. Cada error te acerca un paso más a la derrota, ¡así que piensa bien tus letras!",
      status: "En Desarrollo",
      icon: <img src="/public/Games/icono_ahorcado.svg"/>,
      onPlay: () => navigate("/games/ahorcado"),
    },
    {
      title: "Memoria",
      description: "Encuentra las parejas de cartas iguales volteándolas de dos en dos. Pon a prueba tu memoria y concentración: entre menos intentos uses, mejor será tu puntuación.",
      status: "En Desarrollo",
      icon: <img src="/public/Games/icono_memoria.svg"/>,
      onPlay: () => navigate("/games/Memoria"),
    },
    {
      title: "Rompecabezas Deslizante",
      description: "Ordena las piezas numeradas moviéndolas dentro de la cuadrícula usando el único espacio vacío. Un clásico de lógica y paciencia que pone a prueba tu capacidad de planificación.",
      status: "En Desarrollo",
      icon: <img src="/public/Games/icono_puzzle_deslizante.svg"/>,
      onPlay: () => navigate("/games/Rompecabezas"),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold from-blue-400 to-indigo-400 bg-clip-text">
          Listado de Juegos
        </h2>
        <p className="mt-2 text-zinc-400 text-sm max-w-xl mx-auto">
          Elije un Juego de tu preferencia 
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {games.map((game) => (
          <GameCard key={game.title} {...game} />
        ))}
      </div>

    </div>
  );
};
