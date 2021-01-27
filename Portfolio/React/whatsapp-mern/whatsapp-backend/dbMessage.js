import mongoose from 'mongoose';
// Define Data Schema

// @ts-ignore
const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timeStamp: String,
    received: Boolean,
});

export default mongoose.model('messagecontents', whatsappSchema); //collectionName collection 