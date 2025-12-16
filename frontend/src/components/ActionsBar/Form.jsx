import { useState } from "react";
import { ADD_Space, ADD_Collection, DELETE_Space } from "../../config";
import ApiService from "../../services/ApiService";
import "./Form.css";
import { useNavigate } from "react-router-dom";
function Form({ formName, hideForm }) {
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();

  const handelButtonClick = () => {
    if (formName === ADD_Space) {
      ApiService.createTab(inputVal);
    } else if (formName === ADD_Collection) {
      ApiService.createCategory(inputVal);
    } else if (formName === DELETE_Space) {
      ApiService.deleteTab(inputVal);
      navigate("/");
    }
    hideForm();
  };

  const updateInput = (event) => {
    setInputVal(event.target.value);
  };
  return (
    <div className="form-container">
      <div className="page-mask"></div>
      <div className="form">
        <h4 className="form-title">{formName}</h4>
        <input value={inputVal} placeholder="Name" type="text" className="add-input" onChange={updateInput}></input>
        <div className="options-button">
          <button onClick={() => hideForm()}>Cancel</button>
          <button className="create-button" onClick={() => { handelButtonClick() }}>{formName.split(" ")[0]}</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
