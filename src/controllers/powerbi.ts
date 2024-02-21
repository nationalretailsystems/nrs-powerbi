import createLogger from 'src/services/logger';
import SQLTemplate, { SQLTemplateInput, SQLTemplateOutput } from 'src/models/powerbi-template';
import SQLTemplate2, { SQLTemplateInput2, SQLTemplateOutput2 } from 'src/models/powerbi-template2';
import SQLTemplate3, { SQLTemplateInput3, SQLTemplateOutput3 } from 'src/models/powerbi-template3';
import SQLTemplate4, { SQLTemplateInput4, SQLTemplateOutput4 } from 'src/models/powerbi-template4';
import SQLTemplate5, { SQLTemplateInput5, SQLTemplateOutput5 } from 'src/models/powerbi-template5';
import SQLTemplate6, { SQLTemplateInput6, SQLTemplateOutput6 } from 'src/models/powerbi-template6';
import SQLTemplateSALESPRO, { SQLTemplateInputSALESPRO, SQLTemplateOutputSALESPRO } from 'src/models/powerbi-salespro';
import SQLTemplateSALESPRODSC, {
    SQLTemplateInputSALESPRODSC,
    SQLTemplateOutputSALESPRODSC
} from 'src/models/powerbi-salesprodsc';
import SQLTemplateBLHD2AR, { SQLTemplateInputBLHD2AR, SQLTemplateOutputBLHD2AR } from 'src/models/powerbi-blhd2ar';
import SQLTemplateBLHD2ARKY, {
    SQLTemplateInputBLHD2ARKY,
    SQLTemplateOutputBLHD2ARKY
} from 'src/models/powerbi-blhd2arky';
import SQLTemplateRECPT, { SQLTemplateInputRECPT, SQLTemplateOutputRECPT } from 'src/models/powerbi-recpt';
import SQLTemplateMANIF, { SQLTemplateInputMANIF, SQLTemplateOutputMANIF } from 'src/models/powerbi-manif';
import SQLTemplateBLEX, { SQLTemplateOutputBLEX } from 'src/models/powerbi-blex';
import SQLTemplateBLPR, { SQLTemplateOutputBLPR } from 'src/models/powerbi-blpr';
import SQLTemplateBLSJ, { SQLTemplateOutputBLSJ } from 'src/models/powerbi-blsj';
import SQLTemplateARBAL, { SQLTemplateOutputARBAL } from 'src/models/powerbi-arbalance';
import SQLTemplatePRODTL, { SQLTemplateInputPRODTL, SQLTemplateOutputPRODTL } from 'src/models/powerbi-prodetails';
import SQLTemplateBILLDTL, {
    SQLTemplateInputBILLDTL,
    SQLTemplateOutputBILLDTL
} from 'src/models/powerbi-billingdetail';
import SQLTemplateBLHDACT, { SQLTemplateInputBLHDACT, SQLTemplateOutputBLHDACT } from 'src/models/powerbi-blhdact';
import SQLTemplateBLHDCONS, { SQLTemplateOutputBLHDCONS } from 'src/models/powerbi-blhdcons';
import SQLTemplateBLHDOL5, { SQLTemplateInputBLHDOL5, SQLTemplateOutputBLHDOL5 } from 'src/models/powerbi-blhdolfile5';
import SQLTemplateBLHDORIGH, {
    SQLTemplateInputBLHDORIGH,
    SQLTemplateOutputBLHDORIGH
} from 'src/models/powerbi-blhdoriginh';
import SQLTemplateBLHDQUERY, {
    SQLTemplateInputBLHDQUERY,
    SQLTemplateOutputBLHDQUERY
} from 'src/models/powerbi-blhdquery';
import SQLTemplateLTLWGT, { SQLTemplateInputLTLWGT, SQLTemplateOutputLTLWGT } from 'src/models/powerbi-ltlweight';
import SQLTemplateCUST, { SQLTemplateOutputCUST } from 'src/models/powerbi-cust';
import SQLTemplateMANF, { SQLTemplateInputMANF, SQLTemplateOutputMANF } from 'src/models/powerbi-manf';
import SQLTemplateTLWGT, { SQLTemplateInputTLWGT, SQLTemplateOutputTLWGT } from 'src/models/powerbi-tlweight';
import SQLTemplateMOVE, { SQLTemplateOutputMOVE } from 'src/models/powerbi-move';
import SQLTemplateMOVENBR, { SQLTemplateOutputMOVENBR } from 'src/models/powerbi-movenumber';
import SQLTemplateORDR, { SQLTemplateInputORDR, SQLTemplateOutputORDR } from 'src/models/powerbi-ordr';
import SQLTemplateDISP, { SQLTemplateInputDISP, SQLTemplateOutputDISP } from 'src/models/powerbi-disp';
import SQLTemplateDISPDT, { SQLTemplateInputDISPDT, SQLTemplateOutputDISPDT } from 'src/models/powerbi-dispdt';
import SQLTemplateDISPATCH, { SQLTemplateInputDISPATCH, SQLTemplateOutputDISPATCH } from 'src/models/powerbi-dispatch';
import SQLTemplateDRIVER, { SQLTemplateInputDRIVER, SQLTemplateOutputDRIVER } from 'src/models/powerbi-driver';
import SQLTemplateKRONOS, { SQLTemplateInputKRONOS, SQLTemplateOutputKRONOS } from 'src/models/powerbi-kronoshours';
import SQLTemplateLTLMAN, { SQLTemplateInputLTLMAN, SQLTemplateOutputLTLMAN } from 'src/models/powerbi-ltlmanifest';
import SQLTemplateSUPERC, {
    SQLTemplateInputSUPERC,
    SQLTemplateOutputSUPERC
} from 'src/models/powerbi-supermilesconsignee';
import SQLTemplateSUPERS, { SQLTemplateInputSUPERS, SQLTemplateOutputSUPERS } from 'src/models/powerbi-supermilesshp';
import SQLTemplateP80CONT, { SQLTemplateOutputP80CONT } from 'src/models/powerbi-port80cont';
import SQLTemplateP80KRONOS, {
    SQLTemplateInputP80KRONOS,
    SQLTemplateOutputP80KRONOS
} from 'src/models/powerbi-port80kronos';
import SQLTemplateP80PROS, { SQLTemplateInputP80PROS, SQLTemplateOutputP80PROS } from 'src/models/powerbi-port80pros';
import SQLTemplateNRT2PORT, { SQLTemplateOutputNRT2PORT } from 'src/models/powerbi-port80turnsnrt2port';
import SQLTemplatePORT2NRT, { SQLTemplateOutputPORT2NRT } from 'src/models/powerbi-port80turnsport2nrt';
import SQLTemplateCONT, { SQLTemplateInputCONT, SQLTemplateOutputCONT } from 'src/models/powerbi-containers';
import SQLTemplateWEIGHTS, { SQLTemplateInputWEIGHTS, SQLTemplateOutputWEIGHTS } from 'src/models/powerbi-weights';
import SQLTemplateLOCATION, { SQLTemplateOutputLOCATION } from 'src/models/powerbi-locations';
import SQLTemplateSARLSINQ, { SQLTemplateOutputSARLSINQ } from 'src/models/powerbi-sarlsinq';
import SQLTemplateSAHDLDVUR, { SQLTemplateOutputSAHDLDVUR } from 'src/models/powerbi-sahdldvur';
import SQLTemplateSACTDT, { SQLTemplateInputSACTDT, SQLTemplateOutputSACTDT } from 'src/models/powerbi-sactdt';
import SQLTemplateSAYD3INQ, { SQLTemplateOutputSAYD3INQ } from 'src/models/powerbi-sayd3inq';
import SQLTemplateSAOBSCANS, {
    SQLTemplateInputSAOBSCANS,
    SQLTemplateOutputSAOBSCANS
} from 'src/models/powerbi-saobscans';
import SQLTemplateSAHDPO, { SQLTemplateInputSAHDPO, SQLTemplateOutputSAHDPO } from 'src/models/powerbi-sahdpo';
import SQLTemplateSATJONDOCK, {
    SQLTemplateInputSATJONDOCK,
    SQLTemplateOutputSATJONDOCK
} from 'src/models/powerbi-satjondock';
import SQLTemplateSAOBATDOOR, { SQLTemplateOutputSAOBATDOOR } from 'src/models/powerbi-saobatdoor';
import SQLTemplateSAANDREA, { SQLTemplateOutputSAANDREA } from 'src/models/powerbi-saandrearpt';
import SQLTemplateCTRLLIST, {
    SQLTemplateInputCTRLLIST,
    SQLTemplateOutputCTRLLIST
} from 'src/models/powerbi-controllisting';
import SQLTemplateOL736DATA, {
    SQLTemplateInputOL736DATA,
    SQLTemplateOutputOL736DATA
} from 'src/models/powerbi-ol736data';
import SQLTemplateFED46R, { SQLTemplateInputFED46R, SQLTemplateOutputFED46R } from 'src/models/powerbi-fed46r';
import SQLTemplateTRIPS, { SQLTemplateInputTRIPS, SQLTemplateOutputTRIPS } from 'src/models/powerbi-trips';
import { JSONObject } from 'src/types';
import { powerbiTransports } from 'src/services/connection';
import { DateTime } from 'luxon';
import { promises as fs } from 'fs';
import APIError from 'src/APIError';

