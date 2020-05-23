import { DictionaryOf } from "./dictionaryOf";

export const delayedDeviceAnimation = (function () {
  const lastFrames: DictionaryOf<number> = {};
  return (deviceId: string, draw: (update: boolean) => void, delay: number) => {
    if (lastFrames[deviceId] === undefined) {
      lastFrames[deviceId] = 0
    }
    const currentFrame = Date.now();
    const diff = currentFrame - lastFrames[deviceId];
    const update = diff >= delay;


    draw(update);

    if (update) {
      lastFrames[deviceId] = currentFrame;
    }
  };
})();
