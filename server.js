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
]), (req, res) => {
    const results = [];
    fs.createReadStream(dataFile)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            const exists = results.find(l => l.CNIC === req.body.cnic);
            if (exists) {
                // Delete uploaded images if duplicate CNIC
                if (req.files['profile_image']) fs.unlinkSync(req.files['profile_image'][0].path);
                if (req.files['license_image']) fs.unlinkSync(req.files['license_image'][0].path);
                return res.status(409).json({ error: 'License with this CNIC already exists' });
            }

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

// API to get all licenses (view data)
app.get('/api/licenses', (req, res) => {
    const results = [];
    fs.createReadStream(dataFile)
        .pipe(csvParser())
        .on('data', (data) => {
            // Only push if it has a CNIC (not an empty object from empty line)
            if (data.CNIC || data.cnic) results.push(data);
        })
        .on('end', () => {
            res.json(results);
        });
});

// API to delete license by CNIC
app.delete('/api/license/:cnic', (req, res) => {
    const results = [];
    fs.createReadStream(dataFile)
        .pipe(csvParser())
        .on('data', (data) => {
            if (data.CNIC || data.cnic) results.push(data);
        })
        .on('end', async () => {
            const recordToDelete = results.find(l => (l.CNIC || l.cnic) === req.params.cnic);

            if (!recordToDelete) {
                return res.status(404).json({ error: 'License not found' });
            }

            const filteredResults = results.filter(l => (l.CNIC || l.cnic) !== req.params.cnic);

            try {
                // Delete associated images
                const profilePathRelative = recordToDelete.PROFILE_IMAGE_PATH || recordToDelete.profile_image_path;
                const licensePathRelative = recordToDelete.LICENSE_IMAGE_PATH || recordToDelete.license_image_path;

                if (profilePathRelative) {
                    const profilePath = path.join(__dirname, profilePathRelative);
                    if (fs.existsSync(profilePath)) fs.unlinkSync(profilePath);
                }
                if (licensePathRelative) {
                    const licensePath = path.join(__dirname, licensePathRelative);
                    if (fs.existsSync(licensePath)) fs.unlinkSync(licensePath);
                }

                // Re-initialize writer WITHOUT append for overwriting
                const overwriteWriter = csvWriter({
                    path: dataFile,
                    header: [
                        { id: 'CNIC', title: 'CNIC' },
                        { id: 'LIC_NO', title: 'LIC_NO' },
                        { id: 'NAME', title: 'NAME' },
                        { id: 'FATHER_NAME', title: 'FATHER_NAME' },
                        { id: 'DOB', title: 'DOB' },
                        { id: 'DISTRICT', title: 'DISTRICT' },
                        { id: 'ISSUE_DATE', title: 'ISSUE_DATE' },
                        { id: 'VALID_FROM', title: 'VALID_FROM' },
                        { id: 'VALID_TO', title: 'VALID_TO' },
                        { id: 'VEHICLES', title: 'VEHICLES' },
                        { id: 'STATUS', title: 'STATUS' },
                        { id: 'PROFILE_IMAGE_PATH', title: 'PROFILE_IMAGE_PATH' },
                        { id: 'LICENSE_IMAGE_PATH', title: 'LICENSE_IMAGE_PATH' }
                    ],
                    append: false
                });

                // Map results to ensure keys match the writer's header IDs (uppercase)
                const normalizedResults = filteredResults.map(l => ({
                    CNIC: l.CNIC || l.cnic,
                    LIC_NO: l.LIC_NO || l.lic_no,
                    NAME: l.NAME || l.name,
                    FATHER_NAME: l.FATHER_NAME || l.father_name,
                    DOB: l.DOB || l.dob,
                    DISTRICT: l.DISTRICT || l.district,
                    ISSUE_DATE: l.ISSUE_DATE || l.issue_date,
                    VALID_FROM: l.VALID_FROM || l.valid_from,
                    VALID_TO: l.VALID_TO || l.valid_to,
                    VEHICLES: l.VEHICLES || l.vehicles,
                    STATUS: l.STATUS || l.status,
                    PROFILE_IMAGE_PATH: l.PROFILE_IMAGE_PATH || l.profile_image_path,
                    LICENSE_IMAGE_PATH: l.LICENSE_IMAGE_PATH || l.license_image_path
                }));

                await overwriteWriter.writeRecords(normalizedResults);
                res.json({ message: 'License and associated images deleted successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to delete record' });
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
