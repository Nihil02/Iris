import DeleteCard from "./DeleteCard";
import UpdateCard from "./UpdateCard";
import ShowCard from "./ShowCard";
import PrintCard from "./PrintCard";
import { useLocation, useParams } from "react-router-dom";

const Card = ({ id = "", name = "" }) => {
  /* Get the current location and their params */
  const location = useLocation().pathname;
  let param = useParams();

  return (
    <>
      <div className="card">
        <ShowCard name={name} id={id} />
        <div className="flex flex-wrap absolute items-center gap-y-2 gap-x-4 right-4">
          {location != "/usuario" && location != "/cliente" ? (
            <PrintCard id={id} />
          ) : null}
          <UpdateCard id={id} />
          {location != "/examen/" + param.cliente ? (
            <DeleteCard cardID={id} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Card;
