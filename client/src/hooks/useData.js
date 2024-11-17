import { useContext } from "react";
import { DataContext } from "../Context/ContextProvider";

export const useData = () => useContext(DataContext);


