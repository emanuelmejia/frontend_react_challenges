import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../context/StoreProvider";
import Menu from "../components/Menu";

const AddContact = () => {
  const navigate = useNavigate();
  const { createContact, editContact, contactForm, setContactForm, editingId } =
    useGlobalReducer();

  const handleChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    if (editingId) {
      editContact(contactForm, editingId);
    } else {
      createContact(contactForm);
    }
  };
  return (
    <>
      <Menu show={"Agenda"} />
      <div className="col-11 col-md-9 col-lg-7 mx-auto">
        <div className="row">
          <div className="text-center col-12">
            <h1
              className={
                "toDoTitle " + (editingId ? "text-info" : "text-primary")
              }
            >
              {editingId ? "Update Contact" : "Add New Contact"}
            </h1>
          </div>
        </div>
        <div className="row mb-5">
          <ul className="contactData col-12 list-group">
            <li className="list-group-item bg-dark text-light">
              <form className="form col-12" onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <br />
                <input
                  className="taskInput col-12 mb-3"
                  placeholder="Enter the Full name"
                  type="text"
                  name="name"
                  autoFocus={true}
                  value={contactForm.name}
                  onChange={handleChange}
                  required
                />
                <label>Phone Number:</label>
                <br />
                <input
                  className="taskInput col-12 mb-3"
                  placeholder="Enter the phone number"
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleChange}
                  required
                />
                <label>Email:</label>
                <br />
                <input
                  className="taskInput col-12 mb-3"
                  placeholder="Enter the email"
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleChange}
                  required
                />
                <label>Address:</label>
                <br />
                <textarea
                  className="form-control col-12 mb-3"
                  name="address"
                  placeholder="Enter the address"
                  value={contactForm.address}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
                <button
                  className={
                    "btn col-12 " +
                    (editingId ? "btn-outline-info" : "btn-outline-primary")
                  }
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
  // return (
  //     <>
  //         <Menu />
  //         <p>Contact</p>
  //         <button onClick={() => createContact({ name: 'Jane Doe', email: 'tommy.doe@gmai.com', phone: '+1 555 555 555', address: 'Santiago, Chile'})}>Create Contacto</button>
  //     </>
  // )
};

export default AddContact;
