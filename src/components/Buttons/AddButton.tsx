import { HTMLAttributes } from "react";
import { FaPlus } from "react-icons/fa";

function AddButton({ onClick }: HTMLAttributes<Element>) {
  return (
    <div className="add-card" onClick={onClick}>
      <FaPlus size={20} color="gray" />
    </div>
  );
}

export default AddButton;
