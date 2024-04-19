import { ReactNode } from "react";

export default function PageLayout({ children }: { children: ReactNode }) {
    return (
        <div className="px-20 py-5 w-full h-auto">
            {children}
        </div>
    );
}
