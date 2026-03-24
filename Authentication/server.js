require('dotenv').config();
const app = require('./src/app.js');
const connectDB = require('./src/db/db.js');

connectDB();

const PORT = 5173;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})