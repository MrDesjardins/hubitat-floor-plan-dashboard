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


export const delayedDeviceMultiAnimations = (function () {
  const lastFrames: DictionaryOf<number[]> = {};
  return (deviceId: string, draw: (update: boolean[]) => void, delay: number[]) => {
    const currentFrame = Date.now();
    const updates: boolean[] = [];
    delay.forEach((valueDelay: number, index: number) => {
      if (lastFrames[deviceId] === undefined) {
        lastFrames[deviceId] = [];
      }
      if (index >= lastFrames[deviceId].length) {
        lastFrames[deviceId].push(0);
      }
      const diff = currentFrame - lastFrames[deviceId][index];
      const update = diff >= valueDelay;
      updates.push(update);
      if (update) {
        lastFrames[deviceId][index] = currentFrame;
      }
    });
    draw(updates);
  };
})();
