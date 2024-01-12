const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariatError = require('../../exceptions/InvariantError');

class CollaborationsService {
    constructor(cacheService) {
        this._pool = new Pool();
        this._cacheService = cacheService;
    }

    getAllFunc() {
        const func = ['addCollaboration', 'deleteCollaboration', 'verifyCollabolator'];
        return func;
    }

    async addCollaboration(noteId, userId) {
        const id = `collab-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id',
            values: [id, noteId, userId],
        };

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new InvariatError('Kolaborasi gagal ditambahkan');
        }

        await this._cacheService.delete(`notes:${userId}`);

        return result.rows[0].id;
    }

    async deleteCollaboration(noteId, userId) {
        const query = {
            text: 'DELETE FROM collaborations WHERE note_id = $1 AND user_id = $2 RETURNING id',
            values: [noteId, userId],
        };

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new InvariatError('Kolaborasi gagal dihapus');
        }

        await this._cacheService.delete(`notes:${userId}`);
    }

    async verifyCollaborator(noteId, userId) {
        const query = {
            text: 'SELECT * FROM collaborations WHERE note_id = $1 AND user_id = $2',
            values: [noteId, userId],
        };

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new InvariatError('Kolaborasi gagal diverifikasi');
        }
    }
}

module.exports = CollaborationsService;
