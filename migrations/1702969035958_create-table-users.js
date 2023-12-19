/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        username: {
            type: 'VARCHAR(50)',
            unique: true,
            notMNull: true,
        },
        password: {
            type: 'TEXT',
            notMNull: true,
        },
        fullname: {
            type: 'TEXT',
            notMNull: true,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('users');
};
