import React from "react";
import {useNavigate } from "react-router";

interface GameCardProps {
  title: string;
  description: string;
  onPlay:() => void;
  icon: React.ReactNode;
}
const GameCard = ({ title, description, icon,onPlay}: GameCardProps) => {

  return (
    <div className="w-full max-w-full group relative rounded-xl border border-blue-500/5 bg-zinc-900/50 p-4 sm:p-6 backdrop-blur-sm flex min-h-65 flex-col gap-4 transition duration-300 hover:-translate-y-1">
      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3 overflow-hidden">
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-zinc-400 text-sm sm:text-base leading-7">
          {description}
        </p>
      </div>

      <div className="mt-4 border-t border-zinc-800/40 pt-4">
        <button onClick={onPlay} className="w-full sm:w-auto block text-center bg-linear-to-r from-purple-900 to-indigo-400 rounded-2xl px-5 py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-purple-600">
          Empezar
        </button>
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
      icon: <img src="/public/Games/icono_ahorcado.svg"/>,
      onPlay: () => navigate("/games/ahorcado"),
    },
    {
      title: "Memoria",
      description: "Encuentra las parejas de cartas iguales volteándolas de dos en dos. Pon a prueba tu memoria y concentración: entre menos intentos uses, mejor será tu puntuación.",
      icon: <img src="/public/Games/icono_memoria.svg"/>,
      onPlay: () => navigate("/games/Memoria"),
    },
    {
      title: "Rompecabezas Deslizante",
      description: "Ordena las piezas numeradas moviéndolas dentro de la cuadrícula usando el único espacio vacío. Un clásico de lógica y paciencia que pone a prueba tu capacidad de planificación.",
      icon: <img src="/public/Games/icono_puzzle_deslizante.svg"/>,
      onPlay: () => navigate("/games/Rompecabezas"),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-245 px-4 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold from-blue-400 to-indigo-400 bg-clip-text">
          Listado de Juegos
        </h2>
        <p className="mt-2 text-zinc-400 text-sm md:text-base max-w-xl mx-auto px-2 sm:px-0">
          Elije un juego de tu preferencia.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 mx-auto w-full">
        {games.map((game) => (
          <div key={game.title} className="w-full">
            <GameCard {...game} />
          </div>
        ))}
      </div>
    </div>
  );
};
