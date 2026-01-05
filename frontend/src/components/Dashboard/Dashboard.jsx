import './Dashboard.css';
import Content from "./Content";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { useSelector } from 'react-redux';
import { selectCurrentSpace } from '../../state/features/space/spaceSelectors.js';
import { useState } from 'react';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const selectedSpace = useSelector(selectCurrentSpace);

  return (
    <div id="dashboard">
      <NavBar
        onMenuClick={() => setIsSidebarOpen(prev => !prev)}
        isSidebarOpen={isSidebarOpen} />
      <div id="content-area" className={!isSidebarOpen ? 'collapsed' : ''}>
        <SideBar />
        <main id="main-content">
          {selectedSpace && <Content />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;


