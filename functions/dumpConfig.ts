import { exec } from 'child_process';
import fs from 'fs';

exec('firebase functions:config:get', (error, configData) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log('EXEC ERROR!', error);
    return;
  }

  fs.writeFileSync('.runtimeconfig.json', configData);
});
