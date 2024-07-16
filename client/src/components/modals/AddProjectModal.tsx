import { FC, useState } from "react";
import { X } from "lucide-react";
import { Modal } from "@/components/modals";
import { Input, Label, Button, MultiInput } from "@/components/ui";
import {
  usePostProjectMutation,
  useSearchUsersIdMutation,
} from "@/services/projectsApi";

interface IAddProjectModal {
  projectModal: boolean;
  setProjectModal: (state: boolean) => void;
}

export const AddProjectModal: FC<IAddProjectModal> = ({
  projectModal,
  setProjectModal,
}) => {
  const [usePostProject] = usePostProjectMutation();
  const [searchUsersId, { data: usersData }] = useSearchUsersIdMutation();
  const [statuses, setStatuses] = useState<string[]>([
    "to do",
    "in progress",
    "done",
  ]);
  const [users, setUsers] = useState<{ id: number; username: string }[]>([]);

  let debounceTimeoutId: any;

  const searchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(debounceTimeoutId);

    const value = e.target.value;

    debounceTimeoutId = setTimeout(async () => {
      await searchUsersId(value).unwrap();
    }, 500);
  };

  const createProjectHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const resData = {
      ...data,
      statuses,
      users_id: users.map((user) => user.id),
    };
    console.log(resData);

    try {
      const res = await usePostProject(resData).unwrap();

      console.log(res);

      if (res.error) {
        return;
      }

      if (res.data) {
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

        <div className="relative flex w-full flex-col gap-2">
          <Label htmlFor="users">Add users</Label>
          {users.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-1 rounded-lg bg-gray-200 p-2 dark:bg-gray-800"
                >
                  {user.username}
                  <button
                    onClick={() =>
                      setUsers(() => users.filter((u) => u.id !== user.id))
                    }
                  >
                    <X className="text-black" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <Input
            id="users"
            onChange={searchChange}
            placeholder="Type usernames"
          />

          {usersData && (
            <div className="absolute top-full w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-black">
              {usersData.users.map((user: { id: number; username: string }) => (
                <div
                  key={user.id}
                  className="flex cursor-pointer items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setUsers([...users, user])}
                >
                  <span>{user.username}</span>
                </div>
              ))}
            </div>
          )}
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
