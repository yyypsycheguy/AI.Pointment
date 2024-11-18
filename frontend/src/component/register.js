/* ths function deals with new patient registration. It takes the patient data and sends it to the server database */
/* import React, { useState } from 'react';

const Register = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value); // Update state when user types
    };

    const handleSubmit = () => {
        alert(`You entered: ${inputValue}`); // Show entered text
    };

    return (
        <div className="input-container">
            <input 
                type="text" 
                placeholder="Enter text here..." 
                value={inputValue} 
                onChange={handleChange} 
                className="text-input"
            />
            <button onClick={handleSubmit} className="submit-button">Submit</button>
        </div>
    );
};

export default Register;*/

/*import React, { useState } from 'react';

function PatientRegistration() {
    const [patientData, setPatientData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        address: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:5000/register-patient", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patientData)
            });
            const result = await response.json();
            if (response.ok) {
                alert(result.message);
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            alert(`Failed to register patient: ${error.message}`);
        }
    };

    return (
        <div>
            <div>First Name:</div>
            <input
                type="text"
                name="first_name"
                placeholder="Enter first name"
                value={patientData.first_name}
                onChange={handleChange}
            />

            <div>Last Name:</div>
            <input
                type="text"
                name="last_name"
                placeholder="Enter last name"
                value={patientData.last_name}
                onChange={handleChange}
            />

            <div>Phone Number:</div>
            <input
                type="text"
                name="phone_number"
                placeholder="Enter number"
                value={patientData.phone_number}
                onChange={handleChange}
            />

            <div>Email Address:</div>
            <input
                type="text"
                name="email"
                placeholder="Enter email"
                value={patientData.email}
                onChange={handleChange}
            />

            <div>Address:</div>
            <input
                type="text"
                name="address"
                placeholder="Enter address"
                value={patientData.address}
                onChange={handleChange}
            />

            <button onClick={handleSubmit}>Patient Registration</button>
        </div>
    );
}

export default PatientRegistration;*/