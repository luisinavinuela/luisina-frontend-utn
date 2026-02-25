const BASE_API = "https://luisina-api-backend-utn.vercel.app";

// --- PRODUCTOS ---

const getProducts = async (token, filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const url = queryParams ? `${BASE_API}/products?${queryParams}` : `${BASE_API}/products`;

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
  });

  return res;
}

const updateProduct = async (editingProduct, updates, token) => {
  const res = await fetch(`${BASE_API}/products/${editingProduct._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(updates)
  });

  return res;
}

const deleteProduct = async (id, token) => {
  const res = await fetch(`${BASE_API}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  });
  return res;
}

// --- AUTENTICACIÓN (Importante para que funcione el registro) ---

const registerUser = async (userData) => {
  const res = await fetch(`${BASE_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });
  return res;
};

const loginUser = async (userData) => {
  const res = await fetch(`${BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });
  return res;
};

export { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  registerUser, 
  loginUser 
};