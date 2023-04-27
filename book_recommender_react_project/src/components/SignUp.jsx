import { useEffect, useState } from "react";
import { signUp } from "../utilities";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const result = await signUp(email, password);
    if (result == false) {
      setEmail("");
      setPassword("");
      alert("Invalid credentials");
    } else {
      setEmail("");
      setPassword("");
      alert("Valid signup. Proceed to sign in.");
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={{ alignSelf: "center", width:"60%"}} class="btn btn-secondary" type="submit">Sign Up</button>
    </form>
  );
};
