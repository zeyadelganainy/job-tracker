import { useEffect, useState } from 'react';
import API from '../services/api';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { username } = useAuth();

  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    company: '',
    position: '',
    status: 'Applied',
    appliedDate: '',
    notes: ''
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get('/applications');
        setApplications(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load applications');
      }
    };

    fetchApplications();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const res = await API.put(`/applications/${editId}`, form);
        setApplications(applications.map((a) => (a._id === editId ? res.data : a)));
      } else {
        const res = await API.post('/applications', form);
        setApplications([res.data, ...applications]);
      }
      setForm({ company: '', position: '', status: 'Applied', appliedDate: '', notes: '' });
      setEditId(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setError('Failed to submit application');
    }
  };

  const handleEdit = (app) => {
    setEditId(app._id);
    setShowForm(true);
    setForm({
      company: app.company,
      position: app.position,
      status: app.status,
      appliedDate: app.appliedDate ? app.appliedDate.split('T')[0] : '',
      notes: app.notes || ''
    });
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/applications/${id}`);
      setApplications(applications.filter((a) => a._id !== id));
      if (editId === id) setEditId(null);
    } catch (err) {
      console.error(err);
      setError('Failed to delete application');
    }
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <h2 className="dashboard-title">Hi, {username || 'User'}! 👋</h2>

        {!showForm && (
          <div className="text-center">
            <button
              onClick={() => {
                setShowForm(true);
                setEditId(null);
                setForm({ company: '', position: '', status: 'Applied', appliedDate: '', notes: '' });
              }}
              className="add-btn"
            >
              + Add Application
            </button>
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-300 shadow-md rounded-lg px-6 py-6 mb-10 space-y-4"
          >
            {editId && (
              <div className="text-yellow-700 bg-yellow-100 p-3 rounded">
                Editing application...
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setShowForm(false);
                    setForm({ company: '', position: '', status: 'Applied', appliedDate: '', notes: '' });
                  }}
                  className="ml-4 underline text-yellow-900"
                >
                  Cancel
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
              <input name="position" placeholder="Position" value={form.position} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
              <select name="status" value={form.status} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                <option>Applied</option>
                <option>Interviewing</option>
                <option>Offer</option>
                <option>Rejected</option>
                <option>Accepted</option>
              </select>
              <input type="date" name="appliedDate" value={form.appliedDate} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
            </div>
            <textarea name="notes" placeholder="Notes (optional)" value={form.notes} onChange={handleChange} className="w-full border px-3 py-2 rounded resize-none h-24"></textarea>
            <div className="flex justify-end">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded">
                {editId ? 'Update Application' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}

        {applications.length > 0 && (
          <div className="flex flex-col w-full">
            {applications.map((app) => (
              <div key={app._id} className="application-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{app.position} @ {app.company}</h3>
                    <p className="text-sm text-gray-600">{new Date(app.appliedDate).toLocaleDateString()}</p>
                    <p className="text-sm mt-1"><strong>Status:</strong> {app.status}</p>
                    {app.notes && <p className="text-sm mt-1"><strong>Notes:</strong> {app.notes}</p>}
                  </div>
                  <div className="flex flex-col gap-2 ml-4 text-sm">
                    <button onClick={() => handleEdit(app)} className="text-blue-600 border border-blue-500 px-3 py-1 rounded hover:bg-blue-50">Edit</button>
                    <button onClick={() => handleDelete(app._id)} className="text-red-600 border border-red-500 px-3 py-1 rounded hover:bg-red-50">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>
    </Layout>
  );
};

export default Dashboard;
