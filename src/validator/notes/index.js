const InvariatError = require("../../exceptions/InvariantError");
const { NotePayloadSchema } = require("./schema")

const NotesValidator = {
    validateNotePayload: (payload) => {
        const validationResult = NotePayloadSchema.validate(payload);

        if(validationResult.error) {
            throw new InvariatError(validationResult.error.message);
        }
    },
}

module.exports = NotesValidator;