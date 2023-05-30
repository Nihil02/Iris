import { FaPen } from "react-icons/fa";
import { HTMLAttributes } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

function UpdateButton({ onClick }: HTMLAttributes<Element>) {
  return (
    <>
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className="card-button bg-green-600 hover:bg-green-500"
              onClick={onClick}
            >
              <FaPen size={16} color="white" />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="tooltip" sideOffset={5}>
              Modificar
              <Tooltip.Arrow className="fill-white" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  );
}

export default UpdateButton;
