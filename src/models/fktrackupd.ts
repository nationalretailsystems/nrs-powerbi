/* eslint-disable */
// @ts-nocheck
// Module: fktrackupd
// Generated source -- do not modify

import eradaniConnect from '@eradani-inc/eradani-connect';
const { dataTypes } = eradaniConnect;

// Manually entered import
import configService from '../../config';
const config = configService.get();

/**
 * Program model
 */
export const FKTRACKUPDModel = new eradaniConnect.run.Pgm('FKTRACKUPD', {
    lib: config.eradaniConnect.native.pgmLib,
    mode: 'ile',
    params: [
        {
            name: 'FourKitesLoadId',
            type: new dataTypes.PackedDecimal(16, 0)
        },
        {
            name: 'LoadNumber',
            type: new dataTypes.Char(10)
        },
        {
            name: 'Message',
            type: new dataTypes.Char(80)
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
            name: 'Status',
            type: new dataTypes.Char(25)
        },
        {
            name: 'StopName',
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
        }
    ]
});

/**
 * Input interface
 */
export interface FKTRACKUPDInput {
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
     * @size 80 characters
     */
    Message: string;
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
     * @size 25 characters
     */
    Status: string;
    /**
     * @size 30 characters
     */
    StopName: string;
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
export interface FKTRACKUPDOutput {
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
     * @size 80 characters
     */
    Message: string;
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
     * @size 25 characters
     */
    Status: string;
    /**
     * @size 30 characters
     */
    StopName: string;
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
