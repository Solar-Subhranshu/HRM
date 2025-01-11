
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

function InvalidDuplicateData() {
  const [duplicateData, setDuplicateData] = useState([]);
  const [invalidData, setInvalidData] = useState([]);

  useEffect(() => {
    // Retrieve data from cookies
    const duplicateDataFromCookies = Cookies.get('duplicateData');
    const invalidDataFromCookies = Cookies.get('invalidData');

    if (duplicateDataFromCookies) {
      setDuplicateData(JSON.parse(duplicateDataFromCookies));
    }

    if (invalidDataFromCookies) {
      setInvalidData(JSON.parse(invalidDataFromCookies));
    }
  }, []);

  return (
    <div>
      <h3>Duplicate Data</h3>
      {duplicateData.length > 0 ? (
        <ul>
          {duplicateData.map((item, index) => (
            <li key={index}>
              {item.employeeCode} - {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No duplicate data found.</p>
      )}

      <h3>Invalid Data</h3>
      {invalidData.length > 0 ? (
        <ul>
          {invalidData.map((item, index) => (
            <li key={index}>
              {item.employeeCode} - {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No invalid data found.</p>
      )}
    </div>
  );
}

export default InvalidDuplicateData;
