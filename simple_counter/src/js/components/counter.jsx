import React from "react";

function SimpleCounter({
  hundredthousands,
  tenthousands,
  thousands,
  hundreds,
  tenths,
  units,
}) {
  return (
    <div className="countBlock bg-dark text-center text-info px-5 py-3">
      <div className="icon bg-info text-dark m-3 p-5 d-inline-block">
        <i className="far fa-clock"></i>
      </div>
      <div className="digit bg-black m-3 p-5 d-inline-block fw-semibold">
        {hundredthousands}
      </div>
      <div className="digit bg-black m-3 p-5 d-inline-block fw-semibold">
        {tenthousands}
      </div>
      <div className="digit bg-black m-3 p-5 d-inline-block fw-semibold">
        {thousands}
      </div>
      <div className="digit bg-black m-3 p-5 d-inline-block fw-semibold">
        {hundreds}
      </div>
      <div className="digit bg-black m-3 p-5 d-inline-block fw-semibold">
        {tenths}
      </div>
      <div className="digit bg-black m-3 p-5 d-inline-block fw-semibold">
        {units}
      </div>
    </div>
  );
}

export default SimpleCounter;
