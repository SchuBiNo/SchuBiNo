import mongoose from 'mongoose';

const MODEL_NAME = 'Todo';

const TodoSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			index: true,
		},
		date: {
			type: Date,
		},
		title: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models[MODEL_NAME] ||
	mongoose.model(MODEL_NAME, TodoSchema);
