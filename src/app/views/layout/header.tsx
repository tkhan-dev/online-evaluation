import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';

interface User {
  email: string;
  username: string;
  mode: string;
  userId?: string;
}

export default function Navbar() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const [userObj, setUserObj] = useState<User>({ email: '', username: '', mode: '' });
  const navigate = useNavigate();

  // Theme toggle
  const toggleTheme = (theme: 'light' | 'dark') => {
    setCurrentTheme(theme);

    const box = document.querySelector('.box');
    if (box) {
      box.classList.remove('light', 'dark');
      box.classList.add(theme);
    }
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isDark = e.target.checked;
    toggleTheme(isDark ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    document.body.classList.add('sidebar-open');
    document.querySelector('.sidebar .sidebar-toggler')?.classList.add('active');
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedin', 'false');
    localStorage.clear();
    navigate('/auth/login');
  };

  const handleEditProfile = () => {
    const data = localStorage.getItem('userData');
    if (data) {
      const parsed = JSON.parse(data);
      localStorage.setItem('isLoggedin', 'true');
      navigate(`/dashboard/edit/${parsed.userId}`);
    }
  };

  // Load user data
  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      const parsed: User = JSON.parse(data);
      setUserObj(parsed);
      toggleTheme(parsed.mode as 'light' | 'dark');
    }
  }, []);

  return (
    <nav className="navbar bg-white dark:bg-gray-800 shadow px-4 py-2 flex justify-end items-center">
      <div className="relative">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="p-1 text-sm">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleEditProfile}
                    className={`${
                      active ? 'bg-gray-100 dark:bg-gray-600' : ''
                    } w-full text-left px-3 py-2 flex items-center gap-2`}
                  >
                    <i className="feather icon-edit"></i>
                    Edit Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? 'bg-gray-100 dark:bg-gray-600' : ''
                    } w-full text-left px-3 py-2 flex items-center gap-2`}
                  >
                    <i className="feather icon-log-out"></i>
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
}
