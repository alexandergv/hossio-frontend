import { g as getSession } from './session_M-DRQbpe.mjs';
import { c as createComponent, r as renderTemplate, e as renderHead, d as renderComponent, b as createAstro } from './astro/server_Bb2EEnZv.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                                 */

const $$Astro = createAstro();
const $$Owners = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Owners;
  const session = getSession(Astro2.cookies.get("auth_token")?.value);
  session.authenticated;
  const user = session.user;
  if (user?.role != "owner") {
    return Astro2.redirect("/");
  }
  return renderTemplate`<html> <head><meta charset="UTF-8"><title>Panel de administraci&oacute;n - Hossio </title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&family=Source+Sans+Pro:wght@400;700&display=swap">${renderHead()}</head> <body> <div id="root"></div> ${renderComponent($$result, "OwnerDashboard", null, { "user": user, "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/components/OwnerPanel/OwnerDashboard", "client:component-export": "default" })} </body></html>`;
}, "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/pages/owners.astro", void 0);

const $$file = "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/pages/owners.astro";
const $$url = "/owners";

export { $$Owners as default, $$file as file, $$url as url };
