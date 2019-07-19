//% weight=0 color=#3CB371 icon="\uf1b3" block="TPH sensor"

namespace tphsensor {

	let T1 = 0
	let T2 = 0
	let T3 = 0
	let P1 = 0
	let P2 = 0
	let P3 = 0
	let P4 = 0
	let P5 = 0
	let P6 = 0
	let P7 = 0
	let P8 = 0
	let P9 = 0
	let H1 = 0
	let H2 = 0
	let H3 = 0
	let H4 = 0
	let H5 = 0
	let H6 = 0
	let P = 0
	let T = 0
	let H = 0
	let var1 = 0
	let var2 = 0
	let tfine = 0
	let varH = 0
	let Temperature = 0
	let p = 0
	let Pressure = 0
	let Humidity = 0

	function ReadCoeff() {
		pins.i2cWriteNumber(118, 136, NumberFormat.UInt8LE, false)
		T1 = pins.i2cReadNumber(118, NumberFormat.UInt16LE, false)
		if (T1 < 0) T1 = 65536 + T1
		pins.i2cWriteNumber(118, 138, NumberFormat.UInt8LE, false)
		T2 = pins.i2cReadNumber(118, NumberFormat.Int16LE, false)
		if (T2 < 0) T2 = 65536 + T2
		pins.i2cWriteNumber(118, 140, NumberFormat.UInt8LE, false)
		T3 = pins.i2cReadNumber(118, NumberFormat.Int16LE, false)
		if (T3 < 0) T3 = 65536 + T3
		pins.i2cWriteNumber(118, 142, NumberFormat.UInt8LE, false)
		P1 = pins.i2cReadNumber(118, NumberFormat.UInt16LE, false)
		if (P1 < 0) P1 = 65536 + P1
		pins.i2cWriteNumber(118, 144, NumberFormat.UInt8LE, false)
		P2 = pins.i2cReadNumber(118, NumberFormat.Int16LE, false)
		if (P2 < 0) P2 = 65536 + P2
		pins.i2cWriteNumber(118, 146, NumberFormat.UInt8LE, false)
		P3 = pins.i2cReadNumber(118, NumberFormat.Int16LE, false)
		if (P3 < 0) P3 = 65536 + P3
		pins.i2cWriteNumber(118, 148, NumberFormat.UInt8LE, false)
		P4 = pins.i2cReadNumber(118, NumberFormat.Int16LE, false)
		if (P4 < 0) P4 = 65536 + P4
		pins.i2cWriteNumber(118, 150, NumberFormat.UInt8LE, false)
		P5 = pins.i2cReadNumber(118, NumberFormat.Int16LE, false)
		if (P5 < 0) P5 = 65536 + P5
		pins.i2cWriteNumber(118, 152, NumberFormat.UInt8LE, false)
		P6 = pins.i2cReadNumber(118, NumberFormat.Int16LE, false)
		if (P6 < 0) P6 = 65536 + P6
		pins.i2cWriteNumber(118, 154, NumberFormat.UInt8LE, false)
		P7 = pins.i2cReadNumber(118, NumberFormat.Int16LE, false)
		if (P7 < 0) P7 = 65536 + P7
		pins.i2cWriteNumber(118, 156, NumberFormat.UInt8LE, false)
		P8 = pins.i2cReadNumber(118, NumberFormat.Int16LE, false)
		if (P8 < 0) P8 = 65536 + P8
		pins.i2cWriteNumber(118, 158, NumberFormat.UInt8LE, false)
		P9 = pins.i2cReadNumber(118, NumberFormat.Int16LE, false)
		if (P9 < 0) P9 = 65536 + P9
		pins.i2cWriteNumber(118, 161, NumberFormat.UInt8LE, false)
		H1 = pins.i2cReadNumber(118, NumberFormat.UInt8LE, false)
		if (H1 < 0) H1 = 256 + H1
		pins.i2cWriteNumber(118, 225, NumberFormat.UInt8LE, false)
		H2 = pins.i2cReadNumber(118, NumberFormat.Int16LE, false)
		if (H2 < 0) H2 = 65536 + H2
		pins.i2cWriteNumber(118, 227, NumberFormat.UInt8LE, false)
		H3 = pins.i2cReadNumber(118, NumberFormat.UInt8LE, false)
		if (H3 < 0) H3 = 256 + H3
		pins.i2cWriteNumber(118, 228, NumberFormat.UInt8LE, false)
		H4 = pins.i2cReadNumber(118, NumberFormat.UInt16BE, false)
		H4 = Math.idiv(H4, 256) * 16 + (H4 % 16)
		pins.i2cWriteNumber(118, 229, NumberFormat.UInt8LE, false)
		H5 = pins.i2cReadNumber(118, NumberFormat.UInt16LE, false)
		H5 = Math.idiv(H5, 16)
		pins.i2cWriteNumber(118, 231, NumberFormat.UInt8LE, false)
		H6 = pins.i2cReadNumber(118, NumberFormat.UInt8LE, false)
		if (H6 < 0) H6 = 256 + H6
	}
	
