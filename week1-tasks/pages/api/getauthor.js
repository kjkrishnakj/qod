import connectDb from "../../middleware/connectDb";
import Quote from "../../models/Quote";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { searchText } = req.body;  

        try {
            let quote = await Quote.findOne({ author: searchText });

            if (quote) {
                res.status(200).json({ success: true, quote });
            } else {
                res.status(200).json({ success: false, message: "Quote not found" });
            }
        } catch (error) {
            console.error("Error fetching quote:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    } else {
        res.status(400).json({ success: false, error: "Invalid request method" });
    }
};

export default connectDb(handler);
