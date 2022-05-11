import { useContext } from "react";

import AuthContext from "../contexts/authContext";

const Index = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <h1>Hola</h1>
      <p>{JSON.stringify(auth.user)}</p>
    </>
  );
};

export default Index;
