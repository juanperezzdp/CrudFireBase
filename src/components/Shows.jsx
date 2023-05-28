import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import Swal from "sweetalert2";

function Shows() {
  const [products, setProducts] = useState([]);

  const productsCollection = collection(db, "products");

  const getProducts = async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Estas Seguro?",
      text: "Estas seguro de que quierer eliminar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire("Eliminado!", "Eliminaste el producto.", "éxito");
      }
    });
  };

  return (
    <>
      <div className="container ">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <Link to="/create" className="btn btn-secondary mt-3 mb-5 ">
                Crear nuevo producto
              </Link>
            </div>

            <table className="table table-bordered table-info table-hover table table-sm">
              <thead>
                <tr>
                  <th>Descricion</th>
                  <th>Stock</th>
                  <th>Accion</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.description.toString()}</td>
                    <td>{product.stock.toString()}</td>
                    <td>
                      <Link
                        to={`/edit/${product.id}`}
                        className="btn btn-primary m-1"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                        editar
                      </Link>
                      <button
                        className="btn btn-danger  m-1"
                        onClick={() => {
                          confirmDelete(product.id);
                        }}
                      >
                        <i className="fa-solid fa-trash "></i>
                        eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shows;
