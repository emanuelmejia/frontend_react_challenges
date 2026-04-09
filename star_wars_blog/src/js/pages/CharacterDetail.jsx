import React, { useState } from "react";
import useGlobalReducer from "../context/SWProvider";
import Menu from "../components/Menu";

const CharDetail = () => {
  const {
    charForm,
    lists,
    dispatch,
    favorites,
    setFavorites,
    favCount,
    setFavCount,
  } = useGlobalReducer();

  const markItem = (char) => {
    const new_list = lists.characters;
    const index = new_list.findIndex((x) => x.id === char.id);
    if (char.isMarked) {
      new_list[index].isMarked = false;
      char.isMarked = false;
      setFavorites(favorites.filter((fav) => fav.id !== "c" + char.id));
      setFavCount(favCount - 1);
    } else {
      new_list[index].isMarked = true;
      char.isMarked = true;
      const newFav = { id: "c" + char.id, name: char.name, type: "Character" };
      setFavorites(() => [...favorites, newFav]);
      setFavCount(favCount + 1);
    }
    dispatch({ type: "RESET_CHARS", payload: new_list });
  };

  const imgURL = `https://github.com/breatheco-de/swapi-images/blob/master/public/images/people/${charForm.id}.jpg?raw=true`;

  return (
    <>
      <Menu />
      <div className="col-11 col-md-9 col-lg-7 mx-auto text-white">
        <div className="row">
          <div className="text-center col-12 text-secondary">
            <h1 className="secTitle">Character Details</h1>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-4">
            <img
              className="detailPic align-middle img-fluid"
              src={imgURL}
              alt={charForm.name}
            />
          </div>
          <div className="col-8">
            <div className="d-flex">
              <h2 className="secTitle text-info">{charForm.name}</h2>
              <button
                className="btn btn-danger ms-4"
                onClick={() => markItem(charForm)}
              >
                {charForm.isMarked ? (
                  <i className="fa-solid fa-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              velit dolor animi optio quidem expedita deleniti ad a saepe
              aperiam nemo nulla quis officiis quam, dolore blanditiis
              exercitationem recusandae. Culpa!
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
              suscipit officia laudantium corrupti illum eveniet, commodi iure?
              Ipsum eum, quo minus nam beatae autem molestias aperiam distinctio
              aspernatur exercitationem perferendis!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              facere ipsa enim. Magni dignissimos, dolorum mollitia vero soluta
              beatae deserunt laborum eos atque obcaecati cumque. Libero
              dignissimos ullam mollitia quod.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Assumenda, optio, sit et, quia voluptates praesentium maxime
              dolore vel eum voluptas atque dolorem distinctio delectus itaque
              corrupti enim corporis suscipit aut!
            </p>
          </div>
          <div className="row mt-5">
            <div className="charDatum col-2 d-flex flex-column align-items-center">
              <h5>Birth Year:</h5>
              <big>
                {charForm.birth
                  ? charForm.birth.charAt(0).toUpperCase() +
                    charForm.birth.slice(1)
                  : "Unknown"}
              </big>
            </div>
            <div className="charDatum col-2 d-flex flex-column align-items-center">
              <h5>Gender:</h5>
              <big>
                {charForm.gender
                  ? charForm.gender.charAt(0).toUpperCase() +
                    charForm.gender.slice(1)
                  : "Unknown"}
              </big>
            </div>
            <div className="charDatum col-2 d-flex flex-column align-items-center">
              <h5>Height:</h5>
              <big>{charForm.height ? charForm.height : "Unknown"}</big>
            </div>
            <div className="charDatum col-2 d-flex flex-column align-items-center">
              <h5>Weight:</h5>
              <big>{charForm.weight ? charForm.weight : "Unknown"}</big>
            </div>
            <div className="charDatum col-2 d-flex flex-column align-items-center">
              <h5>Hair Color:</h5>
              <big>
                {charForm.hair
                  ? charForm.hair.charAt(0).toUpperCase() +
                    charForm.hair.slice(1)
                  : "Unknown"}
              </big>
            </div>
            <div className="charDatum col-2 d-flex flex-column align-items-center">
              <h5>Eye Color:</h5>
              <big>
                {charForm.eye
                  ? charForm.eye.charAt(0).toUpperCase() + charForm.eye.slice(1)
                  : "Unknown"}
              </big>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharDetail;
