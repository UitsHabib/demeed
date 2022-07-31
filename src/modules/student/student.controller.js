const Student = require('./student.model')

const getStudents = (req, res) => {
    Student.findAll()
    .then(students => {
        res.send(students);
    })
    .catch(error => {
        console.log(error);
    })
}

const createStudent =  (req, res) => {
    const student = {
        roll: req.body.roll,
        name: req.body.name
    }

    Student.create(student).then(student => {
        res.send(student);
    }).catch(error => {
        console.log(error);
    });
}

 module.exports.getStudents = getStudents;
 module.exports.createStudent = createStudent;