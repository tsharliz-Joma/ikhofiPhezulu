import { useState, useEffect } from "react";

export const useUserState = () => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const googleToken = sessionStorage.getItem("googleToken");
    if (token) {
      setValue(token);
    } else if (googleToken) {
      setValue(JSON.parse(googleToken));
    }
  }, []);

  return { value };
};
