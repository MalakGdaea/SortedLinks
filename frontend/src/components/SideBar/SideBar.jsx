import './SideBar.css';
import Space from '../Space/Space.jsx';
import Form from '../Shared/Form/Form.jsx';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpaces, createSpace } from '../../state/features/space/spaceThunks.js';
import { selectSpaces } from '../../state/features/space/spaceSelectors.js';
import { SpaceFormInfo } from '../constants/formInfo.js';
import { selectIsLoading } from '../../state/features/space/spaceSelectors.js';

function SideBar() {
    const dispatch = useDispatch();
    const spaces = useSelector(selectSpaces);
    const [showForm, setShowForm] = useState(false);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchSpaces());
    }, [dispatch]);

    const handleSubmit = (data) => {
        dispatch(createSpace(data.name));
        !isLoading && setShowForm(false);
    };

    return (
        <div id="sideBar">
            {showForm && <Form
                formInfo={SpaceFormInfo}
                onSubmit={handleSubmit}
                hideForm={() => setShowForm(false)} />}
            <div className='tabs-list'>
                {spaces.map((space) => (
                    <Space key={space._id} space={space} />
                ))}
            </div>
            <button className='add-tab-button' onClick={() => setShowForm(true)} >+ New Space</button>
        </div>
    );
}

export default SideBar;