import { Router } from "express";
import { asyncHandler } from "../../Services/errorHandling.js";
import * as ReviewController from './Controller/review.controller.js'
import { auth, roles } from "../../Middleware/auth.js";

const router=Router({mergeParams:true})

router.post('/create',auth(roles.User),asyncHandler(ReviewController.createReview))

export default router;