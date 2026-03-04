import React from "react";

const SingleCard = ({ title, text, imageURL }) => {
  return (
    <div class="col-12 col-sm-6 col-lg-3 py-3">
      <div className="card mb-5 px-0">
        <img className="card-img w-100" src={imageURL} alt={title} />

        <div className="card-body">
          <div className="row py-2">
            <div className="col-12 card-title">
              <h3>{title}</h3>
            </div>
            <div className="col-12 card-text mb-3">
              <p className="card-text">{text}</p>
            </div>
            <div>
              <button className="btn btn-primary">Find out More!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
