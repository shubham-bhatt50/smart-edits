'use client';

export default function Header() {
  return (
    <div className="bg-white border-b border-[#e2e8f0] h-[105px] shadow-sm">
      <div className="h-full pt-6 px-8 pb-1">
        <div className="flex h-14 items-center justify-between">
          <div>
            <h1 className="font-medium text-2xl leading-9 text-[#0f172b] tracking-[0.07px]">
              Employee records
            </h1>
            <p className="text-sm leading-5 text-[#62748e] tracking-[-0.15px] mt-0.5">
              Manage employee records
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <button className="h-10 px-4 rounded-[10px] border border-[#e2e8f0] hover:bg-gray-50 transition-colors flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V10M8 10L5 7M8 10L11 7M3 13H13" stroke="#314158" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium text-base leading-6 text-[#314158] tracking-[-0.31px]">
                Export
              </span>
            </button>
            <button className="h-10 px-4 rounded-[10px] bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3C5.5 3 3.5 5 3.5 7.5C3.5 10 5.5 12 8 12C10.5 12 12.5 10 12.5 7.5C12.5 5 10.5 3 8 3ZM8 10.5C6.6 10.5 5.5 9.4 5.5 8C5.5 6.6 6.6 5.5 8 5.5C9.4 5.5 10.5 6.6 10.5 8C10.5 9.4 9.4 10.5 8 10.5ZM8 6.5C7.2 6.5 6.5 7.2 6.5 8C6.5 8.8 7.2 9.5 8 9.5C8.8 9.5 9.5 8.8 9.5 8C9.5 7.2 8.8 6.5 8 6.5Z" fill="#314158"/>
              </svg>
              <span className="font-medium text-base leading-6 text-[#314158] tracking-[-0.31px]">
                Normal view
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
