import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task API',
            version: '1.0.0',
            description: 'API for managing Task',
            contact: {
                name: 'Alberto Veliz'
            },
            servers: [
                {
                    url: 'http://localhost:8000',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['./swagger/*.yml']
};

const specs = swaggerJsdoc(options);
export default specs;