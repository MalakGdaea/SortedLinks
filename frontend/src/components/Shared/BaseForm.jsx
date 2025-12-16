import { useState } from "react";
import "../ActionsBar/Form.css";

function BaseForm({ title, fields = [], initialValues = {}, onSubmit, onCancel, submitLabel = "Submit" }) {
    const [values, setValues] = useState(() => ({ ...initialValues }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
    };

    const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        onSubmit(values);
    };

    return (
        <div className="form-container">
            <div className="form">
                <h4>{title}</h4>
                <hr />
                <form className="input-fields" onSubmit={handleSubmit}>
                    {fields.map((f) => (
                        <div className="input" key={f.name}>
                            <span className="input-label">{f.label}</span>
                            {f.type === "textarea" ? (
                                <textarea name={f.name} placeholder={f.placeholder || ""} value={values[f.name] || ""} onChange={handleChange}></textarea>
                            ) : (
                                <input name={f.name} type={f.type || "text"} className="add-input" placeholder={f.placeholder || ""} value={values[f.name] || ""} onChange={handleChange} />
                            )}
                        </div>
                    ))}
                    <div className="options-button">
                        <button type="submit">{submitLabel}</button>
                        <button type="button" onClick={() => (onCancel ? onCancel() : null)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BaseForm;
