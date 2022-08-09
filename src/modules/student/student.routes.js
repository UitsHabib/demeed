const { getStudents, createStudent} = require("./student.controller");

module.exports = (app) => {

    app.get('/students', getStudents);

    app.post('/students', createStudent);
};