import Card from "./Card";
import AddCard from "./AddCard/AddCard";
import { useLocation } from "react-router";
import { EmployeeController } from "../../core/controller/employeeController";

let data: any[];

async function getData(path: string) {
  switch (path) {
    case "/usuario":
      data = await EmployeeController.getAllEmployees();
      break;

    default:
      data = [
        {
          rfc: "1",
          razon_social: "Lentes",
        },
        {
          rfc: "2",
          razon_social: "Lentes2",
        },
      ];
      break;
  }
}

function Content() {
  const location = useLocation().pathname;
  getData(location)

  function renderCards() {
    return data.map((card) => {
      switch (location) {
        case "/cliente":
          return <h1>cliente</h1>;
        case "/proveedor":
          return <Card key={card.rfc} name={card.razon_social} />;
        case "/usuario":
          return <Card key={card.rfc} name={card.nombre} />;
        case "/examen":
          return <h1>examen</h1>;

        default:
          return <h1>Error</h1>;
      }
    });
  }

  return (
    <>
      <AddCard />
      {renderCards()}
    </>
  );
}

export default Content;
