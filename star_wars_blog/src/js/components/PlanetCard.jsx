import React from "react";
import { Link } from "react-router-dom";

import useGlobalReducer from "../context/SWProvider";

const PlanetCard = ({ id, planet }) => {
  const {
    lists,
    dispatch,
    favorites,
    setFavorites,
    setPlanetForm,
    favCount,
    setFavCount,
  } = useGlobalReducer();
  const imgURL = `https://github.com/breatheco-de/swapi-images/blob/master/public/images/planets/${id}.jpg?raw=true`;

  const goToDetails = (id) => {
    const selectedPlanet = lists.planets.filter((plan) => plan.id == id)[0];
    setPlanetForm({
      id: id,
      name: selectedPlanet.name,
      diameter: selectedPlanet.diameter,
      climate: selectedPlanet.climate,
      terrain: selectedPlanet.terrain,
      population: selectedPlanet.population,
      orbital: selectedPlanet.orbital_period,
      rotation: selectedPlanet.rotation_period,
      isMarked: selectedPlanet.isMarked,
    });
  };

  const markItem = (plan) => {
    const new_list = lists.planets;
    const index = new_list.findIndex((x) => x.id === plan.id);
    if (plan.isMarked) {
      new_list[index].isMarked = false;
      setFavorites(favorites.filter((fav) => fav.id !== "p" + plan.id));
      setFavCount(favCount - 1);
    } else {
      new_list[index].isMarked = true;
      const newFav = { id: "p" + plan.id, name: plan.name, type: "Planet" };
      setFavorites(() => [...favorites, newFav]);
      setFavCount(favCount + 1);
    }
    dispatch({ type: "RESET_PLANETS", payload: new_list });
  };

  return (
    <div className="col-12 col-sm-6 col-lg-3 col-xl-2 card mb-5 me-3 px-0 bg-dark text-white ">
      <div className="row ">
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          <img
            className="cardPic align-middle img-fluid"
            src={imgURL}
            alt={planet.name}
          />
        </div>

        <div className="card-body text-white ms-4 me-4">
          <h4 className="card-name">
            {planet.name.split(" ").slice(0, 2).join(" ")}
          </h4>
          <p className="card-text text-light">
            <i className="fa-solid fa-circle me-2"></i>
            <strong className="font-italic">Diameter: </strong>
            {planet.diameter}
          </p>
          <p className="card-text text-light">
            <i className="fa-solid fa-people-group me-2"></i>
            <strong className="font-italic">Pop: </strong>
            {planet.population}
          </p>
          <p className="card-text text-light">
            <i className="fa-solid fa-cloud-sun me-2"></i>
            <strong className="font-italic">Climate: </strong>
            {planet.climate}
          </p>

          <div className="d-flex">
            <Link to={"/planetdetail"}>
              <button
                className="btn btn-primary"
                onClick={() => goToDetails(id)}
              >
                Details
              </button>
            </Link>
            <button
              className="btn btn-danger ms-auto"
              onClick={() => markItem(planet)}
            >
              {planet.isMarked ? (
                <i className="fa-solid fa-heart"></i>
              ) : (
                <i className="fa-regular fa-heart"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetCard;
