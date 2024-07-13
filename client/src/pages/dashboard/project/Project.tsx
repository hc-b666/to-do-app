import { useGetProjectQuery } from "@services/projectsApi";
import { useParams } from "react-router-dom";

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
