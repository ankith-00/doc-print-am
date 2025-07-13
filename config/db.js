require('dotenv').config(); 
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);


// FUNCTION TO CHECK DB CONNECTION
async function checkDbConnection() {
    const {error} = await supabase.from('store-data').select('id').limit(1);
    if (error) {
        console.log(error.message)
        return false;
    }else{
        return true;
    }
}

module.exports = { supabase, checkDbConnection };