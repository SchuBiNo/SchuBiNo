import mongoose from 'mongoose';

const CalEventSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
		},
		events: {
			type: String,
		},
	},
	{ timestamps: false }
);

const CalEventModel = mongoose.model('CalEvent', CalEventSchema);

export default CalEventModel;
