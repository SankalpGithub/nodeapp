import { Router } from "express";
import * as userController from "../controller/user.js";
import { validedRegistrationFields, handleValidationErrors, validateOTP} from "../validation/user.js";

const router = Router();

//Post methods
router.route("/registration")
    .post(validedRegistrationFields, handleValidationErrors, userController.registration);

router.route("/verifyOtp")
    .post(validateOTP, handleValidationErrors, userController.verifyOtp)

router.route("/login").post((req,res) => {res.json({msg: "login post route"})});

//put methods
router.route("/resetPassword").put((req,res) => {res.json({msg: "resetpassword route"})})

export default router;