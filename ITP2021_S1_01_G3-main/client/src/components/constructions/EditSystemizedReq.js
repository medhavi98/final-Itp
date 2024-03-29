import React, {useState} from "react";
import axios from "axios";
import './../../css/IT19140162.css';
import  HeaderCom from './header';
import bc from '../../images/bc.png'

export default function EditCustemizedReq(){

    const [planNumber,setPlanNumber] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [comments,setComments] = useState("");
    
    function sendData(e){
        e.preventDefault(); 

        
        const newCRequest = {
            planNumber,
            name,
            email,
            phone,
            comments
        }
        
        axios.post("http://localhost:5000/customizedReq/add",newCRequest).then(()=>{
            alert("req added")
            
        } ).catch((err)=>{
            alert(err)
        })
    }


    return(
    
        <div><HeaderCom/> 
        <div className="container"> 
            <br/>
            <div className= "it19140162-editCustomizedimgTopic">
                <div className="it19140162-editCustomizedimgTopic1"><center><b><p className = "it19140162-topic1">Edit Systemized Requests</p></b></center></div><br/><br/><br/><br/><br/><br/>
                <div className="it19140162-editCustomizedimgTopic1"><img className="it19140162-insertDesignBackGround" src={bc}></img> </div>

            </div><br/><br/>
            <div className = "it19140162-mainDiv">        
                
                     <form className="shadow p-3 mb-5 bg-white rounded" onSubmit={sendData}>  
                        
                        <div className="form-group">
                            <label for="it19140162-planNumber">Plan Number</label>
                            <input type="text" className="form-control" id="it19140162-planNumber" placeholder="SP0000"
                        
                            onChange={(e) => {
                                setPlanNumber(e.target.value);
                            }}  />
                    
                        </div>

                    <div className="form-group">
                        <label for="it19140162-name">Name</label>
                        <input type="text" className="form-control" id="it19140162-name" placeholder="Enter your name"
                        
                            onChange={(e) => {
                                setName(e.target.value);
                            }}  />
                    
                    </div>

                    <div className="form-group">
                        <label for="it19140162-email">Email address</label>
                        <input type="email" className="form-control" id="it19140162-email" placeholder="name@example.com"
                        
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    </div>
                    
                    <div className="form-group">
                        <label for="it19140162-phone">Phone</label>
                        <input type="text" className="form-control" id="it19140162-phone" placeholder="Enter your phone number"
                        
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }} />
                    </div>


                    <div className="form-group">
                            <label for="it19140162-comments">Other Comments</label>
                            <textarea className="form-control" id="it19140162-comments" rows="3" 
                            onChange={(e) => {
                                setComments(e.target.value);
                            }}>      
                            </textarea>
                    </div>

                    <div>
                        <button type="submit" className="btn btn-success">SAVE CHANGES</button>
                    </div>
        </form>
                
                
                </div><br/>
            </div>          
      
            </div>
    )
    
}   