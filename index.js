import { useRouter } from 'next/router';
import { useState } from 'react';

const popularSearches = ['Dermatologist', 'Pediatrician', 'Gynecologist', 'Obstetrician'];

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim() && query.trim()) {
      router.push(`/doctors?location=${encodeURIComponent(location)}&specialty=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h2 style={{ color: '#0057a3' }}>practo</h2>
        <nav>
          <a href="#" style={{ marginRight: 16 }}>Find Doctors</a>
          <a href="#" style={{ marginRight: 16 }}>Video Consult</a>
          <a href="#">Surgeries</a>
        </nav>
      </header>

      <main style={{ backgroundColor: '#272f74', height: '80vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 1rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your home for health</h1>

        <form onSubmit={handleSearch} style={{ display: 'flex', maxWidth: 800, width: '100%', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Location (e.g., Bangalore)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ flex: 1, padding: '0.5rem', borderRadius: 4, border: 'none' }}
          />
          <input
            type="text"
            placeholder="Search doctors, clinics, hospitals, etc."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            style={{ flex: 3, padding: '0.5rem', borderRadius: 4, border: 'none' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', border: 'none', borderRadius: 4, color: 'white', cursor: 'pointer' }}>
            Search
          </button>
        </form>

        <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          Popular searches:
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              style={{ marginLeft: 8, background: 'none', border: 'none', color: '#ffd700', cursor: 'pointer' }}
            >
              {term}
            </button>
          ))}
        </div>
      </main>

      <footer style={{ borderTop: '1px solid #ddd', padding: '1rem', textAlign: 'center' }}>
        <small>© 2025 Practo Clone</small>
      </footer>
    </>
  );
}
