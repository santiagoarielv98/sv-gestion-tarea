import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-2 py-2 pr-4 shadow">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pb-0">
          <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
