import mongoose from 'mongoose';

const MODEL_NAME = 'Grades';

const GradesSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			index: true,
		},
		grades: {
			type: Array,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.models[MODEL_NAME] ||
	mongoose.model(MODEL_NAME, GradesSchema);
