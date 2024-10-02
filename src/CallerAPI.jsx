import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CallerAPI = ({ inputText }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API call with Axios
  useEffect(() => {
    if (inputText) {
      setLoading(true); // Start loading when a new API call is initiated
      axios
        .get(`https://cwbackend-a3332a655e1f.herokuapp.com/claims/analyze?claim=${inputText}&ingredients=salt`) // Attach the input text to the API call
        .then((response) => {
          setData(response.data); // Set API data to state
          setLoading(false); // Stop loading once data is fetched
        })
        .catch((error) => {
          setError(error); // Handle error
          setLoading(false); // Stop loading on error
        });
    }
  }, [inputText]); // Trigger the effect whenever the input text changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>API Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default CallerAPI;