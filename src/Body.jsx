import { useEffect, useMemo, useState } from "react";
import "./Body.css";
import BloodPressure from "./BloodPressure";
import { MoreHorizontal } from "lucide-react";
import DiagnosticList from "./DiagnosticList";
import PatientsList from "./PatientsList";
import PatientPanel, { PatientLabTests } from "./PatientDetails";

function Body() {
  const username = "coalition";
  const password = "skills-test";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const auth = btoa(`${username}:${password}`);

        const res = await fetch(
          "https://fedskillstest.coalitiontechnologies.workers.dev",
          {
            headers: {
              Authorization: `Basic ${auth}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        setUsers(data);
        setSelectedPatient(data?.[0] || null);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleSearchSubmit = (value) => {
    setSearch(value);
  };

  const renderUserList = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (filteredUsers.length === 0) {
      return <p>No patients found.</p>;
    }

    return filteredUsers.map((user, index) => (
      <div
        key={`${user.name}-${index}`}
        className="PatientList"
        onClick={() => setSelectedPatient(user)}
      >
        <img
          src={user.profile_picture}
          className="ProfilePicture"
          alt={user.name}
        />

        <div className="PatientData">
          <p className="PatientName">{user.name}</p>
          <p className="PatientMeta">
            {user.gender}, {user.age}
          </p>
        </div>

        <button
          className="PatientMoreBtn"
          type="button"
          aria-label="More options"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>
    ));
  };

  return (
    <div className="container">
      <PatientsList
        handleUserList={renderUserList}
        searchText={search}
        HandleSearch={handleSearchSubmit}
        onSelectPatient={setSelectedPatient}
      />

      <div className="middlecontainer">
        <div className="top-section">
          <BloodPressure data={selectedPatient?.diagnosis_history || []} />
        </div>

        <div className="bottom-section">
          <DiagnosticList data={selectedPatient?.diagnostic_list || []} />
        </div>
      </div>

      <div className="leftcontainer">
        <PatientPanel data={selectedPatient} />
        <PatientLabTests data={selectedPatient?.lab_results || []} />
      </div>
    </div>
  );
}

export default Body;