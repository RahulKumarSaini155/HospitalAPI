const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;






app.use('/', require('./routes'));

app.listen(PORT, (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log('Server is connected on PORT: ', PORT);
});