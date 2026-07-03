import passport from "passport";
import { googleLogin } from "../middleware/googlelogin.middleware.js";

googleLogin(passport)