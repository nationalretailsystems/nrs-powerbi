/* eslint-disable */
// @ts-nocheck
// Module: fkloadcrea
// Generated source -- do not modify

import eradaniConnect from "@eradani-inc/eradani-connect";
const { dataTypes } = eradaniConnect;


// Manually entered import
import configService from "../../config";
const config = configService.get();

/**
 * Program model
 */
export const FKLOADCREAModel =   new eradaniConnect.run.Pgm("FKLOADCREA",   {
      lib: config.eradaniConnect.native.pgmLib,
      mode: "ile",
      params: [
      {
      name: "ConsignmentEncryptedAccessToken",
      type: new dataTypes.Char(125)
    },
      {
      name: "EncryptedAccessToken",
      type: new dataTypes.Char(125)
    },
      {
      name: "EncryptedUrl",
      type: new dataTypes.Char(150)
    },
      {
      name: "Errors",
      type: new dataTypes.Char(50),
      defaultValue: "",
      dim: 5
    },
      {
      name: "FourKitesLoadId",
      type: new dataTypes.PackedDecimal(16, 0)
    },
      {
      name: "IsSuccess",
      type: new dataTypes.Bool()
    },
      {
      name: "LoadNumber",
      type: new dataTypes.Char(20)
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
      type: new dataTypes.Char(20),
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
      name: "Tags",
      type: new dataTypes.Char(25),
      defaultValue: "",
      dim: 10
    },
      {
      name: "Timestamp",
      type: new dataTypes.Timestamp()
    }
  ]
    });

/**
 * Input interface
 */
export interface FKLOADCREAInput {
    /**
     * @size 125 characters
     */
    ConsignmentEncryptedAccessToken: string,
    /**
     * @size 125 characters
     */
    EncryptedAccessToken: string,
    /**
     * @size 150 characters
     */
    EncryptedUrl: string,
    /**
     * @size 50 characters
     * @default ``
     */
    Errors?: Array<string>,
    /**
     * @size 16 digits
     * @precision 0 decimals
     */
    FourKitesLoadId: number | string,
    /**
     */
    IsSuccess: boolean,
    /**
     * @size 20 characters
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
     * @size 20 characters
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
     * @size 25 characters
     * @default ``
     */
    Tags?: Array<string>,
    /**
     */
    Timestamp: Date | string
}

/**
 * Output interface
 */
export interface FKLOADCREAOutput {
    /**
     * @size 125 characters
     */
    ConsignmentEncryptedAccessToken: string,
    /**
     * @size 125 characters
     */
    EncryptedAccessToken: string,
    /**
     * @size 150 characters
     */
    EncryptedUrl: string,
    /**
     * @size 50 characters
     * @default ``
     */
    Errors: Array<string>,
    /**
     * @size 16 digits
     * @precision 0 decimals
     */
    FourKitesLoadId: number,
    /**
     */
    IsSuccess: boolean,
    /**
     * @size 20 characters
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
     * @size 20 characters
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
     * @size 25 characters
     * @default ``
     */
    Tags: Array<string>,
    /**
     */
    Timestamp: Date
}

/* eslint-enable */
