import React, { useState, useEffect } from 'react';
import "./patientAnalysis.css";
import { Table_patient, Btn, Form } from '../../components';

const PatientAnalysis = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    Name: '',
    Bed_No: '',
    Status: '',
    Gender: '',
    Age: '',
    Admitted: ''
  });

  useEffect(() => {
    fetch("/patients")
      .then(res => res.json())
      .then(data => {
        setData(data.patients);
        console.log(data.patients);
      });
  }, []);

  const patientHeaders = ["ID", "First Name", "Last Name", "Gender", "Email", "Unknown", "Date", "Attending Doctor"];

  const role = "Admin";
  const label = "Add";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/add_patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // Optionally, you can refresh the patient list here
      
    });
  };

  return (
    <div className="patientanalysis">
      <Table_patient data={data} headers={patientHeaders} anotherProp={role} />
      {role === "Admin" ? (
        <div className='addbtn'><Btn data={label} /></div>
      ) : null}
      <Form data={formData} onChange={handleInputChange} onSubmit={handleSubmit} />
    </div>
  );
}

export default PatientAnalysis;
