const InvariatError = require("../../exceptions/InvariantError");
const { userPayloadSchema } = require("./schema")

const UsersValidator = {
    validateUserPayload: (payload) => {
        const validationresult = userPayloadSchema.validate(payload);

        if (validationresult.error) {
            throw new InvariatError(validationresult.error.message);
        }
    },
};

module.exports = UsersValidator;
