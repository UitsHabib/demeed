const path = require("path");
const mysql = require('mysql2/promise');

function init() {
    const sequelize = require(path.join(process.cwd(), "/src/config/lib/sequelize.js"));

    mysql.createConnection({ host: 'localhost', port: 3306, password: '', database: 'test_blog' })
        .then((connection) => {
            connection.query('CREATE DATABASE IF NOT EXISTS blog', (err, res) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(res);

                    const user = require(path.join(process.cwd(), "src/modules/user/user.model.js"));
                    const student = require(path.join(process.cwd(), "src/modules/student/student.model.js"));

                    sequelize.sync()
                        .then(() => console.log("success"))
                        .catch((err) => console.log(err));
                }
            });
        })
        .catch(err => {

        })

    // sequelize.authenticate()
    //     .then(() => {

    //     })
    //     .catch(err => {

    //     })

    // const user = require(path.join(process.cwd(), "src/modules/user/user.model.js"));
    // const student = require(path.join(process.cwd(), "src/modules/student/student.model.js"));

    // sequelize.sync()
    // .then(() => console.log("success"))
    // .catch((err) => console.log(err));
    
}

init();