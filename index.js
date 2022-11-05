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

    //Heading
    server.route({
        method: 'GET',
        path: '/books',
        handler: bookController.index
    });

    //Create Note
    server.route({
        method: 'POST',
        path: '/books',
        handler: bookController.store
    });

    //Get list of Notes and filter the list using query parameters
    server.route({
        method: 'GET',
        path: '/books/{id}',
        handler: bookController.show
    });

    //Update Note
    server.route({
        method: 'PUT',
        path: '/api/note/{id}',
        handler: async (request, h) => {
            let params = request.params.id;
            let info = request.payload;
            let infos = await Note.updateOne({ _id: params }, info).lean();
            return h.response(infos);
        }
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