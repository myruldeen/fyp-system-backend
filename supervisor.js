module.exports = function (app, sql) {
    app.get('/supervisor', function (req, res) {
        sql.studentList(function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.get('/supervisor/:supervisorid', function (req, res) {
        sql.getStudentByStudentID(req.params.studentid, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.post('/supervisor', function (req, res) {
        sql.createStudent(req.body, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.put('/supervisor', function (req, res) {
        sql.editStudent(req.body, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.delete('/supervisor', function (req, res) {
        sql.deleteStudent(req.body, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
};
