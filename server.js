const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;
const JWT_KEY = process.env.JWT_KEY



// MIDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());





// VIEW ENGINE SETUP
app.set('view engine', 'ejs');

// TO ACCESS STATIC FILES
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));




// CONTROLLER MODULES
const sendEmail = require('./controllers/email')
const CheckDataInDB = require('./controllers/verifydataindb')
const fetchBucketData = require('./controllers/fetchfiles')
const deletePdfFiles = require('./controllers/delete_files')


// SUBAPASE DB CONFIGURATION
const { checkDbConnection , supabase} = require('./config/db');

checkDbConnection().then((status) => {
    if (status) {
        console.log('✅ DB Connected');
    } else {
        console.error("⭕ DB not connected.");
    }
});





// HOME PAGE ROUTE
app.get('/', (req, res) => {
  res.render('index')

});


// STORE REGISTRATION ROUTE
app.get('/store-registration', (req, res) => {
  res.render('register');
});


// STORE REGISTRATION API
app.post('/store-registration', async (req, res)=>{
  // console.log('✅ STORE REGISTRATION API ROUTE HIT');
  try{
    const {storeName , storeAddress , ownerName , email ,phoneNumber , password} = req.body;
    // console.log('trying to add new user : ', ownerName)

    // CREATING STORE ID 
    const store_ID = (storeName.substring(0, 4) + phoneNumber.substring(2, 6)).toUpperCase();
    console.log(store_ID)

    const saltRounds = 12;
    const Password = await bcrypt.hash(password, saltRounds);

    const {data , error} = await supabase
      .from('store-data')
      .insert([{store_ID ,storeName , storeAddress , ownerName , email ,phoneNumber , Password}])
    // console.log(data)

    if(error){
      // console.log(error)
      return res.status(500).json({
                registrationStatus: false,
                message: "Database error while registering store"
      });
    }
    res.json({
      registrationStatus : true,
      message: 'Store registered successfully'
    });

    // SENDING EMAIL TO USER MAIL
    sendEmail(email,ownerName,store_ID)

  }catch(error){
    res.json({
      registrationStatus : false,
      message: 'Internal server error'
    })
  }
});



// DOC PRINT INFO ROUTE
app.get('/doc-print-info', (req, res) => {
  res.render('info');
});


// MIDDLE WARE TO CHECK USER IS LOGINED WITH VALID CREDENTIALS OR NOT 
function authenticateStore(req, res , next){
    const token = req.cookies.authToken;
    if (!token) {
        return res.redirect('/login');
    }
    try {
        const store_ID = jwt.verify(token, JWT_KEY);
        req.user = store_ID; 
        next(); 
    } catch (error) {
        res.clearCookie('authToken');
        return res.redirect('/login');
  }
}




// STORE LOGIN ROUTE
app.get('/login', (req, res) => {
  res.render('login');
});


// STORE LOGIN API
app.post('/logto-dashboard', async (req, res)=>{
  // console.log('✅ LOGIN API ROUTE HIT');
  try{
    const {store_ID , password} = req.body;

    // CHECK EXISTENCE OF STORE ID & RETURN PASSWORD
    const dbPass = await CheckDataInDB(store_ID)

    if(!dbPass){
      res.json({
        status: 401,
        loginStatus: false,
        message: 'Invalid Credentials'
      })
    }

    // MATCH 'HASHED PASSWORD' WITH USER INPUT PASSWORD
    const match = await bcrypt.compare(password, dbPass);
    if(!match){
      res.json({
        status: 401,
        loginStatus: false,
        message: 'Invalid Credentials'
      })
    }

    // CREATE A 'JWT TOKEN' AND SEND TO USER BROWSER
    const token = jwt.sign({store_ID: store_ID}, JWT_KEY, { expiresIn: '1d' });
    res.cookie('authToken', token,{
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000 // EXPIRE IN 1DAY
    });

    // SENDING LOGIN STATUS
    res.json({
        status: 200,
        loginStatus: true,
        message: 'Login successful',
    });
    
  }catch(error){
    console.log('ERROR WHILE LOGING : ', error);
    res.json({
        status: 401,
        message: 'Invalid Credentials'
    });
  }
}); 


// LOGOUT API ROUTE
app.get('/logout', (req, res) => {
  // console.log('✅ LOGOUT ROUTE HIT');
  // CLEAR COOKIES : ( JWT TOKEN ) AND REDIRECT TO LOGIN ROUTE
  res.clearCookie('authToken');
  res.redirect('/login');
});



// DASHBOARD ROUTE
app.get('/dashboard', authenticateStore, (req, res) => {
    res.render('dashboard', { store_ID: req.user.store_ID });
});




// RETRIVE 'PDFS' FROM DB
app.get('/fetch-pdf-files', async (req ,res) =>{
  
  // GET STORE ID
  const token = req.cookies.authToken;
  const { store_ID: SID } = jwt.verify(token, JWT_KEY);

  try{
      data = await fetchBucketData(SID);
      res.status(200).json(data);
  }catch(error){
    console.error('Error fetching PDF files:', error.message);
  }
});



// DELETE 'PDFS' FROM DB
app.post('/delete-pdf-files', async (req, res) => {
  
  // GET STORE ID FROM COOKIE
  const token = req.cookies.authToken;
  const { store_ID: SID } = jwt.verify(token, JWT_KEY); 
  
  // FILE DETAILS
  const {URL, UserName, FileName} = req.body;

  // Calling Delete function
  DeleteFunResponse = await deletePdfFiles(URL, SID, UserName, FileName);
  
  res.json({ 
    DeleteFunResponse,
    message: 'Document deleted', 
  });
});





// INVALID ROUTES HANDLING
app.use((req, res) => {
  res.redirect('/');
});

// SERVER LISTENING MESSSAGE
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🔗 VISIT : http://localhost:${PORT}\n`);
})