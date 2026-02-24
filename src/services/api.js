const BASE_API = import.meta.env.VITE_API_URL || "https://luisina-api-backend-utn.vercel.app";

const getProducts = async (token, filters = {}) => {
  let url = `${BASE_API}/products`;

  const queryParams = new URLSearchParams(filters).toString();

  if (queryParams) {
    url += `?${queryParams}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  });

  return res;
}

const createProduct = async (productData, token) => {
  const res = await fetch(`${BASE_API}/products`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productData)
  })

  return res
}

const updateProduct = async (editingProduct, updates, token) => {
  const res = await fetch(`${BASE_API}/products/${editingProduct._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(updates)
  })

  return res
}

const deleteProduct = async (id, token) => {
  const res = await fetch(`${BASE_API}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  })
  return res
}

export { getProducts, createProduct, updateProduct, deleteProduct }