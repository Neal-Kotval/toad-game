// components/Navbar.tsx


import styles from './Navbar.module.scss';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

interface NavbarProps {
  // Define any props specific to the navbar component here, if needed.
}

const links = [
  { text: 'Bracket', url: '/bracket' },
  { text: 'Dashboard', url: '/dashboard'},
  { text: 'Submission', url: '/submission' },
  { text: 'Log In', url: '/login'},
  // Add more links as needed
];

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav>
      <div className={styles.nav_box}>
        <div className={styles.logo}>
          <Link href={'/'}>
            Toad Game
          </Link> {/* Add the logo text */}
        </div>
        <div className={styles.navbar_links}>
          {links.map((link) => (
              <li key={link.url}>
                {link.text === 'Log In' ? (
                  <button className={styles.loginButton} onClick={() => signIn()}>
                    {link.text}
                  </button>
                ) : (
                  <Link href={link.url}>{link.text}</Link>
                )}
              </li>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
