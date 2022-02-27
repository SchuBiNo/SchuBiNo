import mongoose from 'mongoose';

const MODEL_NAME = 'OAuthUser';

const OAuthUserSchema = new mongoose.Schema(
	{
		user_id: {
			type: String,
			required: [true, 'user_id is required'],
		},
		oauth: {
			provider: {
				type: String,
				required: [true, 'provider is required'],
			},
			account_id: {
				type: String,
				required: [true, 'account_id is required'],
			},
			access_token: {
				type: String,
				required: [true, 'access_token is required'],
			},
			refresh_token: {
				type: String,
			},
			expires: {
				type: Number,
			},
		},
	},
	{ timestamps: false }
);

export default mongoose.models.OAuthUser ||
	mongoose.model(MODEL_NAME, OAuthUserSchema);
