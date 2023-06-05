import DeleteCard from "./DeleteCard";
import UpdateCard from "./UpdateCard";
import ShowCard from "./ShowCard";
import PrintCard from "./PrintCard";
import { useLocation, useParams } from "react-router-dom";
import { getAdmin } from "../util";
import { memo } from "react";

export interface IProps {
  id: string|number;
  name: string;
}

const Card = ({ id, name }: IProps) => {
  /* Get the current location and their params */
  const location = useLocation().pathname;
  let param = useParams();

  console.log(id);
  

  return (
    <>
      <div className="card">
        <ShowCard name={name} id={id} />
        <div className="flex flex-wrap absolute items-center gap-y-2 gap-x-4 right-4">
          {location != "/usuario" ? <PrintCard id={id} /> : null}
          <UpdateCard id={id} />
          {location != "/examen/" + param.cliente || getAdmin() ? (
            <DeleteCard id={id} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default memo(Card);
