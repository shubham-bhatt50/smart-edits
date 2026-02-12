'use client';

const navItems = [
  {
    name: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 8H8M2 4H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    active: true,
  },
  {
    name: 'Employees',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 14C2 11.7909 4.68629 10 8 10C11.3137 10 14 11.7909 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    active: false,
  },
  {
    name: 'Documents',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2H10L13 5V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V3C3 2.44772 3.44772 2 4 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 2V5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    active: false,
  },
  {
    name: 'Analytics',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12L6 8L9 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 6H10V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    active: false,
  },
  {
    name: 'Notifications',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2C6.34315 2 5 3.34315 5 5V7.5C5 8.05228 4.55228 8.5 4 8.5H2.5C2.22386 8.5 2 8.72386 2 9V10C2 10.2761 2.22386 10.5 2.5 10.5H13.5C13.7761 10.5 14 10.2761 14 10V9C14 8.72386 13.7761 8.5 13.5 8.5H12C11.4477 8.5 11 8.05228 11 7.5V5C11 3.34315 9.65685 2 8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 12.5C6 13.3284 6.67157 14 7.5 14H8.5C9.32843 14 10 13.3284 10 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    active: false,
  },
  {
    name: 'Settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.5 8C12.5 7.5 12.7 7 13 6.5L12 5.5C11.5 5.2 11 5 10.5 5H9.5C9 5 8.5 5.2 8 5.5L7 4.5C6.5 4.8 6 5 5.5 5H4.5C4 5 3.5 5.2 3 5.5L2 6.5C1.5 7 1.3 7.5 1.5 8C1.3 8.5 1.5 9 2 9.5L3 10.5C3.5 10.8 4 11 4.5 11H5.5C6 11 6.5 10.8 7 10.5L8 11.5C8.5 11.2 9 11 9.5 11H10.5C11 11 11.5 10.8 12 10.5L13 9.5C13.5 9 13.7 8.5 12.5 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    active: false,
  },
];

export default function Sidebar() {
  return (
    <div className="bg-white border-r border-[#e2e8f0] h-full w-[256px] flex flex-col">
      {/* Logo Section */}
      <div className="border-b border-[#e2e8f0] h-[95px] pt-6 px-6 pb-1">
        <div className="flex gap-3 items-center">
          <div className="rounded-[10px] w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#155dfc] to-[#4f39f6]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2L3 7V17H8V12H12V17H17V7L10 2Z" fill="white"/>
            </svg>
          </div>
          <div>
            <p className="font-medium text-[20px] leading-[30px] text-[#0f172b] tracking-[-0.45px]">
              Acme Corp
            </p>
            <p className="text-[12px] leading-4 text-[#62748e]">
              Admin Portal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 pt-7 px-4">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`flex gap-3 items-center h-10 px-3 rounded-[10px] cursor-pointer transition-colors ${
                item.active
                  ? 'bg-[#eff6ff] border border-[#dbeafe]'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-4 h-4 ${item.active ? 'text-[#155dfc]' : 'text-[#45556c]'}`}>
                {item.icon}
              </div>
              <span
                className={`text-sm leading-5 ${
                  item.active ? 'text-[#155dfc]' : 'text-[#45556c]'
                }`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="border-t border-[#e2e8f0] pt-4 px-4 pb-4">
        <div className="bg-[#f8fafc] rounded-[10px] p-4 flex flex-col gap-1">
          <p className="text-[12px] leading-4 text-[#0f172b]">Need help?</p>
          <p className="text-[12px] leading-4 text-[#45556c]">Contact our support team</p>
          <button className="bg-[#0f172b] text-white text-[12px] leading-4 py-1.5 px-3 rounded-[10px] mt-2 hover:bg-[#1a2332] transition-colors">
            Get support
          </button>
        </div>
      </div>
    </div>
  );
}
