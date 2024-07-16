import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Info, Plus } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "../ui";

interface ISignoutModal {
  state: boolean;
  setState: (state: boolean) => void;
}

export const SignoutModal: FC<ISignoutModal> = ({ state, setState }) => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("token");``
    navigate("/signup");
  }

  return (
    <Modal state={state} setState={setState}>
      <div className="flex w-[400px] flex-col gap-5">
        <div className="flex w-full items-center justify-between text-gray-700">
          <Info className="h-4 w-4" />
          <Plus
            className="h-4 w-4 rotate-45 cursor-pointer"
            onClick={() => setState(false)}
          />
        </div>
        <p>Are you sure you want to sign out from your account?</p>
        <div className="flex items-center gap-3 self-end">
          <Button onClick={() => setState(false)} type="button">
            Cancel
          </Button>
          <Button
            onClick={handleSignout}
            variant={"destructive"}
            type="button"
          >
            Signout
          </Button>
        </div>
      </div>
    </Modal>
  );
};
