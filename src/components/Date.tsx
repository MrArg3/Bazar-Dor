"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getDate = () => new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
});
const getServerDate = () => "";

const CurrentDate = () => {
    const date = useSyncExternalStore(subscribe, getDate, getServerDate);

    return (
        <p className="inline-block rounded-2xl bg-[#e1f0e7] px-2 py-1 text-sm text-[#05893e]">
            {date}
        </p>
    );
};

export default CurrentDate;