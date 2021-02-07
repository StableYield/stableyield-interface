import styles from "./WalletDeFiStats.module.css";
/**
 * @name  WalletDeFiStats
 * @param {Object} props
 */
export const WalletDeFiStats = (props) => {
  return (
    <div className={styles.container}>
      <Statistic
        value={"$2,898"}
        label="Uniswap Value Swapped"
        image={
          "https://raw.githubusercontent.com/trustwallet/tokens/master/dapps/uniswap.io.png"
        }
      />
      <Statistic
        value={"$5,624"}
        label="1Inch Value Swapped"
        image={
          "https://tokens.1inch.exchange/0xd533a949740bb3306d119cc777fa900ba034cd52.png"
        }
      />
      <Statistic
        value={"$0.00"}
        label="Curve Value Swapped"
        image={
          "https://tokens.1inch.exchange/0x111111111117dc0aa78b770fa6a738034120c302.png"
        }
      />
    </div>
  );
};

const Statistic = ({ label, value, image }) => {
  return (
    <div className={styles.statistic}>
      <h3 className={styles.statisticValue}>{value}</h3>
      <div className={styles.statisticLabelContainer}>
        {image && (
          <img src={image} className={styles.statisticLabelImage} width={20} />
        )}
        <h5 className={styles.statisticLabel}>{label}</h5>
      </div>
    </div>
  );
};

export default WalletDeFiStats;
