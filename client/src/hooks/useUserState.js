import { useState, useEffect } from "react";
import { getLocalStorageData } from "../Context/ContextProvider";

export const useUserState = () => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const googleToken = localStorage.getItem("googleToken");
    if (token) {
      setValue(token);
    } else if (googleToken) {
      setValue(JSON.parse(googleToken));
    }
  }, []);

  return { value };
};
