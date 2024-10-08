import createGameController, {
  DuplicateNumberException,
  InvalidInputLengthException,
  InvalidInputTypeException,
  parseResult,
} from '@ibfu/number-baseball';
import readline from 'readline';

export const getUserInput = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

const main = async () => {
  const controller = createGameController();

  controller.start();
  console.log('숫자야구 게임을 시작합니다!');
  let isRunning = true;

  while (isRunning) {
    try {
      const input = await getUserInput('숫자를 입력하세요: ');
      const result = controller.getResult(input);
      console.log(parseResult(result), ',1시도 횟수 :', result.attemptCount);

      if (result.isCorrect) {
        console.log('정답입니다!');
        const isContinue = await getUserInput('다시 하시겠습니까? (y/n): ');
        if (isContinue === 'y') {
          controller.restart();
          continue;
        } else {
          console.log('게임을 종료합니다.');
          isRunning = false;
        }
      }
    } catch (e: unknown) {
      if (e instanceof InvalidInputLengthException) {
        console.log('입력한 숫자의 길이가 다릅니다. 다시 입력해주세요.');
        continue;
      }
      if (e instanceof DuplicateNumberException) {
        console.log('중복된 숫자가 있습니다. 다시 입력해주세요.');
        continue;
      }
      if (e instanceof InvalidInputTypeException) {
        console.log('숫자가 아닌 문자가 포함되어 있습니다. 다시 입력해주세요.');
        continue;
      }
      if (e instanceof Error) {
        console.log('에러발생!', e.message);
      }
    }
  }
  process.exit(0);
};

main();
