import {
  House,
  Users,
  CalendarDays,
  MessageSquare,
  CreditCard,
  Settings,
  MoreVertical,
} from "lucide-react";
import "./Navbar.css";
import { useState } from "react";

export default function Navbar() {
const navItems = [
  { label: "Overview", icon: House },
  { label: "Patients", icon: Users, active: true },
  { label: "Schedule", icon: CalendarDays },
  { label: "Message", icon: MessageSquare },
  { label: "Transactions", icon: CreditCard },
];
  const [active, setActive] = useState("Patients");
  return (
    <nav className="navbar">
      {/* Left */}
      <div className="navbar__brand">
        <div className="brand-mark">
          <span className="shape shape-1"></span>
          <span className="shape shape-2"></span>
          <span className="shape shape-3"></span>
          <span className="shape shape-4"></span>
        </div>

        <h1 className="brand-text">
          Tech<span className="brand-dot">.</span>Care
        </h1>
      </div>

      {/* Center */}
      <div className="navbar__menu">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              className={`nav-item ${active === item.label ? "active" : ""}`}
              onClick={()=>setActive(item.label)}
            >
              <Icon size={18} strokeWidth={2} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right */}
      <div className="navbar__actions">
        <div className="profile-box">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Doctor profile"
            className="profile-image"
          />

          <div className="profile-info">
            <p className="profile-name">Dr. Jose Simmons</p>
            <p className="profile-role">General Practitioner</p>
          </div>
        </div>

        <div className="right-divider"></div>

        <button className="icon-btn" type="button" aria-label="Settings">
          <Settings size={20} />
        </button>

        <button className="icon-btn" type="button" aria-label="More options">
          <MoreVertical size={20} />
        </button>
      </div>
    </nav>
  );
}