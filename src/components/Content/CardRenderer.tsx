import { useLocation, useParams } from "react-router-dom";
import { dateFormat } from "../../util";
import Card from "../Card";

const CardRenderer = ({ data = [{}] }) => {
  const location = useLocation().pathname;
  let param = useParams();

  let nombre: string;
  let id: string;

  return (
    <>
      {data &&
        data.map((card) => {
          switch (location) {
            case "/cliente":
              {
                nombre =
                  card.nombre +
                  " " +
                  card.primer_apellido +
                  " " +
                  card.segundo_apellido;
              }
              {
                id = card.CURP;
              }
              return <Card key={id} id={id} name={nombre} />;

            case "/proveedor":
              {
                id = card.rfc;
              }
              return <Card key={id} id={id} name={card.razon_social} />;

            case "/usuario":
              {
                nombre =
                  card.nombre +
                  " " +
                  card.primer_apellido +
                  " " +
                  card.segundo_apellido;
              }
              {
                id = card.rfc;
              }
              return <Card key={id} id={id} name={nombre} />;

            case "/examen/" + param.cliente:
              {
                if (card.fecha !== null) {
                  id = card.fecha;
                  nombre = dateFormat(card.fecha + "");
                }
              }
              return <Card key={id} id={id} name={nombre} />;

            default:
              return <h1>Error</h1>;
          }
        })}
    </>
  );
};

export default CardRenderer;
