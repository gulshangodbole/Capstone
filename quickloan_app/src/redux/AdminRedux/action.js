import axios from "axios"
import {GET_USERS, REQ_GET_USERS} from "./actionTypes"

const userServiceName = 'gateway';

// Function to resolve the service endpoint dynamically
const resolveUserServiceEndpoint = async () => {
  try {
    // Make an HTTP request to Eureka to fetch service information
    const eurekaResponse = await axios.get('http://localhost:8761/eureka/apps/' + userServiceName);
    const instance = eurekaResponse.data.application.instance[0]; 
    console.log("instance", instance)
    if (instance) {
      const { hostName, port } = instance;
      return `http://${hostName}:${port.$}/api/users`;
    } else {
      throw new Error(`No instances found for ${userServiceName}`);
    }
  } catch (error) {
    console.error('Error resolving user-service endpoint:', error);
    throw error;
  }
};

export const getUsersAction = (dispatch) => {
    dispatch({
      type: REQ_GET_USERS,
    });
    resolveUserServiceEndpoint()
      .then((userServiceEndpoint) => {
        axios
          .get(userServiceEndpoint)
          .then((res) => {
            dispatch({
              type: GET_USERS,
              payload: res.data,
            });
          })
          .catch((err) => {
            console.error("Error fetching user data:", err);
          });
      })
      .catch((err) => {
        console.error("Error resolving user-service endpoint:", err);
      });
  };
  
  
  
  
  