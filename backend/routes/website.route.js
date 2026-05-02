import express from "express";
import { changeWebsite, generateWebsite, getAllWebsite, getWebsiteById } from "../controllers/website.controller.js";
import isAuth from "../middlewares/isAuth.js";

const websiteRouter = express.Router();

websiteRouter.post("/generate", isAuth, generateWebsite);
websiteRouter.post('/change/:id', isAuth, changeWebsite);
websiteRouter.get('/get-by-id/:id', isAuth, getWebsiteById);
websiteRouter.get('/get-all', isAuth, getAllWebsite);

export default websiteRouter;