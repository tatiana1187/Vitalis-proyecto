import { useEffect, useRef, useState } from "react";
import { productos as locales, HERO, SECCIONES } from "./catalogo.js";
import "./styles.css";

/* El servidor Kotlin se llama a través de /api (Vite lo reenvía a http://localhost:8080, ver vite.config.js) */
const API = "/api";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TALLES = ["XS", "S", "M", "L", "XL", "XXL"];
const pesos = n => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

/* ===== TEXTOS: editá acá ===== */
const VALORES = ["Calidad en cada prenda", "Compromiso con nuestros clientes", "Innovación en diseños", "Responsabilidad y profesionalismo", "Atención personalizada"];
const BLOQUES = [
  { t: "¿Quiénes somos?", alt: "Equipo de Vitalis+ confeccionando uniformes", p: "Vitalis+ nació con el objetivo de ofrecer uniformes médicos que respondan a las necesidades reales de los profesionales de la salud. Sabemos que médicos, enfermeros, técnicos y estudiantes pasan largas horas trabajando y necesitan prendas cómodas, prácticas y resistentes. Nos comprometemos a brindar productos de excelente calidad, cuidando cada detalle del proceso de confección para garantizar la satisfacción de nuestros clientes." },
  { t: "¡Nuestra Misión!", alt: "Profesional de la salud trabajando con comodidad", p: "Brindar uniformes médicos de excelente calidad que permitan trabajar con comodidad y confianza." },
  { t: "¿Por qué elegir Vitalis+?", alt: "Detalle de la confección de un ambo", p: "En Vitalis+ nos destacamos por ofrecer uniformes confeccionados con materiales de alta calidad, diseños modernos y una amplia variedad de talles. Nuestro objetivo es que cada profesional de la salud pueda desempeñar su trabajo con comodidad y confianza." },
  { t: "Nuestros valores", alt: "Valores de Vitalis+", valores: true }
];

/* Une lo que devuelve el servidor con las fotos y palabras clave locales (se emparejan por nombre del producto) */
const desdeApi = lista => lista.filter(p => p.activo).map(p => {
  const l = locales.find(x => x.nombre.toLowerCase() === p.nombre.toLowerCase());
  return {
    id: p.id,
    nombre: p.nombre,
    precio: p.precioBase,
    claves: l ? l.claves : [p.descripcion ?? p.tela],
    img: l ? l.img : "/images/ambo-verde.webp"
  };
});
const respaldo = locales.map(l => ({ id: null, nombre: l.nombre, precio: l.precio, claves: l.claves, img: l.img }));

