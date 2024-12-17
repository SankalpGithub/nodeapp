import user from '../models/user.js'

export const insertUser = async (body) => {
    try {
        user.create({
            name: body.name,
            username: body.username,
            email: body.email,
            password: body.password,
            otp: body.otp,
            verify: body.verify
        })
    } catch (err) {
        throw err
    }
}

export const isUserExist = async (username, email) => {
    try {

        const isEmailexist = await user.findOne({ email: email })
        const isUsernameexist = await user.findOne({ username: username });

        if (isEmailexist) {
            const res = {
                msg: "Email already exist",
                status: true
            }
            return res

        } else if (isUsernameexist) {
            const res = {
                msg: "Username exist",
                status: true
            }
            return res

        } else {
            const res = {
                msg: "user not exist",
                status: false
            }
            return res
        }
    } catch (error) {
        throw error
    }
}

export const getOtpFromDb = async (email) => {
    const userCollection = await user.findOne({email: email});
    const otp = userCollection.otp
    return otp;
}

export const updateVerifyField = async (email) => {
    try {
        const filter = {email: email}
    const updateDoc = {
        $set: {
            verify: true
        }
    };

   const updateVerify = await user.updateOne(filter, updateDoc)

   return updateVerify;
    } catch (error) {
        throw error;
    }
}

export const deleteOtpField = async (email) => {
    try {
        const filter = {email: email}
        const updateDoc = {
            $unset: {
                otp: ""
            }
        }

        const deletOtp = await user.updateOne(filter, updateDoc)

        return deletOtp
    } catch (error) {
        throw(error)
    }
}