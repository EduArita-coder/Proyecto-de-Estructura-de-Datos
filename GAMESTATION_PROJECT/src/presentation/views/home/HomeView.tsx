import { Play } from "lucide-react";
import { Link } from "react-router";

export const HomeView = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* HERO SECTION */}
      <section className="text-center py-24 flex flex-col items-center">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          GAMESTATION
        </h2>
        <p className="mt-4 text-lg text-blue-100 max-w-2xl font-light">
          Plataforma en desarrollo para visualizar estructuras de datos y algoritmos a través de juegos interactivos.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/games"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500"
          >
            <Play className="h-4 w-4 fill-current" />
            Explorar Juegos
          </Link>
        </div>
      </section>
    </div>
  );
};
