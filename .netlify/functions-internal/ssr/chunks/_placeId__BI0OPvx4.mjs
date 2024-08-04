import { g as getSession } from './session_M-DRQbpe.mjs';
import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead } from './astro/server_Bb2EEnZv.mjs';
import 'kleur/colors';
import 'html-escaper';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
/* empty css                             */
import { a as axiosInstance, $ as $$Layout } from './Layout_BeNZo_EV.mjs';
import { R as ReviewStars } from './ReviewStars_BhMqh3Jc.mjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Carrousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  return /* @__PURE__ */ jsxs("div", { className: "carrousel", children: [
    /* @__PURE__ */ jsx("div", { className: "carrousel-inner", style: { transform: `translateX(-${currentIndex * 100}%)` }, children: images.map((image, index) => /* @__PURE__ */ jsx("div", { className: `carrousel-item ${index === currentIndex ? "active" : ""}`, children: /* @__PURE__ */ jsx("img", { src: image, alt: `Slide ${index}` }) }, index)) }),
    /* @__PURE__ */ jsx("button", { hidden: currentIndex == 0, className: "carrousel-btn prev", onClick: prevSlide, children: "‹" }),
    /* @__PURE__ */ jsx("button", { hidden: currentIndex == images.length - 1, className: "carrousel-btn next", onClick: nextSlide, children: "›" }),
    /* @__PURE__ */ jsx("div", { className: "carrousel-dots", children: images.map((_, index) => /* @__PURE__ */ jsx(
      "span",
      {
        className: `dot ${index === currentIndex ? "active" : ""}`,
        onClick: () => setCurrentIndex(index)
      },
      index
    )) })
  ] });
};

const ScheduleTable = ({ schedule }) => {
  return /* @__PURE__ */ jsxs("div", { className: "schedule-table-container", children: [
    /* @__PURE__ */ jsx("h3", { children: "Horario" }),
    /* @__PURE__ */ jsxs("table", { className: "schedule-table", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "Día" }),
        /* @__PURE__ */ jsx("th", { children: "Abierto" }),
        /* @__PURE__ */ jsx("th", { children: "Cerrado" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: Object.entries(schedule).map(([day, hours], index) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: day }),
        /* @__PURE__ */ jsx("td", { children: hours.open }),
        /* @__PURE__ */ jsx("td", { children: hours.close })
      ] }, index)) })
    ] })
  ] });
};

const PlaceFeatures = ({ features }) => {
  return /* @__PURE__ */ jsxs("div", { className: "features-container", children: [
    /* @__PURE__ */ jsx("h3", { children: "Características" }),
    /* @__PURE__ */ jsx("ul", { children: features.map((feature, index) => /* @__PURE__ */ jsx("li", { children: feature }, index)) })
  ] });
};

const PlaceDetails = ({ placeDetails }) => {
  return /* @__PURE__ */ jsxs("div", { className: "place-details-container", children: [
    /* @__PURE__ */ jsx("h2", { children: "Detalles del lugar" }),
    /* @__PURE__ */ jsxs("div", { className: "place-info", children: [
      /* @__PURE__ */ jsx("p", { children: placeDetails.description }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Calificación promedio: " }),
        " ",
        placeDetails.rating.toPrecision(1),
        " / 5"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Precio promedio: " }),
        " ",
        placeDetails.averagePrice
      ] }),
      /* @__PURE__ */ jsx("div", { className: "place-type-labels", children: placeDetails.types.map((type, index) => /* @__PURE__ */ jsx("span", { className: "place-type", children: type }, index)) }),
      /* @__PURE__ */ jsx(ScheduleTable, { schedule: placeDetails.schedule }),
      /* @__PURE__ */ jsx(PlaceFeatures, { features: placeDetails.features })
    ] })
  ] });
};

const ReviewCommentsSkeleton = () => {
  return /* @__PURE__ */ jsx("div", { className: "review-comments", children: [...Array(3)].map((_, index) => /* @__PURE__ */ jsxs("div", { className: "review skeleton", children: [
    /* @__PURE__ */ jsx("div", { className: "skeleton-text skeleton-review-text" }),
    /* @__PURE__ */ jsx("div", { className: "skeleton-text skeleton-review-author" }),
    /* @__PURE__ */ jsx("div", { className: "skeleton-stars" })
  ] }, index)) });
};

const ReviewComments = ({ reviews, isloading }) => {
  return /* @__PURE__ */ jsxs("div", { className: "review-comments", children: [
    /* @__PURE__ */ jsx("h3", { children: "Reseñas" }),
    /* @__PURE__ */ jsx("hr", {}),
    isloading ? /* @__PURE__ */ jsx(ReviewCommentsSkeleton, {}) : reviews.length > 0 ? reviews.map((review, index) => /* @__PURE__ */ jsxs("div", { className: "review", children: [
      /* @__PURE__ */ jsx("p", { className: "review-text", children: review.text }),
      /* @__PURE__ */ jsxs("p", { className: "review-author", children: [
        "- ",
        review.author ? review.author : "Anónimo."
      ] }),
      /* @__PURE__ */ jsx(ReviewStars, { readOnly: true, ratingScore: review.rating })
    ] }, index)) : /* @__PURE__ */ jsx("div", { className: "review", children: " Aún no hay reseñas para este lugar." })
  ] });
};

