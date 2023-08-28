import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PairStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedMorningStudents, setSelectedMorningStudents] = useState([]);
  const [selectedPairProgrammingStudents, setSelectedPairProgrammingStudents] =
    useState([]);
  const [selectedStandUpStudents, setSelectedStandUpStudents] = useState([]);
  const [morningSessionPairs, setMorningSessionPairs] = useState([]);
  const [pairProgrammingPairs, setPairProgrammingPairs] = useState([]);
  const [standUpPairs, setStandUpPairs] = useState([]);

  useEffect(() => {
    // Fetch the student data from the database
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    // Make an API call to fetch the student data from the database
    // Replace this with your own API endpoint
    try {
      const response = await axios.get('http://localhost:5000/api/users/');
      const data = await response.data;
      const filteredStudents = data.filter(
        (student) => student.role === 'Student'
      );
      console.log(filteredStudents);
      setStudents(filteredStudents);
    } catch (err) {
      console.log('Error fetching students:', err.message);
    }
  };

  const handleMorningStudentSelect = (studentName) => {
    const isSelected = selectedMorningStudents.includes(studentName);
    if (isSelected) {
      setSelectedMorningStudents(
        selectedMorningStudents.filter((name) => name !== studentName)
      );
    } else {
      setSelectedMorningStudents([...selectedMorningStudents, studentName]);
    }
  };

  const handlePairProgrammingStudentSelect = (studentName) => {
    const isSelected = selectedPairProgrammingStudents.includes(studentName);
    if (isSelected) {
      setSelectedPairProgrammingStudents(
        selectedPairProgrammingStudents.filter((name) => name !== studentName)
      );
    } else {
      setSelectedPairProgrammingStudents([
        ...selectedPairProgrammingStudents,
        studentName,
      ]);
    }
  };

  const handleStandUpStudentSelect = (studentName) => {
    const isSelected = selectedStandUpStudents.includes(studentName);
    if (isSelected) {
      setSelectedStandUpStudents(
        selectedStandUpStudents.filter((name) => name !== studentName)
      );
    } else {
      setSelectedStandUpStudents([...selectedStandUpStudents, studentName]);
    }
  };

  const handlePairing = () => {
    const shuffledMorningStudents = [...selectedMorningStudents].sort(
      () => Math.random() - 0.5
    );
    const shuffledPairProgrammingStudents = [
      ...selectedPairProgrammingStudents,
    ].sort(() => Math.random() - 0.5);
    const shuffledStandUpStudents = [...selectedStandUpStudents].sort(
      () => Math.random() - 0.5
    );

    const morningSessionPairs = [];
    let currentIndex = 0;

    while (currentIndex < shuffledMorningStudents.length) {
      morningSessionPairs.push(
        shuffledMorningStudents.slice(currentIndex, currentIndex + 3)
      );
      currentIndex += 3;
    }

    const pairProgrammingPairs = [];
    currentIndex = 0;

    while (currentIndex < shuffledPairProgrammingStudents.length) {
      pairProgrammingPairs.push(
        shuffledPairProgrammingStudents.slice(currentIndex, currentIndex + 2)
      );
      currentIndex += 2;
    }

    const standUpPairs = [];
    currentIndex = 0;

    while (currentIndex < shuffledStandUpStudents.length) {
      standUpPairs.push(
        shuffledStandUpStudents.slice(currentIndex, currentIndex + 4)
      );
      currentIndex += 4;
    }

    setMorningSessionPairs(morningSessionPairs);
    setPairProgrammingPairs(pairProgrammingPairs);
    setStandUpPairs(standUpPairs);
  };

  return (
    <div className="pairing">
      <h3 className="text-center">Pair Students</h3>
      <h4>Morning Session:</h4>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedMorningStudents.includes(student.name)}
                onChange={() => handleMorningStudentSelect(student.name)}
              />
              {student.username}
            </label>
          </li>
        ))}
      </ul>

      <h4>Pair Programming:</h4>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedPairProgrammingStudents.includes(student.name)}
                onChange={() =>
                  handlePairProgrammingStudentSelect(student.name)
                }
              />
              {student.username}
            </label>
          </li>
        ))}
      </ul>

      <h4>StandUp:</h4>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedStandUpStudents.includes(student.name)}
                onChange={() => handleStandUpStudentSelect(student.name)}
              />
              {student.username}
            </label>
          </li>
        ))}
      </ul>

      <button className="btn btn-primary btn-pair" onClick={handlePairing}>
        Pair Students
      </button>

      {morningSessionPairs.length > 0 && (
        <div>
          <h4>Morning Session Pairs:</h4>
          <ul>
            {morningSessionPairs.map((pair, index) => (
              <li key={index}>{pair.join(', ')}</li>
            ))}
          </ul>
        </div>
      )}

      {pairProgrammingPairs.length > 0 && (
        <div>
          <h4>Pair Programming Pairs:</h4>
          <ul>
            {pairProgrammingPairs.map((pair, index) => (
              <li key={index}>{pair.join(', ')}</li>
            ))}
          </ul>
        </div>
      )}

      {standUpPairs.length > 0 && (
        <div>
          <h4>StandUp Pairs:</h4>
          <ul>
            {standUpPairs.map((pair, index) => (
              <li key={index}>{pair.join(', ')}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PairStudents;
