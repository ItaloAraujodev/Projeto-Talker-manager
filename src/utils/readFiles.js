const fs = require('fs/promises');

const readTalkerFile = async () => {
  try {
    const talker = await fs.readFile('src/talker.json', 'utf-8');
    return JSON.parse(talker);
  } catch (error) {
    console.log(error);
  }
};

module.exports = readTalkerFile;