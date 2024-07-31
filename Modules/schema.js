import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
    {
        id: String,
        description: String,
        module: String,
    }, {collection: "lessons"});

const moduleSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        course: String,
        lessons: {
            type: [lessonSchema],
            default: []
        },
    }, {collection: "modules"});

export default moduleSchema;