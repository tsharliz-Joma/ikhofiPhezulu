import React, {useState, useEffect} from "react";

export const ContextProvider = ({
  getDataFunc = () => {},
  resource,
  children,
}) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getDataFunc();
      setState(data);
    })();
  }, [getDataFunc]);

  console.log(state);

  return (
    <>
      {state !== null &&
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {state: state});
          }
          return child;
        })}
    </>
  );
};
