import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { user, profiles, selectProfile, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const handleProfileSwitch = async (profileId: number) => {
    await selectProfile(profileId);
    setIsProfileMenuOpen(false);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      className="
        sticky top-0 z-10
        bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100
        shadow
        border-b-2 border-pink-200
        font-[Fredoka,Comic Sans MS,Arial Rounded,sans-serif]
      "
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold flex items-baseline">
          <span className="text-pink-500 drop-shadow">Dyslexia</span>
          <span className="text-yellow-500 drop-shadow">Buddy</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="px-4 py-2 text-pink-600 hover:text-yellow-500 font-bold transition"
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 text-pink-600 hover:text-yellow-500 font-bold transition"
          >
            {t('nav.about')}
          </Link>

          <LanguageSwitcher />

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 text-pink-600 font-bold transition hover:text-yellow-400"
              >
                {t('nav.dashboard')}
              </Link>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="px-4 py-2 text-pink-600 font-bold transition hover:text-yellow-400 flex items-center gap-2"
                >
                  <span>{user.name || `Profile ${user.id}`}</span>
                  <span className="text-xs">({user.profile_type})</span>
                  <span className="text-xs">▼</span>
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                    <div className="p-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-700">Switch Profile</p>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {profiles.map((profile) => (
                        <button
                          key={profile.id}
                          onClick={() => handleProfileSwitch(profile.id)}
                          className={`w-full text-left px-3 py-2 hover:bg-gray-100 transition ${
                            profile.id === user.id ? 'bg-teal-50 border-l-4 border-teal-500' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-800">{profile.name || `Profile ${profile.id}`}</p>
                              <p className="text-xs text-gray-600">
                                {profile.profile_type} • 
                                {profile.year_of_birth ? ` Age: ${new Date().getFullYear() - profile.year_of_birth}` : ' Age not set'}
                              </p>
                            </div>
                            {profile.id === user.id && (
                              <span className="text-teal-600 text-sm">✓</span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 p-2">
                      <Link
                        to="/me"
                        className="block w-full text-center py-2 text-sm text-teal-600 hover:bg-teal-50 rounded transition"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        + Create New Profile
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={logout}
                className="px-4 py-2 font-bold text-pink-600 bg-yellow-300 rounded-full shadow hover:bg-yellow-400 transition"
              >
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="ml-2 px-5 py-2 bg-pink-500 hover:bg-pink-400 text-white rounded-full font-bold shadow transition"
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                className="ml-2 px-5 py-2 border-2 border-pink-400 text-pink-500 hover:bg-pink-100 rounded-full font-bold shadow transition"
              >
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-3xl text-pink-500 bg-yellow-200 rounded-full px-3 py-1 shadow hover:bg-yellow-300 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </nav>
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-3 space-y-2 bg-pink-100 rounded-b-3xl shadow font-[Fredoka,Comic Sans MS,Arial Rounded,sans-serif]">
          <div className="flex justify-center py-2">
            <LanguageSwitcher />
          </div>
          <Link
            to="/"
            className="block py-3 text-pink-600 hover:text-yellow-500 text-lg font-bold rounded-full"
            onClick={() => setIsMenuOpen(false)}
          >{t('nav.home')}</Link>
          <Link
            to="/about"
            className="block py-3 text-pink-600 hover:text-yellow-500 text-lg font-bold rounded-full"
            onClick={() => setIsMenuOpen(false)}
          >{t('nav.about')}</Link>
          {user ? (
            <>
              <div className="border-t border-pink-200 pt-2 mb-2">
                <p className="text-center text-sm text-pink-600 font-semibold">
                  Current: {user.name || `Profile ${user.id}`} ({user.profile_type})
                </p>
              </div>
              
              <Link
                to="/dashboard"
                className="block py-3 text-pink-600 hover:text-yellow-500 text-lg font-bold rounded-full"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.dashboard')}
              </Link>
              
              <Link
                to="/me"
                className="block py-3 text-pink-600 hover:text-yellow-500 text-lg font-bold rounded-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Manage Profiles
              </Link>
              
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 text-pink-600 hover:text-yellow-500 text-lg font-bold rounded-full"
              >
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-3 bg-pink-500 text-white rounded-full text-center shadow font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                className="block py-3 border-2 border-pink-400 text-pink-500 rounded-full text-center shadow font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;