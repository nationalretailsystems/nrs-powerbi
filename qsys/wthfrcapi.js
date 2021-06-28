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

    // Convert fields in record as string to fields in object
    dataOut.lat = Number(dataIn.substring(0, 11).trimEnd());
    dataOut.lon = Number(dataIn.substring(11, 22).trimEnd());

    // Return the request as an object
    return dataOut;
};

// Convert JavaScript object to Weather record
exports.convertObjectToWeather = function convertObjectToWeather(dataIn) {
    // Initialize the response record as string
    let dataOut = '';

    // Convert fields in object to fields in record as string
    dataOut += 'TODO: nested data structs not yet supported';

    // Return the response record as a string
    return dataOut;
};

/* eslint-enable */
