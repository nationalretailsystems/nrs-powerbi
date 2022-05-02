/* eslint-disable */
// @ts-nocheck
// Module: wthfrcapi
// Generated source -- do not modify

const { ibmiConversions } = require('@eradani-inc/ec-client');
const { fromIbmiDate, fromIbmiTime, fromIbmiTimestamp, toIbmiDate, toIbmiTime, toIbmiTimestamp } = ibmiConversions;

// Convert Location record to JavaScript object
exports.convertLocationToObject = function convertLocationToObject(dataIn) {
    // Initialize the request object
    const dataOut = {};
    let pos = 0;

    // Convert fields in record as string to fields in object
    dataOut.lat = Number(dataIn.substring(pos, pos + 11).trimEnd());
    pos += 11;
    dataOut.lon = Number(dataIn.substring(pos, pos + 11).trimEnd());
    pos += 11;

    // Return the request as an object
    return dataOut;
};

// Convert JavaScript object to Weather record
exports.convertObjectToWeather = function convertObjectToWeather(dataIn) {
    // Initialize the response record as string
    let dataOut = '';

    // Convert fields in object to fields in record as string
    for (let i = 0; i < 8; ++i) {
        dataOut += toIbmiDate(dataIn.Forecasts[i].date);
        dataOut += dataIn.Forecasts[i].min.toFixed(2).substring(0, 7).padEnd(7);
        dataOut += dataIn.Forecasts[i].max.toFixed(2).substring(0, 7).padEnd(7);
        dataOut += dataIn.Forecasts[i].description.substring(0, 58).padEnd(58);
    }

    // Return the response record as a string
    return dataOut;
};

/* eslint-enable */
