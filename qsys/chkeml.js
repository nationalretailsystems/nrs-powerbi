/* eslint-disable */
// @ts-nocheck
// Module: chkeml
// Generated source -- do not modify

const { ibmiConversions } = require('@eradani-inc/ec-client');
const { fromIbmiDate, fromIbmiTime, fromIbmiTimestamp, toIbmiDate, toIbmiTime, toIbmiTimestamp } = ibmiConversions;

// Convert FormatName record to JavaScript object
exports.convertFormatNameToObject = function convertFormatNameToObject(dataIn) {
    // Initialize the request object
    const dataOut = {};
    let pos = 0;

    // Convert fields in record as string to fields in object
    dataOut.params = {};
    dataOut.params.api_key = dataIn.substring(pos, pos + 80).trimEnd();
    pos += 80;
    dataOut.params.email = dataIn.substring(pos, pos + 80).trimEnd();
    pos += 80;
    dataOut.params.ip_address = dataIn.substring(pos, pos + 80).trimEnd();
    pos += 80;

    // Return the request as an object
    return dataOut;
};

// Convert JavaScript object to Response record
exports.convertObjectToResponse = function convertObjectToResponse(dataIn) {
    // Initialize the response record as string
    let dataOut = '';

    // Convert fields in object to fields in record as string
    dataOut += dataIn.blank.substring(0, 80).padEnd(80);

    // Return the response record as a string
    return dataOut;
};

/* eslint-enable */
