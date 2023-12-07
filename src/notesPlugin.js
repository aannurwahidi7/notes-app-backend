const notesPlugin = {
    register: async (server, options) => {
        const notes = options.notes;
        server.route([
            {
                method: 'GET',
                path: '/notes',
                handler: () => {
                    return notes;
                }
            }
        ]);
    }
}

module.exports = notesPlugin;