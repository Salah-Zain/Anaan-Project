import React, { useState, useEffect } from "react";
import { Plus, Edit2, Package, Search, Filter, Trash, X } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    img: null,
    imglink: "",
    imgPreview: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    return () => {
      if (editFormData.imgPreview) {
        URL.revokeObjectURL(editFormData.imgPreview);
      }
    };
  }, [editFormData.imgPreview]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/getproduct");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditFormData({
      name: product.name,
      price: product.price,
      img: null,
      imglink: product.imglink,
      imgPreview: null,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setEditFormData((prev) => ({
        ...prev,
        img: files[0],
        imgPreview: imageUrl,
      }));
    } else {
      setEditFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", editFormData.name);
    formData.append("price", editFormData.price);
    if (editFormData.img) {
      formData.append("img", editFormData.img);
    }

    try {
      await axios.put(`/updateproduct/${selectedProduct._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchProducts();
      setIsEditModalOpen(false);
      setSelectedProduct(null);
      setEditFormData({
        name: "",
        price: "",
        img: null,
        imglink: "",
        imgPreview: null,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    setIsLoading(true);
    setError(null);

    try {
      await axios.delete(`/deleteproduct/${productToDelete._id}`);
      await fetchProducts();
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderEditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Product</h2>
          <button
            onClick={() => {
              setIsEditModalOpen(false);
              setSelectedProduct(null);
              setError(null);
              if (editFormData.imgPreview) {
                URL.revokeObjectURL(editFormData.imgPreview);
              }
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleEditFormChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={editFormData.price}
              onChange={handleEditFormChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              name="img"
              onChange={handleEditFormChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
            />

            {(editFormData.imgPreview || editFormData.imglink) && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {editFormData.imgPreview
                    ? "New image preview:"
                    : "Current image:"}
                </p>
                <img
                  src={
                    editFormData.imgPreview ||
                    `http://localhost:7000/public/${editFormData.img}`
                  }
                  alt="Product preview"
                  className="mt-1 w-32 h-32 object-cover rounded"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedProduct(null);
                setError(null);
                if (editFormData.imgPreview) {
                  URL.revokeObjectURL(editFormData.imgPreview);
                }
              }}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderDeleteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Confirm Delete</h2>
          <p className="mt-2 text-gray-600">
            Are you sure you want to delete {productToDelete?.name}? This action
            cannot be undone.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              setIsDeleteModalOpen(false);
              setProductToDelete(null);
              setError(null);
            }}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link to="/login">
          <button className="border p-2 rounded-full hover:bg-blue-500 hover:text-white">
            Sign out
          </button>
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Package className="w-6 h-6" />
          Product Management
        </h1>
        <Link to="/admin/addform">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {error && !isEditModalOpen && !isDeleteModalOpen && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {isLoading && !isEditModalOpen && !isDeleteModalOpen && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
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
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  {isLoading ? "Loading products..." : "No products found"}
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    $
                    {typeof product.price === "number"
                      ? product.price.toFixed(2)
                      : product.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <img
                      src={`http://localhost:7000/public/${product.imglink}`}
                      alt={product.name}
                      className="w-56 h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        disabled={isLoading}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                        disabled={isLoading}
                      >
                        <Trash className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && renderEditModal()}
      {isDeleteModalOpen && renderDeleteModal()}
    </div>
  );
};

export default ProductManagement;
