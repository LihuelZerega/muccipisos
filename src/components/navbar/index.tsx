"use client";
import React, { useState } from "react";
import Logo from "@/images/logo.png";
import Link from "next/link";

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPisosOpen, setDropdownPisosOpen] = useState(false);

  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full border-b border-gray-200 bg-white sticky top-0">
      <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-x-1">
          <Link
            className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80"
            href="/"
            aria-label="Brand"
          >
            <img src={Logo.src} alt="" className="w-12 h-12" />
          </Link>

          <button
            type="button"
            className="md:hidden relative size-9 flex justify-center items-center font-medium text-[12px] rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>

        <div
          className={`transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
            <Link
              className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg transition delay-50 duration-300 ease-in-out"
              href="/"
              onClick={() => setMenuOpen(false)}
            >
              Inicio
            </Link>

            <Link
              className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg transition delay-50 duration-300 ease-in-out hidden sm:block"
              href="/#servicios"
            >
              Servicios
            </Link>

            <div className="relative block sm:hidden">
              <button
                type="button"
                className="w-full p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg transition delay-50 duration-300 ease-in-out"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Servicios
                <svg
                  className={`size-4 ms-auto transform transition-transform ${
                    dropdownOpen ? "-rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="relative w-full md:w-52 bg-white md:rounded-lg md:shadow-md p-2">
                  <Link
                    className="p-2 block text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
                    href="/#servicios"
                    onClick={() => setMenuOpen(false)}
                  >
                    Pisos Flotantes - Vinilicos
                  </Link>
                  <Link
                    className="p-2 block text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
                    href="/#servicios"
                    onClick={() => setMenuOpen(false)}
                  >
                    Pulido y Plastificado - Hidrolaqueado
                  </Link>
                  <Link
                    className="p-2 block text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
                    href="/#servicios"
                    onClick={() => setMenuOpen(false)}
                  >
                    Pulido y Lustrado de Granito
                  </Link>
                  <Link
                    className="p-2 block text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
                    href="/#servicios"
                    onClick={() => setMenuOpen(false)}
                  >
                    Reparaciones
                  </Link>
                </div>
              )}
            </div>

            <div className="relative block sm:hidden">
              <button
                type="button"
                className="w-full p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg transition delay-50 duration-300 ease-in-out"
                onClick={() => setDropdownPisosOpen(!dropdownPisosOpen)}
              >
                Pisos
                <svg
                  className={`size-4 ms-auto transform transition-transform ${
                    dropdownPisosOpen ? "-rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {dropdownPisosOpen && (
                <div className="relative w-full md:w-52 bg-white md:rounded-lg md:shadow-md p-2">
                  <Link
                    className="p-2 block text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
                    href={{
                      pathname: "/pisos",
                      query: { categoria: "Flotante Melamínico" },
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Flotantes Melamínicos
                  </Link>

                  <Link
                    className="p-2 block text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
                    href={{
                      pathname: "/pisos",
                      query: { categoria: "Vinílico Rígido" },
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Vinílico Rígido
                  </Link>
                </div>
              )}
            </div>

            <Link
              className="hidden p-2 sm:flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg transition delay-50 duration-300 ease-in-out"
              href="/pisos"
              onClick={() => setMenuOpen(false)}
            >
              Pisos Flotantes - Vinilicos
            </Link>

            <Link
              className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg transition delay-50 duration-300 ease-in-out"
              href="/#sobre-nosotros"
              onClick={() => setMenuOpen(false)}
            >
              Sobre Nosotros
            </Link>

            <Link
              className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg transition delay-50 duration-300 ease-in-out"
              href="/#contacto"
              onClick={() => setMenuOpen(false)}
            >
              Contacto
            </Link>

            <div className="my-2 md:my-0 md:mx-2">
              <div className="w-full h-px md:w-px md:h-4 bg-gray-100 md:bg-gray-300"></div>
            </div>

            <div className="flex flex-wrap items-center gap-x-1.5">
              <Link
                className="px-3 py-2 inline-flex items-center font-semibold text-sm rounded-lg bg-mucci-marron text-white hover:bg-yellow-950 focus:outline-none focus:bg-yellow-950 disabled:opacity-50 disabled:pointer-events-none transition delay-50 duration-300 ease-in-out"
                href="https://wa.me/5491124609514"
              >
                Pedir Presupuesto
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Index;
