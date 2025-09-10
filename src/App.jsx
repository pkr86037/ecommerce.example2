import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./App.css";

export default function App() {
  const [inputValue, setinputValue] = useState("");
  const [task, setTask] = useState(() => {
    const rawTodo = localStorage.getItem("todoKey");
    if (!rawTodo) return [];
    return JSON.parse(rawTodo);
  });
  const [dateTime, SetDateTime] = useState("");
  // todo Add data to local storage
  localStorage.setItem("todoKey", JSON.stringify(task));

useEffect(() => {
  const interval = setInterval(() => {
    const newDate = new Date().toDateString();
    const newTime = new Date().toLocaleTimeString("en-US",{
      hour:"numeric",
      minute:"numeric",
      second:"numeric",
      hour12:true,
    })  
    SetDateTime(`${newDate} - ${newTime}`)
  });
  return () => clearInterval(interval);
},[])

  const handleInputChange = (value) => {
    setinputValue(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!inputValue) return;

    if (task.some((t) => t.text === inputValue)) {
      setinputValue("");
      return;
    }

    setTask((prevTask) => [
      ...prevTask,
      { text: inputValue, completed: false },
    ]);

    setinputValue("");
  };

  const handleDeleteElement = (value) => {
    const updatedFunction = task.filter((curr) => curr.text !== value);
    setTask(updatedFunction);
  };

  const handleToggleComplete = (value) => {
    const updatedTasks = task.map((t) =>
      t.text === value ? { ...t, completed: !t.completed } : t
    );
    setTask(updatedTasks);
  };

  const clearAllList = () => {
    setTask([]);
  };

  return (
    <>
      <section className="todo-cantaner">
        <header>
          <h1>Todo List</h1>
        </header>
        <div className="sate">
          <h2>{dateTime}</h2>
        </div>
      </section>

      <section className="form">
        <form onSubmit={handleFormSubmit}>
          <div>
            <input
              type="text"
              className="todo-input"
              autoComplete="off"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>
          <button type="submit">Add Task</button>
        </form>

        <section className="display-section">
          <ul>
            {task.map((list, index) => (
              <li className="list-cantaner" key={index}>
                <div className="result">
                  <div
                    className={`result-name ${ list.completed ? "completed-task" : "" }`}>
                    {list.text}
                  </div>
                  <div className="icons">
                    <div className="thik-icon">
                      <button
                        className="checkBtn"
                        onClick={() => handleToggleComplete(list.text)}
                      >
                        <FaCheck/>
                      </button>
                    </div>
                    <div className="del-icon">
                      <button
                        className="deleteBtn"
                        onClick={() => {
                          handleDeleteElement(list.text);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button type="button" className="clear-btn" onClick={clearAllList}>
            Clear All
          </button>
        </section>
      </section>
    </>
  );
}
