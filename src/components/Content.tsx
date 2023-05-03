import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  CustomerController,
  SupplierController,
  EmployeeController,
} from "./../util";
import Card from "./Card";
import AddCard from "./AddCard/AddCard";
import SearchBar from "./SearchBar";

function Content({ title = "" }) {
  let [data, setData] = useState([{}]);

  /* Get the current location */
  const location = useLocation().pathname;

  let nombre: string;
  let id: string;

  /* Fetch data from the api to the component */
  useEffect(() => {
    async function getData() {
      switch (location) {
        case "/cliente":
          const cliente = await CustomerController.getAllCustomers();
          setData(cliente);
          console.log(cliente);

          break;

        case "/proveedor":
          const sup = await SupplierController.getAllSuppliers();
          setData(sup);
          console.log(sup);

          break;

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
          {
            nombre =
              card.nombre +
              " " +
              card.primer_apellido +
              " " +
              card.segundo_apellido;
          }
          {
            id = card.curp;
          }
          return <Card key={id} id={id} name={nombre} />;

        case "/proveedor":
          {
            id = card.rfc;
          }
          return <Card key={card.rfc} id={card.rfc} name={card.razon_social} />;

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
