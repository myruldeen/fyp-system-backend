const Sequelize = require('sequelize');
const sequelize = new Sequelize('fyp-project', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    dialectOptions: {
        timezone: process.env.db_timezone,
    },
});
const Student = sequelize.define('students', {
    studentID: { type: Sequelize.STRING },
    supervisor: { type: Sequelize.INTEGER },
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    photo: { type: Sequelize.STRING },
    course: { type: Sequelize.INTEGER },
    programmeLevel: { type: Sequelize.INTEGER },
    intake: { type: Sequelize.STRING },
});
const Supervisor = sequelize.define('supervisor', {
    supervisorID: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    photo: { type: Sequelize.STRING },
    faculty: { type: Sequelize.STRING },
});
const Project = sequelize.define('projects', {
    title: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING },
    date: { type: Sequelize.DATE },
    content: { type: Sequelize.TEXT },
    description: { type: Sequelize.TEXT },
    imageURL: { type: Sequelize.STRING },
    category: { type: Sequelize.STRING },
});
const Admin = sequelize.define('admin', {
    username: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
});
init = function () {
    sequelize
        .authenticate()
        .then(function () {
            console.log('mysql connected');
        })
        .catch(function (err) {
            console.log(err);
        });
    sequelize.sync({ force: true }).then(function () {
        Project.bulkCreate([
            {
                title: 'My 1 project',
                slug: 'my-first-project',
                content: 'This is my first project',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a eros eget justo feugiat ultricies eget eu diam. Vivamus id erat blandit, sollicitudin arcu quis, placerat quam. Vestibulum nec elit at nisi pharetra commodo. Donec rutrum arcu leo, id dictum tellus fringilla lobortis. Maecenas nec nisl eu urna malesuada sagittis eu ac lectus. Aenean bibendum condimentum felis, eu commodo est mollis sit amet. Nam at leo at ante fermentum auctor ut et enim. Duis pretium augue mauris, et scelerisque ligula porttitor in. Nullam varius ultricies lacus at dapibus. Donec id accumsan mauris. Phasellus pretium purus eu massa tincidunt tincidunt. Etiam vehicula pretium purus, sed elementum sapien aliquet ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in aliquet nibh.',
                imageURL: 'https://via.placeholder.com/150',
                date: new Date(),
                category: 'system',
            },
            {
                title: 'My 2 project',
                slug: 'my-second-project',
                content: 'This is my second project',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a eros eget justo feugiat ultricies eget eu diam. Vivamus id erat blandit, sollicitudin arcu quis, placerat quam. Vestibulum nec elit at nisi pharetra commodo. Donec rutrum arcu leo, id dictum tellus fringilla lobortis. Maecenas nec nisl eu urna malesuada sagittis eu ac lectus. Aenean bibendum condimentum felis, eu commodo est mollis sit amet. Nam at leo at ante fermentum auctor ut et enim. Duis pretium augue mauris, et scelerisque ligula porttitor in. Nullam varius ultricies lacus at dapibus. Donec id accumsan mauris. Phasellus pretium purus eu massa tincidunt tincidunt. Etiam vehicula pretium purus, sed elementum sapien aliquet ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla in aliquet nibh.',
                imageURL: 'https://via.placeholder.com/150',
                date: new Date(),
                category: 'network',
            },
        ]).catch(function (err) {
            console.log(err);
        });
        Admin.create({
            username: 'admin',
            password: 'password123',
        }).catch(function (err) {
            console.log(err);
        });
    });
};

projectList = function (callback) {
    Project.findAll()
        .then(function (project) {
            callback(null, project);
        })
        .catch(function (err) {
            callback(err);
        });
};

getProjectBySlug = function (slug, callback) {
    Project.findOne({ where: { slug: slug } })
        .then(function (project) {
            callback(null, project);
        })
        .catch(function (err) {
            callback(err);
        });
};

// Student SQL
studentList = function (callback) {
    Student.findAll()
        .then(function (project) {
            callback(null, project);
        })
        .catch(function (err) {
            callback(err);
        });
};
getStudentByStudentID = function (id, callback) {
    Student.findOne({ where: { studentID: id } })
        .then(function (student) {
            callback(null, student);
        })
        .catch(function (err) {
            callback(err);
        });
};

uploads = function (data, callback) {
    const student = data.students.map(function (data) {
        return {
            studentID: data.ID,
            name: data.Name,
            email: data.Email,
        };
    });
    const sv = data.supervisor.map(function (data) {
        return {
            supervisorID: data.ID,
            name: data.Name,
            email: data.Email,
        };
    });
    Student.bulkCreate(student)
        .then(() => {
            return Supervisor.bulkCreate(sv);
        })
        .then(() => {
            callback(null, 'All data inserted!');
        })
        .catch((err) => {
            callback(err);
        });
};

module.exports.init = init;
module.exports.projectList = projectList;
module.exports.getProjectBySlug = getProjectBySlug;
module.exports.uploads = uploads;

module.exports.studentList = studentList;
module.exports.getStudentByStudentID = getStudentByStudentID;
