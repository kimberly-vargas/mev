import { ProductCard } from "./ProductCard";

const ProductsList = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <ProductCard key={index} item={item} />
      ))}
    </>
  );
};

export { ProductsList };
