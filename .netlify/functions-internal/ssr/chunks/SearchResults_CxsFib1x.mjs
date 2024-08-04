import { g as getSession } from './session_M-DRQbpe.mjs';
import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro } from './astro/server_Bb2EEnZv.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as axiosInstance, $ as $$Layout } from './Layout_BeNZo_EV.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
/* empty css                                 */
import { useState, useEffect } from 'react';
import { P as PlaceCardSkeleton, a as PlaceCard } from './PlaceCardSkeleton_B4y6g8RR.mjs';

const SearchResultsPage = ({ query }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchPlaces = async (query2) => {
    try {
      const response = await axiosInstance.get(`/places/search?q=${query2}`);
      setSearchResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error searching for places:", error);
    }
  };
  useEffect(() => {
    searchPlaces(query);
  }, [query]);
  return /* @__PURE__ */ jsxs("div", { className: "search-results-container", children: [
    loading ? Array(5).fill(0).map((x, index) => /* @__PURE__ */ jsx(PlaceCardSkeleton, {}, index)) : searchResults.map((place) => /* @__PURE__ */ jsx(PlaceCard, { place }, place._id)),
    searchResults.length == 0 && /* @__PURE__ */ jsx(Fragment, { children: "No se encontraron lugares para esta busqueda." })
  ] });
};

const $$Astro = createAstro();
const $$SearchResults = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SearchResults;
  const session = getSession(Astro2.cookies.get("auth_token")?.value);
  const isAuthenticated = session.authenticated;
  const user = session.user;
  if (isAuthenticated && user.role == "owner") {
    return Astro2.redirect("/owners");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "session": session, "title": "Resultados de B\xFAsqueda - Hossio" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SearchResultsPage", SearchResultsPage, { "client:load": true, "query": Astro2.url.searchParams.get("query") || "", "client:component-hydration": "load", "client:component-path": "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/components/SearchResultsPage/SearchResultsPage", "client:component-export": "default" })} ` })}`;
}, "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/pages/SearchResults.astro", void 0);

const $$file = "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/pages/SearchResults.astro";
const $$url = "/SearchResults";

export { $$SearchResults as default, $$file as file, $$url as url };
