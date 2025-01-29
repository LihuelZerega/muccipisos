import React from "react";
import Logo from "@/images/logo.png";
import Link from "next/link";

function index() {
  return (
    <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto border-t border-gray-200 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
        <div className="col-span-full hidden lg:col-span-1 lg:block">
          <Link
            className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80"
            href="/"
            aria-label="Brand"
          >
            {" "}
            <img src={Logo.src} alt="" className="w-24 h-24" />
          </Link>
          <p className="mt-3 text-xs sm:text-sm text-gray-600">
            © 2025 Muccipisos.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-mucci-marron uppercase">
            Inicio
          </h4>

          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                href="#servicios"
              >
                Servicios
              </a>
            </p>
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                href="#sobre-nosotros"
              >
                Sobre Nosotros
              </a>
            </p>
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                href="#testimonios"
              >
                Testimonios
              </a>
            </p>
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                href="#contacto"
              >
                Contacto
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-3">
          <div>
            <h4 className="text-sm font-semibold text-mucci-marron uppercase">
              Contacto
            </h4>

            <div className="mt-3 grid space-y-3 text-sm">
              <p className="inline-flex gap-x-2 text-gray-600 focus:outline-none focus:text-gray-800">
                +54 9 11 3323 - 7020 <br /> +54 9 11 2460 - 9514
              </p>
              <p className="inline-flex gap-x-2 text-gray-600 focus:outline-none focus:text-gray-800">
                muccipisos@gmail.com
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-mucci-marron uppercase">
              Instagram
            </h4>

            <div className="mt-3 grid space-y-3 text-sm">
              <a
                href="https://www.instagram.com/muccipisos"
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
              >
                @muccipisos
              </a>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-mucci-marron uppercase">
            Dirección
          </h4>

          <div className="mt-3 grid space-y-3 text-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52613.558629138686!2d-58.55229096149745!3d-34.494075693860346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb05662e4a08d%3A0x9811553c3a21048c!2sMart%C3%ADnez%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1738171571283!5m2!1ses-419!2sar"
              width="300"
              height="150"
              loading="lazy"
            />
          </div>
        </div>

        {/* <div>
          <h4 className="text-xs font-semibold text-mucci-marron uppercase">
            Developers
          </h4>

          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                href="#"
              >
                Api
              </a>
            </p>
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                href="#"
              >
                Status
              </a>
            </p>
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                href="#"
              >
                GitHub
              </a>{" "}
              <span className="inline text-blue-600">— New</span>
            </p>
          </div>

          <h4 className="mt-7 text-xs font-semibold text-mucci-marron uppercase">
            Industries
          </h4>

          <div className="mt-3 grid space-y-3 text-sm">
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                href="#"
              >
                Financial Services
              </a>
            </p>
            <p>
              <a
                className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                href="#"
              >
                Education
              </a>
            </p>
          </div>
        </div> */}
      </div>
    </footer>
  );
}

export default index;
