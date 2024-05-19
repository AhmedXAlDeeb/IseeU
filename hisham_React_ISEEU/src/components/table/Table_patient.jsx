import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./table.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaSearch } from 'react-icons/fa';
import { Table } from 'react-bootstrap';

const Table_patient = (props) => {
  const { data, headers } = props;
  const role = props.anotherProp || "User";

  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const toggleSearch = () => {
    setSearchInput(!searchInput);
  };

  const filteredData = data.filter((item) =>
    item.some((val) => {
      if (typeof val === "string") {
        return val.toLowerCase().includes(searchTerm);
      } else if (typeof val === "number") {
        return val.toString().includes(searchTerm);
      }
      return false;
    })
  );

  return (
    <div className='tableComponent'>
      <div className="container">
        <FaSearch className="fasearch" onClick={toggleSearch} />
        {searchInput && (
          <div className='input'>
            <input
              className='bar-input'
              type="text"
              placeholder='Search...'
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>
        )}
        <div className="table-responsive">
          <div className="rounded border">
            <Table className="table-rounded">
              <thead className="thead-fixed">
                <tr className='table-header'>
                  {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                  {role === "Admin" && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((val, index) => (
                      <td key={`${rowIndex}-${index}`}>{val}</td>
                    ))}
                    {role === "Admin" && (
                      <td>
                        <div className='role_action_component'>
                          <button className='editbtn'>Edit</button>
                          <button className='del'>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table_patient;
