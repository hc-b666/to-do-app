import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import { useCreateBoardMutation } from "@services/boardApi";
import { hideModal, ModalState } from "@features/modalSlice";
import Input from "./ui/Input";

export default function Modal() {
    const dispatch = useDispatch();
    const modalProps = useSelector(
        (state: RootState) => state.modal,
    ) as ModalState;

    const handleHide = () => {
        dispatch(hideModal());
    };

    const [createBoard, {error}] = useCreateBoardMutation();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));

        try {
            let res;
            if (modalProps.formType === "addBoard") {
                res = await createBoard(data);
            }
            console.log(res)
            toast.success(res?.data?.message);
        } catch (err) {
            toast.error(error?.data?.error || err.error);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="flex items-center justify-between">
                    <h1>{modalProps.title}</h1>
                    <button onClick={handleHide}>x</button>
                </div>
                <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-4">
                    {modalProps.modalInputs.map((input) => (
                        <Input
                            name={input.name}
                            type={input.type}
                            key={input.name}
                        />
                    ))}
                    <button type="submit" className="w-full">
                        {modalProps.title}
                    </button>
                </form>
            </div>
        </div>
    );
}
