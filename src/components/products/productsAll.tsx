import ProductsCard from './productsCard';
import type {Product} from "@/types/product.type";

// interface Product {
//     id: number;
//     nameBn: string;
//     categoryNameBn: string;
//     image: string;
//     today: number;
//     unit: string;
//     change: {
//         dir: 'up' | 'down' | 'no-change';
//         pct: number;
//     };
// }

const ProductsAll = ({ id, products }: { id: string; products: Product[] }) => {

    return (
        <div id={id} className='productsList' >
             <h2 className="mb-1 text-xl font-bold">সব পণ্য</h2>
             <p className="text-sm text-gray-500 mb-4">মোট {(products.length).toLocaleString('bn-BD')} টি পণ্য দেখানো হচ্ছে</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductsCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsAll;