require('./instrument');
const Sentry = require('@sentry/node');

const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
Sentry.setupExpressErrorHandler(app);
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerSpec.js'); 

const router = require("./routes")

// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler());
// app.use(Sentry.Handlers.errorHandler());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json())
app.use("/api", router)

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

app.listen(PORT, ()=>{
    console.log(`Сервер запущен на http://localhost:${PORT}`);
})