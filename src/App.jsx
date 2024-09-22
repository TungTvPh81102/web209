import { useState } from "react";
import "./App.css";
import ProductList from "./components/ProductList";

function App() {
  const [color, setColor] = useState("bg-danger");
  const [status, setStatus] = useState(false);
  const [task, setTask] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isEdit, setIsEdit] = useState(null);

  const handleChangeColor = () => {
    setColor(color === "bg-danger" ? "bg-primary" : "bg-danger");
  };

  const hangleChangeStatus = () => {
    setStatus(!status);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue) {
      alert("Vui lòng nhập thông tin task");
    }

    setTask([
      ...task,
      {
        id: Math.floor(Math.random() * 1000),
        name: inputValue,
        status: false,
      },
    ]);

    setInputValue("");
  };

  const handleRemove = (id) => {
    setTask(task.filter((item) => item.id !== id));
    setIsEdit(null);
  };

  const handleCheckBox = (id) => {
    console.log(id);

    setTask(
      task.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const handleEdit = (id) => {
    const taskEdit = task.find((item) => item.id === id);
    setInputValue(taskEdit.name);
    setIsEdit(id);
  };

  const handUpdate = (id) => {
    setTask(
      task.map((item) =>
        item.id === id ? { ...item, name: inputValue } : item
      )
    );

    setIsEdit(null);
    setInputValue("");
  };
  const handleCancel = () => {
    setIsEdit(null);
    setInputValue("");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex mb-4">
        <button className="btn btn-danger" onClick={handleChangeColor}>
          Change color
        </button>
        <button className="btn btn-primary ms-2" onClick={hangleChangeStatus}>
          Change status
        </button>
        {/* <button className="btn btn-danger" onClick={()=> setColor("bg-primary")}>
          Change color
        </button>
        <button className="btn btn-primary ms-2" onClick={() => setStatus(!status)}>
          Change status
        </button> */}
      </div>
      {/* {!status && (
        <div
          className={color}
          style={{ width: "200px", height: "200px" }}
        ></div>
      )} */}

      <div style={{ display: status ? "none" : "block" }}>
        <div
          className={color}
          style={{ width: "200px", height: "200px" }}
        ></div>
      </div>

      <hr />
      <h2 className="mb-4">To do app</h2>
      {JSON.stringify(task)}
      <form onSubmit={handleSubmit} action="">
        <div className="form-group mb-2 d-flex">
          <input
            value={isEdit ? "" : inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter task"
            type="text"
            className="form-control"
          />
          <button className="btn btn-primary ms-2">Add</button>
        </div>
      </form>

      <ul className="list-group">
        {task.map((item) => (
          <li key={item.id}>
            <div className="form-group mb-4 d-flex">
              <input
                onChange={() => handleCheckBox(item.id)}
                type="checkbox"
                className="form-check-input"
                checked={item.status}
              />
              {isEdit === item.id ? (
                <>
                  <div className="form-group mb-4 d-flex">
                    <input
                      defaultValue={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter task"
                      type="text"
                      className="form-control"
                    />
                    <button
                      onClick={() => handUpdate(item.id)}
                      className="btn btn-success ms-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn btn-danger ms-2"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span
                    onClick={() => handleEdit(item.id)}
                    style={{
                      cursor: "pointer",
                      textDecoration: item.status ? "line-through" : "none",
                    }}
                  >
                    {item.name}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="btn btn-danger ms-2"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      <ProductList />
    </div>
  );
}

export default App;
