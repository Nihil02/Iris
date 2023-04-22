import AddCliente from "./AddCardCliente";
import Card from "./Card";
import API from "../../api/api";

const data = await API.getAllSuppliers();

function Content() {
  function renderCards() {
    return data.map((card) => {
      return <Card key={card.rfc} name={card.razon_social} />;
    });
  }

  return (
    <>
      <AddCliente />
      {renderCards()}
    </>
  );
}

export default Content;
