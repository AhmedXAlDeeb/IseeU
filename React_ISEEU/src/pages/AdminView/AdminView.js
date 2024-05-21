import React from 'react';
import "./AdminView.css";
import { Chart, OR, MBut, DEL, Search, UserText1, UserText2, UserAge, CheckBox, OpenLi, EmerBtn, Btn, LiBTN } from '../../components';
import data from "bootstrap/js/src/dom/data";

const AdminView = () => {
    let bedsData = [0,0] // send data Number.available, Number.taken
    
    let patientsNumber = 55
    let doctorsNumber = 66
    let nursesNumber = 33

    let doctorsData = [["fname","lname","gender","yearsOfExperience"], //data of doctors
                                [],
                                []]
    let nursesData = [["fname","lname","gender","yearsOfExperience"], //data of nurses NOT SURE IF IT WILL BE USED
        [],
        []]


    return (
        <div className="container-fluid">
            <div id="AdminView" className="row col-9 offset-3">
                <div id="AdminViewLeft" className="col-6">
                    <div id="bedCap" className="row">
                        <div className="col-6">
                            <p className= "bedCapP" id={"bedCapTitle"}>Beds Capacity</p>
                            <p className= "bedCapP" id={"bedCapAvailable"}>55 Available</p>
                            <p className= "bedCapP" id={"bedCapTaken"}>22 Taken</p>
                        </div>
                        <div id={"chartDiv"} className="col-6">
                            <Chart id="bedCapChart" data={[55, 12, 10]} labels={["ll", "a", "as"]} width="50vw" />
                        </div>
                    </div>
                </div>


                <div id="AdminViewRight" className="col-6">
                    <div id="patientNo" className="row">
                        <div id={"patientStats"} className="col-6">
                            <p id={"patientNoNumber"}> 55 </p>
                            <p id={"patientNoTitle"}> Patients</p>
                        </div>
                        <div id={"admit_Discharge"} className="col-6">
                            <div className={"row"}>sss</div>
                            <div className={"row"}>aaa</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminView;
