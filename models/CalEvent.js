import mongoose from 'mongoose';

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

const CalEventModel = mongoose.model('CalEvent', CalEventSchema);

export default CalEventModel;
