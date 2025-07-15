import React ,{useState} from 'react' //since we will be using react we need to import it and then specify the hook used...

function ToDoList(){
    //STATE VARIABLES(this is how we declared variables) the setTsk and setNewTask is used to update state based on it's previous value
    const [tasks, setTask]= useState([
        {id:1,
        name:"Make the bed.",
        status:false
      },
        
      {id:2,
        name:"Do ten push-ups.",
        status:false
      },
      
      {id:3,
        name:"Take a cold shower",
        status:false
      },
     ]);
    const [newTask, setNewTask]= useState("");

    //functions we will use or need in our toto list
    function handleChange(e){ //function is for when we type in something in the text box...(e is an event)
        setNewTask(e.target.value);//so that we can see the text when we write into the input element

    }
    console.log(tasks);
 
    function addToList(){
        //to prevent us from being able to add an empty task ,use an if statement and a trim method
        if(newTask.trim() !==""){ //trim function to reemove an whitespaces
            setTask(t =>[...t, {id:tasks.length+1,name:newTask,status:false}]); //add new tasks to the existing ones (the ...spread operator allows us to copy parts of an existing array to a new one)
            setNewTask(""); //???what does it do

        }
       

    }

    function removeFromList(index){ //index is the index of the list item we would like to delete
        const modifiedTasks =tasks.filter((element, i)=>i !==index); //filter out all the i's that are not equal to the index  we would like to delete(put it in our new modified array)
        setTask(modifiedTasks);

    }

    function moveUp(index){
        if(index>0){
            const updatedTasks=[...tasks];
            [updatedTasks[index], updatedTasks[index-1]]=[updatedTasks[index-1], updatedTasks[index]];
            setTask(updatedTasks);

        }
       
    }

    function moveDown(index){
          if(index< tasks.length -1){
            const updatedTasks=[...tasks];
            [updatedTasks[index], updatedTasks[index+1]]=[updatedTasks[index+1], updatedTasks[index]];
            setTask(updatedTasks);

        }
       

    }




//inside return we write out html code.. 
//the onChange is an event handler that is triggered when there is change in the input box(callback)
//we use the map function to generate a list and it must have two parameters the current element and it's index
    return(<>
    <div className="todo-list">
        <h1>TO-DO LIST</h1>
    </div>

    <label><input type="text" placeholder="Enter a task..." value={newTask} onChange={handleChange}></input></label> 
    <button className="add-button" onClick={addToList}>+</button>
    <div className='big-box'>
        <div className='list-box'>
          <ol>
        {tasks.map((task, index)=>
            <li key={index}> {/* jdfdkjdk */}
            <input type='checkbox'/>
            <span  className='text'>{task.name}</span>
            <button className='delete-button' onClick={() => removeFromList(index)}>🗑</button>
            <button className='up-button' onClick={() => moveUp(index)}>Up</button>
            <button className='down-button' onClick={() => moveDown(index)}>Down</button>
            
        </li>

        )} 
    </ol>

    </div>
  
        
    </div>
    
    


    
    </>);

}
export default ToDoList