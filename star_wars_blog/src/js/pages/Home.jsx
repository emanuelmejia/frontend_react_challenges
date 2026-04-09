import React from "react";
import useGlobalReducer from "../context/SWProvider";
import Menu from "../components/Menu";
import CharCard from "../components/CharCard";
import PlanetCard from "../components/PlanetCard";

const Home = () => {
  const { lists } = useGlobalReducer();

  return (
    <>
      <Menu />
      <div className="col-12 mx-auto text-white">
        <div className="row">
          <div className="text-center col-12 mb-5">
            <h1 className="pageTitle">THE FORCE IS STRONG WITH YOU</h1>
          </div>
        </div>
        <section className="characters col-11 mx-auto mb-5">
          <h2 className="secTitle">Characters</h2>
          <div className="cardGrid d-flex">
            {lists.characters.map((char) => (
              <CharCard key={char.id} id={char.id} character={char} />
            ))}
          </div>
        </section>
        <section className="planets col-11 mx-auto mb-5">
          <h2 className="secTitle">Planets</h2>
          <div className="cardGrid d-flex">
            {lists.planets.map((plan) => (
              <PlanetCard
                key={plan.id}
                id={plan.id}
                name={plan.name}
                diameter={plan.diameter}
                climate={plan.climate}
                population={plan.population}
                planet={plan}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
