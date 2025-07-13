const { supabase} = require('../config/db');
require('dotenv').config();

BUCKET_NAME = process.env.BUCKET_NAME


async function fetchBucketData(store_ID){ 
    try{
        const {data: files , error} = await supabase.storage
            .from(BUCKET_NAME)
            .list(store_ID, {
                limit: 100,
                offset: 0
            })

        
        if(files.length === 0){
            return 1;
        }
            
        if(error){
            throw new Error(`Error while fetching files : ${error.message}`)
        }
        if (!files || files.length === 0) {
            throw new Error(`${store_ID} STORE BUCKET IS EMPTY.`)
        }

        // Find directories ( UserName ) under store_ID
        const userFolders = files.filter(file => file.name && !file.name.includes('.'))
        
        if (userFolders.length === 0) {
            throw new Error(`${store_ID} STORE BUCKET IS EMPTY.`)
        }

        // RESULT ARRAY
        const results = [];

        // Process each user folder
        for (const userFolder of userFolders) {
            const username = userFolder.name
            const userPath = `${store_ID}/${username}`

            // List files in the user's folder
            const { data: userFiles, error: userFilesError } = await supabase.storage
                .from(BUCKET_NAME)
                .list(userPath, {
                limit: 100,
                offset: 0
            })

            if (userFilesError) {
                console.error(`Error listing files for user ${username}:`, userFilesError.message)
                continue
            }

            // Process document files (PDF, DOC, DOCX)
            const documentFiles = userFiles.filter(file => {
                if (!file.name) return false
                const fileName = file.name.toLowerCase()
                return fileName.endsWith('.pdf') || 
                    fileName.endsWith('.doc') || 
                    fileName.endsWith('.docx')
            })

            for (const docFile of documentFiles) {
                const documentFilename = docFile.name
                const filePath = `${userPath}/${documentFilename}`

                // Get the public URL for the document
                const { data: urlData } = supabase.storage
                    .from(BUCKET_NAME)
                    .getPublicUrl(filePath)


                const documentLink = urlData.publicUrl

                results.push({
                    username,
                    documentFilename,
                    documentLink
                })
            }
        }

        if (results.length === 0) {

            throw new Error(`${store_ID} STORE BUCKET IS EMPTY.`) 
        }

        return results  
    
    }catch(error){
        console.log(`Error while fetching files : ${error.message}`);
        throw error
    }
}



module.exports = fetchBucketData