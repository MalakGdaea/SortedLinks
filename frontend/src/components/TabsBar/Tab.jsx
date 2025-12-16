import { useContext } from "react";
import { TabContext } from "../../contexts/TabContext";
import "./Tab.css"
import { useState } from "react";
import { useEffect } from "react";

function Tab({ tab }) {
  const { selectedTab, selectTab } = useContext(TabContext);
  const [isActive, setIsActive] = useState(selectedTab?._id === tab._id);

  useEffect(() => {
    setIsActive(selectedTab?._id === tab._id);
  }, [selectedTab, tab._id]);

  const handleClick = (e) => {
    e.preventDefault();
    selectTab(tab);
  };

  return (
    <div className={`tab-container ${isActive ? "active" : ""}`} >
      <img src="folder.svg" />
      <div
        onClick={handleClick}
        className='tab'
      >
        {tab.name}
      </div>
    </div>
  );
}

export default Tab;
