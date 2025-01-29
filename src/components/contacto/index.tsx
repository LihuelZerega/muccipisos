"use client";
import React, { useState } from "react";

function Index() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    derisedService: "",
    message: "",
  });

  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
      }),
    });

    if (res.ok) {
      setModalContent({
        title: "Mensaje enviado exitosamente",
        message:
          "El mensaje ha sido enviado exitosamente, pronto nos pondremos en contacto. ¡Gracias por contactarnos!",
      });
      setFormData({
        name: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        derisedService: "",
        message: "",
      });
    } else {
      setModalContent({
        title: "Error",
        message: "Error al enviar el mensaje",
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div
      id="contacto"
      className="flex flex-col items-center justify-center max-w-[85rem] mx-auto scroll-mt-20 lg:px-6 sm:px-0 py-12 lg:py-24"
    >
      <div className="flex flex-col items-cener justify-center text-center">
        <h2 className="text-4xl lg:text-5xl text-neutral-700 border-b-2 w-fit mx-auto border-mucci-marron">
          Contactanos
        </h2>
        <p className="text-gray-600 max-w-4xl mx-auto mt-4 px-3 lg:px-0">
          Estamos para ayudarte a transformar tus espacios. Completa el
          formulario y nuestro equipo se pondrá en contacto a la brevedad para
          resolver tus consultas, brindarte asesoramiento personalizado o
          coordinar un presupuesto sin cargo.
        </p>
      </div>

      <div className="mt-16 w-full max-w-xs lg:max-w-lg mx-auto">
        <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-8">
          <h2 className="mb-8 text-xl font-semibold text-gray-800">
            Rellene el Formulario
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 lg:gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label
                    htmlFor="hs-firstname-contacts-1"
                    className="block mb-2 text-sm text-gray-700 font-medium"
                  >
                    Nombre
                  </label>
                  <input
                    id="first-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    autoComplete="given-name"
                    placeholder="Nombre..."
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hs-lastname-contacts-1"
                    className="block mb-2 text-sm text-gray-700 font-medium"
                  >
                    Apellido
                  </label>
                  <input
                    id="last-name"
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={(e) =>
                      setFormData({ ...formData, lastname: e.target.value })
                    }
                    required
                    autoComplete="additional-name"
                    placeholder="Apellido..."
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label
                    htmlFor="hs-email-contacts-1"
                    className="block mb-2 text-sm text-gray-700 font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    autoComplete=""
                    placeholder="Email..."
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hs-phone-number-1"
                    className="block mb-2 text-sm text-gray-700 font-medium"
                  >
                    Número de Teléfono
                  </label>
                  <input
                    id="phone-number"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    required
                    autoComplete="tel"
                    placeholder="Número de Teléfono..."
                    className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="hs-about-contacts-1"
                  className="block mb-2 text-sm text-gray-700 font-medium"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={4}
                  placeholder="Mensaje..."
                  className="py-3 px-4 block w-full border border-gray-200 text-neutral-700 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                ></textarea>
              </div>
            </div>

            <div className="mt-6 grid">
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-mucci-marron text-white hover:bg-yellow-950 focus:outline-none focus:bg-yellow-950 disabled:opacity-50 disabled:pointer-events-none  transition delay-50 duration-300 ease-in-out"
              >
                Enviar
              </button>
            </div>
          </form>

          {isModalOpen && (
            <div
              id="hs-task-created-alert"
              className="fixed inset-0 z-[80] flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/30 px-12 "
              role="dialog"
              aria-labelledby="hs-task-created-alert-label"
            >
              <div className="relative flex flex-col bg-white shadow-lg w-full max-w-lg rounded-md">
                <div className="p-4 sm:p-10 text-center overflow-y-auto">
                  <h3
                    id="hs-task-created-alert-label"
                    className="mb-2 text-xl font-bold text-gray-800"
                  >
                    {modalContent.title}
                  </h3>
                  <p className="text-gray-500">{modalContent.message}</p>

                  <div className="mt-6 flex justify-center gap-x-4">
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 rounded-md"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
