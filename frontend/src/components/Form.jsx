import { useState, useEffect } from 'react';

const Form = ({ title, fields, buttonText, onSubmit, footerContent, backgroundColor }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Inicializa el estado del formulario con los valores de los campos
        const initialData = fields.reduce((acc, field) => ({
            ...acc,
            [field.name]: field.value || ''
        }), {});
        setFormData(initialData);
    }, [fields]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="form" style={{ backgroundColor: backgroundColor }} onSubmit={handleSubmit}>
            <h1>{title}</h1>
            {fields.map((field, index) => (
                <div className="container_inputs" key={index}>
                    {field.label && <label htmlFor={field.name}>{field.label}</label>}
                    {field.type === 'select' ? (
                        <select
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            required={field.required}
                            disabled={field.disabled}
                        >
                            {field.options.map((option, i) => (
                                <option key={i} value={option.value || option}>
                                    {option.label || option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            id={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            type={field.type || "text"}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            required={field.required}
                            disabled={field.disabled}
                        />
                    )}
                </div>
            ))}
            {buttonText && <button type="submit">{buttonText}</button>}
            {footerContent && <div>{footerContent}</div>}
        </form>
    );
};

export default Form;
