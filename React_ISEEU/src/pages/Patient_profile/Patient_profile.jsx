import React, { useState, useMemo,useEffect } from 'react';
import "./patient_profile.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Table_patients,Btn,EmerBtn} from '../../components';
import { useLocation } from 'react-router-dom';
import {Report} from '../../pages';

import axios from 'axios'

const Patient_profile = () => {
  const location = useLocation();
  const bedNo=location.state; /**you should make all the data of the patient having this bed no */
  console.log('bedid',bedNo);
  const patient=["download_(5).jfif","Miguel O’Hara","15A","5 days ",20,158,60]
  const intial_medication=[["Devil Breath ","5  /day","5 weeks","500gm","unchecked"],["Devil Breath ","5  /day","5 weeks","500gm","unchecked"],
  ["Devil Breath ","5  /day","5 weeks","500gm","unchecked"],["Devil Breath ","5  /day","5 weeks","500gm","unchecked"],
  ["Devil Breath ","5  /day","5 weeks","500gm","unchecked"],["Devil Breath ","5  /day","5 weeks","500gm","unchecked"]]
  const [medication,setmedication]=useState(intial_medication);
  const tests=[["cbc","22-4-2024","Done"],["DB","10-2-2024","pending"],["cbc","25-3-2024","Done"],["DB","2-4-2024","pending"]];
  const scans=[["chest","22-4-2024","Done"],["Brain _MRI","10-2-2024","pending"],["X_Ray","25-3-2024","Done"],["Leg_X_Ray","2-4-2024","pending"]];
  const reports=[["22-4-2024","Dr.Enjy Ashraf"],["2-5-2024","Dr. Otto Octavious"],["10-6-2024","Dr. Norman Osborn"],
  ["22-4-2024","Dr.Enjy Ashraf"],["2-5-2024","Dr. Otto Octavious"],["10-6-2024","Dr. Norman Osborn"],]
  const chronicDisease=[   'Hypertension',
    'Type 2 Diabetes',
    'Asthma',
    'Arthritis',
   ];
  const habits=["smoker","player"];
  const current_staff=[["download.jfif","DR Enjy Ashraf"],["download.jfif","Nurse. Enjy Ashraf"],["download.jfif","Dr mohamed"]]
  const prev_staff=[["download.jfif","DR Enjy Ashraf"],["download.jfif","Nurse. Enjy Ashraf"],["download.jfif","Dr mohamed"]]
  const handleMedicationChange = (newData) => { // here i change the data of the patient if checked or not " toggle first value"
    setmedication(newData);
  };
  const medication_header=[" ","Name ","Freqency ","Duration ","Dose"]
  const tests_header=["Test","Date","Status"];
  const scans_header=["Scan","Date","Status"];
  const reports_header=["Date","Doctor"]
  const role="Doctor";
  const flag=false;
  const navigate = useNavigate();
  const handle_update_Click=()=>{
console.log("clicked on update")

  }

  function getDate() { /**function to get the time and date */
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Africa/Cairo" // Set the time zone to Egypt (Africa/Cairo)
    };
  
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const now = new Date(); // Get the current date and time dynamically
    const formattedTime = formatter.format(now);
  
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const date = now.getDate();
  
    return `${formattedTime} ${date}/${month}/${year}`;

  }
  const handle_discharge_Click=()=>{
    console.log("clicked on discharge")
    const user =JSON.parse(localStorage.getItem('user'))
    console.log(user.nid)
    const now = new Date();
    const body = {
      doctor_id: user.nid,
      BID: bedNo,
      currentTime: now
    };

    axios.post('http://localhost:5000/doctor/discharge', body, {
      headers: {      
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      
      // console.log(response.data.user.role);
      console.log(response.data.message)
      if (response.data.message === "discharged successfully") {
        // Redirect to another route, e.g., /dashboard
        alert(response.data.message)
  }}
)
.catch(error => {
  console.log(error);
});
  }
   /**intillay the report modal is false untill i click on the add report button */
   const [showReportModal, setShowReportModal] = useState(false);
  const handle_add_Report=()=>{
    setShowReportModal(true);
    };

    const onSubmit = (data) => {
      const user =localStorage.getItem('user')
      const body = {
        doctor_id: user.nid,
        BID: data.password,
        currentTime: getDate()
      };
  
      axios.post('http://localhost:5000/doctor/discharge', body, {
        headers: {      
          'Content-Type': 'application/json'
        }
      })
    }
  

    useEffect(  
      ()=>{
          const fetchData = async () => {
              const body = {
                BID : bedNo
              }
              // Perform the axios GET request
              const response = await axios.post('http://localhost:5000/PatientProfile', body,{
                      headers: { 'Content-Type': 'application/json' }
                    })                  
                 
    
              const responseData = response.data
              console.log("....................",responseData)
    
      
        }
      
          // Call the async function to fetch data
        fetchData();
    
      },[])
    


 
  return (
    <div className='pprofile container-fluid '> 
 
    <div className='row'>
      
      <div className=' col-3' >
        <div className='left_pside'>
        <img  src ={patient[0]}alt='image'  />
       <h1>{patient[1]}</h1>
       <h5>Bed No.</h5>
       <h2>{patient[2]}</h2>
       <h5>Admitted </h5>
       <h2>{patient[3]+"ago"}</h2>
       <h5>Age </h5>
       <h2>{patient[4]+" years"}</h2>
       <h5>Height</h5>
       <h2>{patient[5]+" cm"}</h2>
       <h5>Weight</h5>
       <h2>{patient[6]+" Kg"}</h2>
       <a href='show_more'>show more</a>
       </div>
       {role.toLowerCase()==="doctor"&&(
        <div onClick={handle_discharge_Click}>
       <EmerBtn label={"Disharge"} onclick={handle_discharge_Click} className="piegebtn"/>
        </div>
       )}
      </div>
      <div className='col-7'>
        <div className='pprofile_medication'>
          <h5>Medication</h5>
      <Table_patients 
         data={medication}
         headers={medication_header}
         flag={flag}
         anotherProp={role}
         onDataChange={handleMedicationChange}
         ischecktable={true}
         showSearch={false}
         idx_checked ={4}
        />
</div>
<div className='flow_row'>
<div className='pprofile_tests'>
<h5>Tests</h5>
      <Table_patients 
         data={tests}
         headers={tests_header}
         flag={flag}
         anotherProp={role}
         ischecktable={false}
         showSearch={true}
      
        />
</div>
<div className='pprofile_scans'>
<h5>Scans</h5>
      <Table_patients 
         data={scans}
         headers={scans_header}
         flag={flag}
         anotherProp={role}
         ischecktable={false}
         showSearch={true}
     
        />
</div>
</div>
<div className='pprofile_Report'>
<h5>Reports</h5>
      <Table_patients 
         data={reports}
         headers={reports_header}
         flag={flag}
         anotherProp={role}
         showSearch={true}
        />
</div>



      </div>
   
      <div className='col-2'>
        <div className='pright'>
    
          <h4>Chronic Disease</h4>
          <ul>

              {chronicDisease.map((item, index) => ( /**here list of checked tests */
                <li key={index}className='pprofile_list'>{item}</li>
              ))}
                 </ul>
                 <h4>Habits</h4>
          <ul>
              {habits.map((item, index) => ( /**here list of checked tests */
                <li key={index}className='pprofile_list'>{item}</li>
              ))}
                 </ul>
      
                 <h4>Staff</h4>
                 <div className='no_bullet_staff'>
                 <h8>current</h8>
           {
              current_staff.map((item,index) => (
                <li key={index} className='pprofile_list'>
                  <img className='table_img' src={item[0]} alt={item[1]} /> {"  "+ item[1]}
                </li>
              ))
            }
            <div className='prev_staff'>
               <h8>previous</h8>
               {
              current_staff.map((item,index) => (
                <li key={index} className='pprofile_list'>
                  <img className='table_img prev_img' src={item[0]} alt={item[1]} /> {"  "+ item[1]}
                </li>
              ))
            } </div>  
          </div>
     
      </div>
      {role.toLowerCase()==="admin" &&(<>
      <Btn label={"update"} className="upd-btn-pprofile" onclick={handle_update_Click}/>
      </>)}
      {role.toLowerCase()==="doctor" &&(<>
      <Btn label={"Add Report"} className="upd-btn-pprofile" onclick={handle_add_Report}/>
      </>)}
      {role.toLowerCase()!=="doctor"||role.toLowerCase()!=="admin"&&(null) }
      
    </div>
      
    </div>
    {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <Report data={bedNo} closeModal={()=> setShowReportModal(false)}  submitModal={()=>{}}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Patient_profile
