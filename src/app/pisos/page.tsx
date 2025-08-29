import { Suspense } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Loader from "@/components/loader";
import WhatsappBubble from "@/components/whatsapp-bubble";
import Pisos from "@/components/pisos";

function Page() {
  return (
    <Suspense fallback={<Loader />}>
    <Navbar />
    <WhatsappBubble />
    <Pisos />
    <Footer />
  </Suspense>
  )
}

export default Page