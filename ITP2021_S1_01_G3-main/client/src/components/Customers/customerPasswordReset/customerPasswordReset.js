import React, {useState}  from 'react';
import axios from 'axios';
import {getUser} from '../../../utils/common';
import '../../../css/it19951386.css';
import Header from '../../constructions/header'

export default function CustomerPasswordReset(props) {
    const [password, setpassword] = useState("");
    const [repassword, setrepassword] = useState("");
    const id = getUser();
    const [errors, seterrors] = useState([]);
    const [emailerror, setemailerror] = useState("");   

    const resetPassword = async(e) => {

        e.preventDefault();
        setemailerror('');
        seterrors([]);

        const response = await axios.post(`http://localhost:5000/customer/profile/reset-password/${id}`,{password,repassword});
        if (response.data.success) {
            localStorage.setItem('success', 'Password reset is successfull!');
            props.history.push("/customer/profile");
        }
        if (response.data.errors) {
            seterrors(response.data.errors);
            setpassword("")
            setrepassword("")
        }
        if(response.data.emailerror){
            setemailerror(response.data.emailerror);
            setpassword("")
            setrepassword("")
        } 
    }
    const cancelReset = () => {
        window.location = "/customer/profile";
    }

    return (
        <div name="password-form">
            <Header/>
            <form className="form-group it19951386-myForm">
            <h2>Reset Password</h2>
            {errors ? errors.map((error) => {
                    return (
                        <div class="alert alert-danger" role="alert">
                            {error.msg}
                      </div>
                    )
                }):null}
                {emailerror ? 
                <div class="alert alert-danger" role="alert">
                    {emailerror}
                    </div>: null}
            <label>New Password</label> 
            <input className="form-control" type="password" value={password} onChange={(e) => setpassword(e.target.value.trim())} /><br/>

            <label>Re-type Password</label>   
            <input className="form-control" type="password" value={repassword} onChange={(e) => setrepassword(e.target.value.trim())} /><br/> 

            <div className="it19951386-btn-section">
            <input id="resetPassword" type="button" value="Reset" onClick={resetPassword} className="it19951386-green-btn btn" style={{marginRight:'5px'}}/>
            <input id="cancelButton2" type="button" value="Cancel" onClick={cancelReset} className="btn-danger it19951386-red-btn btn" />
            </div>
            </form>
        </div>
    )
}
