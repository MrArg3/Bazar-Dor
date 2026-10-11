
import type { Product } from "@/types/product.type"
import Link from "next/link";

const unitLabelsBn: Record<string, string> = {
    kg: 'কেজি',
    litre: 'লিটার',
    dozen: 'ডজন',
    piece: 'পিস',
};


const ProductsCard = ({ product }: { product: Product }) => {
    const unitBn = unitLabelsBn[product.unit] ?? product.unit;

    return (
        <Link href={`/product/${product.slug}`}>
            <div
                key={product.id}
                className="rounded-xl border border-gray-200 hover:border-[#05893e] hover:transition hover:shadow-md p-4 shadow-sm"
            >
                <div className="flex items-start align-items gap-3">
                    <span aria-hidden="true" className="grid size-12 shrink-0 bg-gray-300 place-items-center rounded-xl bg-base-200 text-2xl">{product.image}</span>
                    <div>
                        <h3 className="mt-1 font-semibold">{product.nameBn}</h3>
                        <p className="text-sm text-gray-500">প্রতি {unitBn}</p>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                    <div>
                        <p className="text-xs text-gray-500">আজকের দাম</p>
                        <p className="text-xl font-bold">
                            {product.today.toLocaleString('bn-BD')} <span className="text-sm font-medium ">টাকা</span> </p>

                    </div>

                    <span className={`mt-1 text-sm font-bold py-[2px] px-2 rounded-xl ${product.change.dir === 'up'
                        ? 'text-[#d03739] bg-red-100'
                        : product.change.dir === 'down'
                            ? 'text-[#1a9951] bg-[#e1f0e7]'
                            : 'text-gray-500 bg-gray-200'
                        }`} >
                        {product.change.dir === 'up' ? '▲' : product.change.dir === 'down' ? '▼' : '-'}{' '}
                        {product.change.dir != 'up' && product.change.dir != 'down' ? '০.' : ''}
                        {Math.abs(product.change.pct).toLocaleString('bn-BD')}%
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductsCard;