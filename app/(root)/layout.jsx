import Navbar from "@/components/custom/Navbar";

export default function Layout({ children }) {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    )
}
