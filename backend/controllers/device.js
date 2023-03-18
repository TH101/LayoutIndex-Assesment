import Device from "../models/device.js";
import Location from "../models/location.js";
const deviceController = {
  addDevice: async (req, res) => {
    try {
      const { serialNumber, type, locationName, image, status, locationId } =
        req.body;
      //check parent ID was existing
      const ExistingDevice = await Device.findOne({
        serialNumber: serialNumber,
      });
      const ExistingLocation = await Location.findOne({ name: locationName });
      if (ExistingDevice)
        return res.status(400).json({
          message: "This serialNumber already add to the DB",
        });

      if (!ExistingLocation) {
        return res.status(400).json({
          message: "This location didn't have in DB",
        });
      }

      const newDevice = new Device({
        serialNumber,
        type,
        locationName,
        image,
        status,
      });
      await newDevice.save();

      if (res) {
        res.json({
          message: "New Device Added Success",
          data: newDevice,
        });

        await Location.updateOne(
          { _id: locationId },
          { $push: { devices: type } }
        );
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getAllDevices: async (req, res) => {
    try {
      const devices = await Device.find();
      res.json({
        message: "All Devices fetch success",
        data: devices,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getOneDevice: async (req, res) => {
    const id = req.params.id;
    try {
      const device = await Device.findOne({ _id: id });
      res.json({
        message: "device fetch success",
        data: device,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  updateDevice: async (req, res) => {
    try {
      const id = req.params.id;
      const { serialNumber, type, locationName, image, status } = req.body;

      const ExistingDevice = await Device.findOne({
        serialNumber: serialNumber,
      });
      const ExistingLocation = await Location.findOne({ name: locationName });
      if (ExistingDevice)
        return res.status(400).json({
          message: "This serialNumber already add to the DB",
        });

      if (!ExistingLocation) {
        return res.status(400).json({
          message: "This location didn't have in DB",
        });
      }

      await Device.findOneAndUpdate(
        { _id: id },
        { serialNumber, type, locationName, image, status }
      );
      res.json({
        message: "Device update success",
        data: { serialNumber, type, locationName, image, status },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  deleteDevice: async (req, res) => {
    try {
      const id = req.params.id;

      await Device.findByIdAndDelete({ _id: id });
      res.json({ message: "delete success !" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteDeviceRemoveLocation: async (req, res) => {
    try {
      const id = req.params.id;

      const device = await Device.findOne({ _id: id });
      const ExistingLocation = await Location.findOne({
        name: device.locationName,
      });
      await Location.updateOne(
        { _id: ExistingLocation._id },
        { $pull: { devices: device.type } }
      );
      await Device.findByIdAndDelete({ _id: id });
      if (res) {
        res.json({ message: "delete success !" });
        await Location.updateOne(
          { _id: ExistingLocation._id },
          { $pull: { devices: device.type } }
        );
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },


};
export default deviceController;