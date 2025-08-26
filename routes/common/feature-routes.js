import express from "express";

import {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImages,
} from "../../controllers/common/feature-controller.js";

const featureRouter = express.Router();

featureRouter.post("/add", addFeatureImage);
featureRouter.get("/get", getFeatureImages);
featureRouter.delete("/delete", deleteFeatureImage);

export default featureRouter;