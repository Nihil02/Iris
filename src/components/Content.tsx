import Card from "./Card";
import AddCard from "./AddCard/AddCard";
import { useLocation } from "react-router";
import { EmployeeController } from "../../core/controller/employeeController";
import { useEffect, useState } from "react";

function Content() {
  let [data, setData] = useState([{}]);

  /* Get the current location */
  const location = useLocation().pathname;

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      switch (location) {
        case "/usuario":
          const emp = await EmployeeController.getAllEmployees();
          setData(emp);
          break;

        default:
          /* This shouldn't happen */
          const def = [
            {
              rfc: "1",
              razon_social: "No data",
            },
          ];
          setData(def);
          break;
      }
    }
    getData();
  }, []);

  /* Render the cards */
  function renderCards() {
    return data.map((card) => {
      switch (location) {
        case "/cliente":
          return <h1 key={card.rfc}>cliente</h1>;
        case "/proveedor":
          return <Card key={card.rfc} id={card.rfc} name={card.razon_social} />;
        case "/usuario":
          return <Card key={card.rfc} id={card.rfc} name={card.nombre} />;
        case "/examen":
          return <h1 key={card.rfc}>examen</h1>;

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
