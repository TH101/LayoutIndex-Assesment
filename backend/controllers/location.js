import Location from "../models/location.js";

const locationController={
    AddLocation: async (req, res) => {
        try {
            const { name, address, phone,devices,locationID} = req.body;
            //check parent ID was existing
            const ExistingName= await Location.findOne({ name:name });
            if (ExistingName)
                return res.status(400).json({
                    message: "This Location already add to the DB",
                });

            const newLocation = new Location({
                name, address, phone,devices
            });
            await newLocation.save();
            res.json({
                message: "New Device Added Success",
                data: newLocation,
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getAllLocation: async (req, res) => {
        try {
          const locations = await Location.find();
          res.json({
            message: "All locations fetch success",
            data: locations
          });
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      },

    getOneLocations: async (req, res) => {
        const id = req.params.id;
        try {
            const location = await Location.findOne({ _id: id });
            res.json({ message: "device fetch success", 
            data: location });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    updateLocation: async (req, res) => {
        try {
          const id = req.params.id;
          const {name, address, phone,devices} = req.body;
    
          await Location.findOneAndUpdate(
            { _id: id },
            { name, address, phone,devices}
          );
          res.json({
            message: "Location update success",
            data: {name, address, phone,devices},
          });
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      },

};
export default locationController;