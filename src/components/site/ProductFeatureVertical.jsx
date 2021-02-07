/**
 * @name ProductFeatureVertical
 * @param {Object} props
 */
export const ProductFeatureVertical = ({
  image,
  title,
  tagline,
  description,
}) => {
  return (
    <div className="md:w-1/3 p-8">
      <img
        className="max-w-1/3 max-h-32 mx-auto mb-4 rounded-full"
        src={image}
        alt=""
      />
      <h3 className="text-3xl mb-1 font-semibold font-heading">{title}</h3>
      <span className="text-lg text-gray-500">{tagline}</span>
      <p className="mt-4 text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

ProductFeatureVertical.defaultProps = {
  image: "/dapps/eth-diamond-rainbow.png",
  title: "INSERT TITLE",
  tagline: "Product Tagline Info",
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
};

export default ProductFeatureVertical;
