import React, { createContext, useState } from 'react';

export const TabContext = createContext();

export const TabProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState(null);

    const selectTab = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <TabContext.Provider value={{ selectedTab, selectTab }}>
            {children}
        </TabContext.Provider>
    );
};
