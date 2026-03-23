import { LogOut, CheckSquare } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
  const { user, logout, token } = useAuthStore();

  if (!token) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <CheckSquare color="#58a6ff" /> TaskFlow Mini
      </div>
      <div className="navbar-user">
        <span>Hi, {user?.name || "User"}</span>
        <button
          onClick={logout}
          className="btn-outline"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
