import React from "react";
import { BlurFade } from "../blur-fade";
import Petrilac from "@/images/petrilac.png";

function index() {
  return (
    <BlurFade inView className="flex flex-col md:flex-row items-center justify-center px-6 sm:px-0 pt-6 pb-12 max-w-[85rem] mx-auto">
      <p className="flex items-center justify-center mx-auto sm:pl-12 sm:w-7/12 text-neutral-600">
        Utilizamos los mejores productos del mercado para que tu piso luzca
        impecable, sea duradero y conserve su belleza por muchos años.
      </p>
      <div className="flex items-center justify-center mt-6 sm:mt-0 sm:w-5/12">
        <img src={Petrilac.src} alt="" className="h-12 w-64" />
      </div>
    </BlurFade>
  );
}

export default index;
