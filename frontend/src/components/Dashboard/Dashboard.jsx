import './Dashboard.css';
import Content from "./Content";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { useSelector } from 'react-redux';
import { selectCurrentSpace } from '../../state/features/space/spaceSelectors.js';
import { useDispatch } from 'react-redux';
import { fetchCollections } from '../../state/features/collection/collectionThunks.js';
import { useEffect } from 'react';
import { fetchLinks } from '../../state/features/link/linkThunks.js';
import { fetchSpaces } from '../../state/features/space/spaceThunks.js';
import { useState } from 'react';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const selectedSpace = useSelector(selectCurrentSpace);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpaces());
    dispatch(fetchCollections());
    dispatch(fetchLinks());
  }, [dispatch]);

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


