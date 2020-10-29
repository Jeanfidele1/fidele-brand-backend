const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/fidele_brand_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connected to mongodb success....'))
.catch(err =>console.log('Failed to connect to mongodb!',err));

require('./users.modal');
require('./blogs.modal');
require('./inquiry.modal');
