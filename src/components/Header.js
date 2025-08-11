import React, { useState, useEffect } from "react";
import logo3 from "../assets/logo3.png";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import userIcon from "../assets/user.jpg";
import { IoIosSearch } from "react-icons/io";

function Header() {
  const location = useLocation();

  // Helper to parse query param q from location.search
  const getQueryFromSearch = (search) => {
    const params = new URLSearchParams(search);
    return params.get('q') || '';
  };

  const [searchInput, setSearchInput] = React.useState(() => getQueryFromSearch(location.search));

  const navigate = useNavigate();

  // Sync searchInput state with URL param q on location.search change
  useEffect(() => {
    const q = getQueryFromSearch(location.search);
    if (q !== searchInput) {
      setSearchInput(q);
    }
  }, [location.search]);

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
    // We intentionally do not navigate if searchInput is empty to avoid clearing URL query unnecessarily
  }, [searchInput, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const desktopNavigation = [
    { label: "Home", path: "/" },
    { label: "TV Shows", path: "/tv" },
    { label: "Movies", path: "/movie" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={"/"}>
              <img
                src={logo3}
                alt="logo3"
                width={210}
                className="cursor-pointer drop-shadow-md"
                style={{ filter: 'brightness(1.2) contrast(1.3)' }}
              />
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center w-full max-w-md mx-4"
          >
            <div className="relative w-full">
              <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search movies..."
                className="w-full pl-10 pr-3 py-2 rounded-l-md focus:outline-none text-black"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-r-md text-white hover:opacity-90 transition-opacity duration-300"
              style={{ background: 'linear-gradient(180deg, #FF0000 0%, #6078EA 100%)' }}
            >
              Search
            </button>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 ml-5">
            {desktopNavigation.map((nav, index) => (
              <div key={nav.label + "header" + index}>
                <NavLink
                  to={nav.path}
                  end={nav.path === "/"}
                  className={({ isActive }) =>
                    `px-2 text-white hover:text-neutral-300 transition-colors duration-300 ${isActive ? "text-neutral-100 underline" : ""
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            ))}
          </nav>

          {/* Mobile right icons wrapper */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Icon */}
            <div
              className="block lg:hidden cursor-pointer bg-transparent px-4 py-1 outline-none border-none"
              onClick={() => navigate("/search")}
              aria-label="Search"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate("/search");
              }}
            >
              <IoIosSearch className="text-white text-xl" />
            </div>

            {/* User Icon */}
            <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all">
              <img src={userIcon} alt="user" className="w-full h-full" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
