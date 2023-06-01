import { FaPrint } from "react-icons/fa";
import { HTMLAttributes } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

function PrintButton({ onClick }: HTMLAttributes<Element>) {
  return (
    <>
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className="card-button bg-yellow-600 hover:bg-yellow-500 group"
              onClick={onClick}
            >
              <FaPrint size={16} color="white" className="cursor-pointer" />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="tooltip" sideOffset={5}>
              Imprimir
              <Tooltip.Arrow className="fill-white" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  );
}

export default PrintButton;
