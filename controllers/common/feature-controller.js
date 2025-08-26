import { Feature } from '../../models/Feature.js'

export const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

export const deleteFeatureImage = async (req, res) => {
  const { id } = req.body;

  console.log("image", id)
  try {
    const image = await Feature.findByIdAndDelete(id);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found", 
      });
    }
    res.status(200).send({success: true, message: "Image deleted successfully"});
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting image",
    });
  }
}
