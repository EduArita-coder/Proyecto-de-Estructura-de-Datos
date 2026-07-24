import { Navbar } from "../presentation/components"

export const AppRouter = () => {
    return (
        <div className="relative min-h-screen overflow-hidden text-white">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/gamestation-fondo.png')] bg-cover bg-center opacity-30 blur-[3px] motion-safe:animate-pulse" />
            <div className="relative z-10">
                <Navbar />
            </div>
        </div>
    )
}