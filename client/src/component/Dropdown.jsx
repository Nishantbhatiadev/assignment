import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dropdown = () => {
  const [alphabets, setAlphabets] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [romans, setRomans] = useState([]);

  const [selectedAlpha, setSelectedAlpha] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedRoman, setSelectedRoman] = useState('');

  useEffect(() => {
    axios.get('/api/alphabets')
      .then(res => {
        if (Array.isArray(res.data)) setAlphabets(res.data);
      })
      .catch(err => console.error('Error fetching alphabets:', err));
  }, []);

  useEffect(() => {
    if (selectedAlpha) {
      axios.get(`/api/numbers?alpha=${selectedAlpha}`)
        .then(res => {
          if (Array.isArray(res.data)) setNumbers(res.data);
          setSelectedNumber('');
          setRomans([]);
          setSelectedRoman('');
        })
        .catch(err => console.error('Error fetching numbers:', err));
    }
  }, [selectedAlpha]);

  useEffect(() => {
    if (selectedNumber) {
      axios.get(`/api/romans?number=${selectedNumber}`)
        .then(res => {
          if (Array.isArray(res.data)) setRomans(res.data);
          setSelectedRoman('');
        })
        .catch(err => console.error('Error fetching romans:', err));
    }
  }, [selectedNumber]);

  return (
    <div>
      <h1>Dropdowns</h1>

      {/* Dropdown 1: Alphabets */}
      <select
        value={selectedAlpha}
        onChange={(e) => setSelectedAlpha(e.target.value)}
      >
        <option value="">Select Alphabet</option>
        {alphabets.map((e, index) => (
          <option key={index} value={e}>{e}</option>
        ))}
      </select>

      {/* Dropdown 2: Numbers */}
      <select
        value={selectedNumber}
        onChange={(e) => setSelectedNumber(e.target.value)}
        // disabled={!selectedAlpha}
      >
        <option value="">Select Number</option>
        {numbers.map((n, index) => (
          <option key={index} value={n}>{n}</option>
        ))}
      </select>

      {/* Dropdown 3: Romans */}
      <select
        value={selectedRoman}
        onChange={(e) => setSelectedRoman(e.target.value)}
        // disabled={!selectedNumber}
      >
        <option value="">Select Roman</option>
        {romans.map((r, index) => (
          <option key={index} value={r}>{r}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
