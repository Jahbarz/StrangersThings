import { Link } from "react-router-dom";

export const Navbar = () => {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.replace('/Login');
  };
  return (
    <>
      <Link to="/Login">Login</Link>
      <Link to="/Profile">Profile</Link>
      <Link to="/Posts">Posts</Link>
      <Link to="/Login" onClick={logOut}>
        Logout
      </Link>
    </>
  );
};

export default Navbar;