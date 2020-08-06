module.exports = function (app, sql) {
    app.get('/projects', function (req, res) {
        sql.projectList(function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
    app.get('/projects/:slug', function (req, res) {
        sql.getProjectBySlug(req.params.slug, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });
};
