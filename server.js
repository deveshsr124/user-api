const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
app.use(express.json());
app.use('/users', userRouter);

mongoose.connect('mongodb://localhost/users', { useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => console.log('error'));
db.once('open', () => console.log('database connected '));

app.listen(3000, () => console.log('server started'));
