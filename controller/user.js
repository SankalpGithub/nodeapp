import { sendEmail } from "../utils/send-mail.js"
import { generateOTP } from "../utils/otp.js";
import { hashPassword, verifyHashPassword } from "../utils/hash-password.js"
import { newBody } from "../middlewares/user.js";
import { insertUser, isUserExist, getOtpFromDb, updateVerifyField, deleteOtpField} from "../repository/user.js";

//controller for register user
export async function registration(req, res) {
    const password = req.body.password
    const username = req.body.username;
    const email = req.body.email;

    // Check if username or email already exists
    const userExist = await isUserExist(username, email)

    if (userExist.status) {
        return res.status(409).json({
            error: userExist.msg
        });
    } else {
        //otp generation
        const otp = generateOTP();

        //password hash
        const hashpassword = await hashPassword(password);

        //middleware for make new body to add some paramerters
        const newbody = newBody(hashpassword, req.body, otp)

        //insert user and send email
        await insertUser(newbody).then(() => {

            //send email otp
            sendEmail("22co17@aiktc.ac.in", "Test Mail", `Hello user ${otp}`)

            return res.status(201).json({
                msg: "User Register successfully"
            })
        }).catch((error) => {
            return res.status(500).json({
                msg: "Faild to register",
                err: error
            })
        })
    }
}

//controller for verify otp
export async function verifyOtp(req, res) {
    const email = req.body.email;
    const otp = req.body.otp;

    const userExist = await isUserExist(" ", email)

    if(userExist.status){
        //verify the otp from db
        const dbOtp = await getOtpFromDb(email);
        if(otp == dbOtp){
            //make verify field true
            updateVerifyField(email);
            //delete otp field
            deleteOtpField(email)
            return res.json({
                msg: "otp matched"
            })
        }else{
            return res.status(401).json({
                msg: "otp incorrect"
            })
        }
    }else{
        return res.status(404).json({
            msg: "user not found"
        })
    }
}

//resend otp


//login

//resetpasswrod