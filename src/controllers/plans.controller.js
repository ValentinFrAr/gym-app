const dotenv = require("dotenv").config();
const db = require("../db");
const nodemailer = require("nodemailer");

exports.subscribePlan = async (req,res,next) => {
    const user_id = req.params.id
    const {plan , expires_date} = req.body
    const query = "UPDATE gym.plans SET plan = $1, expires_date = $2  WHERE user_id = $3"
    const values = [plan, expires_date, user_id]
    db.query(query,values, (error,results,fields)=>{
        if (error) {
            res.status(400).json({message:"Error subscribing plan",error:error.message})
        }
    return res.status(200).json({message:"Plan subscribed successfully"})
    })
}

