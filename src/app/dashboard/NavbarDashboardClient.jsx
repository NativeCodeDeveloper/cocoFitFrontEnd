"use client";
import dynamic from "next/dynamic";
const NavbarDashboard = dynamic(() => import("@/Componentes/NavbarDashboard"), { ssr: false });

export default function NavbarDashboardClient() {
  return <NavbarDashboard />;
}

