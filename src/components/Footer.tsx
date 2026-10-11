export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-4 py-5 text-center text-xs leading-relaxed text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-sm sm:text-left">
        <p className="w-full sm:max-w-[48%]">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="w-full sm:max-w-[48%] sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}