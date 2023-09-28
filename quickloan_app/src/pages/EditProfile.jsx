import React, {useState} from "react";
import styles from "../CSS/Form.module.css";
import offer from "../Images/offer2.jpg";
import offer2 from "../Images/quick_loan.png"
import axios from "axios";
import Swal from "sweetalert2";
import {useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";

export default function EditProfile() {
    const {id} = useSelector((store) => {
        console.log('store:', store)
        return {id: store.AuthReducer.currentUser.id}
    })

    const initalFormData = {
        fullname: "",
        email: "",
        address: "",
        contact: "",
        gender: "",
        dob: "",
        employment: ""
    }
    const [formData, setFormData] = useState(initalFormData);

    const [currentPart, setCurrentPart] = useState(1);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {value, name, type} = e.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: type === "tel" ? + value : type === "number" ? Number(value) : value
            }
        });
    };

    const handleNext = () => {
        setCurrentPart(currentPart + 1);
    };

    const handlePrev = () => {
        setCurrentPart(currentPart - 1);
    };

    const handleSubmitFormData = async (e) => {

        try { // Make a PATCH request using axios
            const response = await axios.patch(`https://sour-snowy-purpose.glitch.me/users/${id}`, formData);
            console.log(response.data);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your Data has been saved',
                showConfirmButton: false,
                timer: 1500
            })


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
    }

    const {
        fullname,
        email,
        address,
        contact,
        gender,
        dob,
        employment
    } = formData;
    return (
        <div>
            <div className={
                styles.container
            }>
                <div className={
                    styles["image-section"]
                }>
                    <div className={
                        styles["image-container"]
                    }>
                        <div id={
                            styles["offer2"]
                        }>
                            <img src={offer2}
                                alt=""/>
                        </div>
                        <img src="https://img.freepik.com/premium-photo/portrait-happy-indian-asian-young-family-while-sitting-sofa-lying-floor-sitting-against-wall_466689-7294.jpg?size=626&ext=jpg&ga=GA1.1.107694881.1686996804&semt=ais" alt="Image"/>
                    </div>
                </div>

                <div className={
                    styles["form-section"]
                }>
                    <div className={
                        styles.vl
                    }></div>
                    <div className={
                        styles["form-content"]
                    }>
                        <div>
                            <form>
                                <div className={
                                    styles["form-group"]
                                }>
                                    <label>Your Name</label>
                                    <input type="text" name="fullname"
                                        value={fullname}
                                        onChange={handleChange}
                                        placeholder="Enter your Full Name"
                                        required/>
                                </div>

                                <div className={
                                    styles["form-group"]
                                }>
                                    <label>Email</label>
                                    <input type="email" name="email"
                                        value={email}
                                        placeholder="Enter your e-mail"
                                        onChange={handleChange}
                                        required/>
                                </div>

                                <div className={
                                    styles["form-group"]
                                }>
                                    <label>Gender</label>
                                    <select name="gender"
                                        value={gender}
                                        onChange={handleChange}
                                        required>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className={
                                    styles["form-group"]
                                }>
                                    <label>Date of Birth</label>
                                    <input type="date" name="dob"
                                        value={dob}
                                        onChange={handleChange}
                                        required/>
                                </div>

                                <div className={
                                    styles["form-group"]
                                }>
                                    <label>Mobile Number</label>
                                    <input type="tel" name="contact"
                                        value={contact}
                                        onChange={handleChange}
                                        placeholder="Enter your mobile number"
                                        required/>
                                </div>

                                <div className={
                                    styles["form-group"]
                                }>
                                    <label>Address</label>
                                    <input type="text" name="address"
                                        value={address}
                                        onChange={handleChange}
                                        placeholder="Enter your Address"
                                        required/>
                                </div>
                                <div className={
                                    styles["form-group"]
                                }>
                                    <label>Employment</label>
                                    <select name="employment"
                                        value={employment}
                                        onChange={handleChange}
                                        required>
                                        <option value="">Select Employment</option>
                                        <option value="employed">Employed</option>
                                        <option value="self-employed">Self-Employed</option>
                                        <option value="student">Student</option>
                                    </select>
                                </div>
                                <div className={
                                    styles["button-container"]
                                }>
                                    <button type="button"
                                        onClick={handleSubmit}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                            <img src={offer}
                                alt=""/>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
