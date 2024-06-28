import connectDb from "../../middleware/connectDb";
import Quote from "../../models/Quote";

const handler = async (req, res) => {
  if (req.method == 'POST') {
    let u = new Quote(req.body)
    await u.save();
    res.status(200).json({ success: "success" });
  }
  else {
    res.status(400).json({ error: "error" });

  }
}

export default connectDb(handler)
