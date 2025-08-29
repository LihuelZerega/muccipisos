import { Suspense } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Petrilac from "@/components/petrilac";
import Footer from "@/components/footer";
import Loader from "@/components/loader";
import Servicios from "@/components/servicios";
import SobreNosotros from "@/components/sobre-nosotros";
import Testimonials from "@/components/testimonials";
import Contacto from "@/components/contacto";
import WhatsappBubble from "@/components/whatsapp-bubble";
import Colecciones from "@/components/colecciones";

export default function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <Navbar />
      <WhatsappBubble />
      <Hero />
      <Petrilac />
      {/* <Colecciones /> */}
      <hr className="max-w-2xl mx-auto" />
      <Servicios />
      <hr className="max-w-2xl mx-auto" />
      <SobreNosotros />
      <Testimonials />
      <Contacto />
      <Footer />
    </Suspense>
  );
}
