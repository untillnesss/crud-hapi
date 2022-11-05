'use strict';

//Import Hapi
import Hapi from '@hapi/hapi';
import bookController from './src/bookController.js';

const init = async () => {

    //Server configuration
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: true
        }
    });

    server.route({
        method: 'GET',
        path: '/books',
        handler: bookController.index
    });

    server.route({
        method: 'POST',
        path: '/books',
        handler: bookController.store
    });

    server.route({
        method: 'GET',
        path: '/books/{id}',
        handler: bookController.show
    });

    server.route({
        method: 'PUT',
        path: '/books/{id}',
        handler: bookController.update
    });

    server.route({
        method: 'DELETE',
        path: '/books/{id}',
        handler: bookController.delete
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

};

init();