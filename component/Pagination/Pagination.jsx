import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Pagination({ total, gender }) {
  const quantityPages = Math.ceil(total / 10); // Подсчет количества страниц
  const { pathname: url } = useRouter();

  const Pages = () => {
    const array = [];
    for (let i = 1; i <= quantityPages; i++) {
      array.push(i);
    }

    return array.map((item) =>
      url === '/' ? (
        <Link key={item} href={{ pathname: '/[page]', query: { page: item, gender: 'all' } }}>
          <a>{item}</a>
        </Link>
      ) : (
        <Link key={item} href="/[gender]/[page]" as={`/${gender}/${item}`}>
          <a>{item}</a>
        </Link>
      ),
    );
  };

  return <div>{Pages()}</div>;
}
