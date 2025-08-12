import React, { useEffect, useState } from "react"; //since we will be using react we need to import it and then specify the hook used...

function ToDoList() {

  const [tasks, setTasks]= useState([]);
  const [newTask, setNewTask]=useState("");

  useEffect(() => {

    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/v1/todos", {
          method: "GET",
        });

        const data = await response.json();
        console.log(data); // handle or set data to state here
        setTasks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);


const createData=async()=>{
  try {
    const response= await fetch("http://localhost:5001/api/v1/todos", {
      method: "POST",
      body: JSON.stringify({
        "task_name": newTask,
        "status": "in-progress"
         }),
  headers: {
    "Content-type": "application/json"
  }
});
    
 const data=await response.json();
 console.log(data)
  } catch (error) {
    console.error("Error fetching data:", error);
    
  }
  

}
 


  
  return (
    <>
      <div className="todo-list">
        <h1>TO-DO LIST</h1>
      </div>

      <label>
        <input  type="text" value={newTask} placeholder="Enter a task..." onChange={(e)=> setNewTask(e.target.value)
    }></input>
      </label>
      <button className="add-button"  onClick={()=> createData()}>+</button>
      <div className="big-box">
        <div className="list-box">
          <ol>
             {tasks?.map(//to check if the map is defined or not
              (task,index ) => (
                <li key={index}>{task.task_name}
                <button className="delete-button">Delete</button>
                
                </li>
              )
            )}
          </ol>
          <dialog> Edit</dialog>
        </div>
      </div>
    </>
  );
}
export default ToDoList;
