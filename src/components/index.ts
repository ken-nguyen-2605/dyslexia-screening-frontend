/**
 * index.ts
 * - Export gọn tất cả module minigame4
 */

import MiniGame4 from './MiniGame4';
import MinigameCanvas from './MiniGame4Canvas';
import { useMinigameLogic } from './MiniGame4Logic';
import { speakLetter } from './audio';
import * as animations from './animations';
import { rewardCorrectAnswer, resetRewards, loadRewardState } from './rewardSystem';
import { LETTERS, getRandomLetter } from './letters';

export {
  MiniGame4,
  MinigameCanvas,
  useMinigameLogic,
  speakLetter,
  animations,
  rewardCorrectAnswer,
  resetRewards,
  loadRewardState,
  LETTERS,
  getRandomLetter,
};
