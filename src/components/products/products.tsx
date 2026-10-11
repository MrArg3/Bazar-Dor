import ProductsAll from './productsAll';
import ProductsHigh from './productsHigh';
import ProductsLow from './productsLow';
import type { Product } from '@/types/product.type';

const Products = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
        throw new Error(`Products API returned a non-JSON response (${contentType || 'unknown content type'}).`);
    }

    const products: Product[] = await response.json();
    if (!Array.isArray(products)) {
        throw new Error('The products API returned an invalid response.');
    }

    return (
        <section className="mx-auto my-8 w-full max-w-6xl px-4">

            <div className="flex flex-col gap-8">

                <ProductsHigh products={products} />
                <ProductsLow products={products} />
                <ProductsAll 
                   id="productsList" 
                   products={products} />

            </div>

        </section>
    );
};

export default Products;
