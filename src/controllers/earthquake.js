const Earthquake = require("../models/earthquake");

const addEarthquake = async (req, res) => {
  const {
    type,
    properties: { mag, place, time, types, title },
    geometry: { coordinates },
    id
  } = req.body;
  const earthquake = new Earthquake({
    type,
    properties: {
      mag,
      place,
      time,
      types,
      title
    },
    geometry: {
      coordinates
    },
    id
  });
  await earthquake.save();
  return res.json(earthquake);
};

const getEarthquake = async (req, res) => {
  try {
    const { id } = req.params;
    const earthquake = await Earthquake.findById(id).exec();
    if (!earthquake) {
      return res.status(404).json("Earthquake not found!");
    }
    return res.json(earthquake);
  } catch {
    return res.status(404).json("Earthquake not found!");
  }
};

const getTopTenEarthquakes = async (req, res) => {
  const earthquakes = await Earthquake.find()
    .sort({ "properties.mag": -1 })
    .sort({ "properties.time": -1 })
    .limit(10)
    .exec();
  return res.json(earthquakes);
};

const updateEarthquake = async (req, res) => {
  const { id } = req.params;
  const {
    type,
    properties: { mag, place, time, types, title },
    geometry: { coordinates }
  } = req.body;
  const updatedEarthquake = await Earthquake.findByIdAndUpdate(
    id,
    {
      type,
      properties: { mag, place, time, types, title },
      geometry: { coordinates }
    },
    { new: true }
  ).exec();
  if (!updatedEarthquake) {
    return res.status(404).json("Earthquake not found!");
  }
  return res.json(updateEarthquake);
};

const retrieveAllEarthquakes = async (req, res) => {
  try {
    await Earthquake.insertMany(req.body);
    return res.status(200).json("Earthquake retrieved successfully!");
  } catch {
    res.status(404).json("Failed to retrieve!");
  }
};

module.exports = {
  addEarthquake,
  getEarthquake,
  getTopTenEarthquakes,
  updateEarthquake,
  retrieveAllEarthquakes
};
