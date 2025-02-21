import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  console.log('from private route',user);

  if (loading) {
    return <Loading />;
  }
  if (user && user.email) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
