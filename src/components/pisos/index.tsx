"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

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

/** Helpers de normalización */
const norm = (s?: string) =>
  (s ?? "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .toLowerCase()
    .trim();

const someNorm = (arr: string[], val: string) =>
  arr.some((v) => norm(v) === norm(val));

export default function PisosComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState<PisoProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({
    categoria: [],
    tipo: [],
    resistencia: [],
    origen: [],
    textura: [],
    tipoUnion: [],
    resistenciaDesgaste: [],
    mantaIncorporada: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyWithImages, setShowOnlyWithImages] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [tipos, setTipos] = useState<string[]>([]);
  const [resistencias, setResistencias] = useState<string[]>([]);
  const [origenes, setOrigenes] = useState<string[]>([]);
  const [texturas, setTexturas] = useState<string[]>([]);
  const [tiposUnion, setTiposUnion] = useState<string[]>([]);
  const [resistenciasDesgaste, setResistenciasDesgaste] = useState<string[]>(
    []
  );
  const [mantasIncorporadas, setMantasIncorporadas] = useState<string[]>([]);

  /** Bandera: ya hidratamos el estado desde la query inicial */
  const [hydratedFromQuery, setHydratedFromQuery] = useState(false);

  /** Lee filtros desde la URL y setea estado, luego marca hidratado */
  useEffect(() => {
    const categorias = searchParams?.getAll("categoria") ?? [];
    const tipos = searchParams?.getAll("tipo") ?? [];
    const resistencias = searchParams?.getAll("resistencia") ?? [];
    const origenes = searchParams?.getAll("origen") ?? [];
    const texturas = searchParams?.getAll("textura") ?? [];
    const tiposUnion = searchParams?.getAll("tipoUnion") ?? [];
    const resistenciasDesgaste =
      searchParams?.getAll("resistenciaDesgaste") ?? [];
    const mantasIncorporada = searchParams?.getAll("mantaIncorporada") ?? [];

    const buscador = searchParams?.get("q") ?? "";
    const onlyImgs = (searchParams?.get("conImagen") ?? "0") === "1";

    setSelectedFilters((prev) => ({
      ...prev,
      categoria: categorias,
      tipo: tipos,
      resistencia: resistencias,
      origen: origenes,
      textura: texturas,
      tipoUnion: tiposUnion,
      resistenciaDesgaste: resistenciasDesgaste,
      mantaIncorporada: mantasIncorporada,
    }));
    setSearchTerm(buscador);
    setShowOnlyWithImages(onlyImgs);

    setHydratedFromQuery(true);
  }, [searchParams]);

  /** Construye y escribe la URL desde el estado (con guardas) */
  const updateUrlFromState = useMemo(() => {
    return (state: {
      selected: typeof selectedFilters;
      q: string;
      onlyImgs: boolean;
    }) => {
      const params = new URLSearchParams();

      const pushAll = (key: string, arr: string[]) => {
        arr.filter(Boolean).forEach((v) => params.append(key, v));
      };

      pushAll("categoria", state.selected.categoria);
      pushAll("tipo", state.selected.tipo);
      pushAll("resistencia", state.selected.resistencia);
      pushAll("origen", state.selected.origen);
      pushAll("textura", state.selected.textura);
      pushAll("tipoUnion", state.selected.tipoUnion);
      pushAll("resistenciaDesgaste", state.selected.resistenciaDesgaste);
      pushAll("mantaIncorporada", state.selected.mantaIncorporada);

      if (state.q) params.set("q", state.q);
      if (state.onlyImgs) params.set("conImagen", "1");

      const nextQs = params.toString();
      const currQs =
        typeof window !== "undefined"
          ? window.location.search.startsWith("?")
            ? window.location.search.slice(1)
            : window.location.search
          : "";

      // Nada que hacer si no cambia
      if (nextQs === currQs) return;

      const basePath = pathname || "/pisos";
      router.replace(nextQs ? `${basePath}?${nextQs}` : basePath, {
        scroll: false,
      });
    };
  }, [pathname, router]);

  /** Solo escribimos a la URL cuando ya hidratamos y corresponde */
  useEffect(() => {
    if (!hydratedFromQuery) return;

    const hasState =
      Object.values(selectedFilters).some((arr) => arr.length > 0) ||
      !!searchTerm ||
      !!showOnlyWithImages;

    const currQs = typeof window !== "undefined" ? window.location.search : "";
    const hasIncomingQuery = !!currQs && currQs !== "?";

    // Si venimos con query y todavía no hay estado (primer render), no limpies la URL
    if (!hasState && hasIncomingQuery) return;

    updateUrlFromState({
      selected: selectedFilters,
      q: searchTerm,
      onlyImgs: showOnlyWithImages,
    });
  }, [
    hydratedFromQuery,
    selectedFilters,
    searchTerm,
    showOnlyWithImages,
    updateUrlFromState,
  ]);

  /** Limpiar todos los filtros (y la URL) */
  const clearAllFilters = () => {
    setSelectedFilters({
      categoria: [],
      tipo: [],
      resistencia: [],
      origen: [],
      textura: [],
      tipoUnion: [],
      resistenciaDesgaste: [],
      mantaIncorporada: [],
    });
    setSearchTerm("");
    setShowOnlyWithImages(false);

    const basePath = pathname || "/pisos";
    router.replace(basePath, { scroll: false });
  };

  /** Carga de productos y armado de opciones únicas */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://ops.kiros.dev/webhook/e266a84b-c31e-4d55-bbe6-966cb3f31d2a"
        );
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        const data = await response.json();
        setProducts(data);

        const uniqueCategories = Array.from(
          new Set(data.map((p: PisoProduct) => p.Categoria))
        ).filter(Boolean) as string[];
        const uniqueTipos = Array.from(
          new Set(data.map((p: PisoProduct) => p.Tipo))
        ).filter(Boolean) as string[];
        const uniqueResistencias = Array.from(
          new Set(data.map((p: PisoProduct) => p.Resistencia))
        ).filter(Boolean) as string[];
        const uniqueOrigenes = Array.from(
          new Set(data.map((p: PisoProduct) => p.Origen))
        ).filter(Boolean) as string[];
        const uniqueTexturas = Array.from(
          new Set(data.map((p: PisoProduct) => p.Textura))
        ).filter(Boolean) as string[];
        const uniqueTiposUnion = Array.from(
          new Set(data.map((p: PisoProduct) => p["Tipo de Union"]))
        ).filter(Boolean) as string[];
        const uniqueResistenciasDesgaste = Array.from(
          new Set(data.map((p: PisoProduct) => p["Resistencia al Desgaste"]))
        ).filter(Boolean) as string[];
        const uniqueMantasIncorporadas = Array.from(
          new Set(data.map((p: PisoProduct) => p["Manta incorporada"]))
        ).filter(Boolean) as string[];

        setCategories(uniqueCategories);
        setTipos(uniqueTipos);
        setResistencias(uniqueResistencias);
        setOrigenes(uniqueOrigenes);
        setTexturas(uniqueTexturas);
        setTiposUnion(uniqueTiposUnion);
        setResistenciasDesgaste(uniqueResistenciasDesgaste);
        setMantasIncorporadas(uniqueMantasIncorporadas);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /** Cambios de filtros (checkboxes) */
  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [filterType]: newValues,
      };
    });
  };

  /** Estado de filtros activos */
  const hasActiveFilters =
    Object.values(selectedFilters).some((filters) => filters.length > 0) ||
    !!searchTerm ||
    !!showOnlyWithImages;

  /** Filtrado de productos (categoría con normalización) */
  const filteredProducts = products.filter((product) => {
    // Texto
    if (searchTerm && !norm(product.Titulo).includes(norm(searchTerm))) {
      return false;
    }

    // Solo con imagen
    if (showOnlyWithImages && !product["Imagen 1"]) {
      return false;
    }

    // Categoría (normalizada)
    if (
      selectedFilters.categoria.length > 0 &&
      !someNorm(selectedFilters.categoria, product.Categoria)
    ) {
      return false;
    }

    // Tipo
    if (
      selectedFilters.tipo.length > 0 &&
      !selectedFilters.tipo.includes(product.Tipo)
    ) {
      return false;
    }

    // Resistencia
    if (
      selectedFilters.resistencia.length > 0 &&
      !selectedFilters.resistencia.includes(product.Resistencia)
    ) {
      return false;
    }

    // Origen
    if (
      selectedFilters.origen.length > 0 &&
      !selectedFilters.origen.includes(product.Origen)
    ) {
      return false;
    }

    // Textura
    if (
      selectedFilters.textura.length > 0 &&
      !selectedFilters.textura.includes(product.Textura)
    ) {
      return false;
    }

    // Tipo de unión
    if (
      selectedFilters.tipoUnion.length > 0 &&
      !selectedFilters.tipoUnion.includes(product["Tipo de Union"])
    ) {
      return false;
    }

    // Resistencia al desgaste
    if (
      selectedFilters.resistenciaDesgaste.length > 0 &&
      !selectedFilters.resistenciaDesgaste.includes(
        product["Resistencia al Desgaste"]
      )
    ) {
      return false;
    }

    // Manta incorporada
    if (
      selectedFilters.mantaIncorporada.length > 0 &&
      !selectedFilters.mantaIncorporada.includes(product["Manta incorporada"])
    ) {
      return false;
    }

    return true;
  });

  /** Configuración de filtros dinámicos */
  const filters = [
    {
      id: "categoria",
      name: "Categoría",
      options: categories.map((cat) => ({
        value: cat,
        label: cat,
        checked: someNorm(selectedFilters.categoria, cat),
      })),
    },
    {
      id: "tipo",
      name: "Tipo",
      options: tipos.map((tipo) => ({
        value: tipo,
        label: tipo,
        checked: selectedFilters.tipo.includes(tipo),
      })),
    },
    {
      id: "resistencia",
      name: "Resistencia",
      options: resistencias.map((res) => ({
        value: res,
        label: res,
        checked: selectedFilters.resistencia.includes(res),
      })),
    },
    {
      id: "origen",
      name: "Origen",
      options: origenes.map((orig) => ({
        value: orig,
        label: orig,
        checked: selectedFilters.origen.includes(orig),
      })),
    },
    {
      id: "textura",
      name: "Textura",
      options: texturas.map((text) => ({
        value: text,
        label: text,
        checked: selectedFilters.textura.includes(text),
      })),
    },
    {
      id: "tipoUnion",
      name: "Tipo de Unión",
      options: tiposUnion.map((union) => ({
        value: union,
        label: union,
        checked: selectedFilters.tipoUnion.includes(union),
      })),
    },
    {
      id: "resistenciaDesgaste",
      name: "Resistencia al Desgaste",
      options: resistenciasDesgaste.map((desgaste) => ({
        value: desgaste,
        label: desgaste,
        checked: selectedFilters.resistenciaDesgaste.includes(desgaste),
      })),
    },
    {
      id: "mantaIncorporada",
      name: "Manta Incorporada",
      options: mantasIncorporadas.map((manta) => ({
        value: manta,
        label: manta,
        checked: selectedFilters.mantaIncorporada.includes(manta),
      })),
    },
  ];

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mucci-marron mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-mucci-marron focus:outline-hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Cerrar menú</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {hasActiveFilters && (
                  <div className="px-4 py-3 border-b border-gray-200">
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="text-sm text-mucci-marron hover:text-yellow-950 font-medium"
                    >
                      Limpiar todos los filtros
                    </button>
                  </div>
                )}
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  checked={option.checked}
                                  onChange={() =>
                                    handleFilterChange(section.id, option.value)
                                  }
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-mucci-marron checked:bg-mucci-marron indeterminate:border-mucci-marron indeterminate:bg-mucci-marron focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mucci-marron disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Nuestros Pisos
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                {filteredProducts.length} de {products.length} productos
                {hasActiveFilters && " (filtrados)"}
              </p>
            </div>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filtros</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Productos
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}

              <form className="hidden lg:block">
                <div className="max-w-md">
                  <label htmlFor="search" className="sr-only">
                    Buscar productos
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      id="search"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar por título del producto..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  checked={option.checked}
                                  onChange={() =>
                                    handleFilterChange(section.id, option.value)
                                  }
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-mucci-marron checked:bg-mucci-marron indeterminate:border-mucci-marron indeterminate:bg-mucci-marron focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mucci-marron disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                {hasActiveFilters && (
                  <div className="py-4 border-b border-gray-200">
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="text-sm text-mucci-marron hover:text-yellow-950 font-medium"
                    >
                      Limpiar todos los filtros
                    </button>
                  </div>
                )}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="group relative">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                        <a href={`/pisos/${product.id}`}>
                          <img
                            src={
                              product["Imagen 1"] || "/placeholder-image.svg"
                            }
                            alt={product.Titulo}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder-image.svg";
                            }}
                          />
                        </a>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <a
                              href={`/pisos/${product.id}`}
                              className="hover:text-mucci-marron"
                            >
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.Titulo}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.Categoria}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          <strong>Formato:</strong>{" "}
                          {product["Formato de tabla"]}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>M2 por caja:</strong> {product["M2 por caja"]}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Resistencia:</strong> {product.Resistencia}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500">
                      No se encontraron productos con los filtros seleccionados.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
