/* eslint-disable */
// @ts-nocheck
// Module: wthfrcapi
// Generated source -- do not modify

import { ibmiConversions } from '@eradani-inc/ec-client';
const { fromIbmiDate, fromIbmiTime, fromIbmiTimestamp, toIbmiDate, toIbmiTime, toIbmiTimestamp } = ibmiConversions;

import eradaniConnect from '@eradani-inc/eradani-connect';
const { dataTypes } = eradaniConnect;

/**
 * Data structure
 */
let ForecastFields = [
    {
        name: 'date',
        type: new dataTypes.Date('*MDY')
    },
    {
        name: 'min',
        type: new dataTypes.PackedDecimal(5, 2)
    },
    {
        name: 'max',
        type: new dataTypes.PackedDecimal(5, 2)
    },
    {
        name: 'description',
        type: new dataTypes.Char(58)
    }
];

/**
 * Input interface
 */
export interface ForecastInput {
    /**
     * @format *MDY
     */
    date: Date | string;
    /**
     * @size 5 digits
     * @precision 2 decimals
     */
    min: number | string;
    /**
     * @size 5 digits
     * @precision 2 decimals
     */
    max: number | string;
    /**
     * @size 58 characters
     */
    description: string;
}

/**
 * Output interface
 */
export interface Forecast {
    /**
     * @format *MDY
     */
    date: Date;
    /**
     * @size 5 digits
     * @precision 2 decimals
     */
    min: number;
    /**
     * @size 5 digits
     * @precision 2 decimals
     */
    max: number;
    /**
     * @size 58 characters
     */
    description: string;
}

/**
 * Output interface
 */
export interface Location {
    /**
     * @size 9 digits
     * @precision 6 decimals
     */
    lat: number;
    /**
     * @size 9 digits
     * @precision 6 decimals
     */
    lon: number;
}

/**
 * Convert Location record to TypeScript object
 */
export function convertLocationToObject(dataIn: string): Location {
    const dataOut: any = {};

    dataOut.lat = Number(dataIn.substring(0, 11).trimEnd());
    dataOut.lon = Number(dataIn.substring(11, 22).trimEnd());

    return dataOut;
}

/**
 * Input interface
 */
export interface Weather {
    /**
     */
    Forecasts: Array<Forecast>;
}

/**
 * Convert JavaScript object to Weather record
 */
export function convertObjectToWeather(dataIn: Weather): string {
    let dataOut = '';

    dataOut += 'TODO: nested data structs not yet supported';

    return dataOut;
}

/* eslint-enable */
