import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'CRUD API',
      version: '1.0.0',
      description: 'Documentação da API com Swagger'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: ''
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js'] // caminhos onde estarão os comentários JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;