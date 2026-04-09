import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../context/SWProvider";

const Menu = () => {
  const {
    lists,
    dispatch,
    favorites,
    setFavorites,
    favCount,
    setFavCount,
    charForm,
    setCharForm,
    planetForm,
    setPlanetForm,
  } = useGlobalReducer();

  const deleteFav = (notFav) => {
    if (notFav.type == "Character") {
      const new_list = lists.characters;
      const index = new_list.findIndex((x) => "c" + x.id === notFav.id);
      charForm.isMarked = false;
      new_list[index].isMarked = false;
      dispatch({ type: "RESET_CHARS", payload: new_list });
    } else {
      const new_list = lists.planets;
      const index = new_list.findIndex((x) => "p" + x.id === notFav.id);
      planetForm.isMarked = false;
      new_list[index].isMarked = false;
      dispatch({ type: "RESET_PLANETS", payload: new_list });
    }
    setFavorites(favorites.filter((fav) => fav.id !== notFav.id));
    setFavCount(favCount - 1);
  };

  const favDetails = (fav) => {
    if (fav.type == "Character") {
      const selectedChar = lists.characters.filter(
        (char) => "c" + char.id == fav.id,
      )[0];
      console.log(selectedChar);
      setCharForm({
        id: selectedChar.id,
        name: selectedChar.name,
        birth: selectedChar.birth_year,
        height: selectedChar.height,
        weight: selectedChar.mass,
        gender: selectedChar.gender,
        hair: selectedChar.hair_color,
        eye: selectedChar.eye_color,
        isMarked: selectedChar.isMarked,
      });
    } else {
      const selectedPlanet = lists.planets.filter(
        (plan) => "p" + plan.id == fav.id,
      )[0];
      console.log(selectedPlanet);
      setPlanetForm({
        id: selectedPlanet.id,
        name: selectedPlanet.name,
        diameter: selectedPlanet.diameter,
        climate: selectedPlanet.climate,
        terrain: selectedPlanet.terrain,
        population: selectedPlanet.population,
        orbital: selectedPlanet.orbital_period,
        rotation: selectedPlanet.rotation_period,
        isMarked: selectedPlanet.isMarked,
      });
    }
  };

  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* <!-- Left side navBar --> */}
          <Link to={"/"}>
            <i className="fa-solid fa-jedi fa-3x text-light"></i>
          </Link>

          {/* <!-- Right side navBar --> */}
          {/* Collapse option */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown mb-2 mb-lg-0">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Favorites {favCount}
                  <i className="ms-2 fa-brands fa-rebel"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-lg-end bg-secondary">
                  {favorites
                    .sort(
                      (a, b) =>
                        a.type.localeCompare(b.type) ||
                        a.name.localeCompare(b.name),
                    )
                    .map((favItem) => (
                      <li
                        key={favItem.id}
                        className="favItem list-group-item d-flex"
                      >
                        <div className="col-10">
                          <Link
                            className="dropdown-item text-info"
                            to={
                              favItem.type == "Planet"
                                ? "/planetdetail"
                                : "/chardetail"
                            }
                            onClick={() => favDetails(favItem)}
                          >
                            {favItem.type}: {favItem.name}
                          </Link>
                        </div>
                        <div className="col-1 d-flex ms-1">
                          <button
                            className="deleteButton bg-secondary align-top text-white align-items-end"
                            onClick={() => deleteFav(favItem)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
