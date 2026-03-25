import React, { useEffect, useState } from "react";

const todoUser = { name: "archiesensei" };
const userURL = "https://playground.4geeks.com/todo/users/";
const todoAPI = "https://playground.4geeks.com/todo/todos/";

//create your first component
const ToDoList = () => {
  const [toDoList, setToDos] = useState([]);
  const [toDoForm, setToDoForm] = useState({
    label: "",
    is_done: false,
  });
  const [taskCount, setTaskCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [showCompleted, toggleCompleted] = useState(false);

  // GET Method
  const getToDos = () => {
    fetch(userURL + todoUser.name, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 404) createUser(todoUser);
        //   throw Error("La página a la que está intentando acceder no existe");
        console.log(response);
        return response.json(); // convert to json to send them to the following then
      })
      .then((data) => {
        console.log(data.todos); // bring json data from previous step
        setToDos(data.todos); // save data in the component's state to use them later
        setTaskCount(
          data.todos.filter((toDo) => toDo.is_done === false).length,
        );
        setCompleteCount(
          data.todos.filter((toDo) => toDo.is_done === true).length,
        );
      });
  };

  // POST Method
  const createToDo = (newToDo) => {
    fetch(todoAPI + todoUser.name, {
      method: "POST",
      body: JSON.stringify(newToDo), // convert to json to send them to the following then
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw Error("Error al intentar crear la noticia");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setToDos((toDoList) => [...toDoList, data]); //add new todos
        setTaskCount(taskCount + 1);
        setToDoForm({ label: "", is_done: false });
      })
      .catch((error) => console.log(error.message));
  };

  // DELETE Method
  const deleteTask = (toDelete) => {
    fetch(`${todoAPI}${toDelete.id}`, {
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
        setToDos((toDoList) =>
          toDoList.filter((toDo) => toDo.id !== toDelete.id),
        ); //filter directly in the user's screen
        if (toDelete.is_done === false) {
          setTaskCount(taskCount - 1);
        } else {
          setCompleteCount(completeCount - 1);
        }
      })
      .catch((error) => console.log(error.message));
  };

  // PUT Method
  const completeTask = (toDo) => {
    fetch(`${todoAPI}${toDo.id}`, {
      method: "PUT",
      body: JSON.stringify(toDo), //convertir a objeto JSON
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
        getToDos(); //filter directly in the user's screen
        setToDoForm({ label: "", is_done: false });
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getToDos();
  }, []);

  let countStr = taskCount + (taskCount == 1 ? " task" : " tasks") + " left";
  let compStr =
    completeCount + (completeCount == 1 ? " task" : " tasks") + " completed";

  const handleSubmit = (e) => {
    e.preventDefault();
    createToDo(toDoForm);
  };

  const handleChange = (e) => {
    setToDoForm({
      ...toDoForm,
      [e.target.name]: e.target.value,
      is_done: false,
    });
  };

  const handleDelete = (id) => {
    console.log(id);
    deleteTask(id);
  };

  const handleComplete = (toDo) => {
    toDo.is_done = true;
    console.log(toDo);
    completeTask(toDo);
  };

  const handleUnmark = (toDo) => {
    toDo.is_done = false;
    console.log(toDo);
    completeTask(toDo);
  };

  const handleVisible = () => {
    if (showCompleted) {
      toggleCompleted(false);
    } else {
      toggleCompleted(true);
    }
  };

  return (
    <div className="col-11 col-md-9 col-lg-7 mx-auto">
      <div className="row">
        <div className="text-center col-12">
          <h1 className="toDoTitle">toDos</h1>
        </div>
      </div>
      <div className="row mb-5">
        <ul className="toDoList col-12 list-group">
          <li className="list-group-item">
            <form className="form d-flex col-12" onSubmit={handleSubmit}>
              <input
                className="taskInput col-10"
                placeholder="What else you're supposed to do?"
                type="text"
                name="label"
                autoFocus={true}
                value={toDoForm.label}
                onChange={handleChange}
                required
              />
              <button className="btn btn-outline-danger col-2">Add</button>
            </form>
          </li>

          {toDoList
            .filter((toDo) => toDo.is_done === false)
            .map((toDoItem) => (
              <li key={toDoItem.id} className="toDoItem list-group-item">
                <label className="col-10 fs-5 text-muted align-top">
                  {toDoItem.label}
                </label>
                <button
                  className="completeButton col-1 text-success align-top"
                  onClick={() => handleComplete(toDoItem)}
                >
                  <i className="fa-regular fa-square"></i>
                </button>
                <button
                  className="deleteButton col-1 text-danger align-top"
                  onClick={() => handleDelete(toDoItem)}
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </li>
            ))}
          <li className="list-group-item text-danger fs-6">
            <span>{countStr}</span>
          </li>
        </ul>
      </div>
      <div className="row">
        <ul className="toDoList col-12 list-group">
          <li className="list-group-item d-flex justify-content-between">
            <span className="text-primary fs-4">
              {showCompleted ? "Completed Tasks" : compStr}
            </span>
            <button
              className={
                "btn col-2 ps-auto " +
                (showCompleted ? "btn-primary" : "btn-outline-primary")
              }
              onClick={handleVisible}
            >
              {showCompleted ? "Hide" : "Show"}
            </button>
          </li>
          {toDoList
            .filter((toDo) => toDo.is_done === true)
            .map((toDoItem) => (
              <li
                key={toDoItem.id}
                className={
                  "toDoItem list-group-item " +
                  (showCompleted ? "visible" : "invisible")
                }
              >
                <label className="col-10 fs-5 text-muted align-top">
                  {toDoItem.label}
                </label>
                <button
                  className="completeButton col-1 text-success align-top"
                  onClick={() => handleUnmark(toDoItem)}
                >
                  <i className="fa-solid fa-square-check"></i>
                </button>
                <button
                  className="deleteButton col-1 text-danger align-top"
                  onClick={() => handleDelete(toDoItem)}
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </li>
            ))}
          <li
            className={
              "list-group-item text-success fs-6 " +
              (showCompleted ? "visible" : "invisible")
            }
          >
            <span>{compStr}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
