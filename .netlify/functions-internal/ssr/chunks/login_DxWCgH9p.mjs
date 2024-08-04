import { g as getSession } from './session_M-DRQbpe.mjs';
import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead } from './astro/server_Bb2EEnZv.mjs';
import 'kleur/colors';
import 'html-escaper';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { a as axiosInstance, $ as $$Layout } from './Layout_BeNZo_EV.mjs';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
/* empty css                         */
/* empty css                                 */

// firebaseConfig.js

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
getAuth(app);
new GoogleAuthProvider();
new OAuthProvider('apple.com');

const GoogleSignButton = () => {
  return /* @__PURE__ */ jsxs("button", { className: "gsi-material-button", children: [
    /* @__PURE__ */ jsx("div", { className: "gsi-material-button-state" }),
    /* @__PURE__ */ jsxs("div", { className: "gsi-material-button-content-wrapper", children: [
      /* @__PURE__ */ jsx("div", { className: "gsi-material-button-icon", children: /* @__PURE__ */ jsxs("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", xmlnsXlink: "http://www.w3.org/1999/xlink", style: { display: "block" }, children: [
        /* @__PURE__ */ jsx("path", { fill: "#EA4335", d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" }),
        /* @__PURE__ */ jsx("path", { fill: "#4285F4", d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" }),
        /* @__PURE__ */ jsx("path", { fill: "#FBBC05", d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" }),
        /* @__PURE__ */ jsx("path", { fill: "#34A853", d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" }),
        /* @__PURE__ */ jsx("path", { fill: "none", d: "M0 0h48v48H0z" })
      ] }) }),
      /* @__PURE__ */ jsx("span", { className: "gsi-material-button-contents", children: "Iniciar sesión con Google" }),
      /* @__PURE__ */ jsx("span", { style: { display: "none" }, children: "Iniciar sesión con Google" })
    ] })
  ] });
};

const LoginSignup = ({ isLoginProp }) => {
  const [isLogin, setIsLogin] = useState(isLoginProp);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const checkIfRegistered = async () => {
    try {
      const response = await axiosInstance.post(`/users/check`, { email });
      return response.data.isRegistered;
    } catch (error) {
      console.error("Error checking registration status:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isRegisteredUser = await checkIfRegistered();
    if (isRegisteredUser) {
      axiosInstance.post(`/auth/login`, { email, password }, { withCredentials: true }).then((response) => {
        console.log("Logged in:", response.data);
        window.location.href = "/";
      }).catch((error) => {
        console.error("Login error:", error);
      });
    } else if (email && password && username) {
      console.log("No se ha registrado.");
      axiosInstance.post(`/auth/signup`, { email, username, password, role: "user" }, { withCredentials: true }).then((response) => {
        window.location.href = "/";
      }).catch((error) => {
        console.error("Signup error:", error);
      });
    } else {
      setIsLogin(isRegisteredUser);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "login-signup-container", children: [
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx("h2", { children: isLogin ? "¡Bienvenido/a!" : "Registrate" }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Correo Electrónico:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            id: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true
          }
        )
      ] }),
      !isLogin && /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "username", children: "Nombre de Usuario:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "username",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Contraseña:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            id: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", children: isLogin ? "Continuar" : "Registrarse" })
    ] }),
    isLogin && /* @__PURE__ */ jsxs("p", { children: [
      "¿Usuario nuevo? ",
      /* @__PURE__ */ jsx("span", { onClick: () => setIsLogin(false), className: "pseudo-link", children: "Registrate" }),
      "."
    ] }),
    !isLogin && /* @__PURE__ */ jsxs("p", { children: [
      "¿ya tienes una cuenta? ",
      /* @__PURE__ */ jsx("span", { onClick: () => setIsLogin(true), className: "pseudo-link", children: "Inicia sesión" }),
      "."
    ] }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx("div", { className: "social-login-buttons", children: /* @__PURE__ */ jsx(GoogleSignButton, {}) })
  ] });
};

const $$Astro = createAstro();
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const isLogin = Astro2.url.searchParams.get("register") == null;
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "session": session, "title": "Login/Signup - Hossio", "data-astro-cid-sgpqyurt": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="page-container" data-astro-cid-sgpqyurt>${renderComponent($$result2, "LoginSignup", LoginSignup, { "isLoginProp": isLogin, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/components/LoginSignUp/LoginSignUp", "client:component-export": "default", "data-astro-cid-sgpqyurt": true })}</div>` })}`;
}, "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/pages/login.astro", void 0);

const $$file = "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/pages/login.astro";
const $$url = "/login";

export { $$Login as default, $$file as file, $$url as url };
