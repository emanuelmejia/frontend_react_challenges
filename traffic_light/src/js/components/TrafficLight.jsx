import React, { useReducer } from "react";

const lightReducer = (state, action) => {
  switch (action.type) {
    case "redToggle":
      state = "redOn";
      return state;
    case "yellowToggle":
      state = "yellowOn";
      return state;
    case "greenToggle":
      state = "greenOn";
      return state;
    default:
      state = "";
      return state;
  }
};

//create your first component
const TrafficLight = () => {
  const [turnOn, toggle] = useReducer(lightReducer, "");

  return (
    <div className="d-flex align-items-center flex-column">
      <div className="background">
        <span className="blob blob-1"></span>
        <span className="blob blob-2"></span>
        <span className="blob blob-3"></span>
      </div>
      <div className="hanger"></div>
      <div className="lightBox d-flex flex-column justify-content-evenly align-items-center">
        <button
          className={"light red btn btn-danger text-danger " + turnOn}
          onClick={() => toggle({ type: "redToggle" })}
        >
          <i class={"fa-solid iRed fa-hand fa-5x " + turnOn}></i>
        </button>
        <button
          className={"light yellow btn btn-warning text-warning " + turnOn}
          onClick={() => toggle({ type: "yellowToggle" })}
        >
          <i class={"fa-solid iYellow fa-stopwatch fa-5x " + turnOn}></i>
        </button>
        <button
          className={"light green btn btn-success text-success " + turnOn}
          onClick={() => toggle({ type: "greenToggle" })}
        >
          <i class={"fa-solid iGreen fa-person-walking fa-5x " + turnOn}></i>
        </button>
      </div>
    </div>
  );
};

export default TrafficLight;
