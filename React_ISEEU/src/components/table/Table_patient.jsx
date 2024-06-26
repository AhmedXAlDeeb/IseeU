import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./table.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState,useMemo } from 'react';
import { Table, Form, InputGroup, Button,Border } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Checkbox from "../checkbox/Checkbox"; // if you use component in component you must import the full path not what the export only in index js
import DelButton from '../delButton/DelButton';
import { TbReportMedical } from "react-icons/tb";
import {Report} from '../../pages';
const Table_Patient = (props) => {
  //const  data  = props.data;
  const { data, headers,flag,onDataChange,ischecktable,showSearch,idx_checked,buttonpic,check_rep } = props
  //idx checked is the index of the word checked in the table 
  const navigate = useNavigate();

  console.log(data[0])
  const wordsToColor = {
    "#3D9973": ['done'],
    "#4381C1": ['male','pending'],
    "#FE688C": ['female'],
    "#FE5755":["now"]
    
  };
  let role= props.anotherProp||"user";
  // console.log(role)
  //const flag=true;
 
  const highlightText = (text) => { /**function to highlight words that i specify */
  
    if (typeof text !== 'string') return text;
    return text.split(' ').map((word, index) => {
      let coloredWord = word;
      Object.entries(wordsToColor).forEach(([color, words]) => {
        if (words.includes(word.toLowerCase())) {
          coloredWord = <span key={index} style={{ color }}>{word}</span>;
        }
      });
      return <>{coloredWord }</>
    });
  };
// for check box tables:
//here i change the data if i check on the box to determine if the box is checked or not.
const handleCheckboxChange = (index,flag=false) => {
 if( check_rep && flag===true || check_rep===undefined){
  const newData = [...data];
  newData[index][idx_checked] = newData[index][idx_checked] === 'unchecked' ? 'checked' : 'unchecked';// here if box is checked and you click toggle the state and change the data
  onDataChange(newData);}

}; 

  // Get the keys from the first object in the data array to generate the table headers 
  const columns = Object.keys(data[0]);
  // to undertsand what i will do 
  let row1=(data[0]);
  // console.log(columns)
  // console.log(row1)
  // console.log(row1["id"])// as it was an two dimensional array
  // console.log(data[0]["id"])// like ths in js will be in mapping each row in data and mapping each column in it 
// here is the search and filter 
const [searchTerm, setSearchTerm] = useState('');

const handleSearch = (event) => {
  setSearchTerm(event.target.value.toLowerCase());
};   // here the handle search make the search insensitve

const filteredData = data.filter((item) => // filter add this to the list of filtered data if there is match " return true"
  // item is the rows"objec" in the data {id:65,email:"ddnfj"} as the data is  list of object
  Object.values(item).some( // .values return the values of this object and .some iterate in each val in values
    (val) => {if (typeof val === "string") {
      return val.toLowerCase().includes(searchTerm);
    } else if (typeof val === "number") {
      return val.toString().includes(searchTerm);
    } //  this is boolen expression based on includes
} )
); //the filter data is the only the rows that match the serch term in the whole data

const[searchInput,setSearchInput]=useState(false)
function toggle_search(){
   if (searchInput){
  setSearchInput(false)
 }
 else{
  setSearchInput(true)
 }
}
const handleEdit = (rowIndex) => { /**here we should go to admit git the patient id snd go  */
  console.log(`Edit button clicked for row ${rowIndex}`);
  
};

const handleDelete = (rowIndex) => {
  let newData = data.filter((_, index) => index !== rowIndex);
  
  if (newData.length === 0){
    newData = [[],];
    onDataChange(newData);
  }
  else {
    onDataChange(newData);
  }
};
 const  handle_pic_click=(idx)=>{
  const bed= data[idx][buttonpic];
  navigate("/PatientProfile", { state: bed });
 }
 const [showReportModal, setShowReportModal] = useState(false); 

 const [bedRep, setBedRep] = useState(null);
 const [idxRepRow, setIdxRepRow] = useState(null);
 const handle_rep_btn=(idx)=>{
setShowReportModal(true)
const  bed_rep = data[idx][check_rep];
console.log("the row index"+idx)
console.log("the bed number in doc in fun "+bed_rep)
setBedRep(bed_rep);
setIdxRepRow(idx)
 } 


 console.log("the bed in doc out fun"+bedRep)

  return (
    <div  className='tableComponent'>
      <div className="container-fluid">
        
      {showSearch && (
          <>
            <FaSearch className="fasearch" onClick={toggle_search} />
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
          </>
        )}

           
        <div className="table-responsive ">  
        <div rounded border>
          <Table className="table-rounded"   >
             <thead className="thead-fixed">
              <tr className='table-header'>
              {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
              {role === "Admin" && (
                        <>
                            <th className='lastchild'>Action </th>
                            <th className='lastchild'>   </th>
                        </>
                    )}
              </tr>
            </thead>
            <tbody>           

            {filteredData.map((row, rowIndex) => ( //if it contain image it mix the first and second values and slice them and doing the filter as usual else do the usual
    <tr key={rowIndex}>
      {ischecktable?(// here i checked if this table is check table i write it in the map function to be repeatable for all 
 <td>


  
 <Checkbox /**here i show the check box in the first */
   checked={row[idx_checked] === 'checked'}
   onChange={() => handleCheckboxChange(rowIndex)}
 />
</td>


      )
      :(null) 

      }
        {flag === true ? (/**means it contains image */

            <>
                <td key={`${rowIndex}`}>
                {buttonpic ? (<>
          <button className='table_btn_img' onClick={() => handle_pic_click(rowIndex)}>
                    <img src={row[0]} alt="Image" className='table_img' />
                  </button>
                   {"  "}
                   {row[1]}</>
                ) : (
                  <>
                    <img src={row[0]} alt="Image" className='table_img' />
                    {" "}
                    {row[1]}
          </>
        )}
                </td>
                {row.slice(2).map((val, index) => (
               
               val !== 'checked' && val !== 'unchecked' && ( /**here i dont want the value of checked to appeat if you want it to appear remove ! */
                <td key={`${rowIndex}-${index}`}>
                {highlightText(val)}
                     
                </td>
              )
              ))}
            </>
        ) : (
            <>  
                {row.map((val, index) => (/**here it doesnt conatin images so i show the data as usual  */
                 val !== 'checked' && val !== 'unchecked' && ( /**here i dont want the value of checked to appeat if you want it to appear remove ! */
                  <td key={`${rowIndex}-${index}`}> 
                
                {highlightText(val)}
                  </td>
                )
                ))}
            </>
        )}
       {role === "Admin" && (
                      <>
                        <td className='lastchild'>
                          <div className='role_action_component'>
                            <button className='editbtn' onClick={() => handleEdit(rowIndex)}>Edit</button>
                          </div>
                        </td>
                        <td className='lastchild'>
                          <div className='role_action_component'>
                            <button className='delete' onClick={() => handleDelete(rowIndex)}>  <FontAwesomeIcon icon={faTrash} className="fa-trash" /></button>
                          </div>
                        </td>
                      </>
                    )}
                    {check_rep&&(<>
                      <td className='lastchild'>
                          <div className='add_rep_component'>
                            <button  className='rep_icon' onClick={()=> handle_rep_btn(rowIndex)}> <TbReportMedical /></button>
                          </div>
                        </td>
                    
                    </>)}
    </tr>
))}

            </tbody>
          </Table>
            







        </div>
      </div>
    </div>
    {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <Report data={ bedRep} closeModal={() => setShowReportModal(false)} submitModal={() => handleCheckboxChange(idxRepRow,true)} />
          </div>
        </div>
      )}
    
    </div>
  );
};

export default Table_Patient;
