import mongoose from 'mongoose';

const MODEL_NAME = 'CalEvent';

const CalEventSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			index: true,
		},
		date: {
			type: Date,
			required: true,
			index: true,
		},
		title: {
			type: String,
		},
		body: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.models[MODEL_NAME] ||
	mongoose.model(MODEL_NAME, CalEventSchema);
