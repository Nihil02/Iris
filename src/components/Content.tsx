import Card from "./Card";
import API from "../../api/api";
import AddCard from "./AddCard/AddCard";

const data = await API.getAllSuppliers();

function Content() {
  function renderCards() {
    return data.map((card) => {
      return <Card key={card.rfc} name={card.razon_social} />;
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