/* Aparición al hacer scroll */
function useReveal(dep) {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal:not(.visible)").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

const Campo = ({ label, error, children }) => (
  <label>{label}{children}<span className="error">{error}</span></label>
);

/* ===== MODAL DE COMPRA ===== */
function Compra({ producto, onClose }) {
  const ref = useRef(null);
  const [f, setF] = useState({ nombre: "", email: "", telefono: "", direccion: "", talle: "", cantidad: 1, comentarios: "" });
  const [err, setErr] = useState({});
  const [res, setRes] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => { ref.current.showModal(); }, []);
  const cambiar = e => setF({ ...f, [e.target.name]: e.target.value });

  const validar = () => {
    const e = {};
    if (!f.nombre.trim()) e.nombre = "Completá este campo.";
    if (!EMAIL.test(f.email.trim())) e.email = "Ingresá un email válido.";
    if (f.telefono.replace(/\D/g, "").length < 8) e.telefono = "Ingresá un teléfono válido (mínimo 8 dígitos).";
    if (!f.talle) e.talle = "Elegí un talle.";
    const c = +f.cantidad;
    if (!(c >= 1 && c <= 50)) e.cantidad = "La cantidad debe ser entre 1 y 50.";
    return e;
  };

  const enviar = async ev => {
    ev.preventDefault();
    const e = validar();
    setErr(e);
    if (Object.keys(e).length) return;
    if (producto.id == null) {
      setRes({ ok: false, msg: "El servidor no está disponible, por eso no se puede registrar el pedido." });
      return;
    }
    setEnviando(true);
    setRes(null);
    try {
      const r = await fetch(`${API}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productoId: producto.id, nombre: f.nombre.trim(), email: f.email.trim(), telefono: f.telefono.trim(), direccion: f.direccion.trim() || null,
          talle: f.talle, cantidad: +f.cantidad, comentarios: f.comentarios.trim() || null
        })
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.message || "No pudimos registrar el pedido. Probá de nuevo en unos minutos.");
      setRes({ ok: true, msg: `¡Gracias, ${f.nombre.trim()}! Registramos tu pedido N° ${d.id} por ${pesos(d.total)}. Te escribimos a ${f.email.trim()} para coordinar el pago y la entrega.` });
    } catch (x) {
      setRes({ ok: false, msg: x.message });
    } finally {
      setEnviando(false);
    }
  };

  const cls = campo => (err[campo] ? "invalido" : "");
  return (
    <dialog ref={ref} onClose={onClose} onClick={e => { if (e.target === ref.current) ref.current.close(); }} aria-labelledby="modal-titulo">
      <div className="modal-cab">
        <h2 id="modal-titulo" style={{ margin: 0, fontSize: "1.3rem" }}>Comprar</h2>
        <button className="cerrar" aria-label="Cerrar" onClick={() => ref.current.close()}>&times;</button>
      </div>
      <div className="modal-cuerpo">
        <form onSubmit={enviar} noValidate>
          <label>Producto<input value={`${producto.nombre} (${pesos(producto.precio)})`} readOnly /></label>
          <Campo label="Nombre y apellido" error={err.nombre}><input name="nombre" value={f.nombre} onChange={cambiar} autoComplete="name" className={cls("nombre")} /></Campo>
          <div className="fila">
            <Campo label="Email" error={err.email}><input name="email" type="email" value={f.email} onChange={cambiar} autoComplete="email" className={cls("email")} /></Campo>
            <Campo label="Teléfono" error={err.telefono}><input name="telefono" type="tel" value={f.telefono} onChange={cambiar} autoComplete="tel" className={cls("telefono")} /></Campo>
          </div>
          <label>Dirección de entrega (opcional)<input name="direccion" value={f.direccion} onChange={cambiar} autoComplete="street-address" /></label>
          <div className="fila">
            <Campo label="Talle" error={err.talle}>
              <select name="talle" value={f.talle} onChange={cambiar} className={cls("talle")}>
                <option value="">Elegí un talle</option>
                {TALLES.map(t => <option key={t}>{t}</option>)}
              </select>
            </Campo>
            <Campo label="Cantidad" error={err.cantidad}><input name="cantidad" type="number" min="1" max="50" value={f.cantidad} onChange={cambiar} className={cls("cantidad")} /></Campo>
          </div>
          <label>Comentarios (opcional)<textarea name="comentarios" rows="3" value={f.comentarios} onChange={cambiar} /></label>
          <button className="btn" type="submit" disabled={enviando}>{enviando ? "Enviando..." : "Confirmar pedido"}</button>
          {res && <p className="ok" role="status" style={res.ok ? undefined : { background: "#fdeceb", color: "#b03020" }}>{res.msg}</p>}
        </form>
      </div>
    </dialog>
  );
}

/* ===== FORMULARIO DE CONTACTO (por ahora solo valida y confirma; no hay endpoint en el backend) ===== */
function Contacto() {
  const [f, setF] = useState({ nombre: "", email: "", mensaje: "" });
  const [err, setErr] = useState({});
  const [ok, setOk] = useState(false);
  const cambiar = e => setF({ ...f, [e.target.name]: e.target.value });
  const enviar = ev => {
    ev.preventDefault();
    const e = {};
    if (!f.nombre.trim()) e.nombre = "Completá este campo.";
    if (!EMAIL.test(f.email.trim())) e.email = "Ingresá un email válido.";
    if (f.mensaje.trim().length < 10) e.mensaje = "Contanos un poco más (mínimo 10 caracteres).";
    setErr(e);
    if (Object.keys(e).length) { setOk(false); return; }
    setOk(true);
    setF({ nombre: "", email: "", mensaje: "" });
  };
  return (
    <form onSubmit={enviar} noValidate>
      <Campo label="Nombre" error={err.nombre}><input name="nombre" value={f.nombre} onChange={cambiar} autoComplete="name" className={err.nombre ? "invalido" : ""} /></Campo>
      <Campo label="Email" error={err.email}><input name="email" type="email" value={f.email} onChange={cambiar} autoComplete="email" className={err.email ? "invalido" : ""} /></Campo>
      <Campo label="Mensaje" error={err.mensaje}><textarea name="mensaje" rows="4" value={f.mensaje} onChange={cambiar} className={err.mensaje ? "invalido" : ""} /></Campo>
      <button className="btn" type="submit">Enviar consulta</button>
      {ok && <p className="ok" role="status">El formulario está validado, pero todavía no está conectado a un servicio de envío. Tu mensaje no se guardó.</p>}
    </form>
  );
}

export default function App() {
  const [lista, setLista] = useState([]);
  const [aviso, setAviso] = useState("");
  const [menu, setMenu] = useState(false);
  const [sel, setSel] = useState(null);

  useEffect(() => {
    fetch(`${API}/productos?size=50`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => {
        const l = desdeApi(d.content ?? d);
        if (!l.length) throw new Error();
        setLista(l);
      })
      .catch(() => {
        setLista(respaldo);
        setAviso("No pudimos conectar con el servidor, o todavía no cargaste productos en la base. Mostramos el catálogo de ejemplo y los pedidos no se van a guardar.");
      });
  }, []);
  useReveal(lista);

  const ir = () => setMenu(false);
  return (
    <>
      <header>
        <nav className="contenedor" aria-label="Principal">
          <a href="#inicio" className="logo">Vitalis<span>+</span></a>
          <button className="hamb" aria-label="Abrir menú" aria-expanded={menu} aria-controls="menu" onClick={() => setMenu(!menu)}><span></span><span></span><span></span></button>
          <ul className={`menu${menu ? " abierto" : ""}`} id="menu">
            {[["inicio", "Inicio"], ["productos", "Productos"], ["nosotros", "Nosotros"], ["contacto", "Contacto"]].map(([id, t]) => (
              <li key={id}><a href={`#${id}`} onClick={ir}>{t}</a></li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="contenedor">
            <div>
              <h1>Vitalis<span>+</span></h1>
              <p className="lema">Indumentaria<br />para el área<br />de salud</p>
              <a href="#productos" className="btn btn-claro">Ver productos</a>
            </div>
            <img className="hero-img" referrerPolicy="no-referrer" src={HERO} alt="Profesionales de la salud usando uniformes Vitalis+" width="800" height="600" />
          </div>
        </section>

        <section className="bienvenidos centrado" aria-labelledby="t-bienvenidos">
          <div className="contenedor reveal">
            <h2 id="t-bienvenidos">¡Bienvenidos!</h2>
            <p>En Vitalis+ ofrecemos indumentaria profesional diseñada para acompañarte durante toda tu jornada laboral.</p>
            <p>Buscamos combinar comodidad, calidad y diseño para que puedas trabajar con confianza.</p>
          </div>
        </section>

        <section id="productos" aria-labelledby="t-productos">
          <div className="contenedor">
            <h2 id="t-productos" className="centrado">Nuestros productos</h2>
            <p className="sub centrado">Elegí tu ambo y comprá en pocos pasos.</p>
            {aviso && <p className="aviso" role="alert">{aviso}</p>}
            <div className="grilla">
              {lista.map(p => (
                <article className="card reveal" key={p.id ?? p.nombre}>
                  <img referrerPolicy="no-referrer" src={p.img} alt={p.nombre} loading="lazy" width="400" height="500" />
                  <div className="card-cuerpo">
                    <h3>{p.nombre}</h3>
                    <p className="claves">{p.claves.join(" · ")}</p>
                    <p className="precio">{pesos(p.precio)}</p>
                    <button className="btn" onClick={() => setSel(p)}>Comprar</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mas" id="nosotros" aria-labelledby="t-mas">
          <div className="contenedor">
            <h2 id="t-mas" className="centrado">¿Querés conocer más sobre Vitalis+?</h2>
            <p className="sub centrado">Conocé nuestra historia, nuestros valores y el compromiso detrás de cada uniforme.</p>
            {BLOQUES.map((b, i) => (
              <article className="bloque reveal" key={b.t}>
                <div className="bloque-img"><img referrerPolicy="no-referrer" src={SECCIONES[i]} alt={b.alt} loading="lazy" /></div>
                <div>
                  <h3>{b.t}</h3>
                  {b.valores
                    ? <ul className="valores">{VALORES.map(v => (
                        <li key={v}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>{v}</li>
                      ))}</ul>
                    : <p>{b.p}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contacto" aria-labelledby="t-contacto">
          <div className="contenedor">
            <h2 id="t-contacto" className="centrado">¿Tenés alguna consulta?</h2>
            <div className="contacto-caja reveal">
              <h3>¡Contactanos!</h3>
              <Contacto />
              {/* Cambiá los enlaces de redes por los reales */}
              <div className="redes">
                <a href="https://instagram.com/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" /></svg></a>
                <a href="mailto:vitalis@email.com" aria-label="Email"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg></a>
                <a href="https://wa.me/5491100000000" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.5z" /><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-.8-.4-1.6-1.2-2-2l.8-1-1-2z" /></svg></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {sel && <Compra key={sel.nombre} producto={sel} onClose={() => setSel(null)} />}
      <footer>© 2026 Vitalis+ · Todos los derechos reservados</footer>
    </>
  );
}
