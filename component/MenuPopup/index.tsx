import React from 'react';

import { Filter, Navigation, Search } from '..';

import styles from './MenuPopup.module.scss';

interface MenuPopupProps {
  gender: string | string[];
}

const MenuPopup: React.FC<MenuPopupProps> = ({ gender }) => {
  const [menuHandler, setMenuHandler] = React.useState<boolean>(false);
  const menuBtn = React.useRef();
  const menuContainer = React.useRef();
  const [screenWidth, setScreenWidth] = React.useState(0);

  React.useEffect(() => {
    const navLink = document.querySelectorAll('#nav');
    const menuBlock = document.querySelector('.menu');
    setScreenWidth(document.documentElement.clientWidth);

    const isNavLink = (target: HTMLInputElement) => {
      let howTrueElement = 0;
      navLink.forEach((item) => {
        if (item === target) {
          ++howTrueElement;
        }
      });
      return howTrueElement > 0 ? true : false;
    };

    const showMenuListener = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const searchAttributes = target.attributes[1];
      const searchProduct: string = searchAttributes ? searchAttributes.value : '';
      if (!menuBlock.contains(target) || isNavLink(target) || searchProduct === 'searchProduct') {
        setMenuHandler(false);
      }
    };
    document.addEventListener('click', showMenuListener);
    return () => {
      document.removeEventListener('click', showMenuListener);
    };
  }, []);

  return (
    screenWidth < 1050 && (
      <div className="menu">
        <div className={!menuHandler ? styles.menuDisable : styles.menuActive} ref={menuContainer}>
          <Navigation gender={gender} />
          <div className={styles.searchBlock}>
            <Search />
          </div>
          {/* <div className={styles.filterBlock}>
          <Filter />
        </div> */}
        </div>
        <button
          className={`${styles.menuBtn} ${!menuHandler ? '' : styles.activeBtn}`}
          onClick={() => setMenuHandler(!menuHandler)}
          ref={menuBtn}>
          <span />
        </button>
      </div>
    )
  );
};

export default MenuPopup;
