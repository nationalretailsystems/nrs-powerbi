import pm2 from 'pm2';

export default async function isPm2Running(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        pm2.list((err, list) => {
            if (err) {
                reject(err);
            } else {
                resolve(list.length > 0);
            }
        });
    });
}
