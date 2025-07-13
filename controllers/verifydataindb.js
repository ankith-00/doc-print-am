const {supabase} = require('../config/db');
require('dotenv').config();

const tableName = process.env.TABLE_NAME 

async function CheckDataInDB(store_ID) {

    const { data, error } = await supabase
        .from(tableName)
        .select('Password')
        .eq('store_ID', store_ID)
        .limit(1) 
        .single(); 
    if (error) {
        console.error('Error fetching password:', error.message);
        return null;
    }
    return data ? data.Password : null;;
}


module.exports = CheckDataInDB;