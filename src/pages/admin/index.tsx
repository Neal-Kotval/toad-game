'use client';
import styles from './AdminPage.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/config';
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import "../../styles/globals.scss";

type User = {
  id: string;
  username: string;
  email: string;
  score: number;
};

type Battle = {
  id: string;
  winner: string;
  loser: string;
  pending: boolean;
};

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'battles'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [battles, setBattles] = useState<Battle[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async (email: string | null) => {
      if (!email) {
        setAuthChecked(true);
        return;
      }

      try {
        const adminCollectionRef = collection(db, 'admin');
        const adminQuery = query(adminCollectionRef, where('email', '==', email));
        const querySnapshot = await getDocs(adminQuery);

        if (!querySnapshot.empty) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error verifying admin access:', error);
      } finally {
        setAuthChecked(true);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      checkAdminAccess(user?.email || null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;

      setLoading(true);

      try {
        if (activeTab === 'users') {
          const usersCollectionRef = collection(db, 'users');
          const querySnapshot = await getDocs(usersCollectionRef);
          const usersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as User[];
          setUsers(usersData);
        } else {
          const battlesCollectionRef = collection(db, 'battles');
          const querySnapshot = await getDocs(battlesCollectionRef);
          const battlesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Battle[];
          setBattles(battlesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, isAdmin]);

  const handleEditUser = async (id: string, field: keyof User, value: string | number) => {
    try {
      const userRef = doc(db, 'users', id);
      await updateDoc(userRef, { [field]: value });
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, [field]: value } : user))
      );
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const userRef = doc(db, 'users', id);
      await deleteDoc(userRef);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditBattle = async (id: string, field: keyof Battle, value: string | boolean) => {
    try {
      const battleRef = doc(db, 'battles', id);
      await updateDoc(battleRef, { [field]: value });
      setBattles((prev) =>
        prev.map((battle) => (battle.id === id ? { ...battle, [field]: value } : battle))
      );
    } catch (error) {
      console.error('Error updating battle:', error);
    }
  };

  const handleDeleteBattle = async (id: string) => {
    try {
      const battleRef = doc(db, 'battles', id);
      await deleteDoc(battleRef);
      setBattles((prev) => prev.filter((battle) => battle.id !== id));
    } catch (error) {
      console.error('Error deleting battle:', error);
    }
  };

  if (!authChecked) {
    return <p>Checking authentication...</p>;
  }

  if (!isAdmin) {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.adminContainer}>
        <div className={styles.dropdown}>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as 'users' | 'battles')}
          >
            <option value="users">Users</option>
            <option value="battles">Battles</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : activeTab === 'users' ? (
          <div className={styles.usersTable}>
            <h2>Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <input
                        type="text"
                        className={styles.inputField}
                        value={user.username}
                        onChange={(e) => handleEditUser(user.id, 'username', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        className={styles.inputField}
                        value={user.email}
                        onChange={(e) => handleEditUser(user.id, 'email', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className={styles.inputField}
                        value={user.score}
                        onChange={(e) => handleEditUser(user.id, 'score', parseInt(e.target.value))}
                      />
                    </td>
                    <td>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.battlesTable}>
            <h2>Battles</h2>
            <table>
              <thead>
                <tr>
                  <th>Winner</th>
                  <th>Loser</th>
                  <th>Pending</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {battles.map((battle) => (
                  <tr key={battle.id}>
                    <td>
                      <input
                        type="text"
                        className={styles.inputField}
                        value={battle.winner}
                        onChange={(e) => handleEditBattle(battle.id, 'winner', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className={styles.inputField}
                        value={battle.loser}
                        onChange={(e) => handleEditBattle(battle.id, 'loser', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className={styles.checkboxField}
                        checked={battle.pending}
                        onChange={(e) => handleEditBattle(battle.id, 'pending', e.target.checked)}
                      />
                    </td>
                    <td>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteBattle(battle.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
