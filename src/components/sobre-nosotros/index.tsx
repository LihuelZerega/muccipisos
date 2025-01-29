import React from "react";
import { BlurFade } from "../blur-fade";
import QuienesSomos from "@/images/QuienesSomos.png";
import HistoriayTrayectoria from "@/images/HistoriayTrayectoria.png";

function index() {
  return (
    <div
      id="sobre-nosotros"
      className='className="flex flex-col items-center justify-center max-w-[85rem] mx-auto scroll-mt-20 lg:px-6 sm:px-0 pt-12 lg:pt-24'
    >
      <BlurFade inView className="flex flex-col items-cener justify-center text-center">
        <h2 className="text-3xl lg:text-5xl text-neutral-700 w-fit mx-auto">
          Más de 50 Años Transformando Espacios <br /> con Pasión y Excelencia
        </h2>
      </BlurFade>
      <BlurFade inView className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-12 lg:py-24 mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 scroll-mt-20">
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
              Somos una empresa familiar con más de 50 años de experiencia en la
              venta, instalación y mantenimiento de pisos de madera y otros
              materiales de alta calidad. Nos enorgullece combinar tradición y
              modernidad para ofrecer resultados excepcionales a nuestros
              clientes.
            </p>
            <ul className="pt-3">
              <li className="flex flex-row items-center space-x-1">
                <p>
                  <strong className="text-neutral-700">
                    Asesoramiento Personalizado:
                  </strong>{" "}
                  Te ayudamos a elegir la mejor solución para tus espacios.
                </p>
              </li>
              <li className="flex flex-row items-center space-x-1">
                <p>
                  <strong className="text-neutral-700">
                    Presupuestos Sin Cargo:
                  </strong>{" "}
                  Transparentes y adaptados a tus necesidades.
                </p>
              </li>
              <li className="flex flex-row items-center space-x-1">
                <p>
                  <strong className="text-neutral-700">
                    Cobertura Total en CABA y GBA:
                  </strong>{" "}
                  Llevamos nuestros servicios donde los necesites.
                </p>
              </li>
              <li className="flex flex-row items-center space-x-1">
                <p>
                  <strong className="text-neutral-700">
                    Compromiso y Prolijidad:
                  </strong>{" "}
                  Cada proyecto es una promesa de excelencia cumplida.
                </p>
              </li>
            </ul>
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
      <BlurFade inView className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-12 lg:py-24 mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 scroll-mt-20">
        <div className="flex flex-col items-start justify-center">
          <h3 className="text-neutral-700 text-3xl lg:text-4xl font-poppins font-regular max-w-xl">
            Historia y Trayectoria
          </h3>
          <div className="text-neutral-500 font-poppins">
            <p className="pt-3 lg:max-w-xl">
              Nuestra empresa comenzó como un pequeño negocio familiar, enfocado
              en embellecer hogares con pisos de alta calidad. Décadas después,
              hemos evolucionado para convertirnos en referentes en soluciones
              de pisos, manteniendo los valores que nos fundaron: integridad,
              pasión y compromiso.
            </p>
            <ul className="pt-3">
              <li className="flex flex-row items-center space-x-1">
                <p>
                  <strong className="text-neutral-700">Misión:</strong>{" "}
                  Embellecer los espacios de nuestros clientes y hacer de ellos
                  lugares cómodos y agradables donde quieran pasar tiempo.
                </p>
              </li>
              <li className="flex flex-row items-center space-x-1">
                <p>
                  <strong className="text-neutral-700">Visión:</strong> Ser
                  líderes en soluciones para pisos en Argentina, marcando la
                  diferencia con nuestro compromiso y calidad.
                </p>
              </li>
            </ul>
            <ul className="pt-3">
              <strong className="text-neutral-700 text-lg">
                Nuestros Valores:
              </strong>
              <li className="space-x-1">
                <strong className="text-neutral-600">
                  Integridad:{" "}
                </strong>
                Actuamos con transparencia y ética en cada proyecto.
              </li>
              <li className="space-x-1">
                <strong className="text-neutral-600">
                  Espíritu de Equipo:
                </strong>
                Trabajamos juntos para ofrecer lo mejor.
              </li>
              <li className="space-x-1">
                <strong className="text-neutral-600">Pasión: </strong>
                Amamos lo que hacemos y eso se refleja en cada detalle.
              </li>
              <li className="space-x-1">
                <strong className="text-neutral-600">
                  Calidad:{" "}
                </strong>
                Solo ofrecemos productos y servicios de excelencia.
              </li>
              <li className="space-x-1">
                <strong className="text-neutral-600">
                  Compromiso:{" "}
                </strong>
                Cumplimos lo que prometemos, superando expectativas.
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
