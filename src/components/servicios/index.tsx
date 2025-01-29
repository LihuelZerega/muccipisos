"use client";
import React, { useState } from "react";
import { BlurFade } from "../blur-fade";
import PisosFlotantes from "@/images/PisosFlotantes.png";
import PulidoyPlastificado from "@/images/PulidoyPlastificado.png";
import PulidoyLustrado from "@/images/PulidoyLustrado.png";
import Reparaciones from "@/images/Reparaciones.png";

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"} {...props}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.3789 2.27907 14.6926 2.78382 15.8877C3.06278 16.5481 3.20226 16.8784 3.21953 17.128C3.2368 17.3776 3.16334 17.6521 3.01642 18.2012L2 22L5.79877 20.9836C6.34788 20.8367 6.62244 20.7632 6.87202 20.7805C7.12161 20.7977 7.45185 20.9372 8.11235 21.2162C9.30745 21.7209 10.6211 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8.58815 12.3773L9.45909 11.2956C9.82616 10.8397 10.2799 10.4153 10.3155 9.80826C10.3244 9.65494 10.2166 8.96657 10.0008 7.58986C9.91601 7.04881 9.41086 7 8.97332 7C8.40314 7 8.11805 7 7.83495 7.12931C7.47714 7.29275 7.10979 7.75231 7.02917 8.13733C6.96539 8.44196 7.01279 8.65187 7.10759 9.07169C7.51023 10.8548 8.45481 12.6158 9.91948 14.0805C11.3842 15.5452 13.1452 16.4898 14.9283 16.8924C15.3481 16.9872 15.558 17.0346 15.8627 16.9708C16.2477 16.8902 16.7072 16.5229 16.8707 16.165C17 15.8819 17 15.5969 17 15.0267C17 14.5891 16.9512 14.084 16.4101 13.9992C15.0334 13.7834 14.3451 13.6756 14.1917 13.6845C13.5847 13.7201 13.1603 14.1738 12.7044 14.5409L11.6227 15.4118" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const services = [
  {
    id: 1,
    title: "Pisos Flotantes - Vinilicos",
    description:
      "Ofrecemos una amplia variedad de pisos flotantes y vinílicos con sistema click, perfectos para transformar cualquier espacio con estilo y practicidad.",
    image: PisosFlotantes,
    modalInfo: "Información detallada sobre pisos flotantes y vinílicos...",
  },
  {
    id: 2,
    title: "Pulido y Plastificado - Hidrolaqueado",
    description:
      "Renovamos tus pisos de madera con técnicas profesionales que incluyen plastificado e hidrolaqueado, brindando protección, brillo y un acabado resistente al uso diario.",
    image: PulidoyPlastificado,
    modalInfo: "Detalles sobre el proceso de pulido y plastificado...",
  },
  {
    id: 3,
    title: "Pulido y Lustrado de Granito",
    description:
      "Recupera el esplendor de tus pisos de granito o mosaico con nuestro servicio de pulido y lustrado, eliminando rayones y manchas para un acabado impecable.",
    image: PulidoyLustrado,
    modalInfo: "Explicación sobre el pulido y lustrado de granito...",
  },
  {
    id: 4,
    title: "Reparaciones",
    description:
      "Reparamos daños en tus pisos de madera o granito, devolviéndoles su funcionalidad y belleza original con un trabajo detallado y profesional.",
    image: Reparaciones,
    modalInfo: "Procedimientos y beneficios de nuestras reparaciones...",
  },
];

function Servicios() {
  const [selectedService, setSelectedService] = useState<null | typeof services[0]>(null);

  const handleWhatsAppClick = (serviceTitle: string) => {
    const message = encodeURIComponent(`Hola Muccipisos, quiero contratar el servicio de ${serviceTitle}.`);
    const whatsappUrl = `https://wa.me/549XXXXXXXXXX?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div id="servicios" className="flex flex-col items-center justify-center max-w-[85rem] mx-auto scroll-mt-20 lg:px-6 sm:px-0 py-12 lg:py-24">
      <BlurFade inView className="flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl lg:text-5xl text-neutral-700 border-b-2 w-fit mx-auto border-mucci-marron">
          Nuestros Servicios
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mt-4">
          Con más de 50 años de experiencia, ofrecemos soluciones personalizadas para cada tipo de piso, asegurando calidad, durabilidad y resultados que superan tus expectativas.
        </p>
      </BlurFade>
      <BlurFade inView className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 px-6 mt-12">
        {services.map((service) => (
          <section key={service.id} className="flex flex-col items-center justify-start gap-4">
            <img src={service.image.src} alt={service.title} />
            <div className="flex flex-col items-start justify-start gap-2">
              <h3 className="text-neutral-700 text-semibold text-xl">{service.title}</h3>
              <p className="text-gray-500 text-sm">{service.description}</p>
              <button
                className="text-mucci-marron font-semibold text-sm text-left"
                onClick={() => setSelectedService(service)}
              >
                VER MÁS INFORMACIÓN
              </button>
            </div>
          </section>
        ))}
      </BlurFade>
      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-3 lg:mx-0">
            <h3 className="text-neutral-700 text-xl font-semibold">{selectedService.title}</h3>
            <p className="text-neutral-600 mt-2">{selectedService.modalInfo}</p>
            <div className="flex items-end justify-end space-x-3 mt-4">
              <button
                className="bg-white border text-neutral-700 px-4 py-2 rounded"
                onClick={() => setSelectedService(null)}
              >
                Cerrar
              </button>
              <button
                className="flex flex-row items-center space-x-1 bg-green-500 font-semibold text-white px-4 py-2 rounded"
                onClick={() => handleWhatsAppClick(selectedService.title)}
              >
                <span><WhatsappIcon /></span>
                <span>Contratar Servicio</span> 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Servicios;
