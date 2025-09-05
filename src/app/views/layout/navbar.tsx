import { useState, useEffect } from 'react';
import CollegeLogo from '../../../app/assets/DashBLogo.svg';
import NotificationIcon from '../../../app/assets/ico-message.svg';
import BellIcon from '../../../app/assets/ico-notification.svg';
import FullScreenIcon from '../../../app/assets/ico-maximize.svg';
import ThemeIcon from '../../../app/assets/ico-ui-mode.svg';
import Dropdown from '../../../base-components/Dropdown';

type NavBarProps = {
  onLogout?: () => void;
};

const NavBar: React.FC<NavBarProps> = ({ onLogout }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFullscreenToggle = () => {
    const isFullscreen =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement;

    if (isFullscreen) {
      document.exitFullscreen?.();
      (document as any).webkitExitFullscreen?.();
      (document as any).msExitFullscreen?.();
    } else {
      const element = document.documentElement;
      element.requestFullscreen?.();
      (element as any).webkitRequestFullscreen?.();
      (element as any).msRequestFullscreen?.();
    }
  };

  const DROP_DOWN_MENU_ITEMS = [
    {
      key: 'logout',
      label: 'Logout',
      onClick: onLogout,
      color: 'var(--red-color)',
    },
  ];

  const userName = 'Rameshkumar R';
  const getInitial = (name: string) => name.trim()[0]?.toUpperCase() || '';

  return (
    <header className="h-20 w-full bg-light-primary-color text-white flex items-center justify-between px-6 border-b border-gray-700 z-30 sticky top-0">
      {/* Left: Logo & Search */}
      <div className="flex items-center space-x-6 border-r border-gray-600 pr-6 h-full">
        {/* <img src={CollegeLogo} alt="Logo" className="h-8" /> */}
        <input
          type="text"
          placeholder="Search here..."
          className="w-72 px-4 py-2 rounded-md bg-primary-color text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center space-x-6 pl-6 h-full border-l border-gray-600">
        <img src={ThemeIcon} alt="Theme" className="w-5 h-5 cursor-pointer" />
        <img
          src={FullScreenIcon}
          alt="Fullscreen"
          className="w-5 h-5 cursor-pointer"
          onClick={handleFullscreenToggle}
        />
        <div className="relative">
          <img src={NotificationIcon} alt="Messages" className="w-5 h-5 cursor-pointer" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </div>
        <div className="relative">
          <img src={BellIcon} alt="Alerts" className="w-5 h-5 cursor-pointer" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </div>

        <Dropdown menuItems={DROP_DOWN_MENU_ITEMS}>
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-600 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#007BFF] text-white flex items-center justify-center font-semibold">
              {getInitial(userName)}
            </div>
            <div className="text-sm text-white text-right">
              <div className="font-medium">{userName}</div>
              <div className="text-xs text-gray-300">COE Head</div>
            </div>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default NavBar;
