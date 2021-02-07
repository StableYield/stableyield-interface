import React from "react";
import EtherscanLink from "./EtherscanLink";
import { shortenAddress } from "../../state/web3-react-system/lib/helpers";
import { Span } from "../../components/layout";
import { utils, constants } from "ethers";

/**
 * @name Address
 * @param {Object} props
 */
export const Address = ({ address, isLink, sx, trim, ...props }) => {
  if (isLink) {
    return (
      <EtherscanLink address={address}>
        <Span sx={sx} {...props}>
          {shortenAddress(address, trim)}
        </Span>
      </EtherscanLink>
    );
  }
  return !address ? null : (
    <Span sx={sx} {...props}>
      {shortenAddress(address, trim)}
    </Span>
  );
};

export default Address;

Address.defaultProps = {
  address: constants.AddressZero,
  trim: 7,
  sx: {},
};
