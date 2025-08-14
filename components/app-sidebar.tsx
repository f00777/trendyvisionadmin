"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconListDetails,
} from "@tabler/icons-react";
import Image from "next/image";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import logo from "@/public/logoSinLetra.png"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "General",
      url: "/dashboard/general",
      icon: IconDashboard,
    },
    {
      title: "Productos",
      url: "/dashboard/productos",
      icon: IconListDetails,
    },
    {
      title: "Pedidos",
      url: "/dashboard/pedidos",
      icon: IconChartBar,
    }
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Image
                  src={logo}
                  alt="Trendy Vision Logo"
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-sm"
                />
                <span className="text-base font-semibold">
                  Trendy Vision
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
