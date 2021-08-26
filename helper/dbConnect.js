import mongoose from 'mongoose';
import tempDBinfo from './tempDBinfo';
//import config from './config';

try {
	mongoose
		.connect(String(tempDBinfo /*config.mongo.endpoint*/), {
			//user: config.mongo.user,
			//pass: config.mongo.password,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('Connected to DB!');
		});
} catch (e) {
	console.log(e);
}

export default mongoose.connection;
