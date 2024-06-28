import connectDb from "../../middleware/connectDb";
import User from "../../models/User";


const handler = async (req,res)=>{
 
    if(req.method =='POST'){
        let token = req.body.token
        
        
        
        let dbuser = await User.findOne({ "email": req.body.email })
 
        const {name,email} = dbuser
        res.status(200).json({name,email})
    }
    else{

        res.status(400).json({ error:'error' });
    }
}
export default connectDb(handler)
