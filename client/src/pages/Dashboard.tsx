import { useGetUserQuery } from "../services/userApi";

export default function Dashboard() {
    const { data: user, isLoading, isError, isSuccess } = useGetUserQuery();

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error</div>}
            {isSuccess && <div>{user?.email}</div>}
        </div>
    );
}
