import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="information">
        <h1>New Employee Data</h1>
        <label>Name: </label>
        <input type="text" />
        <label>Age: </label>
        <input type="number" />
        <label>Country: </label>
        <input type="text" />
        <label>Position: </label>
        <input type="text" />
        <label>Wage (year): </label>
        <input type="number" />
        <button>Register Employee</button>
      </div>
    </div>
  );
}

export default App;
