const axios = require('axios');
// Configuration for the client
const CONFIGURATION = {
    credentials: {
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3W8Ur5QJ5P4gZ\ny1a8n4nVEyaVM90obvC2HpVdwM5rFOxlYgzueyZFRA4Ezl44lZW3cE+CBRbFweZq\ngfnO/4q9RidppJQuptJ3kGy2156CNCMyflXj10AflEKk2SHnoDFtMDK0sODX4Xia\nwE7P4EV1JJVLDO/XeMVDG33iCJMq23h130P/gYcxIb2qaGzQFk7IyUmdIOlzO+zZ\njGilW3uMLjan9k8r72KKP90AT4tyF1iIg2MMQFpn/l553/0tbx0RsouL4pb4/U/H\nA2kiLhLKtqz+0D9lcqVLXYYor798FUIWcNJqxq85Sw8IApVjiiptmweN2l3hM8Su\nNAnvLz/fAgMBAAECggEAJpCOr+TC2G2cWpCB9bo4azBT9R2rbk2nIybbk5Rx1ePY\ntJoiziXorrjZmfktqAkOLD7a+iXH3GAj7lLYD8l/jL+smnObFxTPP4aI1wwSsp/0\npzIbLoifXAT632Er2GPBAY4ZnBd3svAhRasc6GvrL/A51kcqSs+D7dFicKANE/4p\n2N3YNtTVsLCO7J8XF3eMH4SEj/zk3hW6vW+Ddg86+yw+i6W6gZAl0S64Rrh7bfWT\nV3WT+bELetfPvHjskTRL+AiGk8RBQxogTjZK+VRF5eh2RjuqN6WT3oa5ngpaMWNw\ne270/hO/mbY9EE9y+ZT0EqfZs8azIJ+VxBmfjhhqQQKBgQDlAnBDgPgT8dKSbPnL\naKPth3kOA79Cw+qlxcOKwKY3PvJwNw0mVX/+WXCvOf00BVIFj4cTHuvkV5hRXTXv\n6UZ2GdiR3ASnaqHhTpL6Y8P6FhRk9KVX6eaujujDhE4ZpMYHN8+e7XMSXNs5rlvb\nPbUlO3nv4hx27eSJxO4BhJUbSwKBgQDM9/iQrT7Hr4SqB4kCJ7tp49iNO8AOfE6W\ngfzaOVj7AhE/+txEfH8A6nKWa9LSU/CJQjet/ZSNBX3Gmz2SDjV7gMHIbYxr7Yhj\nLBiZ1qWKxeZAopKadSlkKXbWdouw6jkOnUQI5xm13o6cns4KEEoks53RLXFnobCU\nI2EBlkjdPQKBgQDYX7p0fUlnhsc/JAnL/31LMwHUlQPD8Fom8Lj1w1oIvsfP8KPT\nAVuilR0b4n1zBkfeCyNDlKaqo3y9+4S3vb+eXIM8JRacm+qBd3z1aQfEpdH1JRWH\n/+6+JTaVbM9h+UZFkZzwe0eLJQLY9/3AIwihOhXW6dudHt4csV1zP7KmCwKBgHvP\nMZsauvhdwjH+mTjvDRr6YV12gR1+4u2xGS4sQ95jMk5GVvUbio/gDlVkThV0VLBk\nikOUED5a2c21Ci0GXjH65ZMO8SpkceUNxtJuQNKhleLnEM0yBk2Vak5Djz/PS6XT\nQzxpdDNSeyyKFIUpr8+Zm7O10nG5znK9KCSQRfU1AoGABPNu8eZ38Ss8iTIJYDTg\nrjxhfpKOh1Y2HwFq00kNWy3r4sFzwngb5Lib33k7RcW5zar3epyKMUaKRw6iRdXG\n3yneAglv8sc/BKOJNfV1rpjuirFQSHfPECu56iJssF4NNg6xZ5DffBTYENWgPDC3\no61+MAZQy5SCq70FitkusYo=\n-----END PRIVATE KEY-----\n",
        client_email: "conviobot@convio-001.iam.gserviceaccount.com"
    },
    apiEndpoint: 'asia-south1-dialogflow.googleapis.com'
}

const mewsApiRequest = async (Client, HotelId) => {
    try {  
      // Prepare the data payload for the request to the API
      console.log("Calling Mews API");
      const data = JSON.stringify({
        "Client": Client,
        "HotelId": HotelId
      });
  
      // Configure the request to the API
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.mews-demo.com/api/distributor/v1/hotels/get',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: data
      };
  
      // Send the request to the API using axios
      const response = await axios.request(config);
  
      // Return the response data
      return response.data;
    } catch (error) {
      console.log(error);
      return { error: 'Mews API Request Failed' };
    }
  };

  // Function to make API requests
async function makeRequest(url, data) {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.error('Error making API request:', error);
      throw error;
    }
  }

module.exports = {
    CONFIGURATION,
    mewsApiRequest,
    makeRequest,
}