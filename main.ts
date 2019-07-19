//% weight=0 color=#3CB371 icon="\uf1b3" block="TPH sensor"

namespace tphsensor {

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
	    return true
    }

    /* BME280 TPH sensor get Tempearture addr 0x76 register 0xFA,FB,FC return number */
    //% blockId="tphgettemp" block="TPH get Temperature"
    //% blockGap=2 weight=88
    export function tphgettemp(): number {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	pins.i2cWriteNumber(90,6,NumberFormat.UInt8LE,true)
	let Ta = pins.i2cReadNumber(90, NumberFormat.UInt16LE, false)
        return Math.round(Ta * 0.02 - 273.15)
    }


    /* BME280 TPH sensor get Pressure addr 0x76 register 0xF7,F8,F9 return number */
    //% blockId="tphgetPressure" block="TPH get Pressure"
    //% blockGap=2 weight=88
    export function tphgetPressure(): number {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	pins.i2cWriteNumber(90,7,NumberFormat.UInt8LE,true)
	let To = pins.i2cReadNumber(90, NumberFormat.UInt16LE, false)
        return Math.round(To * 0.02 - 273.15)
    }

    /* BME280 TPH sensor get Humidity addr 0x76 register 0xFD, FE return number */
    //% blockId="tphgetHumidity" block="TPH get Humidity"
    //% blockGap=2 weight=88
    export function tphgetHumidty(): number {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	pins.i2cWriteNumber(90,240,NumberFormat.UInt8LE,true)
	let flag = pins.i2cReadNumber(90, NumberFormat.UInt16LE, false)
        return Math.idiv(flag, 4096)
    }

}

