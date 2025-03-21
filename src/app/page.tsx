import styles from './page.module.css';
import Navigation from './components/Navigation/Navigation';

export default function Home() {
  return (
    <div className={styles.page}>
      <Navigation />
      <p className={styles.forsida}>Klikkaðu á dálkana fyrir ofan</p>
    </div>
  );
}
