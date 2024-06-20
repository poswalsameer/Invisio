import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        unique: true,
        required: [true, "Password is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiry: {
        type: Date
    },
    verifyToken: {
        type: String
    },
    verifyTokenExpiry: {
        type: Date
    }

})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User