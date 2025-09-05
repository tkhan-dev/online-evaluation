import React, {useState, useRef, useEffect} from 'react';

type MenuItem = {
  key: string;
  label: string;
  color?: string;
  onClick?: () => void;
};

type DropdownProps = {
  children: React.ReactNode;
  menuItems: MenuItem[];
};

const Dropdown: React.FC<DropdownProps> = ({children, menuItems}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="true">
          {children}
        </button>
      </div>

      {open && (
        <div
          className="absolute right-0 z-40 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition ease-out duration-100 transform scale-100 opacity-100"
          role="menu"
          aria-orientation="vertical">
          <div className="py-1">
            {menuItems.map(item => (
              <button
                key={item.key}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                style={{color: item.color}}
                role="menuitem">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
