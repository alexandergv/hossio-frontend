import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
/* empty css                         */
import { R as ReviewStars } from './ReviewStars_BhMqh3Jc.mjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const PlaceCard = ({ place }) => {
  const [rating, setRating] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };
  const isOpen = place.isOpen;
  return /* @__PURE__ */ jsx("a", { href: `/places/${place._id}`, className: "place-card", children: /* @__PURE__ */ jsxs("div", { className: "place-card-subContainer", children: [
    /* @__PURE__ */ jsx("div", { className: "favorite-icon", onClick: toggleFavorite, children: /* @__PURE__ */ jsx(FontAwesomeIcon, { className: `${isFavorite ? "heart-active" : ""}`, color: "#48D1B2", icon: faHeart }) }),
    /* @__PURE__ */ jsx("div", { className: `status-label ${isOpen ? "open" : "closed"}`, children: isOpen ? "Abierto ahora" : "Cerrado" }),
    /* @__PURE__ */ jsx("img", { src: place.images[place.images.length - 1], alt: place.name, className: "place-image" }),
    /* @__PURE__ */ jsxs("div", { className: "place-details", children: [
      /* @__PURE__ */ jsx("h2", { className: "place-name", children: `${place.name.slice(0, 34)}${place.name.length > 34 ? "..." : ""}` }),
      /* @__PURE__ */ jsx("p", { className: "place-description", children: place.description }),
      /* @__PURE__ */ jsxs("span", { className: "place-rating", children: [
        "Calificacion: ",
        /* @__PURE__ */ jsx(
          ReviewStars,
          {
            readOnly: true,
            ratingScore: place.rating,
            rating,
            setRating
          }
        )
      ] })
    ] })
  ] }) });
};

const PlaceCardSkeleton = () => {
  return /* @__PURE__ */ jsx("div", { className: "place-card-skeleton", children: /* @__PURE__ */ jsxs("div", { className: "place-card-subContainer", children: [
    /* @__PURE__ */ jsx("div", { className: "skeleton place-image-skeleton" }),
    /* @__PURE__ */ jsxs("div", { className: "place-details-skeleton", children: [
      /* @__PURE__ */ jsx("div", { className: "skeleton place-name-skeleton" }),
      /* @__PURE__ */ jsx("div", { className: "skeleton place-description-skeleton" }),
      /* @__PURE__ */ jsx("div", { className: "skeleton place-rating-skeleton" })
    ] })
  ] }) });
};

export { PlaceCardSkeleton as P, PlaceCard as a };
