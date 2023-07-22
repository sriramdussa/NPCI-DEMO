// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setRegistrationStatus('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });
      console.log(response.data);
      setRegistrationStatus('User registered successfully');
      // Clear the form fields after successful registration
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error('Error during registration:', error.response.data.error);
        setRegistrationStatus(error.response.data.error); // Display the error message to the user
      } else {
        console.error('Error during registration:', error);
      }
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button onClick={handleRegister}>Register</button>
      {registrationStatus && <p>{registrationStatus}</p>}
    </div>
  );
}

export default App;


