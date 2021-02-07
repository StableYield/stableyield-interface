import classnames from "classnames";

/**
 * @name StatisticBasic
 * @param {Object} props
 */
export const StatisticBasic = ({
  label,
  value,
  valueTag,
  classNameContainer,
  classNameLabel,
  classNameValue,
}) => {
  const classNameContainerDefault = classnames("p-3", classNameContainer);
  const classNameLabelDefault = classnames(
    "block font-black text-xs text-gray-400",
    classNameLabel
  );
  const classNameValueDefault = classnames(
    "block font-black text-3xl",
    classNameValue
  );
  const classNameValueTag = classnames(
    "font-black text-xl text-gray-600",
    classNameValue
  );

  return (
    <div className={classNameContainerDefault}>
      <span className={classNameLabelDefault}>{label}</span>
      <span className={classNameValueDefault}>
        {value}{" "}
        {valueTag && <span className={classNameValueTag}>{valueTag}</span>}
      </span>
    </div>
  );
};
export default StatisticBasic;
