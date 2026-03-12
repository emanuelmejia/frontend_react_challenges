import React, { useState } from "react";

//create your first component
const ToDoList = () => {
  const [newToDo, renderToDo] = useState("");
  const [toDos, addToDo] = useState({
    1: "Make a To Do list",
    2: "Check off first task",
    3: "Realize you already did 2 things on the list",
    4: "Reward yourself with a cold beer",
    5: "Meditate on your achievements today",
  });
  const [count, setCount] = useState(Object.keys(toDos).length);
  const [countID, setID] = useState(Object.keys(toDos).length);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newToDo == "") {
      alert(
        "Please stop playing with the buttons\n\nYou need to actually write a task before adding it",
      );
    } else {
      addToDo({
        ...toDos,
        [countID + 1]: newToDo,
      });
      setID(countID + 1);
      setCount(count + 1);
      renderToDo("");
    }
  };

  const deleteItem = (task) => {
    delete toDos[task];
    setCount(count - 1);
  };

  const renderList = Object.entries(toDos).map(([key, value]) => (
    <li key={key} className="toDoItem list-group-item">
      <label className="col-11 fs-5 text-muted align-top">{value}</label>
      <a
        className="deleteButton col-1 text-danger align-top"
        onClick={() => deleteItem(key)}
      >
        <i class="fa-solid fa-x"></i>
      </a>
    </li>
  ));

  let countStr = count + (count == 1 ? " item" : " items") + " left";

  return (
    <div className="col-11 col-md-9 col-lg-7 mx-auto">
      <div className="row">
        <div className="text-center col-12">
          <h1 className="toDoTitle">toDos</h1>
        </div>
      </div>
      <div className="row">
        <ul className="toDoList col-12 list-group">
          <li className="list-group-item">
            <form className="d-flex col-12" onSubmit={handleSubmit}>
              <input
                className="taskInput col-10"
                placeholder="What else you're supposed to do?"
                type="text"
                autoFocus={true}
                value={newToDo}
                onChange={(e) => {
                  renderToDo(e.target.value);
                }}
              />
              <button className="btn btn-outline-danger col-2">Add</button>
            </form>
          </li>
          {renderList}
          <li className="list-group-item text-danger fs-6">
            <span>{countStr}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
