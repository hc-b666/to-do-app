import { useGetTasksQuery } from "../../services/tasksApi";

const Home = () => {
  const { data: tasks, isLoading } = useGetTasksQuery(undefined);
  console.log(tasks)
  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
        today's tasks
    </div>
  );
};

export default Home;

