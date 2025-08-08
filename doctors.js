import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Doctors() {
  const router = useRouter();
  const { location, specialty } = router.query;

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location || !specialty) return;

    setLoading(true);
    fetch(`http://localhost:3001/api/doctors?location=${encodeURIComponent(location)}&specialty=${encodeURIComponent(specialty)}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(() => {
        setDoctors([]);
        setLoading(false);
      });
  }, [location, specialty]);

  if (!location || !specialty) {
    return <p style={{ padding: '1rem' }}>Please provide location and specialty in the query params.</p>;
  }

  if (loading) return <p style={{ padding: '1rem' }}>Loading doctors...</p>;

  return (
    <>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h2 style={{ color: '#0057a3' }}>practo</h2>
        <nav>
          <a href="/" style={{ marginRight: 16 }}>Home</a>
          <a href="#" style={{ marginRight: 16 }}>Video Consult</a>
          <a href="#">Surgeries</a>
        </nav>
      </header>

      <main style={{ padding: '1rem', maxWidth: 900, margin: 'auto' }}>
        <h2 style={{ marginBottom: '1rem' }}>
          {doctors.length} {specialty}s available in {location}
        </h2>

        {doctors.length === 0 && <p>No doctors found for this search.</p>}

        {doctors.map((doc) => (
          <div
            key={doc.id}
            style={{
              borderBottom: '1px solid #ddd',
              padding: '1rem 0',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            {doc.photo ? (
              <img
                src={doc.photo}
                alt={doc.name}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }}
              />
            ) : (
              <div
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: '#ccc',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '2rem',
                  color: '#555',
                }}
              >
                AD
              </div>
            )}
            <div style={{ flex: 1 }}>
              <a href="#" style={{ fontSize: '1.2rem', color: '#0057a3', fontWeight: 'bold', textDecoration: 'none' }}>
                {doc.name}
              </a>
              <p style={{ margin: '0.2rem 0' }}>
                {doc.specialty} - {doc.experience} years experience
              </p>
              <p style={{ margin: '0.2rem 0', fontWeight: 'bold' }}>{doc.location}</p>
              {doc.clinics.length > 0 && (
                <p style={{ margin: '0.2rem 0', fontStyle: 'italic' }}>{doc.clinics.join(' + ')}</p>
              )}
              <p style={{ margin: '0.2rem 0' }}>
                ₹{doc.consultationFee} Consultation Fees
              </p>

              <p>
                <span style={{ backgroundColor: '#4caf50', color: 'white', padding: '2px 6px', borderRadius: 4 }}>
                  {doc.patientStories} Patient Stories
                </span>
                {doc.availableToday && (
                  <span style={{ marginLeft: 12, color: 'green', fontWeight: 'bold' }}>Available Today</span>
                )}
              </p>

              <button
                style={{
                  marginRight: 12,
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  border: 'none',
                  borderRadius: 4,
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Book Clinic Visit
              </button>

              <button
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#e0e0e0',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                Contact Clinic
              </button>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
