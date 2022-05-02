/* eslint-disable */
// @ts-nocheck
// Module: lblapi
// Generated source -- do not modify

const { ibmiConversions } = require('@eradani-inc/ec-client');
const { fromIbmiDate, fromIbmiTime, fromIbmiTimestamp, toIbmiDate, toIbmiTime, toIbmiTimestamp } = ibmiConversions;

// Convert LabelData record to JavaScript object
exports.convertLabelDataToObject = function convertLabelDataToObject(dataIn) {
    // Initialize the request object
    const dataOut = {};
    let pos = 0;

    // Convert fields in record as string to fields in object
    dataOut.toName = dataIn.substring(pos, pos + 16).trimEnd();
    pos += 16;
    dataOut.toAddress = dataIn.substring(pos, pos + 20).trimEnd();
    pos += 20;
    dataOut.toCity = dataIn.substring(pos, pos + 10).trimEnd();
    pos += 10;
    dataOut.toState = dataIn.substring(pos, pos + 2).trimEnd();
    pos += 2;
    dataOut.toZip = dataIn.substring(pos, pos + 5).trimEnd();
    pos += 5;
    dataOut.toCountry = dataIn.substring(pos, pos + 3).trimEnd();
    pos += 3;
    dataOut.weight = dataIn.substring(pos, pos + 5).trimEnd();
    pos += 5;
    dataOut.weightUnits = dataIn.substring(pos, pos + 2).trimEnd();
    pos += 2;
    dataOut.height = dataIn.substring(pos, pos + 5).trimEnd();
    pos += 5;
    dataOut.width = dataIn.substring(pos, pos + 5).trimEnd();
    pos += 5;
    dataOut.length = dataIn.substring(pos, pos + 5).trimEnd();
    pos += 5;
    dataOut.sizeUnits = dataIn.substring(pos, pos + 2).trimEnd();
    pos += 2;

    // Return the request as an object
    return dataOut;
};

// Convert JavaScript object to ShipInfo record
exports.convertObjectToShipInfo = function convertObjectToShipInfo(dataIn) {
    // Initialize the response record as string
    let dataOut = '';

    // Convert fields in object to fields in record as string
    dataOut += dataIn.labelStatus.substring(0, 10).padEnd(10);
    dataOut += dataIn.shipmentId.substring(0, 11).padEnd(11);
    dataOut += dataIn.labelId.substring(0, 11).padEnd(11);
    dataOut += dataIn.shipmentCost.toFixed(2).substring(0, 12).padEnd(12);
    dataOut += dataIn.shipmentCostCurrency.substring(0, 3).padEnd(3);
    dataOut += dataIn.insuranceCost.toFixed(2).substring(0, 12).padEnd(12);
    dataOut += dataIn.insuranceCostCurrency.substring(0, 3).padEnd(3);

    // Return the response record as a string
    return dataOut;
};

// Convert JavaScript object to Label record
exports.convertObjectToLabel = function convertObjectToLabel(dataIn) {
    // Initialize the response record as string
    let dataOut = '';

    // Convert fields in object to fields in record as string
    dataOut += dataIn.trackingNumber.substring(0, 30).padEnd(30);
    dataOut += dataIn.labelPdfFile.substring(0, 23).padEnd(23);
    dataOut += dataIn.labelZplFile.substring(0, 23).padEnd(23);

    // Return the response record as a string
    return dataOut;
};

/* eslint-enable */
