// Assuming you are using a SQL database with the 'mysql2' library for the database connection
const mysql = require('mysql');

// Replace these with your actual database connection details

const pool = mysql.createPool({
  host: '13.228.131.80',
  user: 'fullcircledata',
  password: 'M#d4Ktre3ToY&8F',
  database: 'fullcircledata_bd',
})

const getHotelEmailById = async (hotelId) => {
  try {
    const [rows] = await pool.query('SELECT hotel_email FROM business WHERE mews_hotel_id = ?', [hotelId]);
    console.log("Business");
    

    if (rows.length === 0) {
      throw new Error(`Hotel with id ${hotelId} not found.`);
    }

    return rows[0].hotel_email;
  } catch (error) {
    console.error('Error while fetching hotel email:', error.message);
    throw error;
  }
};

const getConfigurationId = async (hotelId) => {
  try {
    const [rows] = await pool.query('SELECT configuration_id FROM business WHERE mews_hotel_id = ?', [hotelId]);
    console.log("Business-Configuration");
    

    if (rows.length === 0) {
      throw new Error(`Hotel with id ${hotelId} not found.`);
    }

    return rows[0].configuration_id;
  } catch (error) {
    console.error('Error while fetching hotel email:', error.message);
    throw error;
  }
};

async function insertCustomerId(customerId, categoryId, rateId, firstName, lastName, email, phone, startDate, endDate,reservationGroupId) {
  const query = 'INSERT INTO customers (id, firstname, lastname, email, phone, room_category_id, rate_id, start_date, end_date,reservation_group_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
  const values = [customerId, firstName, lastName, email, phone, categoryId, rateId, startDate, endDate,reservationGroupId];
  try {
    const insertResult = await pool.query(query, values);

    console.log('CustomerId inserted:'+JSON.stringify(insertResult));

    return insertResult;
  } catch (error) {
    console.error('Error inserting CustomerId:', error);
    throw error;
  }
};

const getReservationGroupId = async (email,arrivalDate) => {

  try {
    const [rows] = await pool.query('SELECT reservation_group_id FROM customers WHERE email = ? and start_date = ?', [email,arrivalDate]);
    console.log("getReservationGroupId");

    if (rows.length === 0) {
      throw new Error(`Reservation with id ${email} not found.`);
    }

    return rows[0].reservation_group_id;
  } catch (error) {
    console.error('Error while fetching Reservation:', error.message);
    throw error;
  }
};

module.exports = {
  getHotelEmailById,
  getConfigurationId,
  insertCustomerId,
  getReservationGroupId
};
