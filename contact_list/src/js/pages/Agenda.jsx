import React from "react";
import useGlobalReducer from "../context/StoreProvider";
import Menu from "../components/Menu";
import SingleCard from "../components/ContactCard";

const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <>
      <Menu show="New" />
      <div className="col-11 col-md-9 col-lg-7 mx-auto">
        <div className="row">
          <div className="text-center col-12">
            <h1 className="toDoTitle text-white">Agenda</h1>
          </div>
        </div>
        <ul className="list-group-flush">
          {store.contacts.map((contact) => (
            <li key={contact.id} className="contactItem list-group-item">
              <SingleCard
                name={contact.name}
                phone={contact.phone}
                email={contact.email}
                location={contact.address}
                id={contact.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  // return (
  //     <>
  //     <Menu />
  //     <div>Home</div>
  //     <ul>
  //         {
  //             store.contacts.map((contact) => (<li key={contact.id}>{contact.name}</li>))
  //         }
  //     </ul>
  //     </>
  // )
};

export default Home;
