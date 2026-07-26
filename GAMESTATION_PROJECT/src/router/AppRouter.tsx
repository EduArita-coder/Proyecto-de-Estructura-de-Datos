import { Route, Routes } from "react-router";
import { Navbar } from "../presentation/components";
import { HomeView, GamesView } from "../presentation/views";

export const AppRouter = () => {
    return (
        <div className="relative min-h-screen overflow-hidden text-white">
            {/* Fondo de la aplicación */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/gamestation-fondo.png')] bg-cover bg-center opacity-30 blur-[3px]" />
            
            {/* Contenido enrutado */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomeView />} />
                        <Route path="/games" element={<GamesView />} />
                        {/* Redireccionar cualquier ruta desconocida al Home */}
                        <Route path="*" element={<HomeView />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};