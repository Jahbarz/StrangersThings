import { useState } from "react";
import { useHistory } from "react-router-dom";

const cohortName = "2303-ftb-et-web-pt";
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username);
    registerUser();
    setUsername("");
    setPassword("");
    console.log(password);
    history.push('/Login');
  };

  const registerUser = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          },
        }),
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="container">
      <div id="navbar">Sign Up</div>
      <form onSubmit={handleSubmit}>
        <h1>Create Username</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleChange}
        ></input>
        <h2>Create Password</h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Register;
