const express = require('express');
const {detectIntent} = require('../dialogflow/dialogflow_functions');
const {compareSuites,guestPerRoom} = require('../dialogflow/aboutTheRooms');
const {paidSeperately,includeInRate} = require('../dialogflow/serviceAndAmenities');
const {getHotelsWithRestaurant,breakfast} = require('../dialogflow/foodAndDrinks');
const {getRoomCategories} = require('../dialogflow/reservation');
const {location} = require('../dialogflow/location');
const {responseMessage} = require('../response_utils/apiresponse');

const webApp = express();
webApp.use(express.urlencoded({ extended: true }));
webApp.use(express.json());

const PORT = 5000;

webApp.post('/testLocally', async (req, res) => {
  const resp = await handler(req, res);
  res.send(resp);
});

webApp.post('/webhook', async (req, res) => {
  const resp = await webhook(req, res);
  res.send(resp);
});

webApp.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});

const handler = async (event) => {
  try {
    const requestBody = event.body;
    const { languageCode, queryText, sessionId, Client, HotelId,roomInfo, flag } = requestBody;
    if (!flag) {
      return responseMessage(400, 'Invalid Flag');
    }

    if (flag === 'detectIndent') {
      const detectResponse = await detectIntent(languageCode, queryText, sessionId,Client, HotelId, roomInfo);
      return responseMessage(200, detectResponse);
    }

    if (flag === 'healthcheck') {
      return responseMessage(200, 'API Working Fine..!');
    } else {
      return responseMessage(400, 'API Not Working Fine..!');
    }
  } catch (error) {
    console.log('Error in Lambda =>', error);
    return responseMessage(400, 'Something went wrong');
  }
};

