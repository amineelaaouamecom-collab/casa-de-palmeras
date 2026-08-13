import mongoose, { Schema, Document } from 'mongoose';

export interface ICar extends Document {
    name: string;
    brand: string;
    categoryId: string;
    categoryLabel: string;
    description: string;
    features: string[];
    idealFor: string;
    comfort: string;
    carUsage: string[];
    image: string;
    // We explicitly add a virtual 'id' to match frontend expectations
}

const CarSchema: Schema = new Schema({
    _id: { type: String, required: true }, // Custom string ID like 'dacia-logan'
    name: { type: String, required: true },
    brand: { type: String, required: true },
    categoryId: { type: String, required: true },
    categoryLabel: { type: String },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    idealFor: { type: String },
    comfort: { type: String },
    carUsage: { type: [String], default: [] }, // Using carUsage to avoid conflict with potential RESERVED words
    image: { type: String }
}, {
    _id: false, // We provide our own _id
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.id = ret._id;
            ret.usage = ret.carUsage; // Map carUsage to usage for frontend compatibility
            delete ret.carUsage;
            delete ret.__v;
        }
    },
    toObject: { virtuals: true }
});

export default mongoose.model<ICar>('Car', CarSchema);
