import mongoose from 'mongoose';
// Define Data Schema

const whatsappSchema = new mongoose.Schema({
    message: String,
    name: String,
    timeStamp: String,
    received: Boolean,
});

export default mongoose.model('messageContent', whatsappSchema); //collectionName collection 