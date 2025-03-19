import Link from 'next/link';
import Styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={Styles.nav}>
      <ul>
        <li>
          <Link href="/">Forsíða</Link>
        </li>
        <li>
          <Link href="/flokkar">Flokkar</Link>
        </li>
      </ul>
    </nav>
  );
}
