import React from 'react';

const Form = ({ data, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      {Object.keys(data).map((key, index) => (
        <div key={index}>
          <label>{key}</label>
          <input
            type="text"
            name={key}
            value={data[key]}
            onChange={onChange}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
