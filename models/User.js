import mongoose from 'mongoose';

const MODEL_NAME = 'users';

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Username is required'],
			unique: [true, 'Username has to be unique'],
		},
		email: {
			type: String,
			required: [true, 'E-Mail is required'],
			unique: [true, 'E-Mail has to be unique'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
	},
	{ timestamps: false }
);

export default mongoose.models[MODEL_NAME] ||
	mongoose.model(MODEL_NAME, UserSchema);
