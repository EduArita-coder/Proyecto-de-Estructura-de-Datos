import { Menu, X } from "lucide-react";
import { useState } from "react"
import { useLocation } from "react-router";
import { NavLink } from "./NavLink";
import { MobileNavLink } from "./MobileNavLink";
import appLogo from '/gamestation-icon.svg'

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const isActive = (path: string) => {
        if (path === "/") {
            return location.pathname === "/";
        }

        return location.pathname.startsWith(path);
    };

    return (
        <nav className="border-b border-blue-500/20 bg-[#1a1a1a] text-white shadow-lg shadow-blue-950/30 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Inicio logo y Titulo */}
                    <div className="flex items-center gap-3">
                        <a href="/" rel="noreferrer">
                            <img src={appLogo} className="h-10 w-10 rounded-lg object-contain" alt="GAMESTATION logo" />
                        </a>
                        <h1 className="text-2xl font-bold tracking-wide text-blue-100 sm:text-3xl">
                            GAMESTATION
                        </h1>
                    </div>
                    {/* Fin logo y Titulo */}
                    {/* Inicio Navegacion en escritorio */}
                    <div className="hidden items-center space-x-4 md:flex">
                        <NavLink active={isActive("/")} text="Home" to="/" />
                        <NavLink active={isActive("/games")} text="Games" to="/games" />
                    </div>
                    {/* Fin Navegacion en escritorio */}
                    {/* Inicio Boton menu movil */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="rounded-md p-2 text-white transition hover:bg-blue-500/20 hover:text-blue-300 focus:outline-none"
                            aria-label="Toggle mobile menu"
                        >
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                    {/* Fin Boton menu movil */}
                </div>
            </div>
            {/* Inicio Menu Movil */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        <MobileNavLink text="Home" to="/" active={isActive("/")} />
                        <MobileNavLink text="Games" to="/games" active={isActive("/games")} />
                    </div>
                </div>
            )}
            {/* Fin Menu Movil */}
        </nav>
    )
}