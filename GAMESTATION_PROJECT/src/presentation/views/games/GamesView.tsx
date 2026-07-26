import { Gamepad2, Layers, Tv, Flame } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  structure: string;
  status: "Completado" | "En Desarrollo" | "Planificado";
  icon: React.ReactNode;
}

const GameCard = ({ title, description, structure, status, icon }: GameCardProps) => {
  const statusColors = {
    Completado: "border-emerald-500/20 bg-emerald-950/30 text-emerald-400",
    "En Desarrollo": "border-amber-500/20 bg-amber-950/30 text-amber-400",
    Planificado: "border-zinc-500/20 bg-zinc-950/30 text-zinc-400",
  };

  return (
    <div className="group relative rounded-xl border border-blue-500/5 bg-zinc-900/50 p-6 backdrop-blur-sm">
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
        <span className="text-[10px] text-blue-400 font-mono">
          Estructura: {structure}
        </span>
      </div>
    </div>
  );
};

export const GamesView = () => {
  const games: GameCardProps[] = [
    {
      title: "Minecraft",
      description: "Mundo de bloques tridimensionales infinitos construidos a partir de terreno procedural.",
      structure: "Octree / Grafo 3D",
      status: "Planificado",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      title: "GTA VI",
      description: "Acción en mundo abierto masivo ambientado en Vice City, con física avanzada e inteligencia artificial.",
      structure: "Grafo de Rutas / Cola de Eventos",
      status: "Planificado",
      icon: <Flame className="h-5 w-5" />,
    },
    {
      title: "Tetris",
      description: "Encajar bloques geométricos en caída libre dentro de una grilla bidimensional limpia.",
      structure: "Matriz Bidimensional",
      status: "Planificado",
      icon: <Gamepad2 className="h-5 w-5" />,
    },
    {
      title: "Pac-Man",
      description: "Laberinto clásico en el que debes consumir puntos mientras evitas ser capturado por fantasmas.",
      structure: "Grafo (BFS / DFS)",
      status: "Planificado",
      icon: <Tv className="h-5 w-5" />,
    },
    {
      title: "Roblox",
      description: "Plataforma multijugador masiva basada en la creación y renderizado dinámico de mundos virtuales.",
      structure: "Árbol de Escena (Scene Graph)",
      status: "Planificado",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      title: "League of Legends",
      description: "Estrategia de combate en equipos sobre un mapa con cálculos de colisión y búsqueda de rutas constantes.",
      structure: "Grafo / Pathfinding A*",
      status: "Planificado",
      icon: <Flame className="h-5 w-5" />,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Planificación de Juegos
        </h2>
        <p className="mt-2 text-zinc-400 text-sm max-w-xl mx-auto">
          Propuestas iniciales de juegos comerciales y análisis de las estructuras de datos que manejan.
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
