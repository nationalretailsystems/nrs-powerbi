/* eslint-disable */
// @ts-nocheck
// Module: fklocatupd
// Generated source -- do not modify

import eradaniConnect from '@eradani-inc/eradani-connect';
const { dataTypes } = eradaniConnect;

// Manually entered import
import configService from '../../config';
const config = configService.get();

/**
 * Program model
 */
export const FKLOCATUPDModel = new eradaniConnect.run.Pgm('FKLOCATUPD', {
    lib: config.eradaniConnect.native.pgmLib,
    mode: 'ile',
    params: [
        {
            name: 'City',
            type: new dataTypes.Char(25)
        },
        {
            name: 'Country',
            type: new dataTypes.Char(2)
        },
        {
            name: 'FourKitesLoadId',
            type: new dataTypes.PackedDecimal(16, 0)
        },
        {
            name: 'Latitude',
            type: new dataTypes.Char(15)
        },
        {
            name: 'LoadNumber',
            type: new dataTypes.Char(10)
        },
        {
            name: 'Location',
            type: new dataTypes.Char(30)
        },
        {
            name: 'Longtitude',
            type: new dataTypes.Char(15)
        },
        {
            name: 'MessageType',
            type: new dataTypes.Char(20)
        },
        {
            name: 'OdometerReading',
            type: new dataTypes.PackedDecimal(11, 2)
        },
        {
            name: 'ProNumber',
            type: new dataTypes.Char(20)
        },
        {
            name: 'ReferenceNumbers',
            type: new dataTypes.Char(15),
            defaultValue: '',
            dim: 10
        },
        {
            name: 'Scac',
            type: new dataTypes.Char(4)
        },
        {
            name: 'Shipper',
            type: new dataTypes.Char(30)
        },
        {
            name: 'State',
            type: new dataTypes.Char(2)
        },
        {
            name: 'Tags',
            type: new dataTypes.Char(15),
            defaultValue: '',
            dim: 10
        },
        {
            name: 'Timestamp',
            type: new dataTypes.Timestamp()
        }
    ]
});

/**
 * Input interface
 */
export interface FKLOCATUPDInput {
    /**
     * @size 25 characters
     */
    City: string;
    /**
     * @size 2 characters
     */
    Country: string;
    /**
     * @size 16 digits
     * @precision 0 decimals
     */
    FourKitesLoadId: number | string;
    /**
     * @size 15 characters
     */
    Latitude: string;
    /**
     * @size 10 characters
     */
    LoadNumber: string;
    /**
     * @size 30 characters
     */
    Location: string;
    /**
     * @size 15 characters
     */
    Longtitude: string;
    /**
     * @size 20 characters
     */
    MessageType: string;
    /**
     * @size 11 digits
     * @precision 2 decimals
     */
    OdometerReading: number | string;
    /**
     * @size 20 characters
     */
    ProNumber: string;
    /**
     * @size 15 characters
     * @default ``
     */
    ReferenceNumbers?: Array<string>;
    /**
     * @size 4 characters
     */
    Scac: string;
    /**
     * @size 30 characters
     */
    Shipper: string;
    /**
     * @size 2 characters
     */
    State: string;
    /**
     * @size 15 characters
     * @default ``
     */
    Tags?: Array<string>;
    /**
     */
    Timestamp: Date | string;
}

/**
 * Output interface
 */
export interface FKLOCATUPDOutput {
    /**
     * @size 25 characters
     */
    City: string;
    /**
     * @size 2 characters
     */
    Country: string;
    /**
     * @size 16 digits
     * @precision 0 decimals
     */
    FourKitesLoadId: number;
    /**
     * @size 15 characters
     */
    Latitude: string;
    /**
     * @size 10 characters
     */
    LoadNumber: string;
    /**
     * @size 30 characters
     */
    Location: string;
    /**
     * @size 15 characters
     */
    Longtitude: string;
    /**
     * @size 20 characters
     */
    MessageType: string;
    /**
     * @size 11 digits
     * @precision 2 decimals
     */
    OdometerReading: number;
    /**
     * @size 20 characters
     */
    ProNumber: string;
    /**
     * @size 15 characters
     * @default ``
     */
    ReferenceNumbers: Array<string>;
    /**
     * @size 4 characters
     */
    Scac: string;
    /**
     * @size 30 characters
     */
    Shipper: string;
    /**
     * @size 2 characters
     */
    State: string;
    /**
     * @size 15 characters
     * @default ``
     */
    Tags: Array<string>;
    /**
     */
    Timestamp: Date;
}

/* eslint-enable */
