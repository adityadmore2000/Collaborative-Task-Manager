import { BrowserRouter,Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { Protected } from "./components/Protected"
import { AuthProvider } from "./context/AuthContent"

function App() {
  return (
      <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route 
          path="/dashboard" 
          element={
            <Protected>
              <Dashboard/>
              </Protected>
          }
        />

      </Routes>
      </BrowserRouter>
      </AuthProvider>
  )
}

export default App
