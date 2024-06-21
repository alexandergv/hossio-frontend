import React, { useState, useEffect } from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';
import './Home.css';

const Home = () => {
  const [places, setPlaces] = useState([]);



  useEffect(() => {
    const data = [
        {
            id: 1,
            name: "Plaza Bolera",
            description: "Lugar de bolos.",
            rating: 5,
            image: "https://fastly.4sqi.net/img/general/600x600/11650357_IYY1ggRVQ-WuoxU63Sm-J8gKB0QXicQzH5uxy5QmTgQ.jpg"
        },
        {
            id: 2,
            name: "Summit Trampoline Park",
            description: "Trampolines en Sambil.",
            rating: 3.9,
            image: "https://lh3.googleusercontent.com/p/AF1QipNcj004lp6fQcSCa5tnkQKBdeeAghwpMfVZkyP-=s1360-w1360-h1020"
        },
        {
            id: 3,
            name: "Mundo Sobre Ruedas",
            description: "Patines y quads.",
            rating: 4.5,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2JXoCWt9jGbixmj-6wMerEjBR_ni4-W3tKw&s"
        },
        {
            id: 4,
            name: "Plaza Juan Barón",
            description: "Parque frente al mar con atracciones, rueda de la fortuna, puestos de comida callejera y karaoke al aire libre.",
            rating: 4.8,
            image: "https://lh3.googleusercontent.com/p/AF1QipOIcLdlwqqNr99ytoM1500DwhmfHLjShu6VhT6x=s1360-w1360-h1020"
        }
    ]
    setPlaces(data);
    // Llamada a la API para obtener los datos de los lugares
    // fetch('/api/places')
    //   .then(response => response.json())
    //   .then(data => setPlaces(data));
  }, []);

  return (
    <div className="home-container">
      <h1>Descubre donde <span className='highlight-text'>caer</span></h1>
      <div className="place-list">
        {places.map(place => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
};

export default Home;