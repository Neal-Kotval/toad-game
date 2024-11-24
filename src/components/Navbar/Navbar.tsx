import { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const links = [
  { text: 'Bracket', url: '/bracket' },
  { text: 'Dashboard', url: '/dashboard' },
  { text: 'Submission', url: '/submission' },
  { text: 'Log In', url: '/login' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobile(false);
        setIsOpen(false); // Close menu on larger screens
      } else {
        setIsMobile(true);
      }
    };

    handleResize(); // Run on initial load
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav>
      <div className={styles.nav_box}>
        <div className={styles.logo}>
          <Link href="/">Tode Games</Link>
        </div>
        {isMobile && (
          <button
            className={styles.hamburger}
            onClick={toggleMenu}
          >
            ☰
          </button>
        )}
        <ul
          className={`${styles.navbar_links} ${
            isMobile && isOpen ? styles.active : styles.collapse
          }`}
        >
          {links.map((link) => (
            <li key={link.url}>
              {link.text === 'Log In' ? (
                // Replace `signIn()` with a simple Link
                <Link href={link.url}>
                  <button className={styles.loginButton}>
                    {link.text}
                  </button>
                </Link>
              ) : (
                <Link href={link.url}>{link.text}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
