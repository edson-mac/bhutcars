import React, { useState } from "react";

export const mainContext = React.createContext({});

export const Provider = (props) => {

    const [carList, setCarList] = useState([]);

  return (
    <mainContext.Provider value={
      {
        carList, setCarList
      }}>
      {props.children}
    </mainContext.Provider>
  );
};

export const useProvider = () => React.useContext(mainContext);