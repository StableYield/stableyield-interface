/**
 * @name AaveTokenAPY
 * @param {Object} props
 */
export const AaveTokenAPY = ({ apy, name, symbol, image, primary }) => {
  const tagColor = primary ? "tag-green" : "tag-blue";

  return (
    <div>
      <h5 className="text-2xl font-bold">{apy}% APY</h5>
      <div className={`flex items-center mt-3 ${tagColor} inline-flex pr-3`}>
        <img src={image} width={22} className="self-center" />
        <span className="ml-2 text-md">
          {name} ({symbol})
        </span>
      </div>
    </div>
  );
};

AaveTokenAPY.defaultProps = {
  apy: "0.00",
  name: "US Dollar",
  symbol: "USD",
  image: "/tokens/dai.svg",
};

export default AaveTokenAPY;
