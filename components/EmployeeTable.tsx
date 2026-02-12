'use client';

import { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  ssn: string;
  phone: string;
  department: string;
  status: 'active' | 'inactive';
}

const employees: Employee[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Engineer',
    email: 'sarah.johnson@acmecorp.com',
    ssn: '123-45-6789',
    phone: '(555) 123-4567',
    department: 'Engineering',
    status: 'active',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager',
    email: 'michael.chen@acmecorp.com',
    ssn: '987-65-4321',
    phone: '(555) 987-6543',
    department: 'Product',
    status: 'active',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Data Analyst',
    email: 'emily.rodriguez@acmecorp.com',
    ssn: '456-78-9012',
    phone: '(555) 456-7890',
    department: 'Analytics',
    status: 'active',
  },
  {
    id: 4,
    name: 'David Martinez',
    role: 'UX Designer',
    email: 'david.martinez@acmecorp.com',
    ssn: '234-56-7890',
    phone: '(555) 234-5678',
    department: 'Design',
    status: 'active',
  },
  {
    id: 5,
    name: 'Jessica Williams',
    role: 'HR Manager',
    email: 'jessica.williams@acmecorp.com',
    ssn: '345-67-8901',
    phone: '(555) 345-6789',
    department: 'HR',
    status: 'active',
  },
];

export default function EmployeeTable() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-[14px] shadow-sm">
      {/* Search and Filter Bar */}
      <div className="border-b border-[#e2e8f0] h-[91px] pt-6 px-6 pb-1">
        <div className="h-[42px] flex gap-4">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#45556c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L11.1 11.1" stroke="#45556c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] pl-10 pr-4 py-2.5 text-sm text-[#314158] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-[#155dfc] focus:border-transparent"
            />
          </div>
          <button className="h-[42px] px-4 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0] hover:bg-[#e2e8f0] transition-colors flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4H14M4 8H14M6 12H14" stroke="#314158" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-medium text-sm leading-5 text-[#314158] tracking-[-0.15px]">
              Filter
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <th className="text-left py-4 px-6">
                <p className="font-bold text-xs leading-4 text-[#45556c] tracking-[0.6px] uppercase">
                  Employee
                </p>
              </th>
              <th className="text-left py-4 px-6">
                <p className="font-bold text-xs leading-4 text-[#45556c] tracking-[0.6px] uppercase">
                  Email
                </p>
              </th>
              <th className="text-left py-4 px-6">
                <p className="font-bold text-xs leading-4 text-[#45556c] tracking-[0.6px] uppercase">
                  SSN
                </p>
              </th>
              <th className="text-left py-4 px-6">
                <p className="font-bold text-xs leading-4 text-[#45556c] tracking-[0.6px] uppercase">
                  Phone
                </p>
              </th>
              <th className="text-left py-4 px-6">
                <p className="font-bold text-xs leading-4 text-[#45556c] tracking-[0.6px] uppercase">
                  Department
                </p>
              </th>
              <th className="text-left py-4 px-6">
                <p className="font-bold text-xs leading-4 text-[#45556c] tracking-[0.6px] uppercase">
                  Status
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="border-b border-[#e2e8f0] hover:bg-gray-50 transition-colors">
                <td className="py-5 px-6">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium text-sm shadow-sm border-2 border-[#f1f5f9]">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-base leading-6 text-[#0f172b] tracking-[-0.31px]">
                        {employee.name}
                      </p>
                      <p className="text-sm leading-5 text-[#62748e] tracking-[-0.15px]">
                        {employee.role}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="bg-[#f8fafc] rounded-[10px] px-3 py-1.5 inline-block">
                    <p className="text-base leading-6 text-[#314158] tracking-[-0.31px]">
                      {employee.email}
                    </p>
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="bg-[#f8fafc] rounded-[10px] px-3 py-1.5 inline-block">
                    <p className="text-base leading-6 text-[#314158] tracking-[-0.31px]">
                      {employee.ssn}
                    </p>
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="bg-[#f8fafc] rounded-[10px] px-3 py-1.5 inline-block">
                    <p className="text-base leading-6 text-[#314158] tracking-[-0.31px]">
                      {employee.phone}
                    </p>
                  </div>
                </td>
                <td className="py-5 px-6">
                  <p className="text-base leading-6 text-[#314158] tracking-[-0.31px]">
                    {employee.department}
                  </p>
                </td>
                <td className="py-5 px-6">
                  <span className="bg-[#dcfce7] border border-[#b9f8cf] text-[#016630] text-xs leading-4 px-2.5 py-1.5 rounded-full">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-[#f8fafc] border-t border-[#e2e8f0] h-[67px] pt-4 px-6">
        <div className="flex items-center justify-between h-[34px]">
          <p className="text-sm leading-5 text-[#45556c] tracking-[-0.15px]">
            Showing <span className="font-medium text-[#0f172b]">8</span> of{' '}
            <span className="font-medium text-[#0f172b]">247</span> employees
          </p>
          <div className="flex gap-2 items-center">
            <button className="h-[34px] px-4 rounded-[10px] border border-[#e2e8f0] hover:bg-white transition-colors">
              <span className="font-medium text-sm leading-5 text-[#45556c] tracking-[-0.15px]">
                Previous
              </span>
            </button>
            <button className="h-[34px] w-[30px] rounded-[10px] bg-[#155dfc] text-white hover:bg-[#0f4fd4] transition-colors">
              <span className="font-medium text-sm leading-5">1</span>
            </button>
            <button className="h-[34px] w-[34px] rounded-[10px] border border-[#e2e8f0] hover:bg-white transition-colors">
              <span className="font-medium text-sm leading-5 text-[#45556c] tracking-[-0.15px]">
                2
              </span>
            </button>
            <button className="h-[34px] w-[34px] rounded-[10px] border border-[#e2e8f0] hover:bg-white transition-colors">
              <span className="font-medium text-sm leading-5 text-[#45556c] tracking-[-0.15px]">
                3
              </span>
            </button>
            <button className="h-[34px] px-4 rounded-[10px] border border-[#e2e8f0] hover:bg-white transition-colors">
              <span className="font-medium text-sm leading-5 text-[#45556c] tracking-[-0.15px]">
                Next
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
