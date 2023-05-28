import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import "bootstrap/dist/css/bootstrap.css";

function create() {
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();

  const productsCollection = collection(db, "products");
  const store = async (e) => {
    e.preventDefault();
    await addDoc(productsCollection, {
      description: description,
      stock: stock,
    });
    navigate("/");
  };
  return (
    <div className="container">
      <div className="row mt-3">
        <h1>Crear Productos</h1>
        <div className="col">
          <form onSubmit={store}>
            <div className="mb-3 col-5">
              <input
                placeholder="Agregar productos"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="form-control"
                type="text"
              />
            </div>

            <div className="mb-3 col-5">
              <input
                placeholder="Agregar al stock"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                className="form-control"
                type="number"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default create;
