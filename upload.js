const fs = require('fs');
const multer = require('multer');
const convertExcelToJson = require('convert-excel-to-json');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const filename = 'dataFile.xlsx';
        cb(null, filename);
    },
});
const filter = (req, file, cb) => {
    if (!file.originalname.match(/\.(xls|xlsx)$/)) {
        return cb(new Error('Only xlsx document'));
    }
    cb(null, true);
};
module.exports = function (app, sql) {
    app.use(multer({ storage: storage, fileFilter: filter }).single('file'));
    app.post('/uploads', function (req, res) {
        const data = convertExcelToJson({
            sourceFile: './uploads/dataFile.xlsx',
            header: {
                rows: 1,
            },
            sheets: [
                {
                    name: 'students',
                    columnToKey: {
                        A: 'ID',
                        B: 'Name',
                        C: 'Email',
                    },
                },
                {
                    name: 'supervisor',
                    columnToKey: {
                        A: 'ID',
                        B: 'Name',
                        C: 'Email',
                    },
                },
            ],
        });
        sql.uploads(data, function (err, result) {
            res.send(result);
        });
    });
};
