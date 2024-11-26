import { useContext } from "react";
import { DataContext } from "../context/ContextProvider";

export const useData = () => useContext(DataContext);
