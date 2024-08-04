import { g as getSession } from './session_M-DRQbpe.mjs';
import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro } from './astro/server_Bb2EEnZv.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as axiosInstance, $ as $$Layout } from './Layout_BeNZo_EV.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { P as PlaceCardSkeleton, a as PlaceCard } from './PlaceCardSkeleton_B4y6g8RR.mjs';
/* empty css                         */
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventsModal = ({ onClose, events }) => {
  return /* @__PURE__ */ jsx("div", { className: "modal-overlay", children: /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
    /* @__PURE__ */ jsx("button", { className: "close-button", onClick: onClose, children: "✕" }),
    /* @__PURE__ */ jsx("h2", { children: "Últimos Eventos" }),
    /* @__PURE__ */ jsx("div", { className: "events-list", children: events.map((event, index) => /* @__PURE__ */ jsxs("a", { href: `/places/${event.placeId}`, className: "event-card", children: [
      /* @__PURE__ */ jsx("img", { src: event.image, alt: event.title, className: "event-image" }),
      /* @__PURE__ */ jsxs("div", { className: "event-details", children: [
        /* @__PURE__ */ jsx("h3", { className: "event-title", children: event.title }),
        /* @__PURE__ */ jsxs("p", { className: "event-place", children: [
          "Lugar: ",
          event.placeName
        ] }),
        /* @__PURE__ */ jsx("p", { className: "event-summary", children: event.summary })
      ] })
    ] })) })
  ] }) });
};

const Home = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastEvents, setLastEvents] = useState([]);
  const fetchLastEvents = async () => {
    const lastEvents2 = (await axiosInstance.get("/events/latest")).data;
    setLastEvents(lastEvents2);
  };
  const openModal = async () => {
    await fetchLastEvents();
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchPlaces = async () => {
    try {
      const response = await axiosInstance.get(`/places/GetAll`);
      setPlaces(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position);
          setLocation({ latitude, longitude });
          fetchPlaces();
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "home-container", children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "Descubre donde ",
      /* @__PURE__ */ jsx("span", { className: "highlight-text", children: "caer" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "action-buttons-container", children: !loading ? /* @__PURE__ */ jsxs("button", { className: "events-button", onClick: openModal, children: [
      /* @__PURE__ */ jsx(FontAwesomeIcon, { color: "#48D1B2", icon: faCalendarAlt }),
      /* @__PURE__ */ jsx("span", { children: " Eventos" })
    ] }) : /* @__PURE__ */ jsx("button", { className: "events-button", children: /* @__PURE__ */ jsx("span", { children: "..." }) }) }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx("div", { className: "place-list", children: loading ? Array(10).fill(0).map((x, index) => /* @__PURE__ */ jsx(PlaceCardSkeleton, {}, index)) : places.map(
      (place) => /* @__PURE__ */ jsx(PlaceCard, { place }, place._id)
    ) }),
    isModalOpen && /* @__PURE__ */ jsx(EventsModal, { events: lastEvents, onClose: closeModal })
  ] });
};

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const session = getSession(Astro2.cookies.get("auth_token")?.value);
  const isAuthenticated = session.authenticated;
  const user = session.user;
  if (isAuthenticated && user.role == "owner") {
    return Astro2.redirect("/owners");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "session": session, "title": "Hossio - Descubre donde caer" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Home", Home, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/components/Home/Home", "client:component-export": "default" })} ` })}`;
}, "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/pages/index.astro", void 0);

const $$file = "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
