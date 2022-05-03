import { ONE_DAY } from '../constants/date';

export enum STAKING_PERIODS {
  THREE = 3,
  SIX = 6,
  TWELVE = 12,
}

export const REWARD_DAYS = 14;

export const calcStakingARP = (
  lockPeriod: number,
  extendPeriod: number = 0,
) => {
  const newPeriod = lockPeriod + extendPeriod;
  if (newPeriod >= STAKING_PERIODS.TWELVE) {
    return 15;
  }

  if (newPeriod >= STAKING_PERIODS.SIX) {
    return 10;
  }

  return 5;
};

export const calcDaysLeftForReward = (rewardClaimAt: number) => {
  const nextRewardClaimAt = rewardClaimAt + ONE_DAY * REWARD_DAYS;
  return Math.ceil((nextRewardClaimAt - Date.now()) / ONE_DAY);
};
