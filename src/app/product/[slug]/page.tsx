import React from 'react';

const ProductsDetailsPage = async ({ params }) => {

    const { slug } = await params;

    const product = await slug;

    console.log("products details page==>",product);

    return (
        <div>
            <h1>{product.nameBn}</h1>
            <p>{product.category}</p>
        </div>
    );
};

export default ProductsDetailsPage;