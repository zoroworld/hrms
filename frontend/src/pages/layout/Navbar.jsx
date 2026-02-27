const Navbar = () => (
  <nav className="navbar navbar-dark bg-dark shadow-sm px-4">
    <span className="navbar-brand">Dashboard</span>

    <div className="dropdown">
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        Admin
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><button className="dropdown-item">Profile</button></li>
        <li><button className="dropdown-item">Logout</button></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
