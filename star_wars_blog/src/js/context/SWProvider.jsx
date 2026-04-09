import {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";
import listsReducer, { initialLists } from "../savedData";

const SWContext = createContext();

export function SWProvider({ children }) {
  const initialChar = {
    id: "",
    name: "",
    birth: "",
    gender: "",
    height: "",
    weight: "",
    hair: "",
    eye: "",
    isMarked: false,
  };

  const initialPlanet = {
    id: "",
    name: "",
    diameter: "",
    climate: "",
    terrain: "",
    population: "",
    orbital: "",
    rotation: "",
    isMarked: false,
  };

  const swapiURL = "https://www.swapi.tech/api/";

  const [lists, dispatch] = useReducer(listsReducer, initialLists());
  const [charForm, setCharForm] = useState(initialChar);
  const [planetForm, setPlanetForm] = useState(initialPlanet);
  const [favorites, setFavorites] = useState([]);
  const [favCount, setFavCount] = useState(0);

  var charNums = [];
  while (charNums.length < 8) {
    var r = Math.floor(Math.random() * 80) + 1;
    if (charNums.indexOf(r) === -1) charNums.push(r);
  }

  var planetNums = [];
  while (planetNums.length < 8) {
    var r = Math.floor(Math.random() * 40) + 1;
    if (planetNums.indexOf(r) === -1) planetNums.push(r);
  }

  useEffect(() => {
    charNums.map((num) => getChars(num));
    planetNums.map((num) => getPlanets(num));
  }, []);

  const getChars = (num) => {
    fetch(swapiURL + "people/" + num, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 404)
          throw Error("La página a la que está intentando acceder no existe");
        return response.json();
      })
      .then((data) => {
        const charData = data.result.properties;
        charData.id = num;
        charData.isMarked = false;
        dispatch({ type: "ADD_CHARS", payload: charData });
      });
  };

  const getPlanets = (num) => {
    fetch(swapiURL + "planets/" + num, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 404)
          throw Error("La página a la que está intentando acceder no existe");
        return response.json();
      })
      .then((data) => {
        const planetData = data.result.properties;
        planetData.id = num;
        planetData.isMarked = false;
        dispatch({ type: "ADD_PLANETS", payload: planetData });
      });
  };

  return (
    <SWContext.Provider
      value={{
        lists,
        dispatch,
        favorites,
        setFavorites,
        charForm,
        setCharForm,
        planetForm,
        setPlanetForm,
        favCount,
        setFavCount,
      }}
    >
      {children}
    </SWContext.Provider>
  );
}

const useGlobalReducer = () => useContext(SWContext);

export default useGlobalReducer;
