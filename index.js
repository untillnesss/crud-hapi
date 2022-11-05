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

    //Delete Note
    server.route({
        method: 'DELETE',
        path: '/api/note/{id}',
        handler: async (request, h) => {
            let params = request.params.id;
            let infos = await Note.remove({ _id: params });
            return h.response(infos);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

};

//Error handling
// process.on('unhandledRejection', (err) => {
//     console.log(err);
//     process.exit(1);
// });

init();