	function CalTemp() {
		var1 = (T / 16384.0 - T1 / 1024.0) * T2
		var2 = ((T / 131072.0 - T1 / 8192.0) * (T / 131072.0 - T1 / 8192.0)) * T3
		tfine = (var1 + var2) %  4294967296
		Temperature = (var1 + var2) / 5120.0
	}
	
	function CalPressure() {
		var1 = tfine / 2.0 - 64000.0;
		var2 = var1 * var1 * P6 / 32768.0;
		var2 = var2 + var1 * P5 * 2.0;
		var2 = var2 / 4.0 + P4 * 65536.0;
		var1 = (P3 * var1 * var1 / 524288.0 + P2 * var1) / 524288.0;
		var1 = (1.0 + var1 / 32768.0) * P1;
		if (var1 == 0.0) {
			Pressure = 0
			return
		}
		p = 1048576.0 - P;p = (p - var2 / 4096.0) * 6250.0 / var1;
		/*    var1 = P9 * p * p / 2147483648.0; */
		var1 = P9 * (p / 65536) * (p / 32768);
		var2 = p * P8 / 32768.0;
		p = p + (var1 + var2 + P7) / 16.0;
		Pressure = p;
	}

	function CalHumidity() {
		varH = tfine - 76800.0;
		varH = (H - (H4 * 64.0 + H5 / 16384.0 * varH)) * (H2 / 65536.0 * (1.0 + H6 / 67108864.0 * varH * (1.0 + H3 / 67108864.0 * varH)));
		varH = varH * (1.0 - H1 * varH / 524288.0);
		if (varH < 0) varH = 0;
		if (varH > 100) Humidity = 100
		else Humidity = varH
	}

    /* BME280 TPH sensor addr 0x76 return boolean */
    //% blockId="tphsensorStart" block="TPH Sensor Start"
    //% blockGap=2 weight=89
    export function tphsensorStart() {
	    pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    pins.i2cWriteNumber(118, 208, NumberFormat.UInt8BE, false)
	    basic.pause(200)
	    if (pins.i2cReadNumber(118, NumberFormat.UInt8BE, false) !=96 ) return false
	    basic.pause(200)
	    pins.i2cWriteNumber(118, 243, NumberFormat.UInt8BE, false)
	    basic.pause(200)
	    if (pins.i2cReadNumber(118, NumberFormat.UInt8BE, false) !=0 ) return false
	    basic.pause(200)
	    pins.i2cWriteNumber(118, 57526, NumberFormat.UInt16BE, false)
	    basic.pause(200)
	    pins.i2cWriteNumber(118, 61957, NumberFormat.UInt16BE, false)
	    basic.pause(200)
	    pins.i2cWriteNumber(118, 62720, NumberFormat.UInt16BE, false)
	    basic.pause(200)
	    pins.i2cWriteNumber(118, 62527, NumberFormat.UInt16BE, false)
	    basic.pause(200)
	    ReadCoeff()
	    return true
    }

    /* BME280 TPH sensor get Tempearture addr 0x76 register 0xFA,FB,FC return number */
    //% blockId="tphgettemp" block="TPH get Temperature"
    //% blockGap=2 weight=88
    export function tphgettemp(): number {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
        pins.i2cWriteNumber(118, 250, NumberFormat.UInt8BE, false)
        basic.pause(200)
        T = pins.i2cReadNumber(118, NumberFormat.UInt32BE, false)
        basic.pause(200)
        T = Math.idiv(T, 4096)
        if (T < 0) T = 1048576 + T
	CalTemperature()
	return Temperature
    }


    /* BME280 TPH sensor get Pressure addr 0x76 register 0xF7,F8,F9 return number */
    //% blockId="tphgetPressure" block="TPH get Pressure"
    //% blockGap=2 weight=88
    export function tphgetPressure(): number {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
        pins.i2cWriteNumber(118, 247, NumberFormat.UInt8BE, false)
        basic.pause(200)
        P = pins.i2cReadNumber(118, NumberFormat.UInt32BE, false)
        basic.pause(200)
        P = Math.idiv(P, 4096)
        if (P < 0) P = 1048576 + P
	CalPressure()
	return Pressure
    }

    /* BME280 TPH sensor get Humidity addr 0x76 register 0xFD, FE return number */
    //% blockId="tphgetHumidity" block="TPH get Humidity"
    //% blockGap=2 weight=88
    export function tphgetHumidty(): number {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
        pins.i2cWriteNumber(118, 253, NumberFormat.UInt8BE, false)
        basic.pause(200)
        H = pins.i2cReadNumber(118, NumberFormat.UInt16BE, false)
        basic.pause(200)
        if (H < 0) H = 65536 + H
	CalHumidity()
	return Humidity
    }

}

