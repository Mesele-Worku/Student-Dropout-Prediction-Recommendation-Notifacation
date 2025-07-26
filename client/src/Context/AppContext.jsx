import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState({
    lecture_watch_pct: 0,
    checklist_pct: 0,
    attended_live_class: 0,
    attended_group_discussion: 0,
    qa_participation_pct: 0,
  });
  const [user, setUser] = useState({
    id: "2112",
    email: "meselew2112@gmail.com",
    name: "Mesele Worku",
  });
  const values = {
    result,
    setData,
    setResult,
    data,
    darkMode,
    setDarkMode,
    user,
    setUser,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
