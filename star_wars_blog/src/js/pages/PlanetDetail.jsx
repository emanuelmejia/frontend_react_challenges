import React, { useState } from "react";
import useGlobalReducer from "../context/SWProvider";
import Menu from "../components/Menu";

const PlanetDetail = () => {
  const {
    planetForm,
    lists,
    dispatch,
    favorites,
    setFavorites,
    favCount,
    setFavCount,
  } = useGlobalReducer();

  const markItem = (plan) => {
    const new_list = lists.planets;
    const index = new_list.findIndex((x) => x.id === plan.id);
    if (plan.isMarked) {
      new_list[index].isMarked = false;
      plan.isMarked = false;
      setFavorites(favorites.filter((fav) => fav.id !== "p" + plan.id));
      setFavCount(favCount - 1);
    } else {
      new_list[index].isMarked = true;
      plan.isMarked = true;
      const newFav = { id: "p" + plan.id, name: plan.name, type: "Planet" };
      setFavorites(() => [...favorites, newFav]);
      setFavCount(favCount + 1);
    }
    dispatch({ type: "RESET_PLANETS", payload: new_list });
  };

  const imgURL = `https://github.com/breatheco-de/swapi-images/blob/master/public/images/planets/${planetForm.id}.jpg?raw=true`;

  return (
    <>
      <Menu />
      <div className="col-11 col-md-9 col-lg-7 mx-auto text-white">
        <div className="row">
          <div className="text-center col-12 text-secondary">
            <h1 className="secTitle">Planet Details</h1>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-6">
            <img
              className="detailPic align-middle img-fluid"
              src={imgURL}
              alt={planetForm.name}
            />
          </div>
          <div className="col-6">
            <div className="d-flex">
              <h2 className="secTitle text-info">{planetForm.name}</h2>
              <button
                className="btn btn-danger ms-4"
                onClick={() => markItem(planetForm)}
              >
                {planetForm.isMarked ? (
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
          </div>
          <div className="row mt-5">
            <div className="charDatum col-2 d-flex flex-column align-items-center">
              <h5>Diameter:</h5>
              <big>{planetForm.diameter ? planetForm.diameter : "Unknown"}</big>
            </div>
            <div className="charDatum col-2 d-flex flex-column align-items-center">
              <h5>Climate:</h5>
              <big>
                {planetForm.climate
                  ? planetForm.climate.charAt(0).toUpperCase() +
                    planetForm.climate.slice(1)
                  : "Unknown"}
              </big>
            </div>
            <div className="charDatum col-2 d-flex flex-column align-items-center">
              <h5>Terrain:</h5>
              <big>
                {planetForm.terrain
                  ? planetForm.terrain.charAt(0).toUpperCase() +
                    planetForm.terrain.slice(1)
                  : "Unknown"}
              </big>
            </div>
            <div className="charDatum col-2 d-flex flex-column align-items-center">
              <h5>Population:</h5>
              <big>
                {planetForm.population ? planetForm.population : "Unknown"}
              </big>
            </div>
            <div className="charDatum col-2 d-flex flex-column align-items-center">
              <h5>Orbital Period:</h5>
              <big>{planetForm.orbital ? planetForm.orbital : "Unknown"}</big>
            </div>
            <div className="charDatum col-2 d-flex flex-column align-items-center">
              <h5>Rotation Period:</h5>
              <big>{planetForm.rotation ? planetForm.rotation : "Unknown"}</big>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanetDetail;
