 /* eslint-disable no-unused-vars */
const {exec} = require('child_process');
require('dotenv').config({ path: __dirname + '/../.env' });     //process.loadEnvFile()
 
exports.backupDatabase = async () => {
    const dbName = 'PetMarket';
    const outputPath = './backups';

      const command = `mongodump --uri "${process.env.MONGO_URI}" --out ${outputPath} --gzip`;

    await exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error en el respaldo: ${error.message}`);
            return;
        }
        console.log(`Respaldo completado con éxito ${stdout}`);
    });
};