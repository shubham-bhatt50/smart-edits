'use client';

import { useSidebar } from '@/contexts/SidebarContext';
import {
  IconChevronLeft,
  IconLayoutSidebarLeftCollapse,
  IconMinus,
  IconX,
  IconSettings,
  IconAlertTriangle,
  IconMaximize,
  IconDotsVertical,
  IconArrowsMaximize,
  IconPencil,
  IconUsers,
  IconPlus,
} from '@tabler/icons-react';

// Mini dashboard preview component for screen cards
function DashboardPreview() {
  return (
    <div className="bg-white rounded overflow-hidden border border-[#e2e8f0] select-none pointer-events-none">
      <div className="flex h-full">
        {/* Mini sidebar */}
        <div className="w-[52px] bg-white border-r border-[#e2e8f0] p-1 flex flex-col gap-px shrink-0">
          <div className="text-[5px] font-semibold text-[#0f172b] mb-1 px-0.5">Admin Portal</div>
          <div className="bg-[#eff6ff] rounded px-1 py-0.5 text-[4.5px] font-medium text-[#155dfc]">Dashboard</div>
          <div className="px-1 py-0.5 text-[4.5px] text-[#45556c]">Employees</div>
          <div className="px-1 py-0.5 text-[4.5px] text-[#45556c]">Documents</div>
          <div className="px-1 py-0.5 text-[4.5px] text-[#45556c]">Analytics</div>
          <div className="px-1 py-0.5 text-[4.5px] text-[#45556c]">Notifications</div>
          <div className="px-1 py-0.5 text-[4.5px] text-[#45556c]">Settings</div>
          <div className="flex-1" />
          <div className="bg-[#f8fafc] rounded p-1">
            <div className="text-[3.5px] text-[#0f172b] font-medium">Need help?</div>
            <div className="text-[3.5px] text-[#45556c]">Contact our support team</div>
            <div className="bg-[#0f172b] text-white text-[3.5px] rounded px-1 py-px mt-0.5 text-center">Get support</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-[#f8fafc] min-w-0">
          {/* Mini header */}
          <div className="bg-white border-b border-[#e2e8f0] px-1.5 py-1 flex items-center justify-between">
            <div>
              <div className="text-[5px] font-semibold text-[#0f172b]">Employee records</div>
              <div className="text-[3.5px] text-[#62748e]">Manage employee records</div>
            </div>
            <div className="flex gap-1">
              <div className="border border-[#e2e8f0] rounded px-1 py-px text-[3.5px] text-[#314158]">Export</div>
              <div className="bg-[#f1f5f9] rounded px-1 py-px text-[3.5px] text-[#314158]">Normal view</div>
            </div>
          </div>

          <div className="p-1.5 flex flex-col gap-1">
            {/* Stats row */}
            <div className="flex gap-1">
              {[
                { title: 'Total Records', value: '247', sub: '+12 this month', dot: 'bg-[#2b7fff]' },
                { title: 'PII Fields', value: '1,482', sub: 'Across all records', dot: 'bg-[#fe9a00]' },
                { title: 'Redacted', value: '89%', sub: 'Compliance rate', dot: 'bg-[#00c950]' },
                { title: 'Pending', value: '27', sub: 'Requires review', dot: 'bg-[#fb2c36]' },
              ].map((stat) => (
                <div key={stat.title} className="flex-1 bg-white border border-[#e2e8f0] rounded p-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[3.5px] text-[#45556c]">{stat.title}</span>
                    <div className={`w-1 h-1 rounded-full ${stat.dot}`} />
                  </div>
                  <div className="text-[7px] font-semibold text-[#0f172b]">{stat.value}</div>
                  <div className="text-[3px] text-[#62748e]">{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Mini search/filter bar + table */}
            <div className="bg-white border border-[#e2e8f0] rounded overflow-hidden">
              <div className="border-b border-[#e2e8f0] px-1.5 py-0.5 flex items-center gap-1">
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded flex-1 px-1 py-0.5 text-[3.5px] text-[#a8a29e] flex items-center gap-px">
                  <svg width="4" height="4" viewBox="0 0 16 16" fill="none"><path d="M7.33 12.67A5.33 5.33 0 1 0 7.33 2a5.33 5.33 0 0 0 0 10.67ZM14 14l-2.9-2.9" stroke="#999" strokeWidth="2" strokeLinecap="round" /></svg>
                  Search employees...
                </div>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded px-1 py-0.5 text-[3.5px] text-[#314158] flex items-center gap-px">
                  <svg width="4" height="4" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h10M6 12h8" stroke="#314158" strokeWidth="2" strokeLinecap="round" /></svg>
                  Filter
                </div>
              </div>

              {/* Table header */}
              <div className="flex border-b border-[#e2e8f0] bg-[#f8fafc] px-1.5 py-0.5">
                <div className="flex-[2] text-[3.5px] font-bold text-[#45556c] uppercase">Employee</div>
                <div className="flex-[2] text-[3.5px] font-bold text-[#45556c] uppercase">Email</div>
                <div className="flex-1 text-[3.5px] font-bold text-[#45556c] uppercase">SSN</div>
                <div className="flex-1 text-[3.5px] font-bold text-[#45556c] uppercase">Phone</div>
                <div className="flex-1 text-[3.5px] font-bold text-[#45556c] uppercase">Department</div>
              </div>

              {/* Table rows */}
              {[
                { name: 'Sarah Johnson', role: 'Senior Engineer', email: 'sarah.johnson@acmecorp.com', ssn: '123-45-6789', phone: '(555) 123-4567', dept: 'Engineering' },
                { name: 'Michael Chen', role: 'Product Manager', email: 'michael.chen@acmecorp.com', ssn: '987-65-4321', phone: '(555) 987-6543', dept: 'Product' },
                { name: 'Emily Rodriguez', role: 'Data Analyst', email: 'emily.rodriguez@acmecorp.com', ssn: '456-78-9012', phone: '(555) 456-7890', dept: 'Analytics' },
                { name: 'David Martinez', role: 'UX Designer', email: 'david.martinez@acmecorp.com', ssn: '234-56-7890', phone: '(555) 234-5678', dept: 'Design' },
                { name: 'Jessica Williams', role: 'HR Manager', email: 'jessica.williams@acmecorp.com', ssn: '345-67-8901', phone: '(555) 345-6789', dept: 'HR' },
              ].map((emp) => (
                <div key={emp.name} className="flex border-b border-[#e2e8f0] last:border-b-0 px-1.5 py-0.5 items-center">
                  <div className="flex-[2] flex items-center gap-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[3px] shrink-0">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-[3.5px] font-medium text-[#0f172b]">{emp.name}</div>
                      <div className="text-[3px] text-[#62748e]">{emp.role}</div>
                    </div>
                  </div>
                  <div className="flex-[2] text-[3.5px] text-[#314158]">{emp.email}</div>
                  <div className="flex-1 text-[3.5px] text-[#314158]">{emp.ssn}</div>
                  <div className="flex-1 text-[3.5px] text-[#314158]">{emp.phone}</div>
                  <div className="flex-1 text-[3.5px] text-[#314158]">{emp.dept}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ScreenCardProps {
  title: string;
  instruction: string;
  hasWarning?: boolean;
  recommendations?: number;
  borderColor: 'orange' | 'blue';
}

function ScreenCard({ title, instruction, hasWarning, recommendations, borderColor }: ScreenCardProps) {
  const borderClass = borderColor === 'orange'
    ? 'border-[#f59e0b] border-[1.5px]'
    : 'border-[#3b82f6] border-[1.5px]';



  return (
    <div className={`bg-white rounded-xl ${borderClass}`}>
      {/* Card header */}
      <div className="px-3 pt-3 pb-2 flex items-start justify-between">
        <div className="flex items-start gap-2.5">
          {hasWarning && (
            <div className="w-8 h-8 rounded-full bg-[#fef3c7] flex items-center justify-center shrink-0">
              <IconAlertTriangle className="w-4 h-4 text-[#f59e0b]" strokeWidth={2} />
            </div>
          )}
          <div>
            <h3 className="font-bold text-sm text-[#0f172b]">{title}</h3>
            <p className="text-xs text-[#78716c] mt-px">{instruction}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
            <IconMaximize className="w-3.5 h-3.5 text-[#78716c]" strokeWidth={2} />
          </button>
          <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
            <IconDotsVertical className="w-3.5 h-3.5 text-[#78716c]" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Screenshot area */}
      <div className="px-3 pb-2.5 relative">
        <div className="overflow-hidden rounded">
          <DashboardPreview />
        </div>
        {/* Orange expand button overlay */}
        <button className="absolute bottom-4 right-5 w-8 h-8 bg-[#ea580c] hover:bg-[#c2410c] rounded-lg flex items-center justify-center shadow-lg transition-colors z-10">
          <IconArrowsMaximize className="w-3.5 h-3.5 text-white" strokeWidth={2} />
        </button>
      </div>

      {/* Recommendations footer */}
      {recommendations !== undefined && (
        <div className="px-3 pb-3 flex items-center justify-between">
          <span className="text-xs text-[#1c1917]">
            {recommendations > 0 ? `${recommendations} recommendations` : 'No recommendations'}
          </span>
          <button
            onClick={() => {
              if (recommendations > 0) {
                window.open('/edit', '_blank');
              } else {
                window.open('/edit?recommendations=0', '_blank');
              }
            }}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          >
            <IconPencil className="w-3.5 h-3.5 text-[#78716c]" strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExpandableSidebar() {
  const { isExpanded, closeSidebar, minimizeSidebar, hasWarning, setHasWarning } = useSidebar();

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full z-50 transition-transform duration-300 ease-in-out flex ${isExpanded ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ width: '420px', maxWidth: '95vw' }}
      >
        {/* Left icon strip */}
        <div className="w-11 bg-[#1c1917] flex flex-col items-center py-3 gap-3 shrink-0">
          {/* App logo */}
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#ea580c] to-[#dc2626] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="6" height="14" rx="1" fill="white" opacity="0.9" />
              <rect x="10" y="2" width="6" height="6" rx="1" fill="white" opacity="0.7" />
            </svg>
          </div>

          {/* Users icon */}
          <button className="w-7 h-7 rounded-md hover:bg-white/10 flex items-center justify-center transition-colors">
            <IconUsers className="w-4 h-4 text-white/70" strokeWidth={1.5} />
          </button>

          {/* Plus icon */}
          <button className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <IconPlus className="w-4 h-4 text-white/70" strokeWidth={1.5} />
          </button>
        </div>

        {/* Main mirror panel */}
        <div className="flex-1 bg-[#f5f5f4] flex flex-col min-w-0">
          {/* Header */}
          <div className="bg-white border-b border-[#e7e5e4] px-3 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={closeSidebar}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
              >
                <IconChevronLeft className="w-4 h-4 text-[#78716c]" strokeWidth={2} />
              </button>
              <h1 className="font-semibold text-sm text-[#1c1917]">Mirror</h1>
            </div>
            <div className="flex items-center gap-0.5">
              <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                <IconLayoutSidebarLeftCollapse className="w-3.5 h-3.5 text-[#78716c]" strokeWidth={2} />
              </button>
              <button
                onClick={minimizeSidebar}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
              >
                <IconMinus className="w-3.5 h-3.5 text-[#78716c]" strokeWidth={2} />
              </button>
              <button
                onClick={closeSidebar}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
              >
                <IconX className="w-3.5 h-3.5 text-[#78716c]" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3">
            {/* Screen input section */}
            <div className="flex items-center gap-3">
              {/* Device icons */}
              <div className="flex items-center gap-0.5 shrink-0">
                {/* Phone icon */}
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="2" width="10" height="16" rx="2" stroke="#ea580c" strokeWidth="1.5" />
                  <line x1="8" y1="15" x2="12" y2="15" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {/* Monitor icon */}
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="3" width="16" height="11" rx="2" stroke="#ea580c" strokeWidth="1.5" />
                  <line x1="7" y1="17" x2="13" y2="17" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="10" y1="14" x2="10" y2="17" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Text input */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Text"
                  className="w-full bg-white border border-[#d6d3d1] rounded-lg px-3 py-2 text-xs text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/30 focus:border-[#ea580c]"
                />
              </div>
            </div>

            {/* Add more screens button */}
            <button className="w-full border-[1.5px] border-dashed border-[#d6d3d1] rounded-xl py-2.5 flex items-center justify-center gap-1.5 hover:border-[#ea580c] hover:bg-[#ea580c]/5 transition-colors group">
              <IconSettings className="w-4 h-4 text-[#ea580c]" strokeWidth={1.5} />
              <span className="text-xs font-medium text-[#ea580c]">Add more screens</span>
            </button>

            {/* Sensitive information warning */}
            {hasWarning && (
              <div className="bg-[#fef9e7] border border-[#fde68a] rounded-xl px-3 py-2.5 flex items-start gap-2">
                <div className="shrink-0 mt-px">
                  <IconAlertTriangle className="w-4 h-4 text-[#f59e0b]" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xs text-[#1c1917]">Sensitive information found</h3>
                  <p className="text-xs text-[#78716c] mt-0.5 leading-relaxed">
                    Review and censor screens with sensitive information.
                  </p>
                </div>
                <button
                  onClick={() => setHasWarning(false)}
                  className="w-5 h-5 flex items-center justify-center hover:bg-[#fde68a] rounded transition-colors shrink-0"
                >
                  <IconX className="w-3 h-3 text-[#78716c]" strokeWidth={2} />
                </button>
              </div>
            )}

            {/* Screen cards */}
            <ScreenCard
              title="Screen 1"
              instruction="Click on the filter button"
              hasWarning={true}
              recommendations={2}
              borderColor="orange"
            />

            <ScreenCard
              title="Screen 2"
              instruction="Click on the filter button"
              hasWarning={false}
              borderColor="blue"
              recommendations={0}
            />
          </div>

          {/* Bottom action bar */}
          <div className="bg-white border-t border-[#e7e5e4] px-3 py-2.5 flex items-center justify-between shrink-0">
            {/* User avatar */}
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-[#ea580c] flex items-center justify-center text-white font-semibold text-xs">
                T
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={closeSidebar}
                className="h-8 px-4 rounded-lg border border-[#d6d3d1] bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-xs font-medium text-[#1c1917]">Cancel</span>
              </button>
              <button className="h-8 px-4 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] transition-colors">
                <span className="text-xs font-medium text-white">Preview</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
