const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const csvParser = require('csv-parser');

const app = express();
const port = 3000;

// Setup directories
const uploadsDir = path.join(__dirname, 'uploads');
const dataFile = path.join(__dirname, 'data.csv');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Initial CSV headers
const writer = csvWriter({
    path: dataFile,
    header: [
        { id: 'cnic', title: 'CNIC' },
        { id: 'lic_no', title: 'LIC_NO' },
        { id: 'name', title: 'NAME' },
        { id: 'father_name', title: 'FATHER_NAME' },
        { id: 'dob', title: 'DOB' },
        { id: 'district', title: 'DISTRICT' },
        { id: 'issue_date', title: 'ISSUE_DATE' },
        { id: 'valid_from', title: 'VALID_FROM' },
        { id: 'valid_to', title: 'VALID_TO' },
        { id: 'vehicles', title: 'VEHICLES' },
        { id: 'status', title: 'STATUS' },
        { id: 'profile_image_path', title: 'PROFILE_IMAGE_PATH' },
        { id: 'license_image_path', title: 'LICENSE_IMAGE_PATH' }
    ],
    append: fs.existsSync(dataFile)
});

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dlims/dlims.punjab.gov.pk')));
app.use('/uploads', express.static(uploadsDir));

// API to save license data
app.post('/api/license', upload.fields([
    { name: 'profile_image', maxCount: 1 },
    { name: 'license_image', maxCount: 1 }
]), async (req, res) => {
    try {
        const record = {
            ...req.body,
            profile_image_path: req.files['profile_image'] ? `/uploads/${req.files['profile_image'][0].filename}` : '',
            license_image_path: req.files['license_image'] ? `/uploads/${req.files['license_image'][0].filename}` : ''
        };

        await writer.writeRecords([record]);
        res.status(201).json({ message: 'License data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});


// API to verify license
app.get('/api/license/:cnic', (req, res) => {
    const results = [];
    fs.createReadStream(dataFile)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const license = results.find(l => l.CNIC === req.params.cnic);
            if (license) {
                res.json(license);
            } else {
                res.status(404).json({ error: 'License not found' });
            }
        });
});

// Custom 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'dlims/dlims.punjab.gov.pk/404.html'));
});

// Global error handler (500)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'dlims/dlims.punjab.gov.pk/error.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
