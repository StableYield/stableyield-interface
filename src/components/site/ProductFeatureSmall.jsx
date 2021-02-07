/**
 * @name ProductFeatureSmall
 * @param {Object} props
 */
export const ProductFeatureSmall = ({ image, label, description }) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-200 text-white">
          <img src={image} width={28} />
        </div>
      </div>
      <div className="ml-4">
        <dt className="text-lg leading-6 font-medium text-gray-900">{label}</dt>
        <dd className="mt-2 text-base text-gray-500">{description}</dd>
      </div>
    </div>
  );
};

ProductFeatureSmall.defaultProps = {
  image: "/icons/loading.svg",
  title: "INSERT TITLE",
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
};

export default ProductFeatureSmall;
