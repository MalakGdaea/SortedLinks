import './SideBar.css';
import Space from '../Space/Space.jsx';
import Form from '../Shared/Form/Form.jsx';
import { useSelector } from 'react-redux';
import { selectSpaces } from '../../state/features/space/spaceSelectors.js';
import { useFormManager } from '../../hooks/useFormManager.js';
import { ADD_SPACE } from "../../config.js";
import { createPortal } from 'react-dom';

function SideBar() {
    const spaces = useSelector(selectSpaces);
    const { activeFormType, setActiveFormType, currentForm, handleSubmit, closeForm } =
        useFormManager({});

    return (
        <aside id="sideBar" className="sidebar">
            {activeFormType && createPortal(
                <Form
                    formInfo={currentForm.config}
                    onSubmit={handleSubmit}
                    hideForm={() => closeForm()}
                    isLoading={currentForm.loading}
                />, document.body)}
            <div className='tabs-list'>
                {spaces.map((space) => (
                    <Space key={space._id} space={space} />
                ))}
            </div>
            <button className='add-tab-button' onClick={() => setActiveFormType(ADD_SPACE)} >+ New Space</button>
        </aside >
    );
}

export default SideBar;