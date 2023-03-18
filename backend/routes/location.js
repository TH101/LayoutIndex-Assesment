import { Router } from "express";
const locationRoute = Router();
import locationController from "../controllers/location.js";


locationRoute.post(
    "/api/location/create",
    locationController.AddLocation
  );
  locationRoute.get(
    "/api/location/",
    locationController.getAllLocation
  );

  locationRoute.get(
    "/api/location/:id",
    locationController.getOneLocations
  );

  locationRoute.put(
    "/api/update/location/:id",
    locationController.updateLocation
  );





export default locationRoute;