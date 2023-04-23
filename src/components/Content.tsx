import Card from "./Card";
import API from "./../../backend/api/api";
import AddCard from "./AddCard/AddCard";
import { useLocation } from "react-router";

const data = await API.getAllSuppliers();

function Content() {
  const location = useLocation();
  function renderCards() {
    return data.map((card) => {
      if (location.pathname == "/cliente") {
        return <h1>cliente</h1>;
      } else if (location.pathname == "/proveedor") {
        return <Card key={card.rfc} name={card.razon_social} />;
      } else if (location.pathname == "/usuario") {
        return <h1>usuario</h1>;
      } else if (location.pathname == "/examen") {
        return <h1>examen</h1>;
      } else {
        <h1>Error</h1>;
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
