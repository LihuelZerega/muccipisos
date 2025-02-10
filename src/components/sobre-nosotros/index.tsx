import React from "react";
import { BlurFade } from "../blur-fade";
import QuienesSomos from "@/images/QuienesSomos.png";
import HistoriayTrayectoria from "@/images/HistoriayTrayectoria.png";
import Benefits from "../benefits";

const Tick01Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#79472e"}
    fill={"none"}
    {...props}
  >
    <path
      d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function index() {
  return (
    <div
      id="sobre-nosotros"
      className='className="flex flex-col items-center justify-center max-w-[85rem] mx-auto scroll-mt-20 lg:px-6 sm:px-0 pt-12 lg:pt-24'
    >
      <BlurFade
        inView
        className="flex flex-col items-cener justify-center text-center"
      >
        <h2 className="text-4xl lg:text-5xl text-neutral-700 border-b-2 w-fit mx-auto border-mucci-marron">
          Sobre Nosotros
        </h2>
      </BlurFade>
      <BlurFade
        inView
        className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-12 lg:py-24 mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 scroll-mt-20"
      >
        <div className="hidden md:flex items-center justify-start">
          <img
            src={QuienesSomos.src}
            alt=""
            className="lg:h-[500px] 2xl:[400px]"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <h3 className="text-neutral-700 text-3xl lg:text-4xl font-poppins font-regular max-w-xl">
            ¿Quiénes Somos?
          </h3>
          <div className="text-neutral-500 font-poppins">
            <p className="pt-3 lg:max-w-xl">
              Somos una empresa familiar con 58 años de experiencia en pisos de
              madera.
            </p>
            <p className="pt-3 lg:max-w-xl">
              Nos hemos ido transformando y adaptando a las necesidades de
              nuestros clientes; sumando conocimientos, equipamientos y capital
              humano, para hoy ser MUCCIPISOS, una de las empresas más elegidas
              para embellecer sus hogares.
            </p>
            <p>
              Nuestra misión Ayudar a nuestros clientes a transformar sus ambientes en hermosos
              espacios donde deseen pasar tiempo.
            </p>
          </div>
        </div>
        <div className="flex md:hidden items-center justify-start">
          <img
            src={QuienesSomos.src}
            alt=""
            className="lg:h-[300px] 2xl:[400px]"
          />
        </div>
      </BlurFade>
      <Benefits />
      <BlurFade
        inView
        className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-12 lg:py-24 mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 scroll-mt-20"
      >
        <div className="flex flex-col items-start justify-center">
          <h3 className="text-neutral-700 text-3xl lg:text-4xl font-poppins font-regular max-w-xl">
            Nuestros Valores
          </h3>
          <div className="text-neutral-500 font-poppins">
            <ul className="pt-3 space-y-0.5">
              {/* <strong className="text-neutral-700">Valores:</strong> */}
              <li className="flex flex-row items-start space-x-1">
                <Tick01Icon />
                <span>
                  <strong className="text-neutral-600">Compromiso: </strong>
                  Responsabilidad que nos vincula a nuestros clientes,
                  proveedores y compañeros.
                </span>
              </li>
              <li className="flex flex-row items-start space-x-1">
                <Tick01Icon />
                <span>
                  <strong className="text-neutral-600">Calidad: </strong>
                  Estamos en constante búsqueda de la excelencia.
                </span>
              </li>
              <li className="flex flex-row items-start space-x-1">
                <Tick01Icon />
                <span>
                  <strong className="text-neutral-600">Integridad: </strong>
                  Actuamos y nos relacionamos de manera honesta, transparente,
                  coherente y respetuosa
                </span>
              </li>
              <li className="flex flex-row items-start space-x-1">
                <Tick01Icon />
                <span>
                  <strong className="text-neutral-600">Pasión: </strong>
                  Disfrutamos de lo que hacemos. Trabajamos con entusiasmo y
                  alegría.
                </span>
              </li>
              <li className="flex flex-row items-start space-x-1">
                <Tick01Icon />
                <span>
                  <strong className="text-neutral-600">
                    Espíritu de Equipo:{" "}
                  </strong>
                  Fomentamos el ambiente de colaboración, solidaridad y respeto
                  mutuo
                </span>
              </li>
              <li className="flex flex-row items-start space-x-1">
                <Tick01Icon />
                <span>
                  <strong className="text-neutral-600">Iniciativa: </strong>
                  Proponemos ideas para mejorar y priorizamos la búsqueda de
                  soluciones.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-start">
          <img
            src={HistoriayTrayectoria.src}
            alt=""
            className="lg:h-[500px] 2xl:[400px]"
          />
        </div>
      </BlurFade>
    </div>
  );
}

export default index;
