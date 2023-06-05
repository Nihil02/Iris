import Card from "../Card/Card";
import { useRef } from "react";
import { ViewportList } from "react-viewport-list";

const CardRenderer = ({ data = [{}] }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className="w-full ml-[14rem]" ref={ref}>
        <ViewportList viewportRef={ref} items={data}>
          {(item) => (
            <>
              <Card key={item.id} id={item.id} name={item.res} />
            </>
          )}
        </ViewportList>
      </div>
    </>
  );
};

export default CardRenderer;
