import type { Product } from '@/types/product.type';
import ProductsCard from './productsCard';

const ProductsLow = ({ products }: { products: Product[] }) => {

    const lowProducts = [...products]
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6);


    return (
        <div>

            <h2 className="mb-4 text-xl font-bold"><span className="text-[#1a9951] mr-3">▼</span>আজ দাম কমেছে</h2>
            <div 
            className="grid grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">

                {lowProducts.map(product => <ProductsCard key={product.id} product={product} />)}
            </div>
        </div>
    );
};

export default ProductsLow;