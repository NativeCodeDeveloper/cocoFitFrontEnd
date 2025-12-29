import NavbarDashboardClient from "./NavbarDashboardClient";

export const metadata = {
    title: "Dashboard",
    description: "Panel de administración",
};

export default function DashboardLayout({ children }) {
    return (
        <section>
            <NavbarDashboardClient />
            <main>{children}</main>
        </section>
    );
}