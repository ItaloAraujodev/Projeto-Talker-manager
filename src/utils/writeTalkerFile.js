const fs = require('fs').promises;
const { join } = require('path');

const writeTalkerFile = async (contentFile) => {
    try {
        await fs.writeFile(join(__dirname, '../talker.json'), JSON.stringify(contentFile));
    } catch (err) {
        console.log('erro ao tentar escrever arquivo', err.message);
        return null;
    }
};

module.exports = writeTalkerFile;