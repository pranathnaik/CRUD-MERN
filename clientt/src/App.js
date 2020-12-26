import "./App.css";
import Axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [foodName, setFoodName] = useState();
  const [days, setDays] = useState(0);
  const [Foodlist, setFoodlist] = useState([]);

  const [foodUpdate, setfoodUpdate] = useState();

  useEffect(() => {
    Axios.get("http://localhost:5000/read").then((response) => {
      setFoodlist(response.data);
    });
  }, []);

  const addToList = () => {
    Axios.post("http://localhost:5000/insert", { foodName, days });
  };

  const updatefood = (id) => {
    Axios.put("http://localhost:5000/update", {
      id,
      foodUpdate,
    });
    console.log(foodUpdate);
  };

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`);
    console.log(id);
  };

  return (
    <div className="App">
      <h1>CRUD APP WITH MERN</h1>
      <h3>food name</h3>
      <input
        type="text"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
      />
      <h3>number of days</h3>
      <input
        type="number"
        onChange={(event) => {
          setDays(event.target.value);
        }}
      />
      <br></br>
      <br></br>
      <button onClick={addToList}>Add to List</button>
      <hr></hr>
      <h2>food list</h2>
      {Foodlist.map((value) => {
        return (
          <>
            <h4>name : {value.foodname}</h4>
            <h4>day since ate : {value.daysSinceate}</h4>
            <input
              type="text"
              placeholde="update"
              onChange={(event) => {
                setfoodUpdate(event.target.value);
              }}
            />
            <button
              onClick={() => {
                updatefood(value._id);
              }}
            >
              update
            </button>
            <button
              onClick={() => {
                deleteFood(value._id);
              }}
            >
              delete
            </button>
          </>
        );
      })}
    </div>
  );
}

export default App;
