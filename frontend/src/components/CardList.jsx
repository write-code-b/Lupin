import { useState, useEffect } from "react";
import Card from "./Card";
import CardSearch from "./CardSearch";

function CardList(props) {
  const [data, setData] = useState([]);
  const [flipAll, setFlipAll] = useState(false); //true -> front, flase -> back

  const cardData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}/cards`).then((res) =>
      res.json(),
    );

    const initData = res.slice(0, 20).map((it) => {
      return {
        code: it.code,
        product: it.product,
        category: it.category,
        name: it.name,
        level: it.level,
        rarity: it.rarity,
        LP: it.LP,
        AP: it.AP,
        feature: it.feature,
        effect: it.effect,
        color: it.color,
        image_url: it.image_url,
      };
    });
    setData(initData);
  };

  const cards = data.map((card) => (
    <Card
      code={card.code}
      name={card.name}
      level={card.level}
      product={card.product}
      color={card.color}
      category={card.category}
      rarity={card.rarity}
      feature={card.feature}
      LP={card.LP}
      AP={card.AP}
      effect={card.effect}
      image_url={card.image_url}
      flipAll={flipAll}
    />
  ));

  function flipAllCard() {
    return flipAll ? setFlipAll(false) : setFlipAll(true);
  }

  useEffect(() => {
    cardData();
  }, []);

  return (
    <>
      <CardSearch
        count={data.length}
        flipAllCard={flipAllCard}
      />
      <section id="cardList">{cards}</section>
    </>
  );
}

export default CardList;
