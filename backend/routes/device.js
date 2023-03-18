import { Router } from "express";
const deviceRoute = Router();
import deviceController from "../controllers/device.js";

deviceRoute.post(
    "/api/device/create",
    deviceController.addDevice
  );
  deviceRoute.get(
    "/api/device/",
    deviceController.getAllDevices
  );
  deviceRoute.get(
    "/api/device/:id",
    deviceController.getOneDevice
  );
  deviceRoute.put(
    "/api/device/update/:id",
    deviceController.updateDevice
  );
  deviceRoute.delete(
    "/api/device/delete/:id",
    deviceController.deleteDevice
  );

  deviceRoute.delete(
    "/api/device/deleteDeviceRemoveLocation/:id",
    deviceController.deleteDeviceRemoveLocation
  );
export default deviceRoute;