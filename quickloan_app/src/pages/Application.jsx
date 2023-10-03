import React, { useState } from "react";
import styles from "../CSS/Form.module.css";
import offer from "../Images/offer2.jpg";
import offer2 from "../Images/quick_loan.png"
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function Application() {
  const { id } = useSelector((store) => {
    console.log('store:', store)
    return {
      id: store.AuthReducer.currentUser.id,
    }
  })
  // console.log("======", id);

  const initalFormData={
    income: "",
    creditscore: "",
    category: "",
    eligibility: ""
  }
  const [formData, setFormData] = useState(initalFormData);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {value,name,type}=e.target;
    setFormData(prev=>{
      return {...prev,[name]:
        type==="tel" ? +value: type==="number"? Number(value) : value}
  });
  };

  const handleSubmitFormData = async (e) => {

    try {
      // Make a PATCH request using axios
      const response = await axios.patch(
        `https://sour-snowy-purpose.glitch.me/users/${id}`,  
        formData
      );
      console.log(response.data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Data has been saved',
        showConfirmButton: false,
        timer: 1500
      })

      navigate(`/dashboard`);

      // Reset form data
      setFormData(initalFormData);
    } catch (error) {
      console.error(error);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.creditscore >= 650) {
      formData.eligibility="Eligible"
      handleSubmitFormData();      
    } else {
      formData.eligibility="Not Eligible"
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'We are unable to forward your form at this time due to the low credit score.Your credit score is below 650. Please improve your credit score and try again.',
      })
      setFormData(initalFormData);
    }
  }

  const {fullname,email,address,contact,gender,dob,employment,income,creditscore,category}=formData;
  return (
    <div>
      <div className={styles.container}>
        <div className={styles["image-section"]}>
          <div className={styles["image-container"]}>
            <div id={styles["offer2"]}> <img src={offer2} alt=""/> </div>
            
          </div>
        </div>

        <div className={styles["form-section"]}>
          <div className={styles.vl}></div>
          <div className={styles["form-content"]}>
                <form>

                  <div className={styles["form-group"]}>
                    <label>Category</label>
                    <select
                      name="category"
                      value={category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category of Loan</option>
                      <option value="Homeloan">Home loan</option>
                      <option value="Educationloan">Education loan</option>
                      <option value="Personalloan">Personal loan</option>
                      <option value="Businessloan">Business loan</option>
                    </select>
                  </div>

                  <div className={styles["form-group"]}>
                    <label>Income</label>
                    <select
                      name="income"
                      value={income}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Income</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className={styles["form-group"]}>
                    <label>Credit Score</label>
                    <input
                      type="number"
                      name="creditscore"
                      value={creditscore}
                      onChange={handleChange}
                      placeholder="Enter your Credit Score"
                      required
                    />
                  </div>

                  <div className={styles["button-container"]}>
                    <button className={creditscore === "" ? styles.disabled : ""} disabled={creditscore === ""} type="button" onClick={handleSubmit}>
                      CHECK YOUR OFFER
                    </button>
                  </div>
                </form>
                <img src={offer} alt="" />
              </div>
          </div>
        </div>
      </div>
  );
}
