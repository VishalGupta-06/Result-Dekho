import { useState } from "react";
import UserContext from "./ContextApi.jsx";

const UserProvider = ({ children }) => {
  const [student, setStudent] = useState([]);
  const [loading , setLoading] = useState(null);
  const [loggedIn , setLoggedIn] = useState(null);
  const [homeInfo , setHomeInfo] = useState("");

  return (
    <UserContext.Provider value={{ student, setStudent , loading , setLoading , loggedIn , setLoggedIn , homeInfo , setHomeInfo}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
