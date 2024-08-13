import userservice, { createUserPayload ,createtoken } from "../service/user"
import userModel from "../model/user"
 const queries={
   getuserdetailTokken:async(_:any,payload:createtoken)=>{
      const data=await userservice.getuserTokken(payload)
      return data
    },
    getCurrentLoggedInUser:async (_: any, parameters: any, context: any) => {
      if (context && context.user) {
        const id = context.user.id;
        const user = await userModel.findOne(id);
        return user;
      }
      throw new Error("I dont know who are you");
    },
 }
 const mutation={
    createUser:async(_:any,payload:createUserPayload)=>{
        const result=await userservice.createUser(payload)
        return `user is created successfullly ${result._id}`;

    }
 }
 export const resolver={queries,mutation}