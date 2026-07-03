import { Router } from "express"
import { registerUser } from "../controller/user.controller.js"
import { userLogIn , userLogOut} from "../controller/log.controller.js"
import { verifyJWT } from "../middleware/verifyUser.middleware.js"
import { sendOTP } from "../controller/OTP.controller.js"
import { verifyOTP } from "../controller/verifyOTP.controller.js"
import { currentUser } from "../controller/currentUser.controller.js"
import { getData } from "../controller/getData.controller.js"

const router = Router()


router.route("/login").post(userLogIn);
router.route("/signup").post(sendOTP);
router.route("/signout").post( verifyJWT , userLogOut);
router.route("/finalSignUp").post(registerUser);
router.route("/OTP-verify").post(verifyOTP);
router.route("/current-user").post(verifyJWT , currentUser);
router.route("/getdata").get(getData);

export default router