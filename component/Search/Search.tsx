import React, {ChangeEvent} from "react";
import {useQuery} from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

import {Loader} from "../index";
import {SEARCH_ITEMS} from "../../lib/graphql/query";

import styles from './Search.module.scss';

export default function Search() {
    const [value, setValue] = React.useState<string>('');
    const [toggleContainer, setToggleContainer] = React.useState<boolean>(false);
    const {data, loading} = useQuery(SEARCH_ITEMS, {variables: {search: value}});
    const products: Array<ISearchProduct> = data?.products.nodes;
    return (
        <div className={styles.searchOffer}>
            <div className={styles.inputSearch}>
                <input type="search" value={value} placeholder='Поиск'
                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setValue(e.target.value);
                       }}
                       onFocus={() => {
                           setToggleContainer(true);
                       }}
                       onBlur={() => {
                           setToggleContainer(false);
                       }}
                />
                <button className={`${styles.clear} ${value && value.length !== 0 ? styles.showClear : ''}`} onClick={() => {
                    setValue('')
                }}>
                    <span/>
                </button>
            </div>
            <div className={`${styles.searchResult} ${toggleContainer ? styles.active : ''}`}>
                {!loading ?
                    products.length !== 0 ? products.map(({image, name, price, slug}, index: number) =>
                        <SearchProduct key={`${name}_${index}`} image={image} name={name} price={price} slug={slug}/>
                    ) : 'Ничего не найдено' : <Loader/>
                }
            </div>
        </div>
    )
}

interface ISearchProduct {
    image: {
        mediaItemUrl: string
    }
    name: string
    price: number
    slug?: string
}

function SearchProduct({image, name, price, slug}: ISearchProduct) {
    return <Link href="/product/[slug]" as={`/product/${slug}/`}>
        <a>
            <div className={styles.productContainer}>
                <div className={styles.image}>
                    <Image src={image.mediaItemUrl} layout='fill' objectFit="contain"/>
                </div>
                <h2 className={styles.title}>{name}</h2>
                <p className={styles.price}>{price} руб.</p>
            </div>
        </a>
    </Link>
}