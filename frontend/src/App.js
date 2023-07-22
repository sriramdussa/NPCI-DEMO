// frontend/src/App.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async() => {
      try{
        const response = await axios.get('http://localhost:4000')
        console.log(response.data)
        setData(response.data)
      } catch(error) {
        console.log("Error fetching data", error)
      }
    };
    fetchData();
      
  }, []);

  return (
    <div>
      {/* <h1>Hello Demo</h1> */}
      <h1>{data}</h1>

    </div>
  );
}

export default App;
