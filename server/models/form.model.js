import mongoose from 'mongoose';

const FieldSchema = new mongoose.Schema({
  type: String,
  label: String,
  placeholder: String,
  required: Boolean,
  options: [String] // For dropdown, radio
}, { _id: false });

const FormSchema = new mongoose.Schema({
  title: String,
  description: String,
  fields: [FieldSchema],
  style: {
    color: String,
    font: String,
    layout: String
  }
}, { timestamps: true });

export default mongoose.model('Form', FormSchema);