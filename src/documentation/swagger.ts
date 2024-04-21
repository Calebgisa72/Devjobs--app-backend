import swaggerAutogen from "swagger-autogen";
const apiDoc = {
  openapi: "3.0.0",
  info: {
    title: "Dev Job API DOCUMENTATION",
    description: "Documentation for the Express API endpoints of the DevJob project",
    version: "1.0.0",
    contact: {
      name: "Gisa M. Caleb",
      email: "gisacaleb72@gmail.com",
    },
  },
  servers: [
    {
      url: "https://devjobs-app-backend.onrender.com",
      
    },
    {
      url: "http://localhost:3000",
      
    },
  ],
  paths: {},
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
const outputFilePath = "./swagger_output.json";
const endpointsFilePaths = ["../app.ts"];
swaggerAutogen({ openapi: "3.0.0" })(
  outputFilePath,
  endpointsFilePaths,
  apiDoc
);