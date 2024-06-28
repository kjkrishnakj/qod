import Quote from "../../models/Quote";
import connectDb from "../../middleware/connectDb";

const handler = async (req, res) => {
    try {
        let quotes = await Quote.find();
        res.status(200).json(quotes);
    } catch (error) {
        console.error("Error fetching quotes:", error);
        res.status(500).json({ message: "Error fetching quotes" });
    }
};  

export default connectDb(handler);
