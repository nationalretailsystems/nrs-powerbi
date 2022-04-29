/* eslint-disable */
// @ts-nocheck
// Module: fkstopeta
// Generated source -- do not modify

import eradaniConnect from "@eradani-inc/eradani-connect";
const { dataTypes } = eradaniConnect;


// Manually entered import
import configService from "../../config";
const config = configService.get();

/**
 * Program model
 */
export const FKSTOPETAModel =   new eradaniConnect.run.Pgm("FKSTOPETA",   {
      lib: config.eradaniConnect.native.pgmLib,
      mode: "ile",
      params: [
      {
      name: "BillOfLading",
      type: new dataTypes.Char(20),
      defaultValue: ""
    },
      {
      name: "BookingNumber",
      type: new dataTypes.Char(20),
      defaultValue: ""
    },
      {
      name: "ContainerType",
      type: new dataTypes.Char(10),
      defaultValue: ""
    },
      {
      name: "FourKitesLoadId",
      type: new dataTypes.PackedDecimal(16, 0)
    },
      {
      name: "LoadNumber",
      type: new dataTypes.Char(40)
    },
      {
      name: "MessageType",
      type: new dataTypes.Char(20)
    },
      {
      name: "ProNumber",
      type: new dataTypes.Char(20),
      defaultValue: ""
    },
      {
      name: "ReferenceNumbers",
      type: new dataTypes.Char(50),
      defaultValue: "",
      dim: 10
    },
      {
      name: "Scac",
      type: new dataTypes.Char(4)
    },
      {
      name: "Shipper",
      type: new dataTypes.Char(30)
    },
      {
      name: "StopName",
      type: new dataTypes.Char(30)
    },
      {
      name: "StopReferenceId",
      type: new dataTypes.Char(15)
    },
      {
      name: "StopSequence",
      type: new dataTypes.PackedDecimal(7, 0)
    },
      {
      name: "StopStatus",
      type: new dataTypes.Char(20)
    },
      {
      name: "StopType",
      type: new dataTypes.Char(20)
    },
      {
      name: "StopUnlocode",
      type: new dataTypes.Char(10),
      defaultValue: ""
    },
      {
      name: "Tags",
      type: new dataTypes.Char(50),
      defaultValue: "",
      dim: 10
    },
      {
      name: "Timestamp",
      type: new dataTypes.Timestamp()
    },
      {
      name: "VesselName",
      type: new dataTypes.Char(30),
      defaultValue: ""
    },
      {
      name: "VoyageNumber",
      type: new dataTypes.Char(20),
      defaultValue: ""
    }
  ]
    });

/**
 * Input interface
 */
export interface FKSTOPETAInput {
    /**
     * @size 20 characters
     * @default ``
     */
    BillOfLading?: string,
    /**
     * @size 20 characters
     * @default ``
     */
    BookingNumber?: string,
    /**
     * @size 10 characters
     * @default ``
     */
    ContainerType?: string,
    /**
     * @size 16 digits
     * @precision 0 decimals
     */
    FourKitesLoadId: number | string,
    /**
     * @size 40 characters
     */
    LoadNumber: string,
    /**
     * @size 20 characters
     */
    MessageType: string,
    /**
     * @size 20 characters
     * @default ``
     */
    ProNumber?: string,
    /**
     * @size 50 characters
     * @default ``
     */
    ReferenceNumbers?: Array<string>,
    /**
     * @size 4 characters
     */
    Scac: string,
    /**
     * @size 30 characters
     */
    Shipper: string,
    /**
     * @size 30 characters
     */
    StopName: string,
    /**
     * @size 15 characters
     */
    StopReferenceId: string,
    /**
     * @size 7 digits
     * @precision 0 decimals
     */
    StopSequence: number | string,
    /**
     * @size 20 characters
     */
    StopStatus: string,
    /**
     * @size 20 characters
     */
    StopType: string,
    /**
     * @size 10 characters
     * @default ``
     */
    StopUnlocode?: string,
    /**
     * @size 50 characters
     * @default ``
     */
    Tags?: Array<string>,
    /**
     */
    Timestamp: Date | string,
    /**
     * @size 30 characters
     * @default ``
     */
    VesselName?: string,
    /**
     * @size 20 characters
     * @default ``
     */
    VoyageNumber?: string
}

/**
 * Output interface
 */
export interface FKSTOPETAOutput {
    /**
     * @size 20 characters
     * @default ``
     */
    BillOfLading: string,
    /**
     * @size 20 characters
     * @default ``
     */
    BookingNumber: string,
    /**
     * @size 10 characters
     * @default ``
     */
    ContainerType: string,
    /**
     * @size 16 digits
     * @precision 0 decimals
     */
    FourKitesLoadId: number,
    /**
     * @size 40 characters
     */
    LoadNumber: string,
    /**
     * @size 20 characters
     */
    MessageType: string,
    /**
     * @size 20 characters
     * @default ``
     */
    ProNumber: string,
    /**
     * @size 50 characters
     * @default ``
     */
    ReferenceNumbers: Array<string>,
    /**
     * @size 4 characters
     */
    Scac: string,
    /**
     * @size 30 characters
     */
    Shipper: string,
    /**
     * @size 30 characters
     */
    StopName: string,
    /**
     * @size 15 characters
     */
    StopReferenceId: string,
    /**
     * @size 7 digits
     * @precision 0 decimals
     */
    StopSequence: number,
    /**
     * @size 20 characters
     */
    StopStatus: string,
    /**
     * @size 20 characters
     */
    StopType: string,
    /**
     * @size 10 characters
     * @default ``
     */
    StopUnlocode: string,
    /**
     * @size 50 characters
     * @default ``
     */
    Tags: Array<string>,
    /**
     */
    Timestamp: Date,
    /**
     * @size 30 characters
     * @default ``
     */
    VesselName: string,
    /**
     * @size 20 characters
     * @default ``
     */
    VoyageNumber: string
}

/* eslint-enable */
