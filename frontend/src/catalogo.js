/* Catálogo local de Vitalis+. Las imágenes se sirven desde public/images. */
const FOTOS = [
  "/images/ambo-verde.webp",
  "/images/ambo-blanco-azul.webp",
  "/images/ambo-azul-clasico.webp",
  "/images/ambo-estampado.webp",
  "/images/ambo-blanco.webp",
  "/images/ambo-floral-rosa.webp",
  "/images/ambo-negro.webp",
  "/images/ambo-azul-cierre.webp",
  "/images/ambo-azul-marino.webp",
  "/images/ambo-verde-botella.webp",
  "/images/ambo-beige.webp",
  "/images/ambo-verde-oscuro.webp"
];

const productos = [
  { nombre:"Ambo verde", claves:["Cómodo","Moderno","Funcional"], precio:45000 },
  { nombre:"Ambo blanco con detalles azules", claves:["Cómodo","Elegante","Moderno"], precio:44000 },
  { nombre:"Ambo azul clásico", claves:["Elegante","Cómodo","Profesional"], precio:48000 },
  { nombre:"Ambo estampado", claves:["Colorido","Original","Cómodo"], precio:46000 },
  { nombre:"Ambo blanco", claves:["Clásico","Funcional","Profesional"], precio:42000 },
  { nombre:"Ambo floral rosa", claves:["Fresco","Delicado","Cómodo"], precio:46000 },
  { nombre:"Ambo negro", claves:["Elegante","Cómodo","Versátil"], precio:47000 },
  { nombre:"Ambo azul con cierre", claves:["Práctico","Moderno","Funcional"], precio:50000 },
  { nombre:"Ambo azul marino", claves:["Moderno","Resistente","Profesional"], precio:48000 },
  { nombre:"Ambo verde botella", claves:["Elegante","Cómodo","Distintivo"], precio:45000 },
  { nombre:"Ambo beige", claves:["Suave","Elegante","Moderno"], precio:50000 },
  { nombre:"Ambo verde oscuro", claves:["Clásico","Cómodo","Funcional"], precio:48000 }
].map((p,i) => ({ ...p, img: FOTOS[i] }));

export { productos, FOTOS };
export const HERO = "/images/hero-uniformes.webp";
export const SECCIONES = ["/images/nosotros-equipo.webp", "/images/nosotros-mision.webp", "/images/nosotros-calidad.webp", "/images/nosotros-valores.webp"];
