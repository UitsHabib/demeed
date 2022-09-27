const { createPermissionSet } = require('./permission-set.controller');

const validate = require('../core/middlewares/validator.middleware');
const { permissionSetSchema } = require('./permission-set.schema');

module.exports = app => {
    app.post('/api/permissions', createPermissionSet);
}