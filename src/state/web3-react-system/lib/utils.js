import { ethers } from "ethers";
import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";

/**
 * @name getContract
 * @param {*} address
 * @param {*} ABI
 * @param {*} account
 */
export function getContract(address, ABI, library, account) {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  const contract = new ethers.Contract(
    address,
    ABI,
    getProviderOrSigner(library, account)
  );
  return contract;
}

/**
 * @name getContractFactory
 * @param {*} address
 * @param {*} ABI
 * @param {*} account
 */
export function getContractFactory(ABI, BYTECODE, library, account) {
  if (!BYTECODE || !ABI) {
    throw Error(`Contract Factory invalid ABI or Bytecide.`);
  }
  try {
    const contract = new ethers.ContractFactory(
      ABI,
      BYTECODE,
      getProviderOrSigner(library, account)
    );
    return contract;
  } catch (error) {
    console.log(error, "errrrr");
  }
}

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function getSigner(library, account) {
  return library.getSigner(account);
}

// account is optional
export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}
