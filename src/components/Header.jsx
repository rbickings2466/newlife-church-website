import React, { useState } from "react";
import { Menu, X, User, Lock, ChevronDown } from "lucide-react";
import Button from "./Button";
import { useAuth } from "../hooks/useAuth";

export default function Header({ activeSection, setActiveSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, logout } = useAuth();

  const NavItem = ({ children, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );

  const DropdownItem = ({ children, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );

  const navigation = [
    { name: "Home", section: "home" },
    {
      name: "About Us",
      dropdown: [
        { name: "About", section: "about" },
        { name: "Our Beliefs", section: "beliefs" },
        { name: "Our Pastor", section: "pastor" },
        { name: "Church Leaders", section: "leaders" },
      ],
    },
    {
      name: "Get Involved",
      dropdown: [
        { name: "Plan Your Visit", section: "visit" },
        { name: "Ministries", section: "ministries" },
        { name: "Small Groups", section: "smallgroups" },
        { name: "Membership", section: "membership" },
      ],
    },
    { name: "Sermons", section: "sermons" },
    { name: "Events", section: "events" },
    { name: "Give", section: "giving" },
    { name: "Contact", section: "contact" },
  ];

  return (
    <header className='bg-white shadow-lg sticky top-0 z-40'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          {/* Logo */}
          <button
            onClick={() => setActiveSection("home")}
            className='flex items-center focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg p-2 transition-all duration-200 hover:bg-gray-50'
          >
            <img
              src='/NL_Logo_300.jpg'
              className='h-16 w-auto'
              alt='New Life Bible Fellowship Church Logo'
            />
          </button>

          {/* Desktop Navigation */}
          <nav
            className='hidden lg:flex space-x-2'
            role='navigation'
            aria-label='Main navigation'
          >
            {navigation.map((item, index) => {
              if (item.dropdown) {
                return (
                  <div key={index} className='relative'>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === index ? null : index)
                      }
                      onMouseEnter={() => setOpenDropdown(index)}
                      className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center`}
                    >
                      {item.name}
                      <ChevronDown className='w-4 h-4 ml-1' />
                    </button>
                    {openDropdown === index && (
                      <div
                        className='absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 animate-fade-in'
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.dropdown.map((subItem) => (
                          <DropdownItem
                            key={subItem.section}
                            onClick={() => {
                              setActiveSection(subItem.section);
                              setOpenDropdown(null);
                            }}
                            className={
                              activeSection === subItem.section
                                ? "bg-blue-50 text-blue-600 font-semibold"
                                : ""
                            }
                          >
                            {subItem.name}
                          </DropdownItem>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <NavItem
                  key={item.section}
                  onClick={() => setActiveSection(item.section)}
                  className={
                    activeSection === item.section
                      ? "text-blue-600 font-semibold"
                      : ""
                  }
                >
                  {item.name}
                </NavItem>
              );
            })}
            {/* Show members link always; MembersSection handles auth gating */}
            <NavItem
              onClick={() => setActiveSection("members")}
              className={
                activeSection === "members" ? "text-blue-600 font-semibold" : ""
              }
            >
              <Lock className='w-4 h-4 inline mr-1' />
              Members
            </NavItem>
          </nav>

          {/* Login/Mobile Menu */}
          <div className='flex items-center space-x-4'>
            <Button
              size='sm'
              onClick={() => {
                if (user) {
                  logout();
                } else {
                  setActiveSection("members");
                }
              }}
              className='hidden md:flex items-center bg-blue-600 hover:bg-blue-700 text-white'
            >
              <User className='w-4 h-4 mr-2' />
              {user ? "Logout" : "Member Login"}
            </Button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-200'
              aria-label='Toggle mobile menu'
            >
              {isMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='lg:hidden py-4 border-t animate-fade-in'>
            <div className='flex flex-col space-y-2'>
              {navigation.map((item, index) => {
                if (item.dropdown) {
                  return (
                    <div key={index}>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === index ? null : index)
                        }
                        className='w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-between'
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openDropdown === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === index && (
                        <div className='ml-4 space-y-1 mt-1'>
                          {item.dropdown.map((subItem) => (
                            <button
                              key={subItem.section}
                              onClick={() => {
                                setActiveSection(subItem.section);
                                setIsMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                              className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                                activeSection === subItem.section
                                  ? "text-blue-600 font-semibold bg-blue-50"
                                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                              }`}
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <NavItem
                    key={item.section}
                    onClick={() => {
                      setActiveSection(item.section);
                      setIsMenuOpen(false);
                    }}
                    className={
                      activeSection === item.section
                        ? "text-blue-600 font-semibold"
                        : ""
                    }
                  >
                    {item.name}
                  </NavItem>
                );
              })}
              <NavItem
                onClick={() => {
                  setActiveSection("members");
                  setIsMenuOpen(false);
                }}
                className={
                  activeSection === "members"
                    ? "text-blue-600 font-semibold"
                    : ""
                }
              >
                <Lock className='w-4 h-4 inline mr-1' />
                Members
              </NavItem>
              <Button
                size='sm'
                onClick={() => {
                  if (user) {
                    logout();
                  } else {
                    setActiveSection("members");
                  }
                  setIsMenuOpen(false);
                }}
                className='mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white'
              >
                <User className='w-4 h-4 mr-2' />
                {user ? "Logout" : "Member Login"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
