import type { Product } from '@/types/product.type';
import ProductsCard from './productsCard';

const ProductsHigh = ({ products }: { products: Product[] }) => {

    const topProducts = [...products]
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);


    return (
        <div>

            <h2 className="mb-4 text-xl font-bold"><span className="text-red-500 mr-3">▲</span>আজ দাম বেড়েছে</h2>
            <div 
            className="grid grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">

                {topProducts.map(product => <ProductsCard key={product.id} product={product} />)}
            </div>
        </div>
    );
};

export default ProductsHigh;