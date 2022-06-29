import React, {createContext, useMemo, useState} from 'react';

export const AppContext = createContext();

const AppContextProvider = props => {
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState(null);
  const value = useMemo(
    () => ({
      showModal,
      setShowModal,
      showFilter,
      setShowFilter,
      category,
      setCategory,
    }),
    [showModal, showFilter,category],
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
