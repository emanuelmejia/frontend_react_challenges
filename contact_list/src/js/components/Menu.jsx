import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../context/StoreProvider";

const Menu = ({ show }) => {
  const { setContactForm, initialForm, setEditingId } = useGlobalReducer();
  function refreshForm() {
    setContactForm(initialForm);
    setEditingId(null);
  }
  return (
    <div className="d-flex justify-content-around mt-3 ">
      <Link to={"/"}>
        <button
          className={
            "btn btn-outline-light " +
            (show == "Agenda" ? "visible" : "invisible")
          }
          onClick={refreshForm}
        >
          Agenda
        </button>
      </Link>
      <Link to={"/addcontact"}>
        <button
          className={
            "btn btn-outline-info " + (show == "New" ? "visible" : "invisible")
          }
        >
          New Contact
        </button>
      </Link>
    </div>
  );
};

export default Menu;
