import { Schema, model, models } from 'mongoose';

const counterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  sequenceValue: { type: Number, default: 1 },
});

export const Counter = models?.Counter || model('Counter', counterSchema);
