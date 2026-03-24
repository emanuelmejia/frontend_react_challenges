import React, { useEffect, useState } from "react";

const API = "http://localhost:3001/noticias";

const App = () => {
  const [noticias, setNoticias] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    contenido: "",
  });
  const[editingId, setEditingId] = useState(null)

  // Método GET
  const obtenerNoticias = () => {
    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json(); // convertir datos en json para mandarlos al siguiente then
      })
      .then((datos) => {
        console.log(datos); // traemos datos en formato json
        setNoticias(datos); // guardamos datos en el estado del componente para poder usarlos
      });
  };

  // Método POST
  const crearNoticia = (noticia) => {
    // {titulo:'', contenido: ''}
    fetch(API, {
      method: "POST",
      body: JSON.stringify(noticia), //convertir a objeto JSON
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 404)
          throw Error("La página a la que está intentando acceder no existe");
        if (!response.ok) throw Error("Error al intentar crear la noticia");
        return response.json();
      })
      .then((datos) => {
        console.log(datos);
        setNoticias((noticias) => [...noticias, datos]); //agregar nuevas noticias
        setForm({ titulo: "", contenido: "" });
      })
      .catch((error) => console.log(error.message));
  };

  // Método PUT
  const actualizarNoticia = (noticia, id) => {
    fetch(`${API}/${id}`, {
      method: "PUT",
      body: JSON.stringify(noticia), //convertir a objeto JSON
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response)
      return response.json
    })
    .then((datos)=>{
      console.log(datos)
      obtenerNoticias() //filtrar directo en la pantalla del usuario
      setForm({ titulo: "", contenido: "" });
      setEditingId(null);
    })
    .catch((error) => console.log(error.message))
  };

  const eliminarNoticia = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response)
      return response.json
    })
    .then((datos)=>{
      console.log(datos)
      // obtenerNoticias() - Es una opción pero si fueran muchos usuarios serían muchos GET!
      setNoticias((noticias) => noticias.filter((noticia) => noticia.id !== id)); //filtrar directo en la pantalla del usuario
      //setNoticias((noticias) => noticias.filter((noticia) => noticia.id !== datos.id)); //esto solo funciona si la respuesta envía el recurso eliminado
    })
    .catch((error) => console.log(error.message))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    if(editingId){
      actualizarNoticia(form, editingId)
    } else {
      crearNoticia(form);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (noticia) => {
    setForm({titulo: noticia.titulo, contenido: noticia.contenido})
    setEditingId(noticia.id)
  }

  const handleDelete = (id) => {
    console.log(id);
    eliminarNoticia(id);
  };

  useEffect(() => {
    obtenerNoticias();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Blog de Noticias</h1>
        <p>CRUD con Fetch en React</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titulo</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required //campo obligatorio
          />
          <label>Contenido</label>
          <textarea
            name="contenido"
            value={form.contenido}
            rows={5}
            onChange={handleChange}
            required //campo obligatorio
          />
        </div>
        <button className="btn btn-save">
          {editingId ? "Actualizar": "Guardar"}
        </button>
      </form>
      <div className="news-list">
        {noticias.map((noticia) => (
          <div key={noticia.id} className="news-card">
            <h2>{noticia.titulo}</h2>
            <p>{noticia.contenido}</p>
            <div className="actions">
              <button className="btn btn-edit" onClick={() => handleEdit(noticia)}>
                Editar
                </button>
              <button
                className="btn btn-delete"
                onClick={() => handleDelete(noticia.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
