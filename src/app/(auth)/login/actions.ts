import {z} from "zod"


const registerSchema = z.object({
    userId : z.string().toLowerCase(),
    password: z.string()
})

export const loginActions = async (prevState :any, formData:FormData)=>{
    const data = {
        userId : formData.get("userId"),
        password: formData.get("password",)
    }

    const result = registerSchema.safeParse(data);
    if(!result.success){
        return result.error.flatten();
    }
    else{
        console.log(result.data);
    }
}