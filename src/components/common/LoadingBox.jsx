import classnames from "classnames";

/**
 * @name LoadingBox
 * @param {Object} props
 */
export const LoadingBox = ({
  classNameContainer,
  classNamelabel,
  classNameDescription,
  label,
  description,
}) => {
  const classNameContainerWithDefaults = classnames(
    "card flex-center flex-col items-center p-10 text-center",
    classNameContainer
  );
  const classNameLabelWithDefaults = classnames("block", classNamelabel);
  const classNameDescriptionWithDefaults = classnames(
    "block",
    classNameDescription
  );

  return (
    <div className={classNameContainerWithDefaults}>
      <span>
        <svg
          class="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="#000"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="#000"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </span>
      <h5 className="text-xl border-bottom pb-3 mt-4">
        <span className={classNameLabelWithDefaults}>{label}</span>
        {description && (
          <span className={classNameDescriptionWithDefaults}>
            {description}
          </span>
        )}
      </h5>
    </div>
  );
};

LoadingBox.defaultProps = {
  label: "Loading",
  description: undefined,
};

export default LoadingBox;
