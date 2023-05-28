import DeleteCard from "./DeleteCard";
import UpdateCard from "./UpdateCard";
import ShowCard from "./ShowCard";
import PrintCard from "./PrintCard";
import { useLocation, useParams } from "react-router-dom";

interface IProps {
  id: string;
  name: string;
}

const Card = ({ id, name }: IProps) => {
  /* Get the current location and their params */
  const location = useLocation().pathname;
  let param = useParams();

  return (
    <>
      <div className="card">
        <ShowCard name={name} id={id} />
        <div className="flex flex-wrap absolute items-center gap-y-2 gap-x-4 right-4">
          {location != "/usuario" ? <PrintCard id={id} /> : null}
          <UpdateCard id={id} />
          {location != "/examen/" + param.cliente ? (
            <DeleteCard id={id} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Card;
