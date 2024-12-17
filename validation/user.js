import { body, validationResult } from "express-validator";

export const validedRegistrationFields = [
    body('username')
        .isAlphanumeric().withMessage("Username should contain only alphabets and numbers.")
        .matches(/^\S*$/).withMessage("Username should not contain whitespace."),

    body('email')
        .isEmail().withMessage("Invalid email address."),

    body('password')
        .isLength({ min: 6 }).withMessage("Password length should be greater than or equal to 6."),
];

export const validateOTP = [
    body('email')
        .isEmail().withMessage("Invalid email address."),
        
    body('otp').isNumeric().withMessage("OTP should be a numeric value only")
    .custom((value) => {
        if (value.toString().length !== 4) {
          throw new Error('OTP should be exactly 4 digits');
        }
        return true;
      })
];

// Middleware to handle validation results
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
