import { FC } from "react";
import Modal from "@components/Modal";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import { usePostProjectMutation } from "@services/projectsApi";
import { useToast } from "@components/ui/use-toast";

interface IAddProjectModal {
  projectModal: boolean;
  setProjectModal: (state: boolean) => void;
}

export const AddProjectModal: FC<IAddProjectModal> = ({
  projectModal,
  setProjectModal,
}) => {
  const [usePostProject] = usePostProjectMutation();
  const { toast } = useToast();

  const createProjectHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const res = await usePostProject({ ...data, statuses: [], users_id: []  });

      console.log(res);

      if (res.error) {
        toast({
          title: "An error occurred while creating the project",
          duration: 5000,
        });
        return;
      }

      if (res.data) {
        toast({
          title: "Project created successfully",
          duration: 5000,
        });
        setProjectModal(false);
      }
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <Modal state={projectModal} setState={setProjectModal}>
      <form onSubmit={createProjectHandler} className="w-[550px] flex flex-col items-start gap-4 bg-white dark:bg-black">
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input name="title" type="title" id="title" placeholder="Title" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Input name="description" type="description" id="description" placeholder="Description" />
        </div>
        statuses not yet finished todo
        user search and add todo


        <div className="mt-3 pt-3 flex gap-3 justify-end border-t w-full">
          <Button onClick={() => setProjectModal(false)} type="button">Cancel</Button>
          <Button variant={"secondary"} type="submit">Create Project</Button>
        </div>

      </form>
    </Modal>
  );
};
