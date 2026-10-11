import React from 'react';

const page = () => {
    return (
        <section className="mx-auto w-full max-w-6xl mt-6">

            <div>
                 {/* <span aria-hidden="true" classNam  e="grid size-12 shrink-0 bg-gray-300 place-items-center rounded-xl bg-base-200 text-2xl">{product.image}</span> */}
                <div>
                <h1>পণ্য শ্রেণী</h1>
                <p>প্রতিটি পণ্যের আজকের দাম ও পরিবর্তন</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-3 flex items-center justify-end gap-2">
                <label htmlFor="sort" className="text-sm text-gray-600"> সাজান</label>

                <div className="relative">
                    <select
                        id="sort"
                        className="appearance-none bg-white border border-gray-300 rounded-lg text-sm pl-3 pr-8 py-1.5 focus:outline-none focus:border-green-600"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="asc">দাম: কম থেকে বেশি</option>
                        <option value="desc">দাম: বেশি থেকে কম</option>
                    </select>
                    <svg
                        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>

            <p className="mt-4 text-sm text-gray-500"> মোট </p>

        </section>
    );
};

export default page;