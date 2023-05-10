import mongoose from 'mongoose';

let models = {};

main().catch(err => console.log(err))
async function main(){
    console.log('connecting to mongodb')
    await mongoose.connect('mongodb+srv://dagfrg:tomboy13@cluster0.fiejtze.mongodb.net/websitesharer?retryWrites=true&w=majority')

    console.log('succesffully connected to mongodb!')

    const postSchema = new mongoose.Schema({
        url: String,
        description: String,
        search: String,
        created_date: Date
    })

    models.Post = mongoose.model('Post', postSchema)
    console.log('mongoose models created')
}

export default models;