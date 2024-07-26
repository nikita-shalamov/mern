import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import routerAuth from './routes/auth.routes.js'; // Correct path to auth.routes.js
import routerLink from './routes/link.routes.js';
import redirectRouter from './routes/redirect.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ extended: true }));
app.use('/api/auth', routerAuth);
app.use('/api/link', routerLink);
app.use('/t', redirectRouter);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = config.get('port') || 3000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'));
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}`);
        });
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();
