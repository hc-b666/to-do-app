import { ColorRing } from "react-loader-spinner";

export default function Loading() {
    return (
        <div className="absolute w-full h-screen flex items-center justify-center">
            <ColorRing
                visible={true}
                height="160"
                width="160"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#3b82f6", "#3b82f6", "#3b82f6", "#3b82f6", "#3b82f6"]}
            />
        </div>
    );
}