const webhook = async (event,context) => {
  try{
    const requestBody = event.body;
    console.log(requestBody);
    const client=requestBody.sessionInfo.parameters.Client;
    const hotelId=requestBody.sessionInfo.parameters.hotelId;

    if (requestBody.sessionInfo.parameters.webhook === 'compareSuites'){
      const compareSuitesResponse = await compareSuites(client,hotelId);
      console.log('Index.js', JSON.stringify(compareSuitesResponse));
      let responseData = {
            "session_info":{
              "parameters": {
                "compareSuitesResponse": compareSuitesResponse
              }
            } 
      };
      console.log('Index.js', responseData);
    return createResponse(200,responseData);
    }


    if (requestBody.sessionInfo.parameters.webhook === 'guestPerRoom'){
      const guestPerRoomResponse = await guestPerRoom(client,hotelId);
      console.log('Index.js', JSON.stringify(guestPerRoomResponse));
      let responseData = {
        "fulfillment_response": {
            },
            "session_info":{
              "parameters": {
                "guestPerRoomResponse": guestPerRoomResponse
              }
            } 
      };
      console.log('Index.js', responseData);
    return createResponse(200,responseData);
    }

    if (requestBody.sessionInfo.parameters.webhook === 'includeInRate'){
      const includeInRateResponse = await includeInRate(client,hotelId);
      console.log('Index.js', JSON.stringify(includeInRateResponse));
      let responseData = {
            "session_info":{
              "parameters": {
                "includeInRateResponse": includeInRateResponse
              }
            } 
      };
      console.log('Index.js', responseData);
    return createResponse(200,responseData);
    }

    if (requestBody.sessionInfo.parameters.webhook === 'paidSeperately'){
      const paidSeperatelyResponse = await paidSeperately(client,hotelId);
      console.log('Index.js', JSON.stringify(paidSeperatelyResponse));
      let responseData = {
            "session_info":{
              "parameters": {
                "paidSeperatelyResponse": paidSeperatelyResponse
              }
            } 
      };
      console.log('Index.js', responseData);
    return createResponse(200,responseData);
    }

    if (requestBody.sessionInfo.parameters.webhook === 'breakFast'){
      const breakFastResponse = await breakfast(client,hotelId);
      console.log('Index.js', JSON.stringify(breakFastResponse));
      let responseData = {
            "session_info":{
              "parameters": {
                "breakFastResponse": breakFastResponse
              }
            } 
      };
      console.log('Index.js', responseData);
    return createResponse(200,responseData);
    }

    if (requestBody.sessionInfo.parameters.webhook === 'restaurant'){
      const getHotelsWithRestaurantResponse = await getHotelsWithRestaurant(client,hotelId);
      console.log('Index.js', getHotelsWithRestaurantResponse);
      let responseData = {
            "session_info":{
              "parameters": {
                "getHotelsWithRestaurantResponse": getHotelsWithRestaurantResponse
              }
            } 
      };
      console.log('Index.js', responseData);
    return createResponse(200,responseData);
    }

    if (requestBody.sessionInfo.parameters.webhook === 'location'){
      const locationResponse = await location(client,hotelId);
      console.log('Index.js', JSON.stringify(locationResponse));
      let responseData = {
            "session_info":{
              "parameters": {
                "locationResponse": locationResponse
              }
            } 
      };
      console.log('Index.js', responseData);
    return createResponse(200,responseData);
    }

    if (requestBody.sessionInfo.parameters.webhook === 'getRoomCategories'){
      const getRoomCategoryResponse = await getRoomCategories(client,hotelId);
      console.log('Index.js', JSON.stringify(getRoomCategoryResponse));
      let responseData = {
            "session_info":{
              "parameters": {
                "getRoomCategoryResponse": getRoomCategoryResponse
              }
            } 
      };
      console.log('Index.js', responseData);
    return createResponse(200,responseData);
    }
    
    // if (requestBody.sessionInfo.parameters.webhook === 'checkAvailability') {
    //   const { year, month, day } = requestBody.sessionInfo.parameters.arrivaldate;
    //   const formattedArrivalDate = `${year}-${month}-${day}`;
    
    //   const { year: year1, month: month1, day: day1 } = requestBody.sessionInfo.parameters.departuredate;
    //   const formattedDepartureDate = `${year1}-${month1}-${day1}`;
  
    //   const adultCount = requestBody.sessionInfo.parameters.no_adult;
    //   const childCount = requestBody.sessionInfo.parameters.no_children;
    //   const email = requestBody.sessionInfo.parameters.email;
    //   const phone = requestBody.sessionInfo.parameters.phone_number;
    
    //   const checkAvailabilityResponse = await checkRoomAvailability(client, hotelId, formattedArrivalDate, formattedDepartureDate, adultCount, childCount);
    //   console.log('Index.js', JSON.stringify(checkAvailabilityResponse));
    //   // const roomInfo = checkAvailabilityResponse.response.roomInfo[0];
    //   // const emailContent = getFormattedEmailContent(roomInfo,formattedArrivalDate,formattedDepartureDate,adultCount,childCount,email,phone);
    //   // sendEmail(hotelId,"Booking Quotation",emailContent);
    //   let responseData = {
    //     "session_info": {
    //       "parameters": {
    //         "bookingResponse": checkAvailabilityResponse
    //       }
    //     }
    //   };
    //   console.log('Index.js', responseData);
    //   return createResponse(200, responseData);
    // }

    // if (requestBody.sessionInfo.parameters.webhook === 'checkAvailabilityForGroupBooking') {
    //   const { year, month, day } = requestBody.sessionInfo.parameters.arrivaldate;
    //   const formattedArrivalDate = `${year}-${month}-${day}`;
    
    //   const { year: year1, month: month1, day: day1 } = requestBody.sessionInfo.parameters.departuredate;
    //   const formattedDepartureDate = `${year1}-${month1}-${day1}`;
  
    //   const adultCount = requestBody.sessionInfo.parameters.no_people;
    //   const name = requestBody.sessionInfo.parameters.name;
    //   const phone = requestBody.sessionInfo.parameters.phone_number;
    //   const email = requestBody.sessionInfo.parameters.email;
    //   const averageAge = requestBody.sessionInfo.parameters.avg_age;
    //   const rooms = requestBody.sessionInfo.parameters.no_rooms;
  
    //   const groupBookingResponse = await groupBookingCheckAvailability(client, hotelId, adultCount, formattedArrivalDate, formattedDepartureDate);
    //   console.log('Index.js', JSON.stringify(groupBookingResponse));
    //   // const roomInfo = groupBookingResponse.response.roomInfo[0];
    //   // const emailContent = getFormattedEmailContentForGroupBooking(roomInfo,formattedArrivalDate,formattedDepartureDate,adultCount,name,email,phone,averageAge,rooms);
    //   // sendEmail(hotelId,"Group Booking Quotation",emailContent);
    //   let responseData = {
    //     "session_info": {
    //       "parameters": {
    //         "groupBookingResponse": groupBookingResponse
    //       }
    //     }
    //   };
    //   console.log('Index.js', responseData);
    //   return createResponse(200, responseData);
    // }
    
  } catch (error) {
    console.log('Error in Lambda =>', error);
    let responseData = {
      fulfillment_response: {
        messages: [
          'Something went wrong with Webhook API.'
        ]
      }
    }
   
    return responseData;
  }
};
const createResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    body: JSON.stringify(body)
  };
};

module.exports = {
  handler,
  webhook,
};
