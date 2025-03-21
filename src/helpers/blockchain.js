import React from "react";
import { ethers, utils, BigNumber } from "ethers";

/**
 * @name bigNumberToString
 * @param x
 * @param precision
 */
export function bigNumberToString(bigNumber) {
  if (!bigNumber) return "0.00";
  return bigNumber.toString();
}

/**
 * @name numberTrimDecimals
 * @param x
 * @param precision
 */
export function numberTrimDecimals(x, precision = 2) {
  return Number.parseFloat(x).toFixed(precision);
}

/**
 * @name transformTokenToHuman
 * @param x
 * @param precision
 */
export function transformTokenToHuman(token, decimals = 18) {
  if (!token) return null;
  if (BigNumber.isBigNumber(token)) {
    return ethers.utils.formatUnits(token, decimals);
  } else {
    let bn = BigNumber.from(token);
    return ethers.utils.formatUnits(bn, decimals);
  }
}

/**
 * @name commifyNumber
 * @param number
 */
export function commifyNumber(number) {
  return utils.commify(number);
}

/**
 * @name commifyTokenBalance
 * @param number
 */
export function commifyTokenBalance(number, decimals = 18, decimalsTrim = 4) {
  return utils.commify(
    numberTrimDecimals(transformTokenToHuman(number, decimals), decimalsTrim)
  );
}

/**
 * @name transformDecimalsToWad
 * @param x
 * @param precision
 */
export function transformDecimalsToWad(amount, decimals = 18) {
  if (!amount) return null;
  const number = BigNumber.isBigNumber(amount) ? amount.toString() : amount;
  return ethers.utils.parseUnits(number, decimals);
}

/**
 * @desc shorten address
 * @param  {String} [address]
 * @param  {Number} [num]
 * @param  {Boolean} [showEnd = true]
 * @return {String}
 */

export function shortenAddress(address, num = 7, showEnd = true) {
  if (!address) return null;
  return num
    ? `${address.slice(0).slice(0, num)}...${
        showEnd ? address.slice(0).slice(-num) : ""
      }`
    : address;
}

export function shortenTransactionHash(txHash, num, showEnd = true) {
  if (!txHash) return null;
  return `${txHash.slice(0).slice(0, num)}...${
    showEnd ? txHash.slice(0).slice(-num) : ""
  }`;
}
export function shortenBlockHash(txHash, num, showEnd = true) {
  if (!txHash) return null;
  return `${txHash.slice(0).slice(0, num)}...${
    showEnd ? txHash.slice(0).slice(-60 - num) : ""
  }`;
}

export const trimBalance = (balance) => {
  if (!balance) return null;
  return balance.slice(0, 5);
};

export const useConvertAndMemoBigNumber = (bigNumber) =>
  React.useMemo(() => {
    if (BigNumber.isBigNumber(bigNumber)) {
      return numberTrimDecimals(transformTokenToHuman(bigNumber));
    }
  }, [bigNumber]);

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean} sinof
 */
export const isAddress = (address) => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  } else if (
    /^(0x)?[0-9a-f]{40}$/.test(address) ||
    /^(0x)?[0-9A-F]{40}$/.test(address)
  ) {
    return true;
  }

  /* TODO: SHAD ADDRESS
    We should also SHA the addresses, but the sha_512 is not the correct one.
    And, I can't find the correct implmementation online. So if it fits, we ships! - @kamescg  */
  // return isChecksumAddress(address);
  return true;
};

/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
var isChecksumAddress = function (address) {
  // Check each case
  address = address.replace("0x", "");
  var addressHash = utils.keccak256(address.toLowerCase());
  for (var i = 0; i < 40; i++) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if (
      (parseInt(addressHash[i], 16) > 7 &&
        address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 &&
        address[i].toLowerCase() !== address[i])
    ) {
      return false;
    }
  }
  return true;
};

/**
 * @func createStringhash
 * @desc Pass string into ethers keccak256 hashing function.
 * @param {String} msg
 */
export const createStringhash = (msg) =>
  utils.solidityKeccak256(["string"], [msg]);

const createStringMessageSignature = (msg) => {
  let messageHash = utils.solidityKeccak256(["string"], [msg]);
  let messageHashBytes = utils.arrayify(messageHash);
  return messageHashBytes;
};

export default {
  createStringhash,
  createStringMessageSignature,
  isAddress,
  isChecksumAddress,
  shortenAddress,
};
