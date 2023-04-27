import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { EmployeeController } from "./../util";
import Card from "./Card";
import AddCard from "./AddCard/AddCard";
import SearchBar from "./SearchBar";

function Content({ title = "" }) {
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
      <SearchBar />
      <h1 className="text-2xl m-5">{title}</h1>
      <AddCard />
      {renderCards()}
    </>
  );
}

export default Content;
