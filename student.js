module.exports = function (app, sql) {
    app.get('/students', function (req, res) {
        sql.studentList(function (err, result) {
            if (err) throw err;
            res.send(
                result.map((data) => {
                    return {
                        id: data.studentID,
                        name: data.name,
                        email: data.email,
                    };
                })
            );
        });
    });
    app.get('/students/:id', function (req, res) {
        sql.getStudentByStudentID(req.params.id, function (err, result) {
            if (err) throw err;
            if (result === null) {
                return res.send('User not found!');
            }
            res.send({
                id: result.studentID,
                name: result.name,
                email: result.email,
            });
        });
    });
    app.post('/students', function (req, res) {
        sql.createStudent(req.body, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.put('/students', function (req, res) {
        sql.editStudent(req.body, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.delete('/students', function (req, res) {
        sql.deleteStudent(req.body, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
};
