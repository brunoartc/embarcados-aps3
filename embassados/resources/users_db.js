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







module.exports = { registerSensorData };
