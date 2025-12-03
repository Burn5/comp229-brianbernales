const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Portfolio';
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(URI, { serverSelectionTimeoutMS: 5000, directConnection: true, family: 4 })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(e => console.error('❌ MongoDB error:', e.message));


app.use('/api/users',     require('./server/routes/userRoutes'));
app.use('/api/contacts',  require('./server/routes/contactRoutes'));
app.use('/api/projects',  require('./server/routes/projectRoutes'));
app.use('/api/education', require('./server/routes/educationRoutes'));
app.use('/api/services',  require('./server/routes/serviceRoutes'));
app.use('/api/auth',      require('./server/routes/authRoutes'));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/', (_req, res) => res.json({ message: 'Welcome to My Portfolio Application.' }));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
