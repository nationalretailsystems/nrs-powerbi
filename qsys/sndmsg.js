/* eslint-disable */
// @ts-nocheck
// Module: sndmsg
// Generated source -- do not modify

const { ibmiConversions } = require('@eradani-inc/ec-client');
const { fromIbmiDate, fromIbmiTime, fromIbmiTimestamp, toIbmiDate, toIbmiTime, toIbmiTimestamp } = ibmiConversions;

// Convert SmsReq record to JavaScript object
exports.convertSmsReqToObject = function convertSmsReqToObject(dataIn) {
    // Initialize the request object
    const dataOut = {};
    let pos = 0;

    // Convert fields in record as string to fields in object
    dataOut.body = dataIn.substring(pos, pos + 1000).trimEnd();
    pos += 1000;
    dataOut.to = dataIn.substring(pos, pos + 20).trimEnd();
    pos += 20;
    dataOut.from = dataIn.substring(pos, pos + 20).trimEnd();
    pos += 20;

    // Return the request as an object
    return dataOut;
};

// Convert JavaScript object to SmsRes record
exports.convertObjectToSmsRes = function convertObjectToSmsRes(dataIn) {
    // Initialize the response record as string
    let dataOut = '';

    // Convert fields in object to fields in record as string
    dataOut += dataIn.date_created.substring(0, 100).padEnd(100);

    // Return the response record as a string
    return dataOut;
};

/* eslint-enable */
