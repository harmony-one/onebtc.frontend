import { getAddress } from '@harmony-js/crypto';

export const addressIsEq = (address1: string, address2: string) => {
  return getAddress(address1).checksum === getAddress(address2).checksum;
};
