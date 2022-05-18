/* eslint-disable */
// @ts-nocheck
// Module: fkassetass
// Generated source -- do not modify

import eradaniConnect from '@eradani-inc/eradani-connect';
const { dataTypes } = eradaniConnect;

// Manually entered import
import configService from '../../config';
const config = configService.get();

/**
 * Program model
 */
export const FKASSETASSModel = new eradaniConnect.run.Pgm('FKASSETASS', {
    lib: config.eradaniConnect.native.pgmLib,
    mode: 'ile',
    params: [
        {
            name: 'Carrier',
            type: new dataTypes.Char(25)
        },
        {
            name: 'DriverNumber',
            type: new dataTypes.PackedDecimal(11, 0)
        },
        {
            name: 'FourKitesLoadId',
            type: new dataTypes.PackedDecimal(16, 0)
        },
        {
            name: 'LoadNumber',
            type: new dataTypes.Char(10)
        },
        {
            name: 'MessageType',
            type: new dataTypes.Char(20)
        },
        {
            name: 'ProNumber',
            type: new dataTypes.Char(20)
        },
        {
            name: 'RailEquipment',
            type: new dataTypes.Char(15)
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
            name: 'Tags',
            type: new dataTypes.Char(15),
            defaultValue: '',
            dim: 10
        },
        {
            name: 'Timestamp',
            type: new dataTypes.Timestamp()
        },
        {
            name: 'Trailer',
            type: new dataTypes.Char(15)
        },
        {
            name: 'TrucK',
            type: new dataTypes.Char(15)
        }
    ]
});

/**
 * Input interface
 */
export interface FKASSETASSInput {
    /**
     * @size 25 characters
     */
    Carrier: string;
    /**
     * @size 11 digits
     * @precision 0 decimals
     */
    DriverNumber: number | string;
    /**
     * @size 16 digits
     * @precision 0 decimals
     */
    FourKitesLoadId: number | string;
    /**
     * @size 10 characters
     */
    LoadNumber: string;
    /**
     * @size 20 characters
     */
    MessageType: string;
    /**
     * @size 20 characters
     */
    ProNumber: string;
    /**
     * @size 15 characters
     */
    RailEquipment: string;
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
     * @size 15 characters
     * @default ``
     */
    Tags?: Array<string>;
    /**
     */
    Timestamp: Date | string;
    /**
     * @size 15 characters
     */
    Trailer: string;
    /**
     * @size 15 characters
     */
    TrucK: string;
}

/**
 * Output interface
 */
export interface FKASSETASSOutput {
    /**
     * @size 25 characters
     */
    Carrier: string;
    /**
     * @size 11 digits
     * @precision 0 decimals
     */
    DriverNumber: number;
    /**
     * @size 16 digits
     * @precision 0 decimals
     */
    FourKitesLoadId: number;
    /**
     * @size 10 characters
     */
    LoadNumber: string;
    /**
     * @size 20 characters
     */
    MessageType: string;
    /**
     * @size 20 characters
     */
    ProNumber: string;
    /**
     * @size 15 characters
     */
    RailEquipment: string;
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
     * @size 15 characters
     * @default ``
     */
    Tags: Array<string>;
    /**
     */
    Timestamp: Date;
    /**
     * @size 15 characters
     */
    Trailer: string;
    /**
     * @size 15 characters
     */
    TrucK: string;
}

/* eslint-enable */
