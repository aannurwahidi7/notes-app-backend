require('dotenv').config();

const Hapi = require('@hapi/hapi');
// const routes = require('./api/notes/routes');
const notes = require('./api/notes');
const NotesService = require('./api/services/postgres/NotesService');
const NotesValidator = require('./validator/notes');

const users = require('./api/users');
const UserService = require('./api/services/postgres/UserService');
const UsersValidator = require('./validator/users');

const init = async () => {
    const notesService = new NotesService();
    const userService = new UserService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        }
    });

    await server.register([
        {
            plugin: notes,
            options: {
                service: notesService,
                validator: NotesValidator,
            },
        },
        {
            plugin: users,
            options: {
                service: userService,
                validator: UsersValidator,
            },
        },

    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
