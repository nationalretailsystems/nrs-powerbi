/* eslint-disable */
// @ts-nocheck
// Module: fkloadcrea
// Generated source -- do not modify

import eradaniConnect from '@eradani-inc/eradani-connect';
const { dataTypes } = eradaniConnect;

// Manually entered import
import configService from '../../config';
const config = configService.get();

/**
 * Program model
 */
export const FKLOADCREAModel = new eradaniConnect.run.Pgm('FKLOADCREA', {
    lib: config.eradaniConnect.native.pgmLib,
    mode: 'ile',
    params: [
        {
            name: 'Errors',
            type: new dataTypes.Char(50),
            defaultValue: '',
            dim: 10
        },
        {
            name: 'FourKitesLoadId',
            type: new dataTypes.PackedDecimal(16, 0)
        },
        {
            name: 'IsSuccess',
            type: new dataTypes.Bool()
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
        }
    ]
});

/**
 * Input interface
 */
export interface FKLOADCREAInput {
    /**
     * @size 50 characters
     * @default ``
     */
    Errors?: Array<string>;
    /**
     * @size 16 digits
     * @precision 0 decimals
     */
    FourKitesLoadId: number | string;
    /**
     */
    IsSuccess: boolean;
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
}

/**
 * Output interface
 */
export interface FKLOADCREAOutput {
    /**
     * @size 50 characters
     * @default ``
     */
    Errors: Array<string>;
    /**
     * @size 16 digits
     * @precision 0 decimals
     */
    FourKitesLoadId: number;
    /**
     */
    IsSuccess: boolean;
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
}

/* eslint-enable */
