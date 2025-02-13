import { React, useEffect, useState } from "react";
import { Plus, Edit2, Package, Search, Filter, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:7000/getproduct");
        setProducts(response.data.Data);
      } catch (error) {
        console.error("Error fetching products from backend:", error);
      }
    };

    fetchProducts();
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Delete function with SweetAlert
  const handleDelete = async (productId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`http://localhost:7000/delete-product/${productId}`);

        if (response.data.success) {
          setProducts(products.filter(product => product._id !== productId));
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          );
        } else {
          throw new Error(response.data.message || "Failed to delete product.");
        }
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire(
        'Error!',
        error.message || "Failed to delete product. Please try again.",
        'error'
      );
      setDeleteError(error.message || "Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="p-4 md:p-6 w-full max-w-6xl mx-auto">
      {/* Rest of the component remains the same */}
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 md:mb-8">
        <Link to="/">
          <button className="border p-2 rounded-full hover:bg-blue-500 hover:text-white w-full sm:w-auto">
            Home
          </button>
        </Link>
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 order-first sm:order-none">
          <Package className="w-5 h-5 md:w-6 md:h-6" />
          Product Management
        </h1>
        <Link to="/form" className="w-full sm:w-auto">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 w-full sm:w-auto">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Product List Section */}
      <div className="bg-white rounded-lg shadow">
        {isMobileView ? (
          // Mobile card view
          <div className="divide-y divide-gray-200">
            {products.map((product) => (
              <div key={product._id} className="p-4">
                <div className="flex flex-col gap-4">
                  <img
                    src={`http://localhost:7000${product.img}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between gap-4">
                    <button className="flex-1 text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1 py-2 border rounded">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 text-red-600 hover:text-red-800 flex items-center justify-center gap-1 py-2 border rounded"
                    >
                      <Trash className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop table view
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Image
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <img
                        src={`http://localhost:7000${product.img}`}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-4">
                        <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                          <Trash className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteError && <p className="text-red-500 mt-4">{deleteError}</p>}
    </div>
  );
};

export default ProductManagement;