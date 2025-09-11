import { useEffect, useState } from "react";
import "./App.css"
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const App = () => {
  const [dateTime, setDateTime] = useState();
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState(() => {
  const rowTodo =  localStorage.getItem('todoKey');
  return rowTodo ? JSON.parse(rowTodo) : []; 
  });

localStorage.setItem("todoKey", JSON.stringify(task));

  // todo App Time and date show
useEffect(() => {
 const interval = setInterval(() => {
    const newDate = new Date().toLocaleDateString();
    const newTime = new Date().toLocaleTimeString("en-US");
    setDateTime(`${newDate}-${newTime}`);
  }, 1000);
return () => clearInterval(interval)
},[])

  const submitFormEvent = (e) => {
    e.preventDefault();
   
    const trimmedValue = inputValue.trim();
    if(!trimmedValue){
      setInputValue("");
      return;
    };
  
    if(task.some((t) => t.text === trimmedValue)){
        setInputValue("");
        return;
    }
    setTask((prev) => [...prev,{text:trimmedValue,completed:false}]);
    setInputValue("");
  }
   
  const removeElement = (value) => {
    const updateRemove = task.filter((remove) => remove.text !== value)
     setTask(updateRemove)
  }
 
  const checkUncheck = (value) => {
     const updatedTask =    task.map((t) => t.text ===value ? {...t,completed: !t.completed}:t);
     setTask(updatedTask)
  }


  const clearAll = () => {
    setTask([]);
  }
  return ( 
    <div><section>
      <header>
        <h1>Todo List App</h1>
      </header>
      <div className="timezone">{dateTime}</div>
      </section>
      <form onSubmit={submitFormEvent}> 
        <input type="text" placeholder="Add Task" value={inputValue} onChange={(e) => setInputValue(e.target.value)}  />
        <button type="submit">Add</button>
      </form>
      <div>
        <ul type="circle">
            {
                task.map((curr,index) => {
                    return <li key={index}>
                        <div className="list-div">
                            <p className={` display-item ${curr.completed ? "completed-task" : ""}`}>{curr.text}</p>
                        </div>
                        <button onClick={() => checkUncheck(curr.text)}><FaCheck /></button>
                        <button onClick={() => removeElement(curr.text)}><MdDelete /></button>
                    </li> 
                })
            }
        </ul>
        <button onClick={clearAll}>Clear All</button>
      </div>
    </div>
  );
};
