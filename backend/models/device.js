import mongoose from "mongoose";
const { Schema, model } = mongoose;

const deviceSchema = new Schema({
    serialNumber: {
        type: String,
        required: true,
        unique: true,
      },
      type: {
        type: String,
        enum: ['pos', 'kiosk', 'signage'],
        required: true,
      },
      locationName: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
      },
    
});

export default model('Device', deviceSchema); 