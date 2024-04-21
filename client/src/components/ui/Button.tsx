import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils/cn";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "formButton";
    type?: "submit" | "reset" | "button" | undefined;
};

export default function Button({
    className,
    variant,
    type,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(buttonVariants({ variant }), className)}
            type={type}
            {...props}
        />
    );
}

const buttonVariants = cva(
    "rounded-md px-3 py-1.5 text-base font-medium text-white duration-500 shadow-sm leading-6",
    {
        variants: {
            variant: {
                primary: "bg-blue-500 hover:bg-blue-400",
                secondary: "bg-indigo-600 hover:bg-indigo-500",
                formButton:
                    "flex w-full justify-center bg-indigo-600 text-sm font-semibold hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    },
);
