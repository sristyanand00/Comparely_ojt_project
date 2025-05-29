import React, { useState } from "react";
import "./ProfilePage.css";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Sristy",
    phone: "+91 8252613100",
    avatar: "",
  });
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", details: "123 Main St, City, State" },
    { id: 2, label: "Work", details: "456 Office Rd, City, State" },
  ]);
  const [showModal, setShowModal] = useState(null); // 'addresses' | 'support' | 'settings' | null
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({ label: '', details: '' });
  const [supportMsg, setSupportMsg] = useState('');
  const [profileForm, setProfileForm] = useState({ name: user.name, phone: user.phone, avatar: user.avatar });

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      navigate("/"); // Redirect to landing page
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  // Address handlers
  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressForm({ label: addr.label, details: addr.details });
    setShowModal('addresses');
  };
  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };
  const handleAddressFormSubmit = (e) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses(addresses.map(a => a.id === editingAddress.id ? { ...a, ...addressForm } : a));
    } else {
      setAddresses([...addresses, { ...addressForm, id: Date.now() }]);
    }
    setEditingAddress(null);
    setAddressForm({ label: '', details: '' });
    // Keep modal open, but hide form
  };
  const handleAddAddress = () => {
    setEditingAddress('new');
    setAddressForm({ label: '', details: '' });
    setShowModal('addresses');
  };
  const handleCancelAddress = () => {
    setEditingAddress(null);
    setAddressForm({ label: '', details: '' });
  };

  // Profile settings handlers
  const handleProfileFormSubmit = (e) => {
    e.preventDefault();
    setUser(profileForm);
    setShowModal(null);
  };

  // Support form handler
  const handleSupportSubmit = (e) => {
    e.preventDefault();
    alert('Support message sent!');
    setSupportMsg('');
    setShowModal(null);
  };

  return (
    <div className="profile-page-root">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt="Profile" />
          ) : (
            <span className="profile-avatar-placeholder">👤</span>
          )}
        </div>
        <div className="profile-info">
          <div className="profile-name">{user.name}</div>
          <div className="profile-phone">{user.phone}</div>
        </div>
      </div>

      <div className="profile-section">
        <ul className="profile-list">
          <li onClick={() => setShowModal('addresses')} style={{cursor:'pointer'}}>
            <span role="img" aria-label="address">📍</span> Addresses
          </li>
          <li onClick={() => setShowModal('support')} style={{cursor:'pointer'}}>
            <span role="img" aria-label="support">💬</span> Customer Support
          </li>
          <li onClick={() => setShowModal('settings')} style={{cursor:'pointer'}}>
            <span role="img" aria-label="settings">⚙️</span> Profile Settings
          </li>
        </ul>
      </div>

      <button className="logout-btn" onClick={handleLogout}>Log Out</button>

      {/* Addresses Modal */}
      {showModal === 'addresses' && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,30,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="modal-card" style={{
            background: '#fff', borderRadius: 16, maxWidth: 420, width: '90vw', padding: 32, position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', minHeight: 200
          }}>
            <button className="modal-close" onClick={() => { setShowModal(null); setEditingAddress(null); setAddressForm({label:'',details:''}); }} style={{ position: 'absolute', top: 16, right: 16, background: '#eee', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 22, cursor: 'pointer', color: '#333' }}>×</button>
            <h3 style={{marginTop:0, marginBottom:16, textAlign:'center'}}>Your Addresses</h3>
            <div style={{marginBottom: 20}}>
              <ul style={{padding:0, listStyle:'none', margin:0}}>
                {addresses.length === 0 && <li style={{color:'#888', textAlign:'center'}}>No addresses saved.</li>}
                {addresses.map(addr => (
                  <li key={addr.id} style={{marginBottom:12, borderBottom:'1px solid #f0f0f0', paddingBottom:10, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <div>
                      <b style={{color:'#333'}}>{addr.label}:</b> <span style={{color:'#555'}}>{addr.details}</span>
                    </div>
                    <div>
                      <button style={{marginLeft:8, background:'#f5f5f5', border:'1px solid #ddd', borderRadius:6, padding:'2px 10px', cursor:'pointer'}} onClick={() => handleEditAddress(addr)}>Edit</button>
                      <button style={{marginLeft:4, background:'#ffeaea', border:'1px solid #ffb3b3', borderRadius:6, padding:'2px 10px', cursor:'pointer', color:'#c00'}} onClick={() => handleDeleteAddress(addr.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {editingAddress === null && (
              <button onClick={handleAddAddress} style={{marginTop:8, width:'100%', background:'#007bff', color:'#fff', border:'none', borderRadius:8, padding:'10px 0', fontWeight:600, fontSize:16, cursor:'pointer'}}>+ Add Address</button>
            )}
            {/* Address Form: only show when adding or editing */}
            {(editingAddress !== null) && (
              <form onSubmit={handleAddressFormSubmit} style={{marginTop:24, background:'#f7fafd', borderRadius:10, padding:16, boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
                <div style={{marginBottom:10}}>
                  <input
                    type="text"
                    placeholder="Label (e.g. Home, Work)"
                    value={addressForm.label}
                    onChange={e => setAddressForm(f => ({...f, label: e.target.value}))}
                    required
                    style={{marginRight:8, width:'48%', padding:8, borderRadius:6, border:'1px solid #ccc'}}
                  />
                  <input
                    type="text"
                    placeholder="Address details"
                    value={addressForm.details}
                    onChange={e => setAddressForm(f => ({...f, details: e.target.value}))}
                    required
                    style={{width:'48%', padding:8, borderRadius:6, border:'1px solid #ccc'}}
                  />
                </div>
                <div style={{display:'flex', gap:8}}>
                  <button type="submit" style={{flex:1, background:'#28a745', color:'#fff', border:'none', borderRadius:6, padding:'8px 0', fontWeight:600, fontSize:15, cursor:'pointer'}}>{editingAddress === 'new' ? 'Add' : 'Update'}</button>
                  <button type="button" onClick={handleCancelAddress} style={{flex:1, background:'#eee', color:'#333', border:'none', borderRadius:6, padding:'8px 0', fontWeight:600, fontSize:15, cursor:'pointer'}}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Customer Support Modal */}
      {showModal === 'support' && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,30,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="modal-card" style={{
            background: '#fff', borderRadius: 16, maxWidth: 420, width: '90vw', padding: 32, position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', minHeight: 200
          }}>
            <button className="modal-close" onClick={() => setShowModal(null)} style={{ position: 'absolute', top: 16, right: 16, background: '#eee', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 22, cursor: 'pointer', color: '#333' }}>×</button>
            <h3 style={{marginTop:0, marginBottom:16, textAlign:'center'}}>Customer Support</h3>
            <form onSubmit={handleSupportSubmit} style={{marginTop:16}}>
              <textarea
                placeholder="Describe your issue or question..."
                value={supportMsg}
                onChange={e => setSupportMsg(e.target.value)}
                required
                style={{width:'100%', minHeight:80, marginBottom:16, borderRadius:8, border:'1px solid #ccc', padding:10, fontSize:15, background:'#f7fafd'}}
              />
              <button type="submit" style={{width:'100%', background:'#007bff', color:'#fff', border:'none', borderRadius:8, padding:'10px 0', fontWeight:600, fontSize:16, cursor:'pointer'}}>Send</button>
            </form>
          </div>
        </div>
      )}

      {/* Profile Settings Modal */}
      {showModal === 'settings' && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,30,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="modal-card" style={{
            background: '#fff', borderRadius: 16, maxWidth: 420, width: '90vw', padding: 32, position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', minHeight: 200
          }}>
            <button className="modal-close" onClick={() => setShowModal(null)} style={{ position: 'absolute', top: 16, right: 16, background: '#eee', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 22, cursor: 'pointer', color: '#333' }}>×</button>
            <h3 style={{marginTop:0, marginBottom:16, textAlign:'center'}}>Profile Settings</h3>
            <form onSubmit={handleProfileFormSubmit} style={{marginTop:16}}>
              <div style={{marginBottom:16}}>
                <label style={{display:'block', marginBottom:4, color:'#333'}}>Name:</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={e => setProfileForm(f => ({...f, name: e.target.value}))}
                  required
                  style={{width:'100%', padding:8, borderRadius:6, border:'1px solid #ccc', fontSize:15}}
                />
              </div>
              <div style={{marginBottom:16}}>
                <label style={{display:'block', marginBottom:4, color:'#333'}}>Phone:</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={e => setProfileForm(f => ({...f, phone: e.target.value}))}
                  required
                  style={{width:'100%', padding:8, borderRadius:6, border:'1px solid #ccc', fontSize:15}}
                />
              </div>
              <div style={{marginBottom:16}}>
                <label style={{display:'block', marginBottom:4, color:'#333'}}>Avatar URL:</label>
                <input
                  type="text"
                  value={profileForm.avatar}
                  onChange={e => setProfileForm(f => ({...f, avatar: e.target.value}))}
                  style={{width:'100%', padding:8, borderRadius:6, border:'1px solid #ccc', fontSize:15}}
                />
              </div>
              <button type="submit" style={{width:'100%', background:'#28a745', color:'#fff', border:'none', borderRadius:8, padding:'10px 0', fontWeight:600, fontSize:16, cursor:'pointer'}}>Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}