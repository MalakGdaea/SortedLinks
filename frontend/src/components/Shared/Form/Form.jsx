import "./Form.css";
import { useState } from "react";

function Form({ formInfo, onSubmit, hideForm, isLoading, initialValues = {} }) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const data = {};
    formInfo.fields.forEach((field) => {
      data[field.name] = e.target[field.name].value;
    });
    try {
      await onSubmit(data);
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Something went wrong";
      setErrorMessage(message);
    }
  };

  return (
    <div className="form-container">
      <div className="page-mask"></div>
      <form className="form" onSubmit={handleSubmit}>
        <h4 className="form-title">{formInfo.title}</h4>
        {errorMessage && (
          <div className="form-error-banner">
            {errorMessage}
          </div>
        )}
        <div className="form-inputs">
          {formInfo.fields.map((field) => {
            // 1. Handle Select Dropdowns
            if (field.type === "select") {
              return (
                <select
                  key={field.name}
                  className="add-input"
                  name={field.name}
                  required={field.required || false}
                  disabled={isLoading}
                  defaultValue={initialValues[field.name] || ""}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              );
            }

            // 2. Handle Textareas
            if (field.type === "textarea") {
              return (
                <textarea
                  key={field.name}
                  className="add-input"
                  name={field.name}
                  required={field.required || false}
                  rows={5}
                  placeholder={field.placeholder}
                  disabled={isLoading}
                  defaultValue={initialValues[field.name] || ""}
                />
              );
            }

            // 3. Handle Default Inputs (text, password, etc.)
            return (
              <input
                key={field.name}
                className="add-input"
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required || false}
                disabled={isLoading}
                defaultValue={initialValues[field.name] || ""}
              />
            );
          })}
        </div>
        <div className="options-button">
          <button onClick={() => hideForm()} className="cancel-btn">Cancel</button>
          <button className="create-button" type="submit">
            {isLoading ? "Submitting..." : formInfo.submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
