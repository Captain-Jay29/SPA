const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Credentials", {
	useNewUrlParser: true,
	useUnifiedTopology: true,

})
.then(() => {
	console.log("mongodb connected");
})

.catch((e) => {
	console.log(e)
	console.log("failed to connect");
})

const sc = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
})


const collection = new mongoose.model("Collection", sc)

module.exports = collection

