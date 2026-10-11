"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getDate = () => new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
});
const getServerDate = () => "";

const CurrentDate = () => {
    const date = useSyncExternalStore(subscribe, getDate, getServerDate);

    return <p className="text-sm text-[#05893e] bg-[#e1f0e7] p-2 ">{date}</p>;
};

export default CurrentDate;