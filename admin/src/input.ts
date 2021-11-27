import readline from 'readline';
/**
 * 標準入力を取得する
 */
const question = (question: string): Promise<string> => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readlineInterface.question(question, (answer) => {
      resolve(answer);
      readlineInterface.close();
    });
  });
};

const prompt = async (msg: string): Promise<string> => {
  console.log(msg);
  const answer = await question('> ');
  return answer.trim();
};

const input = (): Promise<string> => {
  return prompt('UserName?');
};

export default input;
