/* eslint-disable */
// @ts-nocheck
// Module: icndbapi
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

/**
 * Output interface
 */
export interface ReqData {
    /**
     * @size 15 characters
     */
    limitTo: string
}

/**
 * Convert ReqData record to TypeScript object
 */
export function convertReqDataToObject(dataIn: string): ReqData {
  const dataOut: any =   {
  
    };

  dataOut.limitTo = dataIn.substring(0, 15).trimEnd();

  return dataOut;
}

/**
 * Input interface
 */
export interface ResData {
    /**
     * @size 1000 characters
     */
    joke: string
}

/**
 * Convert JavaScript object to ResData record
 */
export function convertObjectToResData(dataIn: ResData): string {
  let dataOut = "";

  dataOut += dataIn.joke.substring(0, 1000).padEnd(1000);

  return dataOut;
}

/* eslint-enable */
