import axios from 'axios';
import { c as configVariables } from './configVariables_BD3FriUt.mjs';
import { c as createComponent, r as renderTemplate, a as addAttribute, e as renderHead, d as renderComponent, f as renderSlot, b as createAstro } from './astro/server_Bb2EEnZv.mjs';
import 'kleur/colors';
import 'html-escaper';
import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';
/* empty css                                 */
/* empty css                                 */

const axiosInstance = axios.create({
  baseURL: configVariables.apiUrl
});
axiosInstance.defaults.withCredentials = true;
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Footer = () => {
  return /* @__PURE__ */ jsxs("footer", { className: "footer", children: [
    /* @__PURE__ */ jsxs("div", { className: "footer-container", children: [
      /* @__PURE__ */ jsxs("div", { className: "footer-section", children: [
        /* @__PURE__ */ jsx("h2", { className: "footer-title", children: "Hossio" }),
        /* @__PURE__ */ jsx("p", { children: "Descubre y reseña los mejores lugares de ocio en la República Dominicana." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "footer-section", children: [
        /* @__PURE__ */ jsx("h3", { className: "footer-subtitle", children: "Enlaces Rápidos" }),
        /* @__PURE__ */ jsxs("ul", { className: "footer-links", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#about", children: "Sobre Nosotros" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#contact", children: "Contacto" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#terms", children: "Términos de Servicio" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#privacy", children: "Política de Privacidad" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "footer-section", children: [
        /* @__PURE__ */ jsx("h3", { className: "footer-subtitle", children: "Síguenos" }),
        /* @__PURE__ */ jsxs("ul", { className: "footer-social", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://facebook.com", target: "_blank", rel: "noopener noreferrer", children: "Facebook" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://instagram.com", target: "_blank", rel: "noopener noreferrer", children: "Instagram" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://twitter.com", target: "_blank", rel: "noopener noreferrer", children: "Twitter" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://linkedin.com", target: "_blank", rel: "noopener noreferrer", children: "LinkedIn" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "footer-bottom", children: /* @__PURE__ */ jsx("p", { children: "© 2024 Hossio. Todos los derechos reservados." }) })
  ] });
};

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const { session } = Astro2.props;
  const isAuthenticated = session.authenticated;
  const user = session.user;
  if (user?.role == "owner") ;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/Hossio_logo_truquoise_blank.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&family=Source+Sans+Pro:wght@400;700&display=swap"><title>${title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "NavBar", null, { "userAuthenticated": isAuthenticated, "user": user, "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/components/Navbar/Navbar.jsx", "client:component-export": "default" })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", Footer, {})} </body></html>`;
}, "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $, axiosInstance as a };
