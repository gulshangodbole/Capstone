import React, { useState } from "react";
import styles from "../CSS/Form.module.css";
import offer from "../Images/offer2.jpg";
import Swal from "sweetalert2";
import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile, getUserDetails } from "../redux/UserRedux/action";


export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((store) => store.AuthReducer.currentUser);

  // const data2 = useSelector((store) => store.AuthReducer.currentUser);
  // const { id } = useSelector((store) => {
  //   console.log("store:", store);
  //   return { id: store.AuthReducer.currentUser.id };
  // });

  const initalFormData = {
    fullname: currentUser.fullname || "",
    email: currentUser.email || "",
    address: currentUser.address || "",
    contact: currentUser.contact || "",
    gender: currentUser.gender || "",
    dob: currentUser.dob || "",
    employment: currentUser.employment || "",
    empYears: currentUser.empYears || "",
    // income: "",
    // savings: "",
    // expense: "",
    //creditscore: "",
    assets: currentUser.assets || "",
    password: "",
  };
  const [formData, setFormData] = useState(initalFormData);

  const [currentPart, setCurrentPart] = useState(1);
  

  const handleChange = (e) => {
    const { value, name, type } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "tel" ? +value : type === "number" ? Number(value) : value,
    }));
  };

  // const handleNext = () => {
  //   setCurrentPart(currentPart + 1);
  // };

  // const handlePrev = () => {
  //   setCurrentPart(currentPart - 1);
  // };

  const handleSubmitFormData = async (e) => {
    if (!formData.password) {
      formData.password = currentUser.password;
    }
    try {
      // Make a PATCH request using axios
      const response =  await dispatch(updateProfile(currentUser.userID, formData));
      console.log(response.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Data has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(`/profile`);

      // Reset form data
      setFormData(initalFormData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitFormData();
  };

//   const [data, setData] = useState({
//     fullname: '',
//     email: '',
//     gender: '',
//     dob: '',
//     contact: '',
//     address: '',
//     employment: '',
//   });

useEffect(() => {
  // Fetch user details when the component mounts
  dispatch(getUserDetails(currentUser.userID));
}, [dispatch, currentUser.userID]);

 const { fullname, email, gender, dob, contact, address, employment, empYears, income, expense, savings, assets, password } = formData;
 console.log(formData);
 console.log(email); 
 return (
    <div style={{display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    bgGradient:"radial(at center,  #993399, #3f1d67)"}}>
      <div className={styles.container}>
        <div className={styles["form-section"]}>
          {/* <div className={styles.vl}></div> */}
          <div className={styles["form-content"]}>
            <div>
              <form>
                <div className={styles["form-group"]}>
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    onChange={handleChange}
                    placeholder="Enter your Full Name"
                    required
                  />
                </div>

                <div className={styles["form-group"]}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter your e-mail"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles["form-group"]}>
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles["form-group"]}>
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={dob}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles["form-group"]}>
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    name="contact"
                    value={contact}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>

                <div className={styles["form-group"]}>
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    placeholder="Enter your Address"
                    required
                  />
                </div>
                <div className={styles["form-group"]}>
                  <label>Employment</label>
                  <select
                    name="employment"
                    value={employment}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Employment</option>
                    <option value="employed">Employed</option>
                    <option value="self-employed">Self-Employed</option>
                    <option value="student">Student</option>
                  </select>
                </div>

                <div className={styles["form-group"]}>
                  <label>Years of Employment</label>
                  <input
                    type="text"
                    name="empYears"
                    value={empYears}
                    onChange={handleChange}
                    placeholder="Enter your Years of Employment"
                    required
                  />
                </div>

                {/* <div className={styles["form-group"]}>
                  <label>Monthly Income</label>
                  <input
                    type="text"
                    name="Income"
                    value={income}
                    onChange={handleChange}
                    placeholder="Enter your Income"
                    required
                  />
                </div>

                <div className={styles["form-group"]}>
                  <label>Monthly Expense</label>
                  <input
                    type="text"
                    name="expense"
                    value={expense}
                    onChange={handleChange}
                    placeholder="Enter your Expense"
                    required
                  />
                </div>
                
                <div className={styles["form-group"]}>
                  <label>Monthly Savings</label>
                  <input
                    type="text"
                    name="Savings"
                    value={savings}
                    onChange={handleChange}
                    placeholder="Enter your Montly Savings"
                    required
                  />
                </div> */}
                
                {/* <div className={styles["form-group"]}>
                  <label>Credit Score</label>
                  <input
                    type="text"
                    name="score"
                    value={score}
                    onChange={handleChange}
                    placeholder="Enter your Credit Score"
                    required
                  />
                </div> */}

                <div className={styles["form-group"]}>
                  <label>Assets</label>
                  <input
                    type="text"
                    name="assets"
                    value={assets}
                    onChange={handleChange}
                    placeholder="Enter your Assets"
                    required
                  />
                </div>

                <div className={styles["form-group"]}>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Change password"
                    required
                  />
                </div>

                <div className={styles["button-container"]}>
                  <button type="button" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </form>
              <img src={offer} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
