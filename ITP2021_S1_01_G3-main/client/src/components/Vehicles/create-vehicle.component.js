import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../../css/it19142456.css';
import ReactFormInputValidation from "react-form-input-validation";

let cap=true;
export default class CreateVehicle extends Component{

  
    constructor(props) {
        super(props);

        this.state = {
          fields: {
            FirstName: "",
            email: "",
            phoneNo: ""
          },
          errors: {}
        };
        this.form = new ReactFormInputValidation(this);
        this.form.useRules({
            
            capasity: "required|numeric|digits_between:4,8",
        });
        this.form.onformsubmit = (fields) => {
        
        }

        // Setting up functions
        
        this.onChangeVehicleId = this.onChangeVehicleId.bind(this);
        this.onChangeRegNum = this.onChangeRegNum.bind(this);
        this.onChangeCapasity = this.onChangeCapasity.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeBrandName = this.onChangeBrandName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeManufectureYear = this.onChangeManufectureYear.bind(this);
        this.onChangeEngineNum = this.onChangeEngineNum.bind(this);
        this.onChangeChassiNum = this.onChangeChassiNum.bind(this);
        this.onChangeLicenseNo = this.onChangeLicenseNo.bind(this);
        this.onChangeAdminId = this.onChangeAdminId.bind(this);
        this.onChangeBranchId = this.onChangeBranchId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        // Setting up state
        this.state = {
          
            vehicleId:"",
            registrationNum:"",
            type:"",
            brandName:"",
            year:"",
            model:"",
            capasity:"",
            chassiNumber:"",
            engineNumber:"",
            adminId:"",
            licenseNo:"",
            branchId:"",
            valid : ''
            
        }
      }
    
    
      
      onChangeVehicleId(e) {
        this.setState({  vehicleId: e.target.value })
      }
      onChangeRegNum(e) {
        this.setState({ registrationNum: e.target.value })
      }
      onChangeType(e) {
        this.setState({ type: e.target.value })
      }
      onChangeBrandName(e) {
        this.setState({ brandName: e.target.value })
      }
      onChangeManufectureYear(e) {
        this.setState({ year: e.target.value })
      }
      onChangeModel(e) {
        this.setState({ model: e.target.value })
      }
      onChangeCapasity(e) {
        this.setState({ capasity: e.target.value })
        let param = e.target.value;

      cap = this.validateCap(e.target.value)
   
      console.log(param.length);

      console.log(cap);
      }
      onChangeChassiNum(e) {
        this.setState({ chassiNumber: e.target.value })
      }
      onChangeEngineNum(e) {
        this.setState({ engineNumber: e.target.value })
      }
      onChangeAdminId(e) {
        this.setState({ adminId: e.target.value })
      }
      onChangeLicenseNo(e) {
        this.setState({ licenseNo: e.target.value })
      }
      onChangeBranchId(e) {
        this.setState({ branchId: e.target.value })
      }
      validateCap(capasity) {
        const regex = /^\(?([0-9]{1})\)?[-. ]?([0-9]{1})[-. ]?([0-9]{2})$/;
        console.log(regex.test(capasity))
        return regex.test(capasity);
      }
      

     
    
      onSubmit(e) {
        //e.preventDefault()

        
    if(cap !== true){
      alert("Validation Fail");
      e.preventDefault()
    }
      
    
       // console.log(`Vehicle add sucssefully!`);
    
        const vehicleObject = {
            vehicleId:this.state.vehicleId,
            registrationNum:this.state.registrationNum,
            type:this.state.type,
            brandName:this.state.brandName,
            year:this.state.year,
            model:this.state.model,
            capasity:this.state.capasity,
            chassiNumber:this.state.chassiNumber,
            engineNumber:this.state.engineNumber,
            adminId:this.state.adminId,
            licenseNo:this.state.licenseNo,
            branchId:this.state.branchId
          };
          if(cap === true){
          axios.post('http://localhost:5000/vehicles/create-vehicle', vehicleObject)
            .then(res => console.log(res.data));
          }
    
       

        //this.props.history.push('/vehicle-list')
       
      }




    render() {
      
        return (<div className="form-wrapper">
          <br/>
          <h2 className="it19142456-heading">Add vehicle</h2>
        <Form onSubmit={this.onSubmit} className="it19142456-myForm">
  
        <Form.Group controlId="vehicleId">
            <Form.Label>Vehicle Id</Form.Label> 
            <Form.Control name="vehiId" type="text" value={this.state.vehicleId} onChange={this.onChangeVehicleId} required/>
          </Form.Group>
  
          <Form.Group controlId="registrationNum">
            <Form.Label>Registration Number</Form.Label>
            <Form.Control name="regnum" type="text" value={this.state.registrationNum} onChange={this.onChangeRegNum} required/>
          </Form.Group>
  
          <Form.Group controlId="capasity">
            <Form.Label>Capasity</Form.Label>
            <Form.Control name="cap" type="text" value={this.state.capasity} onChange={this.onChangeCapasity} required/>
            { cap==true ?   <></>  : <p>capasity is not valid!</p>  }
          </Form.Group>
  
          <Form.Group controlId="model">
            <Form.Label>Model</Form.Label>
            <Form.Control name="model" type="text" value={this.state.model} onChange={this.onChangeModel} required/>
          </Form.Group>
  
          <Form.Group controlId="brandName">
            <Form.Label>Brand Name</Form.Label>
            <Form.Control name="brandName" type="text" value={this.state.brandName} onChange={this.onChangeBrandName} required/>
          </Form.Group>
  
          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control name="type" type="text" value={this.state.type} onChange={this.onChangeType} required/>
          </Form.Group>
  
          <Form.Group controlId="year">
            <Form.Label>Manufecture Year</Form.Label>
            <Form.Control name="year" type="date" value={this.state.year} onChange={this.onChangeManufectureYear} required/>
          </Form.Group>
  
          <Form.Group controlId="engineNumber">
            <Form.Label>Engine Number</Form.Label>
            <Form.Control name="enginNum" type="text" value={this.state.engineNumber} onChange={this.onChangeEngineNum} required/>
          </Form.Group>
  
          <Form.Group controlId="chassiNumber">
            <Form.Label>Chassi Number</Form.Label>
            <Form.Control name="chassiNum" type="text" value={this.state.chassiNumber} onChange={this.onChangeChassiNum} required/>
          </Form.Group>
  
          <Form.Group controlId="licenseNo">
            <Form.Label>License Number</Form.Label>
            <Form.Control name="licenNum" type="text" value={this.state.licenseNo} onChange={this.onChangeLicenseNo} required/>
          </Form.Group>

          <Form.Group controlId="adminId">
            <Form.Label>Admin Id</Form.Label>
            <Form.Control name="admonId" type="text" value={this.state.adminId} onChange={this.onChangeAdminId} required/>
          </Form.Group>

          <Form.Group controlId="branchId">
            <Form.Label>Branch ID</Form.Label>
            <Form.Control name="branchId" type="number" value={this.state.branchId} onChange={this.onChangeBranchId} required/>
          </Form.Group>
         
  
          <Button size="lg" block="block" type="submit" className="btn it19142456-my-btn">
            Add vehicle
          </Button>
          
        </Form>
      </div>
        );
      }




}