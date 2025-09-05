import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  Menu,
  ChevronLeft,
} from 'lucide-react';
import emlogo from '../../assets/EmLogo.svg';

const navItems = [
  { path: '/user-management', label: 'User management', icon: LayoutDashboard },
  { path: '/exam-conduction', label: 'Exam conduction', icon: LayoutDashboard },
  { path: '/master-data', label: 'Master data', icon: LayoutDashboard },
  { path: '/master-data-report', label: 'Master data report', icon: LayoutDashboard },
  { path: '/question-paper-management', label: 'Question paper management', icon: LayoutDashboard },
  { path: '/answersheet-import', label: 'Answersheet import', icon: LayoutDashboard },
  { path: '/answersheet-allocation', label: 'Answersheet allocation', icon: LayoutDashboard },
  { path: '/answersheet-allocation-status', label: 'Answersheet allocation status', icon: LayoutDashboard },
  { path: '/analysis-report', label: 'Analysis report', icon: LayoutDashboard },
  { path: '/final-exam-results', label: 'Final exam results', icon: LayoutDashboard },
  { path: '/ocrupload', label: 'OCR Upload', icon: LayoutDashboard },

];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
  className={`${
    isCollapsed ? 'w-20' : 'w-25%'
  } flex-shrink-0 h-full bg-[#222e84] text-white flex flex-col transition-all duration-300 ease-in-out shadow-lg`}
>

      {/* Header with toggle */}
      <div className="flex items-center justify-between h-20 border-b border-white/10 px-4">
        {!isCollapsed && (
          <div className="text-center">
            <img src={emlogo} alt="Logo" className="h-10 mx-auto mb-1" />
          </div>
        )}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="text-white focus:outline-none"
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Section title */}
      {!isCollapsed && (
        <div className="px-4 py-3 uppercase text-gray-400 text-xs font-semibold tracking-wide">
          Online evaluation
        </div>
      )}

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-1">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? 'bg-warning-color text-white font-semibold'
                  : 'text-white hover:bg-white/10'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
