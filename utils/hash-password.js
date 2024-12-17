import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    try {
        const saltRound = 10;
        const hashpassword = await bcrypt.hash(password, saltRound);
        return hashpassword
    } catch (error) {
        throw error
    }
}

export const verifyHashPassword = async (plainPassword, hashPasswordText) => {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashPasswordText)
        return isMatch
    } catch (error) {
        throw error
    }
}