import mongoose from 'mongoose';

const connectDb = handler => async (req, res) => {
    const atlasUri = "mongodb://localhost:27017/qod";

    if (mongoose.connections[0].readyState) {
        return handler(req, res);
    }

    try {
        await mongoose.connect(atlasUri);
    } catch (error) {
        return res.status(500).json({ message: "Database connection failed" });
    }

    return handler(req, res);
};

export default connectDb;
