const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerSpec.js'); 

const router = require("./routes")

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json())
app.use("/api", router)

app.listen(PORT, ()=>{
    console.log(`Сервер запущен на http://localhost:${PORT}`);
})