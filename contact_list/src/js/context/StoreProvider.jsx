import {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";
import agendaReducer, { initialStore } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const listUser = { name: "archiesensei" };
  const userURL = "https://playground.4geeks.com/contact/agendas/";
  // const todoAPI = "https://playground.4geeks.com/todo/todos/";

  const [store, dispatch] = useReducer(agendaReducer, initialStore());
  const initialForm = {
    name: "",
    phone: "",
    email: "",
    address: "",
  };
  const [contactForm, setContactForm] = useState(initialForm);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = () => {
    fetch(userURL + listUser.name, {
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
        console.log(data.contacts);
        dispatch({ type: "GET_CONTACTS", payload: data.contacts });
      });
  };

  const createContact = (contact) => {
    fetch(userURL + listUser.name + "/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((response) => {
        if (!response.ok) throw Error("Error al intentar crear el contacto");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch({ type: "ADD_CONTACT", payload: data });
        setContactForm(initialForm);
      })
      .catch((error) => console.log(error.message));
  };

  const editContact = (contact, id) => {
    fetch(`${userURL}${listUser.name}/contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify(contact), //convertir a objeto JSON
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json;
      })
      .then((data) => {
        console.log(data);
        getContacts();
        setContactForm(initialForm);
        setEditingId(null);
      })
      .catch((error) => console.log(error.message));
  };

  // DELETE Method
  const deleteContact = (toDeleteID) => {
    fetch(`${userURL}${listUser.name}/contacts/${toDeleteID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json;
      })
      .then((data) => {
        console.log(data);
        const newAgenda = store.contacts.filter(
          (contact) => contact.id !== toDeleteID,
        );
        dispatch({ type: "SET_CONTACTS", payload: newAgenda });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <StoreContext.Provider
      value={{
        store,
        dispatch,
        createContact,
        deleteContact,
        editContact,
        contactForm,
        setContactForm,
        initialForm,
        editingId,
        setEditingId,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

const useGlobalReducer = () => useContext(StoreContext);

export default useGlobalReducer;
