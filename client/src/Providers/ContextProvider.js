import React, { useState, useEffect } from "react";

export const ContextProvider = ({ getDataFunc = () => {}, resource, children }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataFunc();
      setState(data);
    };
    fetchData();
  }, [getDataFunc]);

  // console.log(state);

  return (
    <>
      {state &&
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // return React.cloneElement(child, { state: state });
          }
          // return child;
        })}
    </>
  );
};
