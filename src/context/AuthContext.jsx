import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

const BASE_API = "https://luisina-api-backend-utn.vercel.app/auth"


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("Luisina")
  const [token, setToken] = useState(localStorage.getItem("token") || null)

  useEffect(() => {
    localStorage.getItem("token")
  })

  const authContextLogin = async (credentials) => {
    const res = await fetch(`${BASE_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (res.ok) {
      const json = await res.json()
      localStorage.setItem("token", json.data)
      setToken(json.data)
      return true
    }

    return false
  }

  const authContextRegister = async (userData) => {
    const res = await fetch(`${BASE_API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })

    return res
  }

  const authContextLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, setUser, authContextLogin, authContextRegister, authContextLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook
const useAuth = () => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }