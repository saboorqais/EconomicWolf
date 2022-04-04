import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./contact.css";
import { setContact } from "../../../actions/contact";

function Contact() {
  const [badge, setbadge] = useState()
  const dispatch= useDispatch()    
 function handleSubmit(event){

   event.preventDefault();
   var data={
     "fname":event.target[0].value,
     "lname":event.target[1].value,
     "email":event.target[2].value,
     "message":event.target[3].value
   }
dispatch(setContact(data))
getBadge()
 }
 function getBadge(){
   setbadge(<a href="#" class="badge badge-success">Submitted</a>)
 }
  return (
    <div className="container" style={{marginBottom:'150px',color:"black"}}>
      <div className=" text-center mt-5 ">
        <h1>Contact US</h1>
        <p className="" style={{fontSize: "18px",
      textAlign:"justify",marginTop:'20px'
      }}>
        Whether you are a broker investor, banker, or entrepreneur intimidated by the complex national economic system, reach out to XYZ for assistance and optimize your workflow. 
Businesses and companies who want to learn more about XYZ terminal can contact us. Our customer support personnel will cater to your issues via email. Our ideology focuses on customer satisfaction at any cost. We guarantee hassle-free customer services, acknowledging and responding to all your queries within 24 hours. 
Please fill out the form below to email us your queries. All your information will be kept explicitly confidential.

        </p>
      </div>
      <div className="row ">
        <div className="col-lg-7 mx-auto">
          <div className="card mt-2 mx-auto p-4 bg-light">
            <div className="card-body bg-none">
              <div className="container">
                <form id="contact-form" role="form" onSubmit={handleSubmit}>
                  <div className="controls">
                    <div className="row">
                      <div className="col-md-12">
                      {badge}
                        <div className="form-group">
                         
                          <label for ="form" className="text-dark">Firstname *</label>
                          <input
                            id="form_name"
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Please enter your firstname *"
                            required="required"
                            data-error="Firstname is required."
                          />{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          {" "}
                          <label for="form_lastname" className="text-dark">Lastname *</label>{" "}
                          <input
                            id="form_name"
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Please enter your lastname *"
                            required="required"
                            data-error="Lastname is required."
                          />{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          {" "}
                          <label for="form_email" className="text-dark">Email *</label>{" "}
                          <input
                            id="form_name"
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Please enter your Email *"
                            required="required"
                            data-error="Email is required."
                          />{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          {" "}
                          <label for="form_message" className="text-dark">Message *</label>{" "}
                          <input
                            id="form_message"
                            name="message"
                            type="text"
                            className="form-control "
                            placeholder="Write your message here."
                            rows="4"
                            required="required"
                            data-error="Please, leave us a message."
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        
                        <input
                          type="submit"
                          className="btn btn-outline-dark btn-send pt-2 btn-block "
                          value="Send Message"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
