const mongoose = require('mongoose')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const app = express();
const userRoutes = require('./routes/userRoutes')
const PORT = 5000;
const CON_STR = 'mongodb://127.0.0.1:27017/quora'

app.use(helmet())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes)

mongoose.connect(CON_STR, { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connection.on('open', () => console.log('server is connected'))
mongoose.connection.on('error', (err) => console.log(err))
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
