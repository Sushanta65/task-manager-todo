import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  console.log('from private route',user); // Debugging to check user data

  if (loading) {
    return <p>Loading...</p>; // Prevent redirect while loading
  }
  if (user && user.email) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
