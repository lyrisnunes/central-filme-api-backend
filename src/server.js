require("express-async-errors");

const migrationRun = require("./database/sqlite/migrations");
migrationRun();

const express = require("express");
const app = express();
app.use(express.json());

const routes = require("./routes");
app.use(routes);

const AppError = require("./utils/AppError");

app.use((error, request, response, next)=> {
   if( error instanceof AppError){
      return  response.status(error.statusCode).json({
         status: "error",
         message: error.message
      });
   }

   return response.status(500).json({
      status: "error",
      "message": "Internal server error",
   })
})


const PORT = 2000;
app.listen(PORT, () => console.log(`server ${PORT}`))