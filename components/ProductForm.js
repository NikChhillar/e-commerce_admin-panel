import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm() {
  //

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [goBack, setGoBack] = useState(false);

  async function createProduct(e) {
    e.preventDefault();

    const data = { title, description, price };
    await axios.post("/api/products", data);
    setGoBack(true);
  }

  if (goBack) {
    return router.push("/products");
  }

  return (
    <form onSubmit={createProduct}>
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
