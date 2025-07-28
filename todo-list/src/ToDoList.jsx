import React, { useEffect, useState } from "react"; //since we will be using react we need to import it and then specify the hook used...

function ToDoList() {
  //STATE VARIABLES(this is how we declared variables) the setTsk and setNewTask is used to update state based on it's previous value
  const [tasks, setTask] = useState([]);

  console.log("Data", tasks);
  const [newTask, setNewTask] = useState("");
  const [open, setOpen] = useState(false);

  //functions we will use or need in our toto list
  function handleChange(e) {
    //function is for when we type in something in the text box...(e is an event)
    setNewTask(e.target.value); //so that we can see the text when we write into the input element
  }
  //console.log(tasks);

  function addToList() {
    //to prevent us from being able to add an empty task ,use an if statement and a trim method
    if (newTask.trim() !== "") {
      //trim function to reemove an whitespaces
      setTask((t) => [
        ...t,
        { id: tasks.length + 1, name: newTask, status: false },
      ]); //add new tasks to the existing ones (the ...spread operator allows us to copy parts of an existing array to a new one)
      setNewTask(""); //clears the text input after adding a task
    }
  }


  //GET DATA
  async function getData() {
    try {
      let response = await fetch("http://localhost:4200/tasks");
      const json = await response.json();
      return json;
    } catch (error) {     
      console.error("ERROR ${error)");
    }
  }

   useEffect(() => {
    const myTodo = getData().then((data) => {
      setTask(data); //updating my tasks, adding the fetched datafrom the db...
      console.log(data);
    });
  }, []);
  //   console.log("data", myTodo);


  //   console.log("data", myTodo);


  //POST DATA
  async function postData(){
    const task={
      id:tasks.length+1,
      name:newTask,
      status:false

    };
    try{
      const response = await fetch("http://localhost:4200/tasks",{//URL to where I am posting my data

      method:"POST",//DEFINES THE TYPE OF REQUEST / METHOD WE ARE SENDING
      headers:{
        "Content-Type": "application/json",},//the tpe of content we are sending, we are sending json data
      body:JSON.stringify(task)// the data we are sending, we are turning it from an object to a Json string...inside the round brackets is the data we want to turn to a json string

    }) ;
      const json = await response.json();
      return json;
      

    } catch (error) {
      console.error("ERROR ",error);
    } 
   
  }
   //calling your function
    //  postData().then(data => {
    // console.log('Server response:', data);}) 
//DELETE DATA
async function deleteData(id) {
  try {
    console.log("Attempting to delete task with ID:", id);

    const response = await fetch(`http://localhost:4200/tasks/${id}`, {
      method: "DELETE"
    });

    console.log("Delete item", response);

    if (response.ok) {
      if (response.status !== 204) {
        const json = await response.json();
        console.log("Deleted:", json);
      } else {
        console.log("Deleted: No content returned");
      }
    } else {
      console.error(`Failed to delete. Status: ${response.status}`);
    }

  } catch (error) {
    console.error("There was an error:", error);
  }
}



  function removeFromList(index) {
    //index is the index of the list item we would like to delete
    const modifiedTasks = tasks.filter((_, id) => id !== index); //filter out all the i's that are not equal to the index  we would like to delete(put it in our new modified array)
    setTask(modifiedTasks);
  }

  function moveUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTask(updatedTasks);
    }
  }

  function taskCompleted(index) {
    const completedTasks = [...tasks];
    completedTasks[index].status = !completedTasks[index].status;
    setTask(completedTasks);
  }

  function moveDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTask(updatedTasks);
    }
  }
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Copy the task and update its name
        return { ...task, name: newName };
      }
      // Return the original task if it's not the edited task
      return task;
    });
    setTask(editedTaskList);
  }

  function handleOpen() {
    if (open === false) {
      setOpen(true);
    }
  }

  //inside return we write out html code..
  //the onChange is an event handler that is triggered when there is change in the input box(callback)
  //we use the map function to generate a list and it must have two parameters the current element and it's index
  //the map function loops through every element in the array
  return (
    <>
      <div className="todo-list">
        <h1>TO-DO LIST</h1>
      </div>

      <label>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleChange}
        ></input>
      </label>
      <button className="add-button" onClick={postData}>
        +
      </button>
      <div className="big-box">
        <div className="list-box">
          <ol>
            {tasks?.map(//to check if the map is defined or not
              (task,index ) => (
                <li key={index}>{task.name}
                <button className="delete-button" onClick={()=> deleteData(task.id)}>Delete</button>
                
                </li>
              )
            )}
            
          </ol>
          <dialog open={open}> Edit</dialog>
        </div>
      </div>
    </>
  );
}
export default ToDoList;
