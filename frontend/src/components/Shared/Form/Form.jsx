import "./Form.css";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../../state/features/space/spaceSelectors";

function Form({ formInfo, onSubmit, hideForm }) {
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    formInfo.fields.forEach((field) => {
      data[field.name] = e.target[field.name].value;
    });
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="page-mask"></div>
      <form className="form" onSubmit={handleSubmit}>
        <h4 className="form-title">{formInfo.title}</h4>
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
                  defaultValue=""
                >
                  <option value="" disabled>
                    {field.placeholder || "Select a collection"}
                  </option>
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
