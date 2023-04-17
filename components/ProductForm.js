import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDesc,
  price: existingPrice,
}) {
  //

  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDesc || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goBack, setGoBack] = useState(false);

  async function saveProduct(e) {
    e.preventDefault();
    const data = { title, description, price };

    if (_id) {
      //update the product

      await axios.put("/api/products", { ...data, _id });
    } else {
      // create the product
      await axios.post("/api/products", data);
    }

    setGoBack(true);
  }

  if (goBack) {
    return router.push("/products");
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder="descrpition"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price (in INR)</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
