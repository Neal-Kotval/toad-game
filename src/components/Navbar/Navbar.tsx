import { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const links = [
  { text: "Bracket", url: "/bracket" },
  { text: "Dashboard", url: "/dashboard" },
  { text: "Submission", url: "/submission" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user] = useAuthState(auth); // Track logged-in user
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      router.push("/login");
    } catch (e) {
      console.error("Error signing out:", e);
    }
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
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav>
      <div className={styles.nav_box}>
        <div className={styles.logo}>
          <Link href="/">Toad Game</Link>
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
              <Link href={link.url}>{link.text}</Link>
            </li>
          ))}
          <li>
            {user ? (
              // Log Out Button if the user is logged in
              <button
                onClick={handleSignOut}
                className={styles.loginButton}
              >
                Log Out
              </button>
            ) : (
              // Log In Link if the user is not logged in
              <Link href="/login">
                <button className={styles.loginButton}>
                  Log In
                </button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
