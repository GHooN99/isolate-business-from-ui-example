import createGameController from '@ibfu/number-baseball';

const controller = createGameController();

controller.start();

try {
  console.log(controller.getResult('123'));
} catch (e) {
  console.log('debug:', e);
}
