interface InputProps {
    name: string;
    type: "text" | "email" | "password";
    autoComplete?: "email" | "password";
}

export default function Input({ name, type, autoComplete }: InputProps) {
    return (
        <>
            {type === "password" ? (
                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor={name}
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                        </label>
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            id={name}
                            name={name}
                            type={type}
                            required
                            className="primary-input"
                            autoComplete={autoComplete ? autoComplete : ""}
                        />
                    </div>
                </div>
            ) : (
                <div className="w-full">
                    <label
                        htmlFor={name}
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                    </label>
                    <div className="mt-2">
                        <input
                            id={name}
                            name={name}
                            type={type}
                            required
                            className="primary-input"
                            autoComplete={autoComplete ? autoComplete : ""}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
