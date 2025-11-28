import ProductList from '../components/products/ProductList';

const ProductPage = () => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-offwhite-900 mb-8 bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">Our Products</h1>
      <ProductList />
    </div>
  );
};

export default ProductPage;
