import React, {createContext, useMemo, useState} from 'react';

export const AppContext = createContext();

const AppContextProvider = props => {
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState({label: 'All'});
  const [cwallet, setCwallet] = useState('');
  const [preceipt, setPreceipt] = useState({});
  const value = useMemo(
    () => ({
      showModal,
      setShowModal,
      showFilter,
      setShowFilter,
      category,
      setCategory,
      cwallet,
      setCwallet,
      preceipt,
      setPreceipt,
    }),
    [showModal, showFilter, category, cwallet,preceipt],
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
