import Dashboard from '../components/Dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import { fetchCollections } from '../state/features/collection/collectionThunks.js';
import { useEffect } from 'react';
import { fetchLinks } from '../state/features/link/linkThunks.js';
import { fetchSpaces } from '../state/features/space/spaceThunks.js';

const HomePage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSpaces());
        dispatch(fetchCollections());
        dispatch(fetchLinks());
    }, [dispatch]);

    return <Dashboard />;
};

export default HomePage;
