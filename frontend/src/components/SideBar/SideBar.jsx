import Tab from '../TabsBar/Tab';
import './SideBar.css'
import { ADD_Space } from '../../config';
import { useState } from 'react';
import Form from '../ActionsBar/Form';

function SideBar({ tabs }) {
    const [showForm, setShowForm] = useState(false);
    return (
        <div id="sideBar">
            {showForm && <Form formName={ADD_Space} hideForm={() => setShowForm(false)} />}
            <div>
                <img src='' />
            </div>
            <div className='tabs-list'>
                {tabs.map((tab) => (
                    <Tab key={tab._id} tab={tab} />
                ))}
            </div>
            <button className='add-tab-button' onClick={() => setShowForm(true)} >+ New Space</button>
        </div>
    );
}

export default SideBar;