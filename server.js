const express         = require('express'),
      bodyParser      = require('body-parser'),
      mongoose        = require('mongoose'),
      app             = express(),
      port            = 3000;



//Setup Port
app.listen(port, (err)=>{
  if(err){
    console.log('Listening to Port error')
  }
    console.log(`Now Listening on Port: ${port}`)
})
