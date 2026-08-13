import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    id: string; // Manually managing ID to match frontend 'citadine', 'suv' etc. if needed, OR we rely on auto-generated _id
    label: string;
    icon: string;
}

// NOTE: The frontend relies on string IDs like 'citadine', 'suv'. 
// We should probably allow the user to provide a custom ID or we map it. 
// For simplicity in the Admin Panel "Add Category", we'll stick to a custom string ID if possible, 
// or let Mongo generate it and update frontend.
// However, looking at the previous Cars data, categoryId was 'citadine' etc.
// So we should enforce these IDs or allow custom _id.
// Let's use flexible schema that allows string _id.

const CategorySchema: Schema = new Schema({
    _id: { type: String, required: true }, // We will use the 'id' field from the form as the _id
    label: { type: String, required: true },
    icon: { type: String, required: true }
}, {
    _id: false, // We provide our own _id
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            // delete ret._id; // Don't delete _id if we defined it manually, but usually frontend wants 'id'.
            // If we use _id as the primary key string, ret.id will be that string.
            delete ret.__v;
        }
    }
});

export default mongoose.model<ICategory>('Category', CategorySchema);
