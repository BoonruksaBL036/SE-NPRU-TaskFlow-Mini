import { LogOut } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

const TopNav = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="full-width-nav">
      <div className="nav-container">
        <h2>TaskFlow Mini</h2>
        <div className="logged-in-user">
          <span>
            Welcome, <strong>{user?.name || user?.email || "User"}</strong>
          </span>
          <button onClick={logout} className="btn-logout">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
