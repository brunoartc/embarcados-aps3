var crypto = require("crypto")

async function registerSensorData(name, data, timestamp) {
  return new Promise(function (resolve, reject) {


    if (name != undefined && data != undefined && timestamp!=undefined) {

		global.conn.collection("sensors").insertOne({ "name": name, "data": data, "timestamp": timestamp }, (error, resp) => {
			  if (error){

			  } else {
				console.log(resp);
			  }
			  
			  
			  resolve({ "status": "success", "data": { "data": "DATAINSERTED", "id": resp.ops[0]._id } })
		})

    } else {
      reject({ "status": "fail", "data": { "data": "MISSINGDATAORSENSORNAMEORTIMESTAMP" } })
    }

  })
}




async function getSensorData(callback) {
  return new Promise(function (resolve, reject) {

		let data_last = {}


		console.log("sensor data");

		global.conn.collection("sensors").find().sort({ $natural: -1 }).limit(1).toArray(callback);
		

		global.conn.collection("sensors").find({ "name": "analogico" }).sort({ $natural: -1 }).limit(1).toArray((e,docs) => {
			console.log(" resp sensor data");

					data_last.analogic = docs;
					global.conn.collection("sensors").find({ "name": "digital" }).sort({ $natural: -1 }).limit(1).toArray((e,docs) => {
						data_last.digital = docs;
						resolve({ "status": "success", "data": { "name": "SENSORS", "data": data_last } })
					})
			  
			  
			  //reject({ "status": "error", "data": "?" })
		})

  })
}







module.exports = { registerSensorData, getSensorData };