const ReviewInput = ({ placeId, userId, onReviewPosted, hasCommented }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };
  useEffect(() => {
    setIsLoading(hasCommented);
  }, [hasCommented]);
  const onSubmit = async (reviewData) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(`/reviews/newReview`, reviewData);
      onReviewPosted();
      console.log("Review created:", response.data);
    } catch (error) {
      console.error("Error creating review:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let reviewObj = {
      text: reviewText,
      rating,
      place: placeId,
      user: userId
    };
    onSubmit(reviewObj);
    setReviewText("");
    setRating(0);
  };
  const placeHolder = hasCommented ? "Ya has dejado una reseña en este lugar" : isLoading ? "Posteando reseña..." : "Escribe tu reseña aquí...";
  return /* @__PURE__ */ jsxs("div", { className: `review-input-container ${isLoading ? "loading" : ""}`, children: [
    /* @__PURE__ */ jsx("h3", { children: "Deja una reseña" }),
    /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, className: "review-form", children: /* @__PURE__ */ jsxs("div", { className: "input-with-button", children: [
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: reviewText,
          onChange: handleInputChange,
          placeholder: placeHolder,
          required: true,
          disabled: isLoading
        }
      ),
      /* @__PURE__ */ jsx(
        ReviewStars,
        {
          style: {
            position: "absolute",
            bottom: "0px",
            left: "10px",
            display: "flex"
          },
          rating,
          setRating,
          readOnly: isLoading
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "divider" }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "send-button", disabled: isLoading, children: "➤" })
    ] }) })
  ] });
};

const ReviewContainer = ({ isAuthenticated, placeId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [userHasCommented, setUserHasCommented] = useState(false);
  const onReviewPosted = async () => {
    await fetchReviews();
  };
  const fetchReviews = async () => {
    try {
      setLoadingComments(true);
      const response = await axiosInstance.get(`/reviews/byPlaceId/${placeId}`);
      setReviews(response.data.reviews);
      setUserHasCommented(response.data.userHasCommented);
      setLoadingComments(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    if (placeId) {
      fetchReviews();
    }
  }, [placeId]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isAuthenticated ? /* @__PURE__ */ jsx(ReviewInput, { hasCommented: userHasCommented, placeId, userId, onReviewPosted }) : /* @__PURE__ */ jsxs("div", { className: "review-message", children: [
      /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faUserCircle, className: "user-icon" }),
      /* @__PURE__ */ jsx("p", { className: "review-text", children: "Inicia sesión para poder dejar una reseña." })
    ] }),
    /* @__PURE__ */ jsx(ReviewComments, { isloading: loadingComments, reviews })
  ] });
};

const $$Astro = createAstro();
const $$placeId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$placeId;
  const session = getSession(Astro2.cookies.get("auth_token")?.value);
  const isAuthenticated = session.authenticated;
  const user = session.user;
  if (isAuthenticated && user.role == "owner") {
    return Astro2.redirect("/owners");
  }
  const { placeId } = Astro2.params;
  const placesData = async () => {
    let response = await axiosInstance.get(`/places/getById/${placeId}`);
    const place = response.data;
    return place;
  };
  const placeInfo = await placesData();
  const averageRating = async () => {
    let response = await axiosInstance.get(`/reviews/averageRating/${placeId}`);
    const averageRating2 = response.data.averageRating;
    return averageRating2;
  };
  placeInfo.rating = await averageRating();
  if (!placeInfo) {
    Astro2.response.status = 404;
    Astro2.response.statusText = "Not found";
    throw Error("no page with this id was found");
  }
  const placeD = {
    "description": placeInfo.description,
    "rating": placeInfo.rating,
    "averagePrice": "$20 - $50",
    "types": ["Restaurante", "Bar"],
    "schedule": {
      "Lunes": { "open": "10:00 AM", "close": "10:00 PM" },
      "Martes": { "open": "10:00 AM", "close": "10:00 PM" },
      "Mi\xE9rcoles": { "open": "10:00 AM", "close": "10:00 PM" },
      "Jueves": { "open": "10:00 AM", "close": "10:00 PM" },
      "Viernes": { "open": "10:00 AM", "close": "10:00 PM" }
    },
    "features": ["Parqueo disponible", "Cobro en la entrada", "Wifi gratuito"]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "session": session, "title": `${placeInfo.name} - Hossio`, "`": true, "data-astro-cid-lyounay5": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main class="place-details" data-astro-cid-lyounay5><h1 data-astro-cid-lyounay5>${placeInfo.name}</h1><div class="place-content" data-astro-cid-lyounay5><div class="place-images" data-astro-cid-lyounay5>${renderComponent($$result2, "Carrousel", Carrousel, { "client:load": true, "images": placeInfo.images.reverse(), "client:component-hydration": "load", "client:component-path": "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/components/Carrousel/Carrousel", "client:component-export": "default", "data-astro-cid-lyounay5": true })}</div><div class="place-map" data-astro-cid-lyounay5>${renderComponent($$result2, "Map", null, { "client:only": "react", "latitude": placeInfo.location.coordinates[0], "longitude": placeInfo.location.coordinates[1], "name": placeInfo.name, "client:component-hydration": "only", "data-astro-cid-lyounay5": true, "client:component-path": "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/components/Map/Map", "client:component-export": "default" })}</div></div>${renderComponent($$result2, "PlaceDetails", PlaceDetails, { "placeDetails": placeD, "data-astro-cid-lyounay5": true })}${renderComponent($$result2, "ReviewContainer", ReviewContainer, { "client:load": true, "userId": session.user?.sub, "placeId": placeId, "isAuthenticated": isAuthenticated, "client:component-hydration": "load", "client:component-path": "components/ReviewContainer/ReviewContainer", "client:component-export": "default", "data-astro-cid-lyounay5": true })}</main>` })}`;
}, "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/pages/places/[placeId].astro", void 0);

const $$file = "C:/Users/alexa/Desktop/UTESA/Tareas/2024-2/Proyecto de grado/Proyecto/Hossio/hossio-frontend/src/pages/places/[placeId].astro";
const $$url = "/places/[placeId]";

export { $$placeId as default, $$file as file, $$url as url };
