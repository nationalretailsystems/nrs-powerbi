/* eslint-disable */
// @ts-nocheck
// Module: wthfrcapi
// Generated source -- do not modify

import { ibmiConversions } from "@eradani-inc/ec-client";
const {
  fromIbmiDate,
  fromIbmiTime,
  fromIbmiTimestamp,
  toIbmiDate,
  toIbmiTime,
  toIbmiTimestamp
} = ibmiConversions;

import eradaniConnect from "@eradani-inc/eradani-connect";
const { dataTypes } = eradaniConnect;

/**
 * Output interface
 */
export interface Forecast {
    /**
     * @format *MDY
     */
    date: Date,
    /**
     * @size 5 digits
     * @precision 2 decimals
     */
    min: number,
    /**
     * @size 5 digits
     * @precision 2 decimals
     */
    max: number,
    /**
     * @size 58 characters
     */
    description: string
}

/**
 * Output interface
 */
export interface Location {
    /**
     * @size 9 digits
     * @precision 6 decimals
     */
    lat: number,
    /**
     * @size 9 digits
     * @precision 6 decimals
     */
    lon: number
}

/**
 * Convert Location record to TypeScript object
 */
export function convertLocationToObject(dataIn: string): Location {
  const dataOut: any =   {
  
    };
  let pos: number = 0;

  dataOut.lat = Number(dataIn.substring(pos, pos + 11).trimEnd());
  pos += 11;
  dataOut.lon = Number(dataIn.substring(pos, pos + 11).trimEnd());
  pos += 11;

  return dataOut;
}

/**
 * Input interface
 */
export interface Weather {
    /**
     */
    Forecasts: Array<Forecast>
}

/**
 * Convert JavaScript object to Weather record
 */
export function convertObjectToWeather(dataIn: Weather): string {
  let dataOut: string = "";

  for (let i: number = 0; i < 8; ++i) {
  dataOut += toIbmiDate(dataIn.Forecasts[i].date);
  dataOut += dataIn.Forecasts[i].min.toFixed(2).substring(0, 7).padEnd(7);
  dataOut += dataIn.Forecasts[i].max.toFixed(2).substring(0, 7).padEnd(7);
  dataOut += dataIn.Forecasts[i].description.substring(0, 58).padEnd(58);
  }

  return dataOut;
}

/* eslint-enable */
