import React from 'react';

import { Search } from '..';
import { Navigation } from '../Header';

import styles from './MenuPopup.module.scss';

interface MenuPopupProps {
  gender: string | string[];
}

const MenuPopup: React.FC<MenuPopupProps> = ({ gender }) => {
  const [menuHandler, setMenuHandler] = React.useState<boolean>(false);
  const menuBtn = React.useRef();
  const menuContainer = React.useRef();

  React.useEffect(() => {
    const navLink = document.getElementsByClassName(styles.link);
    const searchBlock = document.getElementsByTagName('input');
    const resultBlock = document.getElementById('resultBlock');

    const showMenuListener = (e: Event) => {
      if (
        e.target !== menuContainer.current &&
        e.target !== menuBtn.current &&
        e.target !== searchBlock[0] &&
        e.target !== resultBlock
      ) {
        setMenuHandler(false);
      }
      for (let i = 0; i < 3; i++) {
        if (navLink[i] === e.target) {
          setMenuHandler(false);
        }
      }
    };
    document.addEventListener('click', showMenuListener);
    return () => {
      document.removeEventListener('click', showMenuListener);
    };
  }, []);

  return (
    <div>
      <div className={!menuHandler ? styles.menuDisable : styles.menuActive} ref={menuContainer}>
        {Navigation(gender)}
        <div className={styles.searchBlock}>
          <Search />
        </div>
      </div>
      <button
        className={`${styles.menuBtn} ${!menuHandler ? '' : styles.activeBtn}`}
        onClick={() => setMenuHandler(!menuHandler)}
        ref={menuBtn}>
        <span />
      </button>
    </div>
  );
};

export default MenuPopup;
