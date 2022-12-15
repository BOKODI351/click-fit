const express = require('express');
const multer = require('multer');
const path = require('path')
const app = express();
const port = 80;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload_images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) =>
    {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error("Only .png, .jpg and .jpeg format allowed"))
        }
    }
});

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/assets', express.static(__dirname + 'public/assets'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/*', (req, res) => {
    res.send('ERROR')
})

app.post('/', upload.single('image'), (req, res) => {
    res.render('index');
});


app.listen(port, () => console.log(`Listening on port: ${port}`));