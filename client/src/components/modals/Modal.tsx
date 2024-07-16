import { FC } from "react";

interface IModal {
  children: React.ReactNode;
  state: boolean;
  setState: (state: boolean) => void;
}

export const Modal: FC<IModal> = ({ children, setState }) => {
  return (
    <div
      onClick={() => setState(false)}
      className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          event.stopPropagation()
        }
        className="rounded-lg bg-white p-5 dark:bg-black"
      >
        {children}
      </div>
    </div>
  );
};
