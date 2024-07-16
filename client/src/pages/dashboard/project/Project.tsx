import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "@/services/projectsApi";

export const Project = () => {
  const { projectId } = useParams();
  const { data } = useGetProjectQuery(Number(projectId));

  console.log(data);

  return (
    <div>
      <div>
        Project {projectId}
      </div>
    </div>
  );
};
