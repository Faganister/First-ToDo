require('./instrument.js');
const Sentry = require('@sentry/node');

const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerSpec.js'); 

const router = require("./routes")



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json())
app.use("/api", router)

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

Sentry.setupExpressErrorHandler(app);
app.listen(PORT, ()=>{
    console.log(`Сервер запущен на http://localhost:${PORT}`);
})