const logger = createLogger('controllers/powerbi');

/**
 * Run the Template SQL query.
 *
 * @param {JSONObject} inputs The minBaldue and maxBaldue to query with
 * @returns {Promise<SQLTemplateOutput}
 */
export async function getViamundoWeight(inputs: JSONObject): Promise<SQLTemplateOutput> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInput = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
        building: inputs.building
    };
    return powerbiTransports.wolf.execute(SQLTemplate, params) as Promise<SQLTemplateOutput>;
}
export async function getCCRevenue(inputs: JSONObject) {
    let result;
    let filename;
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInput2 = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
        customer1: inputs.customer || '1',
        customer2: inputs.customer || '99999',
        costcenter1: inputs.costcenter || '    ',
        costcenter2: inputs.costcenter || '9999'
    };
    filename = '/eradani/CCRevenue_' + inputs.fromDate + inputs.toDate + 'json';
    let jsonFile = { fileName: filename };
    try {
        result = (await powerbiTransports.wolf.execute(SQLTemplate2, params)) as Promise<SQLTemplateOutput2>;
        await fs.writeFile(filename, JSON.stringify(result), 'utf-8');
        return jsonFile;
    } catch (err) {
        throw new APIError(450, 'Api failure file not created');
    }
}
export async function getHours(inputs: JSONObject): Promise<SQLTemplateOutput3> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInput3 = {
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
        costCenter1: inputs.costCenter || '000',
        costCenter2: inputs.costCenter || '999'
    };
    return powerbiTransports.wolf.execute(SQLTemplate3, params) as Promise<SQLTemplateOutput3>;
}
export async function getGL(inputs: JSONObject): Promise<SQLTemplateOutput4> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInput4 = {
        year: inputs.year,
        month: inputs.month
    };
    return powerbiTransports.lawson.execute(SQLTemplate4, params) as Promise<SQLTemplateOutput4>;
}
export async function getWMS378(inputs: JSONObject): Promise<SQLTemplateOutput5> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInput5 = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplate5, params) as Promise<SQLTemplateOutput5>;
}
export async function getSales(inputs: JSONObject): Promise<SQLTemplateOutput6> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInput6 = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplate6, params) as Promise<SQLTemplateOutput6>;
}
export async function getSalesPro(inputs: JSONObject): Promise<SQLTemplateOutputSALESPRO> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputSALESPRO = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateSALESPRO, params) as Promise<SQLTemplateOutputSALESPRO>;
}
export async function getSalesProDsc(inputs: JSONObject): Promise<SQLTemplateOutputSALESPRODSC> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputSALESPRODSC = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateSALESPRODSC, params) as Promise<SQLTemplateOutputSALESPRODSC>;
}
export async function getBlhd2Ar(inputs: JSONObject): Promise<SQLTemplateOutputBLHD2AR> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputBLHD2AR = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateBLHD2AR, params) as Promise<SQLTemplateOutputBLHD2AR>;
}
export async function getBlhd2ArKy(inputs: JSONObject): Promise<SQLTemplateOutputBLHD2ARKY> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputBLHD2ARKY = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateBLHD2ARKY, params) as Promise<SQLTemplateOutputBLHD2ARKY>;
}
export async function getRecpt(inputs: JSONObject): Promise<SQLTemplateOutputRECPT> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputRECPT = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateRECPT, params) as Promise<SQLTemplateOutputRECPT>;
}
export async function getManif(inputs: JSONObject): Promise<SQLTemplateOutputMANIF> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputMANIF = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateMANIF, params) as Promise<SQLTemplateOutputMANIF>;
}
export async function getBlex(): Promise<SQLTemplateOutputBLEX> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateBLEX) as Promise<SQLTemplateOutputBLEX>;
}
export async function getBlpr(): Promise<SQLTemplateOutputBLPR> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateBLPR) as Promise<SQLTemplateOutputBLPR>;
}
export async function getBlsj(): Promise<SQLTemplateOutputBLSJ> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateBLSJ) as Promise<SQLTemplateOutputBLSJ>;
}
export async function getARBalance(): Promise<SQLTemplateOutputARBAL> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateARBAL) as Promise<SQLTemplateOutputARBAL>;
}
export async function getProDetails(inputs: JSONObject): Promise<SQLTemplateOutputPRODTL> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputPRODTL = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplatePRODTL, params) as Promise<SQLTemplateOutputPRODTL>;
}
export async function getBillDetail(inputs: JSONObject): Promise<SQLTemplateOutputBILLDTL> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputBILLDTL = {
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
        fromDate2: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate2: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
        fromDate3: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate3: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateBILLDTL, params) as Promise<SQLTemplateOutputBILLDTL>;
}
export async function getBlhdAct(inputs: JSONObject): Promise<SQLTemplateOutputBLHDACT> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputBLHDACT = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateBLHDACT, params) as Promise<SQLTemplateOutputBLHDACT>;
}
export async function getBlhdCons(): Promise<SQLTemplateOutputBLHDCONS> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateBLHDCONS) as Promise<SQLTemplateOutputBLHDCONS>;
}
export async function getBlhdOlfile5(inputs: JSONObject): Promise<SQLTemplateOutputBLHDOL5> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputBLHDOL5 = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateBLHDOL5, params) as Promise<SQLTemplateOutputBLHDOL5>;
}
export async function getBlhdOriginh(inputs: JSONObject): Promise<SQLTemplateOutputBLHDORIGH> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputBLHDORIGH = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateBLHDORIGH, params) as Promise<SQLTemplateOutputBLHDORIGH>;
}
export async function getBlhdQuery(inputs: JSONObject): Promise<SQLTemplateOutputBLHDQUERY> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputBLHDQUERY = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateBLHDQUERY, params) as Promise<SQLTemplateOutputBLHDQUERY>;
}
export async function getLtlWeight(inputs: JSONObject): Promise<SQLTemplateOutputLTLWGT> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputLTLWGT = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateLTLWGT, params) as Promise<SQLTemplateOutputLTLWGT>;
}
export async function getCust(): Promise<SQLTemplateOutputCUST> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateCUST) as Promise<SQLTemplateOutputCUST>;
}
export async function getManf(inputs: JSONObject): Promise<SQLTemplateOutputMANF> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputMANF = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateMANF, params) as Promise<SQLTemplateOutputMANF>;
}
export async function getTlWeight(inputs: JSONObject): Promise<SQLTemplateOutputTLWGT> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputTLWGT = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateTLWGT, params) as Promise<SQLTemplateOutputTLWGT>;
}
export async function getMove(): Promise<SQLTemplateOutputMOVE> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateMOVE) as Promise<SQLTemplateOutputMOVE>;
}
export async function getMoveNumber(): Promise<SQLTemplateOutputMOVENBR> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateMOVENBR) as Promise<SQLTemplateOutputMOVENBR>;
}
export async function getOrdr(inputs: JSONObject): Promise<SQLTemplateOutputORDR> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputORDR = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateORDR, params) as Promise<SQLTemplateOutputORDR>;
}
export async function getDisp(inputs: JSONObject): Promise<SQLTemplateOutputDISP> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputDISP = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateDISP, params) as Promise<SQLTemplateOutputDISP>;
}
export async function getDispDt(inputs: JSONObject): Promise<SQLTemplateOutputDISPDT> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputDISPDT = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateDISPDT, params) as Promise<SQLTemplateOutputDISPDT>;
}
export async function getDispatch(inputs: JSONObject): Promise<SQLTemplateOutputDISPATCH> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputDISPATCH = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateDISPATCH, params) as Promise<SQLTemplateOutputDISPATCH>;
}
export async function getDriver(inputs: JSONObject): Promise<SQLTemplateOutputDRIVER> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputDRIVER = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateDRIVER, params) as Promise<SQLTemplateOutputDRIVER>;
}
export async function getKronos(inputs: JSONObject): Promise<SQLTemplateOutputKRONOS> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputKRONOS = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateKRONOS, params) as Promise<SQLTemplateOutputKRONOS>;
}
export async function getLtlManifest(inputs: JSONObject): Promise<SQLTemplateOutputLTLMAN> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputLTLMAN = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateLTLMAN, params) as Promise<SQLTemplateOutputLTLMAN>;
}
export async function getSupermilesConsignee(inputs: JSONObject): Promise<SQLTemplateOutputSUPERC> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputSUPERC = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateSUPERC, params) as Promise<SQLTemplateOutputSUPERC>;
}
export async function getSupermilesShp(inputs: JSONObject): Promise<SQLTemplateOutputSUPERS> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputSUPERS = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateSUPERS, params) as Promise<SQLTemplateOutputSUPERS>;
}
export async function getPort80Containers(): Promise<SQLTemplateOutputP80CONT> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateP80CONT) as Promise<SQLTemplateOutputP80CONT>;
}
export async function getPort80Kronos(inputs: JSONObject): Promise<SQLTemplateOutputP80KRONOS> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputP80KRONOS = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateP80KRONOS, params) as Promise<SQLTemplateOutputP80KRONOS>;
}
export async function getPort80Pros(inputs: JSONObject): Promise<SQLTemplateOutputP80PROS> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputP80PROS = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateP80PROS, params) as Promise<SQLTemplateOutputP80PROS>;
}
export async function getPort80Nrt2Port(): Promise<SQLTemplateOutputNRT2PORT> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateNRT2PORT) as Promise<SQLTemplateOutputNRT2PORT>;
}
export async function getPort80Port2Nrt(): Promise<SQLTemplateOutputPORT2NRT> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplatePORT2NRT) as Promise<SQLTemplateOutputPORT2NRT>;
}
export async function getContainers(inputs: JSONObject): Promise<SQLTemplateOutputCONT> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputCONT = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateCONT, params) as Promise<SQLTemplateOutputCONT>;
}
export async function getWeights(inputs: JSONObject): Promise<SQLTemplateOutputWEIGHTS> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputWEIGHTS = {
        // X fromDate: inputs.fromDate,
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        // X toDate: inputs.toDate,
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate(),
        building: inputs.building
    };
    return powerbiTransports.wolf.execute(SQLTemplateWEIGHTS, params) as Promise<SQLTemplateOutputWEIGHTS>;
}
export async function getLocations(): Promise<SQLTemplateOutputLOCATION> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateLOCATION) as Promise<SQLTemplateOutputLOCATION>;
}
export async function getSARlsInq(): Promise<SQLTemplateOutputSARLSINQ> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateSARLSINQ) as Promise<SQLTemplateOutputSARLSINQ>;
}
export async function getSAHdLdVur(): Promise<SQLTemplateOutputSAHDLDVUR> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateSAHDLDVUR) as Promise<SQLTemplateOutputSAHDLDVUR>;
}
export async function getSACtDT(inputs: JSONObject): Promise<SQLTemplateOutputSACTDT> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputSACTDT = {
        fromDate: inputs.fromDate,
        toDate: inputs.toDate,
        fromDate2: inputs.fromDate,
        toDate2: inputs.toDate,
        fromDate3: inputs.fromDate,
        toDate3: inputs.toDate
    };
    return powerbiTransports.wolf.execute(SQLTemplateSACTDT, params) as Promise<SQLTemplateOutputSACTDT>;
}
export async function getSAYd3Inq(): Promise<SQLTemplateOutputSAYD3INQ> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateSAYD3INQ) as Promise<SQLTemplateOutputSAYD3INQ>;
}
export async function getSAObScans(inputs: JSONObject): Promise<SQLTemplateOutputSAOBSCANS> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputSAOBSCANS = {
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateSAOBSCANS, params) as Promise<SQLTemplateOutputSAOBSCANS>;
}
export async function getSAHdPo(inputs: JSONObject): Promise<SQLTemplateOutputSAHDPO> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputSAHDPO = {
        fromDate: inputs.fromDate
    };
    return powerbiTransports.wolf.execute(SQLTemplateSAHDPO, params) as Promise<SQLTemplateOutputSAHDPO>;
}
export async function getSATJOnDock(inputs: JSONObject): Promise<SQLTemplateOutputSATJONDOCK> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputSATJONDOCK = {
        fromDate: inputs.fromDate
    };
    return powerbiTransports.wolf.execute(SQLTemplateSATJONDOCK, params) as Promise<SQLTemplateOutputSATJONDOCK>;
}
export async function getSAOBatDoor(): Promise<SQLTemplateOutputSAOBATDOOR> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateSAOBATDOOR) as Promise<SQLTemplateOutputSAOBATDOOR>;
}
export async function getSAAndreaRpt(): Promise<SQLTemplateOutputSAANDREA> {
    logger.debug('Calling SQLTemplate program');
    return powerbiTransports.wolf.execute(SQLTemplateSAANDREA) as Promise<SQLTemplateOutputSAANDREA>;
}
export async function getControlListing(inputs: JSONObject): Promise<SQLTemplateOutputCTRLLIST> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputCTRLLIST = {
        fromDate: inputs.fromDate,
        toDate: inputs.toDate
    };
    return powerbiTransports.wolf.execute(SQLTemplateCTRLLIST, params) as Promise<SQLTemplateOutputCTRLLIST>;
}
export async function getOl736Data(inputs: JSONObject): Promise<SQLTemplateOutputOL736DATA> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputOL736DATA = {
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateOL736DATA, params) as Promise<SQLTemplateOutputOL736DATA>;
}
export async function getFed46r(inputs: JSONObject): Promise<SQLTemplateOutputFED46R> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputFED46R = {
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateFED46R, params) as Promise<SQLTemplateOutputFED46R>;
}
export async function getTrips(inputs: JSONObject): Promise<SQLTemplateOutputTRIPS> {
    logger.debug('Calling SQLTemplate program');
    const params: SQLTemplateInputTRIPS = {
        fromDate: DateTime.fromFormat('' + inputs.fromDate, 'yyMMdd').toISODate(),
        toDate: DateTime.fromFormat('' + inputs.toDate, 'yyMMdd').toISODate()
    };
    return powerbiTransports.wolf.execute(SQLTemplateTRIPS, params) as Promise<SQLTemplateOutputTRIPS>;
}
