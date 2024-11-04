const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');
const authRoutes = require('./routes/auth');
const showRoutes = require('./routes/shows');
const authMiddleware = require('./middlewares/authMiddleware');
// const Show = require('./models/show');
// const fs = require('fs');
// const csvParser = require("csv-parser");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
}))

app.use('/auth', authRoutes);
app.use('/shows', authMiddleware, showRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Hello there!</h1>')
  })

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})


// try {
//     fs.createReadStream("./data.csv")
//       .pipe(csvParser())
//       .on("data", (row) => {
//         const show = new Show(row);
//         show.save();
//       })
//       .on("end", () => {
//         console.log("Data has been inserted successfully.");
//       });
//   } catch (error) {
//     console.log(error.message);
//   }