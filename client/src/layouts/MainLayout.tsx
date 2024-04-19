import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="font-montserrat relative">
            {children}
        </div>
    );
}
