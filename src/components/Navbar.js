import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar newshub-header">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1 className="newshub-brand mb-0">
          NewsHub - Stay Informed, Stay Ahead
        </h1>
        <div className="newshub-search-bar d-none d-lg-flex">
          <input type="text" placeholder="Search news..." />
          <span className="search-icon">🔍</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
