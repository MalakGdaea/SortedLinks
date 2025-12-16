import "./TabsBar.css"
import Tab from "./Tab";

function TabsBar({ tabs }) {
  return (
    <div id="tabsBar">
      {tabs.map((tab) => (
        <Tab key={tab._id} tab={tab} />
      ))}
    </div>
  );
}

export default TabsBar;
