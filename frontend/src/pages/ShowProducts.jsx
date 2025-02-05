import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { useState, useEffect } from "react";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Spinner from "../components/spinner";
import axios from "axios";
import { Link } from "react-router-dom";

function ShowProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/products")
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1>Products List</h1>
        <Link to="/products/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">name</th>
              <th className="border border-slate-600 rounded-md">category</th>
              <th className="border border-slate-600 rounded-md">price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {product.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {product.category}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {product.price}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/products/show/${product._id}`}>
                      <BsInfoCircle className="text-2xl text-green-600" />
                    </Link>
                    <Link to={`/products/edit/${product._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/products/delete/${product._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ShowProducts;
