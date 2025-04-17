import React, { useState } from 'react';
import axios from 'axios';

const FIELD_COMPONENTS = {
  text: ({ field, value, onChange }) => (
    <input
      type="text"
      className="border p-2 w-full rounded"
      placeholder={field.placeholder || ''}
      required={field.required}
      value={value || ''}
      onChange={(e) => onChange(field.name, e.target.value)}
    />
  ),

  textarea: ({ field, value, onChange }) => (
    <textarea
      className="border p-2 w-full rounded"
      placeholder={field.placeholder || ''}
      required={field.required}
      value={value || ''}
      onChange={(e) => onChange(field.name, e.target.value)}
    />
  ),

  select: ({ field, value, onChange }) => (
    <select
      className="border p-2 w-full rounded"
      required={field.required}
      value={value || ''}
      onChange={(e) => onChange(field.name, e.target.value)}
    >
      <option value="">Select an option</option>
      {field.options.map((option, idx) => (
        <option key={idx} value={option}>{option}</option>
      ))}
    </select>
  ),

  radio: ({ field, value, onChange }) => (
    <div className="flex flex-col gap-2">
      {field.options.map((option, idx) => (
        <label key={idx} className="flex items-center gap-2">
          <input
            type="radio"
            name={field.name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
          {option}
        </label>
      ))}
    </div>
  ),

  checkbox: ({ field, value, onChange }) => (
    <div className="flex flex-col gap-2">
      {field.options.map((option, idx) => (
        <label key={idx} className="flex items-center gap-2">
          <input
            type="checkbox"
            name={field.name}
            value={option}
            checked={value?.includes(option)}
            onChange={(e) => {
              const checked = e.target.checked;
              const newValue = value ? [...value] : [];
              if (checked) {
                newValue.push(option);
              } else {
                const index = newValue.indexOf(option);
                if (index !== -1) newValue.splice(index, 1);
              }
              onChange(field.name, newValue);
            }}
          />
          {option}
        </label>
      ))}
    </div>
  ),
};

export default function DynamicForm({ formId, formSchema }) {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:5000/api/submissions/${formId}`, formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Form submission failed', err);
      alert("Submission failed!");
    }
  };

  if (submitted) {
    return <div className="p-4 text-green-600 font-semibold">Form submitted successfully!</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-2xl font-bold">{formSchema.title}</h2>
      {formSchema.description && <p className="text-gray-600">{formSchema.description}</p>}

      {formSchema.fields.map((field, idx) => {
        const Component = FIELD_COMPONENTS[field.type];
        if (!Component) return null;

        return (
          <div key={idx}>
            <label className="block mb-1 font-medium">{field.label}{field.required && ' *'}</label>
            <Component
              field={field}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        );
      })}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
