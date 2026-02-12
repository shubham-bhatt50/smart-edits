import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatsCards from '@/components/StatsCards';
import EmployeeTable from '@/components/EmployeeTable';
import EditTaskbar from '@/components/EditTaskbar';
import EditSidebar from '@/components/EditSidebar';
import { EditSidebarProvider } from '@/contexts/EditSidebarContext';

export default function EditPage() {
  return (
    <EditSidebarProvider>
      <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] min-h-screen">
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 flex flex-col gap-8">
                <StatsCards />
                <EmployeeTable />
              </div>
            </div>
          </div>
        </div>

        {/* Edit taskbar */}
        <EditTaskbar />

        {/* Edit sidebar */}
        <EditSidebar />
      </div>
    </EditSidebarProvider>
  );
}
