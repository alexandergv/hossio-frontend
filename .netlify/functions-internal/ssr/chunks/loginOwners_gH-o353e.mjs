import { g as getSession } from './session_M-DRQbpe.mjs';
import { c as createComponent, r as renderTemplate, e as renderHead, d as renderComponent, b as createAstro } from './astro/server_Bb2EEnZv.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                                 */
/* empty css                               */

const $$Astro = createAstro();
const $$LoginOwners = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LoginOwners;
  const session = getSession(Astro2.cookies.get("auth_token")?.value);
  const isAuthenticated = session.authenticated;
  const user = session.user;
  if (isAuthenticated) {
    switch (user.role) {
      case "user":
        return Astro2.redirect("/");
      case "owner":
        return Astro2.redirect("/owners");
    }
  }
  return renderTemplate`<html data-astro-cid-cnlie2c6> <head><meta charset="UTF-8"><title>Login/Signup Propietarios - Hossio</title>${renderHead()}</head> <body data-astro-cid-cnlie2c6> ${renderComponent($$result, "OwnerLoginSignup", null, { "client:only": "react", "client:component-hydration": "only", "data-astro-cid-cnlie2c6": true, "client:component-path": "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/components/OwnerLoginSignup/OwnerLoginSignup", "client:component-export": "default" })} </body></html>`;
}, "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/pages/loginOwners.astro", void 0);

const $$file = "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/pages/loginOwners.astro";
const $$url = "/loginOwners";

export { $$LoginOwners as default, $$file as file, $$url as url };
