import crypto from 'crypto'

// Function to generate a numeric OTP of a given length
export function generateOTP() {
    const length = 4;
    const otp = crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, '0');
    return otp;
}