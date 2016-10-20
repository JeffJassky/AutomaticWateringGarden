// DEPENDENCIES
const SerialPort = require('serialport');

// LOCAL VARIABLES
const pnpId = 'usb-Arduino__www.arduino.cc__Arduino_Uno_64935343333351505151-if00';
var port;

SerialPort.list(function (err, ports) {
	ports.forEach(function(port) {
		if(port.pnpId === pnpId){
			connectPort(port.comName);
		}
	});
});

function connectPort(portName){
	port = new SerialPort(
		portName,
		{
			parser: SerialPort.parsers.readline('\r\n')
		}
	).on('open',onPortOpen).on('data', onPortData);
}

function onPortOpen(err){
	if(err){
		return console.log('could not find arduino');
	}else{
		console.log('Arduino connected');
	}
}

function onPortData(data){
	data = data.split(',');
	console.log({
		moisture: data[0],
		luminosity: data[2]
	});
}
