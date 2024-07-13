import { FC, useState } from "react";
import Modal from "@components/Modal";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import { usePostProjectMutation } from "@services/projectsApi";
import { useToast } from "@components/ui/use-toast";
import { MultiInput } from "@components/ui/multi-input";

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
  const [statuses, setStatuses] = useState<string[]>(["to do", "in progress", "done"]);

  const createProjectHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log(data);
    console.log(statuses); 

    try {
      const res = await usePostProject({ ...data, statuses, users_id: [] });

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
      <form
        onSubmit={createProjectHandler}
        className="flex w-[550px] flex-col items-start gap-4 bg-white dark:bg-black"
      >
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input name="title" type="title" id="title" placeholder="Title" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Input
            name="description"
            type="description"
            id="description"
            placeholder="Description"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="statuses">Status</Label>
          <MultiInput name="statuses" id="statuses" setStatuses={setStatuses} />
        </div>

        <div className="mt-3 flex w-full justify-end gap-3 border-t pt-3">
          <Button onClick={() => setProjectModal(false)} type="button">
            Cancel
          </Button>
          <Button variant={"secondary"} type="submit">
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
};
