import { FaTrash } from "react-icons/fa";
import { HTMLAttributes } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

function DeleteButton({ onClick }: HTMLAttributes<Element>) {
  return (
    <>
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className="card-button bg-red-600 hover:bg-red-500"
              onClick={onClick}
            >
              <FaTrash size={16} color="white" className="cursor-pointer"/>
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="tooltip" sideOffset={5}>
              Eliminar
              <Tooltip.Arrow className="fill-white" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  );
}

export default DeleteButton;
