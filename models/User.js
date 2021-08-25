import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Username is required'],
			unique: [true, 'Username has to be unique'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
	},
	{ timestamps: false }
);

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
