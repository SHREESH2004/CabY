import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import { createUser } from "../service/user.service.js";
export const registerUser=async(req,res,next)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})

}
}