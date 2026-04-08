import "./PatientDetails.css";
import {
  CalendarDays,
  Venus,
  Phone,
  ShieldCheck,
  Download,
} from "lucide-react";

function InfoRow({ icon, label, value }) {
  const Icon = icon;

  return (
    <div className="info-row">
      <div className="info-icon-wrap">
        <Icon size={20} />
      </div>

      <div>
        <p className="info-label">{label}</p>
        <p className="info-value">{value}</p>
      </div>
    </div>
  );
}

export default function PatientPanel({data}) {

  return (
    <div className="patient-panel">
      {data && (
      <div className="panel-top" >
        <img
          src={data.profile_picture}
          alt="patient"
          className="profile-img"
        />

        <h2 className="patient-name">{data.name}</h2>

        <div className="info-list">
          <InfoRow
            icon={CalendarDays}
            label="Date Of Birth"
            value={data.date_of_birth}
          />
          <InfoRow icon={Venus} label="Gender" value={data.gender} />
          <InfoRow icon={Phone} label="Contact Info." value={data.phone_number} />
          <InfoRow
            icon={Phone}
            label="Emergency Contacts"
            value={data.emergency_contact}
          />
          <InfoRow
            icon={ShieldCheck}
            label="Insurance Provider"
            value={data.insurance_type}
          />
        </div>

        <button className="show-btn">Show All Information</button>
      </div>
      )}
    </div>
  );
}



export function PatientLabTests({ data = [] }) {
  return (
    <div>      {/* BOTTOM (1 PART) */}
      <div className="panel-bottom">
        <h3 className="lab-title">Lab Results</h3>

        <div className="lab-list">
          {data.length>0 ? 
          (data.map((item, index) => (
            <div className="lab-row" key={index}>
              <span>{item}</span>
              <Download size={18} />
            </div>
          ))
          ):(
            <p>No lab results</p>
          )}
        </div>
      </div></div>
  )
}