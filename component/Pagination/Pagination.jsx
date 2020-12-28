import React from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const FIRST_VALUE_PAGES = gql`
  query($total: Int) {
    products(first: $total) {
      edges {
        cursor
      }
    }
  }
`;

export default function Pagination({ total, gender }) {
  const { loading, error, data } = useQuery(FIRST_VALUE_PAGES, {
    variables: { total: total },
  });

  const allCursorItems = data?.products.edges;

  console.log(allCursorItems);

  const [pages, setPages] = React.useState([]);

  React.useEffect(() => {
    allCursorItems &&
      allCursorItems.forEach((value, index) => {
        if (index % 10 === 0) {
          setPages((prevState) => [...prevState, value.cursor]);
        }
      });
  }, [allCursorItems]);
  console.log(total);
  const quantityPages = Math.round(total / 10);

  const Pages = () => {
    const array = [];
    for (let i = 1; i <= quantityPages; i++) {
      array.push(i);
    }
    return array.map((item) => (
      <Link href="/[id]/[page]" as={`/${gender}/${item}`}>
        <a>{item}</a>
      </Link>
    ));
  };

  return <div>{Pages()}</div>;
}
