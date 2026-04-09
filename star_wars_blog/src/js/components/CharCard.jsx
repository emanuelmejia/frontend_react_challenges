import React from "react";
import { Link } from "react-router-dom";

import useGlobalReducer from "../context/SWProvider";

const CharCard = ({ id, character }) => {
  const {
    lists,
    dispatch,
    favorites,
    setFavorites,
    setCharForm,
    favCount,
    setFavCount,
  } = useGlobalReducer();
  const imgURL = `https://github.com/breatheco-de/swapi-images/blob/master/public/images/people/${id}.jpg?raw=true`;

  const goToDetails = (id) => {
    const selectedChar = lists.characters.filter((char) => char.id == id)[0];
    setCharForm({
      id: id,
      name: selectedChar.name,
      birth: selectedChar.birth_year,
      height: selectedChar.height,
      weight: selectedChar.mass,
      gender: selectedChar.gender,
      hair: selectedChar.hair_color,
      eye: selectedChar.eye_color,
      isMarked: selectedChar.isMarked,
    });
  };

  const markItem = (char) => {
    const new_list = lists.characters;
    const index = new_list.findIndex((x) => x.id === char.id);
    if (char.isMarked) {
      new_list[index].isMarked = false;
      setFavorites(favorites.filter((fav) => fav.id !== "c" + char.id));
      setFavCount(favCount - 1);
    } else {
      new_list[index].isMarked = true;
      const newFav = { id: "c" + char.id, name: char.name, type: "Character" };
      setFavorites(() => [...favorites, newFav]);
      setFavCount(favCount + 1);
    }
    dispatch({ type: "RESET_CHARS", payload: new_list });
  };

  return (
    <div className="col-12 col-sm-6 col-lg-3 col-xl-2 card mb-5 me-3 px-0 bg-dark text-white ">
      <div className="row ">
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          <img
            className="cardPic align-middle img-fluid"
            src={imgURL}
            alt={character.name}
          />
        </div>

        <div className="card-body text-white ms-4 me-4">
          <h4 className="card-name">
            {character.name.split(" ").slice(0, 2).join(" ")}
          </h4>
          <p className="card-text text-light">
            <i className="fa-solid fa-mars-and-venus me-2"></i>
            <strong className="font-italic">Gender: </strong>
            {character.gender}
          </p>
          <p className="card-text text-light">
            <i className="fa-solid fa-ruler-vertical me-3"></i>
            <strong className="font-italic">Height: </strong>
            {character.height}
          </p>
          <p className="card-text text-light">
            <i className="fa-solid fa-weight-scale me-2"></i>
            <strong className="font-italic">Weight: </strong>
            {character.mass}
          </p>
          <div className="d-flex">
            <Link to={"/chardetail"}>
              <button
                className="btn btn-primary"
                onClick={() => goToDetails(character.id)}
              >
                Details
              </button>
            </Link>
            <button
              className="btn btn-danger ms-auto"
              onClick={() => markItem(character)}
            >
              {character.isMarked ? (
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

export default CharCard;
