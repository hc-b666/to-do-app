import { FC } from "react";

interface IModal {
  children: React.ReactNode;
  state: boolean;
  setState: (state: boolean) => void;
}

const Modal: FC<IModal> = ({ children, setState }) => {

  return (
    <div onClick={() => setState(false)} className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50">
      <div onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation()} className="p-8 bg-white rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Modal;
