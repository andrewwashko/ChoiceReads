import {  useContext, useState } from "react";
import { signIn } from "../utilities";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  // handles invalid credentials 
  const handleSignIn = async (e) => {
    e.preventDefault();

    const result = await signIn(email, password, setUser);

    if (result == false) {
      setEmail("");
      setPassword("");
      alert("Invalid credentials");
    } else {
      navigate("/main/");
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="Sign In" />
    </form>
  );
};
