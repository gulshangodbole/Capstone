import React, { useState } from "react";
import styles from "../CSS/Form.module.css";
import offer from "../Images/offer2.jpg";
import offer2 from "../Images/quick_loan.png"
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { partialUpdateProfile } from "../redux/UserRedux/action";
import {
    Text,
    Flex,
} from '@chakra-ui/react'

export default function Application() {
    const dispatch = useDispatch();
    const currentUser = useSelector((store) => store.AuthReducer.currentUser);

    const initialFormData = {
        income: "",
        creditscore: "",
        eligibility: ""
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState(""); // To manage validation errors

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value, name, type } = e.target;
        const numericValue = type === "tel" ? +value : type === "number" ? Number(value) : value;

        setFormData((prev) => ({
            ...prev,
            [name]: numericValue
        }));
        // Clear the error message when the value is valid
        setError("");
    };

    const handleSubmitFormData = async (e) => {
        try {
            const response = await dispatch(partialUpdateProfile(currentUser.userID, formData.creditscore, formData.income));
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your Data has been saved',
                showConfirmButton: false,
                timer: 1500
            });

            navigate(`/banks`);

            // Reset form data
            setFormData(initialFormData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.creditscore >= 650) {
            formData.eligibility = "Eligible";
            console.log("Eligibility:", formData.eligibility);
            handleSubmitFormData();
        } else {
            formData.eligibility = "Not Eligible";
            console.log("Eligibility:", formData.eligibility);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'We are unable to forward your form at this time due to the low credit score. Your credit score is below 650. Please improve your credit score and try again.',
            });
            setFormData(initialFormData);
        }
    };
    const isCreditScoretInValid = formData.creditscore < 0;
    const isIncomeInValid = formData.income < 0;
    const { income, creditscore, category } = formData;

    return (
        <div>
            <div className={styles.container}>
                <div className={styles["image-section"]}>
                    <div className={styles["image-container"]}>
                        <div id={styles["offer2"]}><img src={offer2} alt="" /></div>
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
                                <label>Monthly Income</label>
                                <input
                                    name="income"
                                    value={income}
                                    type="text"
                                    onChange={handleChange}
                                    required
                                />
                                {isIncomeInValid && (
                        <Flex>
                            <Text
                                color={"red"}
                                pl={"3em"}
                                fontSize={{
                                    base: "10px",
                                    sm: "12px",
                                    md: "15px",
                                    lg: "15px",
                                    xl: "15px",
                                }}
                            >
                                Enter positive amount
                            </Text>
                        </Flex>
                    )}
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
                                {isCreditScoretInValid && (
                        <Flex>
                            <Text
                                color={"red"}
                                pl={"3em"}
                                fontSize={{
                                    base: "10px",
                                    sm: "12px",
                                    md: "15px",
                                    lg: "15px",
                                    xl: "15px",
                                }}
                            >
                                Enter positive number
                            </Text>
                        </Flex>
                    )}
                            </div>

                            {error && <div className={styles.error}>{error}</div>}

                            <div className={styles["button-container"]}>
                                <button className={creditscore === "" ? styles.disabled : ""}
                                    disabled={creditscore === "" || isCreditScoretInValid || isIncomeInValid} type="button" onClick={handleSubmit}>
                                    CHECK YOUR OFFER
                                </button>
                            </div>
                        </form>
                        <img src={offer} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )}
