import Link from 'next/link';
import Styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={Styles.nav}>
      <ul>
        <li className={Styles.navComponent}>
          <Link href="/">Forsíða</Link>
        </li>
        <li className={Styles.navComponent}>
          <Link href="/flokkar">Flokkar</Link>
        </li>
      </ul>
    </nav>
  );
}
