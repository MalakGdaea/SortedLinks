import './Dashboard.css';
import ApiService from "../../services/ApiService";
import { useEffect, useState, useContext } from "react";
import { TabContext } from "../../contexts/TabContext";
import Content from "./Content";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

function Dashboard() {
  const { selectedTab, selectTab } = useContext(TabContext);
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTabs();
  }, []);

  useEffect(() => {
    if (tabs.length > 0 && !selectedTab) {
      selectTab(tabs[0]);
    }
  }, [tabs, selectedTab, selectTab]);

  const fetchTabs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ApiService.getTabs();
      setTabs(data.data || data);
    } catch (err) {
      setError(err.message || 'Failed to load tabs');
      console.error('Error fetching tabs:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="dashboard">
      <NavBar />
      <div id="content-area">
        <SideBar tabs={tabs} />
        <main id="main-content">
          {selectedTab && (<Content tab={selectedTab} />
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;


