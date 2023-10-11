import {Button} from "@chakra-ui/react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {useEffect, useState} from "react"
import {styled} from "styled-components"

export const Profile = () => {
    const [loans, setLoans] = useState([])
    const [data, setData] = useState({})

    const dispatch = useDispatch();

    const currentUser = useSelector((store) => store.AuthReducer.currentUser);

    useEffect(() => {
        console.log("current user", currentUser)
        // Fetch user details when the component mounts
        setData(currentUser);
        console.log("data", data)
    }, [currentUser]);

    const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 650);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });
    return (
        <div style={{
            display: window.innerWidth > 650 ? "flex" : "grid",
            justifyContent: "start",
            paddingTop: "20px",
            backgroundColor: "#E5D1FA",
            alignContent: "center"
        }}>
            <div style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#E5D1FA",
                marginBottom: "20px"
            }}>

                <img style={{width: "50%", backgroundColor: "#E5D1FA", borderRadius: "100%"}}
                     src="https://img.freepik.com/premium-vector/man-profile-cartoon_18591-58482.jpg?w=740" alt=""/>
            </div>
            <DIV>
                {/* style={{marginLeft:"10%",paddingBottom:"10px"}} */}
                <h3><label>Name : </label> {data.fullname}</h3>
                <h5><label>Date of Birth : </label> {data.dob}</h5>
                <h5><label>Phone : </label> {data.contact}</h5>
                <h5><label>Email : </label> {data.email}</h5>
                <h5><label>Gender : </label> {data.gender}</h5>
                <h5><label>Town : </label> {data.address}</h5>
                <h5><label>Employer: </label> {data.employment}</h5>
                <h5><label>Years of Employment : </label> {data.empYears}</h5>
                {/* <h5> <label >Monthly Income :  </label> {data.income}</h5>
                <h5> <label >Savings :  </label> {data.Savings}</h5>
                <h5> <label >Monthly Expense :  </label> {data.expense}</h5>
                <h5> <label >Credit Score :  </label> {data.creditscore}</h5> */}
                <h5><label>Assets: </label> {data.assets}</h5>
                <div>
                    <Link to={"/edit"}> <Button>Edit Profile!</Button></Link>
                </div>
            </DIV>
            <div style={{marginLeft: "10%"}}>

            </div>

        </div>
    )
}

const DIV = styled.div`
  margin-top: 30px;
  width: 55%;
  color: black;
  font-size: 20px
`