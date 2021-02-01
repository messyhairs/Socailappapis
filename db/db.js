const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/socailapp";
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('Hello SOCIAL APP database connected');
    } else {
        console.log('Database connection get failed')
    }
});
