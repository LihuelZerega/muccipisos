'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
// import { StarIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsappBubble from "@/components/whatsapp-bubble";

// Interfaz para los productos de pisos
interface PisoProduct {
  row_number: number;
  id: number;
  Titulo: string;
  Categoria: string;
  Tipo: string;
  "Formato de tabla": string;
  "Manta incorporada": string;
  "Capa de desgaste": string;
  "Contenido de la caja": string;
  "M2 por caja": string;
  Textura: string;
  "Resistencia al Desgaste": string;
  Resistencia: string;
  "Tipo de Union": string;
  Origen: string;
  "Imagen 1": string;
  "Imagen 2": string;
  "Imagen 3": string;
  "Imagen 4": string;
}

// function classNames(...classes: (string | undefined | null | false)[]) {
//   return classes.filter(Boolean).join(' ')
// }

export default function ProductDetail() {
  const params = useParams()
  const [product, setProduct] = useState<PisoProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)

  // Función para generar el mensaje de WhatsApp
  const generateWhatsAppMessage = (product: PisoProduct) => {
    const message = `Hola! Me interesa solicitar una cotización para el siguiente producto:

🏠 *${product.Titulo}*
📋 Categoría: ${product.Categoria}
📏 Formato: ${product["Formato de tabla"]}
📦 M² por caja: ${product["M2 por caja"]}
🏭 Origen: ${product.Origen}
💪 Resistencia: ${product.Resistencia}

¿Podrían proporcionarme información sobre precios y disponibilidad?

Gracias!`
    
    return encodeURIComponent(message)
  }

  // Función para abrir WhatsApp
  const handleWhatsAppClick = () => {
    if (product) {
      const message = generateWhatsAppMessage(product)
      const whatsappUrl = `https://wa.me/5491124609514?text=${message}`
      window.open(whatsappUrl, '_blank')
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://ops.kiros.dev/webhook/e266a84b-c31e-4d55-bbe6-966cb3f31d2a')
        if (!response.ok) {
          throw new Error('Error al cargar el producto')
        }
        const data = await response.json()
        const productId = params?.id ? String(params.id) : null
        
        if (productId) {
          const foundProduct = data.find((p: PisoProduct) => String(p.id) === productId)
          if (foundProduct) {
            setProduct(foundProduct)
          } else {
            setError('Producto no encontrado')
          }
        } else {
          setError('ID de producto no válido')
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Error al cargar el producto')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params?.id])

  if (loading) {
    return (
      <>
        <Navbar />
        <WhatsappBubble />
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mucci-marron mx-auto"></div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <WhatsappBubble />
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-600">{error || 'Producto no encontrado'}</p>
            <Link href="/pisos" className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500">
              <ChevronLeftIcon className="h-5 w-5 mr-2" />
              Volver a productos
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Preparar las imágenes del producto
  const images = [
    product["Imagen 1"],
    product["Imagen 2"],
    product["Imagen 3"],
    product["Imagen 4"]
  ].filter(Boolean)

  // Características del producto
  const productFeatures = [
    { name: 'Categoría', value: product.Categoria },
    { name: 'Tipo', value: product.Tipo },
    { name: 'Formato de tabla', value: product["Formato de tabla"] },
    { name: 'Manta incorporada', value: product["Manta incorporada"] },
    { name: 'Capa de desgaste', value: product["Capa de desgaste"] },
    { name: 'Contenido de la caja', value: product["Contenido de la caja"] },
    { name: 'M² por caja', value: product["M2 por caja"] },
    { name: 'Textura', value: product.Textura || 'No especificada' },
    { name: 'Resistencia al desgaste', value: product["Resistencia al Desgaste"] },
    { name: 'Resistencia', value: product.Resistencia },
    { name: 'Tipo de unión', value: product["Tipo de Union"] },
    { name: 'Origen', value: product.Origen }
  ]

  return (
    <>
      <Navbar />
      <WhatsappBubble />
      <div className="bg-white">
        <div className="pt-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <li>
                <div className="flex items-center">
                  <Link href="/pisos" className="mr-2 text-sm font-medium text-gray-900 hover:text-indigo-600">
                    Pisos
                  </Link>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mr-2 text-sm font-medium text-gray-500">{product.Categoria}</span>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <span aria-current="page" className="font-medium text-gray-500">
                  {product.Titulo}
                </span>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
            {images.length > 0 ? (
              <>
                {/* Imagen principal */}
                <div className="lg:col-span-2">
                  <img
                    alt={product.Titulo}
                    src={images[selectedImage] || '/placeholder-image.svg'}
                    className="w-full h-96 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-image.svg';
                    }}
                  />
                </div>

                {/* Miniaturas */}
                {images.length > 1 && (
                  <div className="mt-4 lg:mt-0 lg:col-span-1">
                    <div className="grid grid-cols-2 gap-4">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative overflow-hidden rounded-lg ${
                            selectedImage === index ? 'ring-2 ring-indigo-500' : ''
                          }`}
                        >
                          <img
                            alt={`${product.Titulo} - Vista ${index + 1}`}
                            src={image}
                            className="w-full h-24 object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-image.svg';
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="lg:col-span-3 flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                <div className="text-center">
                  <img
                    src="/placeholder-image.svg"
                    alt="Sin imagen"
                    className="mx-auto h-32 w-32 text-gray-400"
                  />
                  <p className="mt-2 text-sm text-gray-500">No hay imágenes disponibles</p>
                </div>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.Titulo}</h1>
              <p className="mt-2 text-lg text-gray-600">{product.Categoria}</p>
            </div>

            {/* Información del producto */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Información del producto</h2>
              
              {/* Características principales */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Características principales</h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Formato:</span>
                      <span className="text-sm font-medium text-gray-900">{product["Formato de tabla"]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">M² por caja:</span>
                      <span className="text-sm font-medium text-gray-900">{product["M2 por caja"]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Contenido:</span>
                      <span className="text-sm font-medium text-gray-900">{product["Contenido de la caja"]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Origen:</span>
                      <span className="text-sm font-medium text-gray-900">{product.Origen}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Resistencia:</span>
                      <span className="text-sm font-medium text-gray-900">{product.Resistencia}</span>
                    </div>
                  </div>
                </div>

                {/* Botón de contacto */}
                <div className="border-t border-gray-200 pt-6">
                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-hidden transition-colors duration-200"
                  >
                    <svg 
                      className="w-5 h-5 mr-2" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Solicitar cotización por WhatsApp
                  </button>
                  <p className="mt-2 text-xs text-gray-500 text-center">
                    Te redirigiremos a WhatsApp con los detalles del producto
                  </p>
                </div>
              </div>
            </div>

            {/* Descripción y características detalladas */}
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-8">
              {/* Descripción */}

              {/* Características técnicas */}
              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Características técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {productFeatures.map((feature, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <dt className="text-sm font-medium text-gray-600 mb-1">{feature.name}</dt>
                      <dd className="text-sm text-gray-900">{feature.value}</dd>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beneficios */}
              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Beneficios</h3>
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-600">
                    <span className="text-gray-900">Resistencia al desgaste:</span> {product["Resistencia al Desgaste"]}
                  </li>
                  <li className="text-gray-600">
                    <span className="text-gray-900">Resistencia a la humedad:</span> {product.Resistencia}
                  </li>
                  <li className="text-gray-600">
                    <span className="text-gray-900">Fácil instalación:</span> Sistema {product["Tipo de Union"]}
                  </li>
                  {product["Manta incorporada"] && (
                    <li className="text-gray-600">
                      <span className="text-gray-900">Manta incorporada:</span> {product["Manta incorporada"]}
                    </li>
                  )}
                  {product.Textura && (
                    <li className="text-gray-600">
                      <span className="text-gray-900">Textura especial:</span> {product.Textura}
                    </li>
                  )}
                </ul>
              </div>

              {/* Información adicional */}
              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Información adicional</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Capa de desgaste:</span>
                      <p className="text-gray-600">{product["Capa de desgaste"]}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Tipo de unión:</span>
                      <p className="text-gray-600">{product["Tipo de Union"]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
