import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("https://employee-mngm-system.herokuapp.com/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("Success");
    });
  };

  const getEmployees = () => {
    Axios.get("https://employee-mngm-system.herokuapp.com/employees").then(
      (response) => {
        setEmployeeList(response.data);
      }
    );
  };

  const updateEmployeeWage = (id) => {
    Axios.put("https://employee-mngm-system.herokuapp.com/update", {
      wage: newWage,
      id: id,
    }).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                wage: newWage,
              }
            : val;
        })
      );
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(
      `https://employee-mngm-system.herokuapp.com/delete/${id}`
    ).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <h1>New Employee Data</h1>
        <label>Name: </label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Age: </label>
        <input
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label>Country: </label>
        <input
          type="text"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <label>Position: </label>
        <input
          type="text"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <label>Wage (year): </label>
        <input
          type="number"
          onChange={(e) => {
            setWage(e.target.value);
          }}
        />
        <button onClick={addEmployee}>Register Employee</button>
      </div>
      <div className="display-employees">
        <button onClick={getEmployees}>Show Employees</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
              <div className="update-wage">
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
