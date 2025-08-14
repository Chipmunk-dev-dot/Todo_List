import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import EditDialog from "./components/EditDialog";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function ToDoList() {
  const [newTask, setNewTask] = useState("");
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () => axios("http://localhost:5001/api/v1/todos"),
  });

  const createData = useMutation({
    mutationFn: ( newTask ) => {
      return axios.post("http://localhost:5001/api/v1/todos", {
        task_name:newTask,
        status:'in Progress'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(data);
    },
  });

  const deleteData=useMutation({
    mutationFn: (id)=>{
      return axios.delete(`http://localhost:5001/api/v1/todos/${id}`,
        id
      )
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(data);
    }
  });

  const updateData = useMutation({
    mutationFn: ({id,task})=>{
      return axios.put(`http://localhost:5001/api/v1/todos/${id}`,{

        task_name:task
      })

    },
      onSuccess:()=>{
      queryClient.invalidateQueries(data);
    }

  })



  const createTask = () => {
    createData.mutate(newTask);
    setNewTask("");
  };

  const deleteTask =(id)=>{
    deleteData.mutate(id);
  }


  console.log(data?.data);

  const myTasks = data?.data;

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
          onChange={(e) => setNewTask(e.target.value)}
        ></input>
      </label>
      <button className="add-button" onClick={() => createTask()}>
        +
      </button>
      <div className="big-box">
        <div className="list-box">
          <ol>
            {myTasks?.map(
              //to check if the map is defined or not
              (task, index) => (
                <li key={index}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "60px",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <h5>{task.task_name}</h5>

                    <div>
                      <EditDialog  id= {task.id} updateData={updateData}/>
                      <button onClick={()=>deleteTask(task.id)}> Delete</button>
                    </div>
                  </div>
                </li>
              )
            )}
          </ol>
        </div>
      </div>
    </>
  );
}
export default ToDoList;
