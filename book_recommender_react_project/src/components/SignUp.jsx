import { useEffect, useState } from "react";
import { signUp } from "../utilities";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => [
        e.preventDefault(),
        signUp(email, password),
        setEmail(""),
        setPassword(""),
      ]}
      style={{ display: "flex", flexDirection: "column" }}
    >
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
      <input type="submit" value="sign Up" />
    </form>
  );
};
