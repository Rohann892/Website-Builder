import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["ai", "user"],
        required: true
    },
    content: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const websiteModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        default: "Untitled website",
    },
    latestCode: {
        type: String,
        required: true,
    },
    conversation: [
        messageSchema
    ],
    deployed: {
        type: Boolean,
        default: false
    },
    deployedUrl: {
        type: String,
        default: null,
    },
    slug: {
        type: String,
        unique: true
    }
}, { timestamps: true })


const Website = mongoose.model("Website", websiteModel);
export default Website;