const path = require('path');
const validate = require(path.join(process.cwd(), 'src/modules/core/middlewares/validator.middleware'));
const { registerSchema } = require('./permission.schema');

const { permissions, permission } = require('./permission.controller');

module.exports = app => {
    app.get('/api/permissions', permissions);
    app.post('/api/permissions/permission', validate(registerSchema),  permission);
}