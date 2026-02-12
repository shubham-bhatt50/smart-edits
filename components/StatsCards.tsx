'use client';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  dotColor: string;
}

function StatCard({ title, value, subtitle, dotColor }: StatCardProps) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-[14px] p-6 shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm leading-5 text-[#45556c] tracking-[-0.15px]">{title}</p>
        <div className={`rounded-full w-2 h-2 ${dotColor}`} />
      </div>
      <p className="text-[30px] leading-9 text-[#0f172b] tracking-[0.4px]">{value}</p>
      <p className="text-xs leading-4 text-[#62748e]">{subtitle}</p>
    </div>
  );
}

export default function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <StatCard
        title="Total records"
        value="247"
        subtitle="+12 this month"
        dotColor="bg-[#2b7fff]"
      />
      <StatCard
        title="PII fields"
        value="1,482"
        subtitle="Across all records"
        dotColor="bg-[#fe9a00]"
      />
      <StatCard
        title="Redacted"
        value="89%"
        subtitle="Compliance rate"
        dotColor="bg-[#00c950]"
      />
      <StatCard
        title="Pending"
        value="27"
        subtitle="Requires review"
        dotColor="bg-[#fb2c36]"
      />
    </div>
  );
}
