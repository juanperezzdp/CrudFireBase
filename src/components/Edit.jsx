import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

function Edit() {
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const product = doc(db, "products", id);
    const data = { description: description, stock: stock };
    await updateDoc(product, data);
    navigate("/");
  };

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "products", id));
    if (product.exists()) {
      const { description, stock } = product.data();
      setDescription(description);
      setStock(stock);
    } else {
      alert("Producto no existe");
    }
  };

  useEffect(() => {
    getProductById(id);
  }, []);

  return (
    <div className="container">
      <div className="row mt-3">
        <h1>Edictar Productos</h1>
        <div className="col mt-5">
          <form onSubmit={update}>
            <div className="mb-3 col-5">
              <input
                placeholder="Agregar productos"
                onChange={(e) => setDescription(e.target.value)}
                value={description.toString()}
                className="form-control "
                type="text"
              />
            </div>

            <div className="mb-3 col-5">
              <input
                placeholder="Agregar al stock"
                onChange={(e) => setStock(Number(e.target.value))}
                value={stock.toString()}
                className="form-control"
                type="number"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
