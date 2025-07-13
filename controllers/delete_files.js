const { supabase} = require('../config/db');
require('dotenv').config();

BUCKET_NAME = process.env.BUCKET_NAME

async function deletePdfFiles(DocLink, SID, UserName, FileName){    
    try{

        // DELETE FILE 
        const { error } = await supabase.storage.from(BUCKET_NAME).remove([`${SID}/${UserName}/${FileName}`]);
        
        if (error) {
            console.error('Error deleting file:', error);
            return false;
        }

        // console.log(`Deleted ${data.length > 1 ? 'only 1 file' : 'the last file'} from ${UserName}`);
        return true;

    }catch(error){
        console.log('Error While Deleting File : ', error.message);   
    }
}

module.exports = deletePdfFiles;