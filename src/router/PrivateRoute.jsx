import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  console.log('from private route',user); // Debugging to check user data

  if (user && user.email) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
