const ExportNotePayloadSchema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ExportsValidator = {
    validateExportNotesPayload: (payload) => {
        const validationResult = ExportNotePayloadSchema.validate(payload);

        if(validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = ExportsValidator;
