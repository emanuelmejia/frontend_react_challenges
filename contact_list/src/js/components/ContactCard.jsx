import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../context/StoreProvider";

const SingleCard = ({ name, phone, email, location, id }) => {
  const navigate = useNavigate();
  const { store, setContactForm, deleteContact, setEditingId } =
    useGlobalReducer();
  const handleEdit = (id) => {
    const updatedContact = store.contacts.filter(
      (contact) => contact.id == id,
    )[0];
    console.log(updatedContact);
    setContactForm({
      name: updatedContact.name,
      phone: updatedContact.phone,
      email: updatedContact.email,
      address: updatedContact.address,
    });
    navigate("/addcontact");
    setEditingId(id);
  };
  const handleDelete = (id) => {
    console.log(id);
    deleteContact(id);
  };

  const imgURL =
    id % 2 == 0
      ? `https://randomuser.me/portraits/women/${id}.jpg`
      : `https://randomuser.me/portraits/men/${id}.jpg`;
  return (
    <div className="card mb-5 px-0 bg-dark text-white">
      <div className="row g-0">
        <div className="col-3 d-flex flex-wrap align-items-center justify-content-center">
          <img
            className="img-fluid rounded-circle align-middle"
            src={imgURL}
            alt={name}
          />
        </div>
        <div className="col-7">
          <div className="card-body text-white">
            <h3 className="card-name">{name}</h3>
            <p className="card-text text-light">
              <i className="fa-solid fa-phone me-2"></i>
              <small>{phone}</small>
            </p>
            <p className="card-text text-light">
              <i className="fa-solid fa-envelope me-2"></i>
              <small>{email}</small>
            </p>
            <p className="card-text text-light">
              <i className="fa-solid fa-location-dot me-2"></i>
              <small>{location}</small>
            </p>
          </div>
        </div>
        <button
          className="editButton col-1 text-light align-top h-50 mt-2 bg-dark"
          onClick={() => handleEdit(id)}
        >
          <i className="fa-solid fa-pencil"></i>
        </button>
        <button
          className="deleteButton col-1 text-light align-top h-50 mt-2 bg-dark"
          onClick={() => handleDelete(id)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
};

export default SingleCard;
