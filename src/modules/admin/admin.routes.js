const {getAdmins,createAdmin,loginAdmin,updateAdmin} = require('./admin.controller')

module.exports = (app) => {
    app.get('/admins', getAdmins);
    app.post('/admins', createAdmin);
    app.post('/adminlogin', loginAdmin);
    app.put('/updateadmin', updateAdmin);
};