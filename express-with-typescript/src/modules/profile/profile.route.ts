import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

// __________ create profile ____________________

router.post("/", profileController.createProfile);


// __________ get profile ____________________


export const profileRoute = router;