import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export const HomeView = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* HERO SECTION */}
      <section className="text-center py-24 flex flex-col items-center">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-linear-to-r from-purple-900 to-indigo-400 bg-clip-text text-transparent">
          GAMESTATION
        </h2>
        <p className="mt-4 text-lg text-blue-100 max-w-2xl font-light">
          Plataforma para visualizar estructuras de datos y algoritmos a través de juegos interactivos.
        </p>
        <div className="mt-8 flex justify-center ">
          <Link
            to="/games"
            className="flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition bg-linear-to-r from-purple-900 to-indigo-400"
          >
            <Play className="h-4 w-4 fill-current " />
            Explorar Juegos
          </Link>
        </div>
      </section>
    </div>
  );
};
