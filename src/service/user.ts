import userModel from  "../model/user.js"
import jwt from "jsonwebtoken";
export interface createUserPayload{
    name:string,
    email:string,
    password:string
}
export interface createtoken{
    email:string,
    password:string
}
class userservice{
    public static  createUser(payload:createUserPayload)
    {
        return userModel.create(payload)

    }
    public static async getuserTokken(payload:createtoken)
    {
        const {email,password}=payload;
        const checkinfUser=await userModel.findOne({email:email})
        if(!checkinfUser)
        {
            throw new Error("user not found")
        }
        if(checkinfUser.password!=password)
        {
            throw new Error("user password is wrong")
        }
        const token=jwt.sign({email:email,password},"sumitrawat",{expiresIn:"10days"})
        return token
    }
    public static async decodeTokken(token:string)
    {
        return jwt.verify(token,"sumitrawat")
    }

}
export default userservice