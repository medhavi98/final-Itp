import React, {useState,useEffect} from 'react'
import axios from 'axios'
import '../../../css/it19951386.css';

export default function UpdateCustomer(props) {
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setemail] = useState("");
    const [address, setaddress] = useState("");
    const [pNo, setphone] = useState("");
    const [password, setpassword] = useState("");
    const [repassword, setrepassword] = useState("");
    const [errors, seterrors] = useState([]);
    const id = props.match.params.id;

    useEffect (() => {
        async function fetchData(){
            const response = (await axios.get(`http://localhost:5000/customers/edit/${id}`)).data;
            setfname(response.fname);
            setlname(response.lname);
            setemail(response.email);
            setaddress(response.address);  
            setphone("0"+response.pNo);   
        }
        fetchData();
    },[id])
    
    const customerFormSubmit = (async(e) => {
        e.preventDefault();
        seterrors([]);
        document.getElementById("passwordError").innerText = ""

        document.getElementById('customerEditLoadingBtn').removeAttribute("hidden");
        document.getElementById('customerEditBtn').setAttribute("hidden","true");

        if(password != repassword){
            setpassword("");
            setrepassword("");
            document.getElementById('customerEditLoadingBtn').setAttribute("hidden","true");
            document.getElementById('customerEditBtn').removeAttribute("hidden");
            document.getElementById("passwordError").innerText = "Password and Re-type Password fields Doesn't Match!"
            return;
        }

        const response = await axios.post(`http://localhost:5000/customers/edit/${id}`, {fname, lname, email, password,address,pNo})
            if(response.data.success){
                document.getElementById('customerEditLoadingBtn').setAttribute("hidden","true");
                document.getElementById('customerEditBtn').removeAttribute("hidden");
                localStorage.setItem('cusUpMsg', 'Customer record of ' +response.data.cus_id +', was updated successfully! 😃');
                window.location = "/customers";
            }
            if(response.data.errors){
                seterrors(response.data.errors);
                setrepassword("");
                setpassword("");
                document.getElementById('customerEditLoadingBtn').setAttribute("hidden","true");
                document.getElementById('customerEditBtn').removeAttribute("hidden");
            }
    })
 
    return (
        <div>
            <form onSubmit={customerFormSubmit} className="form-group it19951386-myForm">
                <h2>Edit Customer Details</h2>
                {errors ? errors.map((error) => {
                    return (
                        <div class="alert alert-danger" role="alert">
                            {error.msg}
                      </div>
                    )
                }):null}
                <label>First Name</label>
                <input className="form-control" type="text" name="fname" onChange={(e) => {setfname(e.target.value);}} value={fname}/><br/>
                <label>Last Name</label>
                <input className="form-control" type="text" name="lname" onChange={(e) => {setlname(e.target.value);}} value={lname}/><br/>
                <label>Email</label>
                <input className="form-control" type="email" name="email" onChange={(e) => {setemail(e.target.value);}} value={email}/><br/>
                <label>Address</label>
                <input className="form-control" type="text" name="address" onChange={(e) => {setaddress(e.target.value);}} value={address}/><br/>
                <label>Phone No</label>
                <input className="form-control" type="text" name="pNo" onChange={(e) => {setphone(e.target.value);}} value={pNo}/><br/>
                <label>Password</label>
                <input className="form-control" type="password" name="password" onChange={(e) => {setpassword(e.target.value);}} value={password}/><br/>
                <label>Re-type Password</label>
                <div><span id="passwordError" style={{color:'red'}}></span></div>
                <input className="form-control" type="password" name = "repassword" onChange={(e) => {setrepassword(e.target.value);}} value={repassword}/><br/>
                <button className="btn it19951386-green-btn it19951386-mybtn" id="customerEditBtn">Update 
                </button>
                <button className="btn it19951386-green-btn it19951386-mybtn" id="customerEditLoadingBtn" hidden disabled>
                <span className="spinner-border spinner-border-sm" id="loading" role="status" aria-hidden="true" style={{"margin-right":"5px"}}>
                </span>
                Updating
                </button>
            </form>
        </div>
    )
    }
