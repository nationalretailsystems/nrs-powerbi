import { readFileSync } from 'fs';
import path from 'path';

function getKeys() {
    const privateKey = readFileSync(path.join(__dirname, 'jwt-private.key'));
    const publicKey = readFileSync(path.join(__dirname, 'jwt-public.key'));
    return {
        privateKey,
        publicKey
    };
}

export default getKeys();
