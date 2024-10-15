import React, { useState } from 'react';


const AdminConfigurationForm = () => {
  const [activeTab, setActiveTab] = useState('settings'); // Set default active tab to 'settings'
  const [roles, setRoles] = useState([{ name: 'SuperAdmin', features: '' }]); // State to store roles
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [newRole, setNewRole] = useState({ name: '', features: '' }); // State for new role input
  const [editingRole, setEditingRole] = useState(null); // State for editing role

  // Handle input change for new role
  const handleRoleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole({ ...newRole, [name]: value });
  };

  // Add or edit role
  const handleSaveRole = () => {
    if (editingRole !== null) {
      const updatedRoles = roles.map((role, index) => 
        index === editingRole ? newRole : role
      );
      setRoles(updatedRoles);
    } else {
      setRoles([...roles, newRole]);
    }
    setNewRole({ name: '', features: '' });
    setIsDialogOpen(false);
    setEditingRole(null);
  };

  // Open dialog for editing role
  const handleEditRole = (index) => {
    setEditingRole(index);
    setNewRole(roles[index]);
    setIsDialogOpen(true);
  };

  // Delete role
  const handleDeleteRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Form Container */}
      <div className="form-container">
        {/* Navigation Tabs */}
        <nav className="admin-tabs">
          <button 
            className={`tab ${activeTab === 'sms' ? 'active' : ''}`} 
            onClick={() => setActiveTab('sms')}
          >
            SMS
          </button>
          <button 
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`} 
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
          <button 
            className={`tab ${activeTab === 'roles' ? 'active' : ''}`} 
            onClick={() => setActiveTab('roles')}
          >
            Roles
          </button>
        </nav>

        {activeTab === 'sms' && (
          <form>
            <div className="form-column">
              {/* SMS Settings */}
              <div className="form-group">
                <label htmlFor="fiveDaysEarlier">5 Days Earlier:</label>
                <input type="text" id="fiveDaysEarlier" name="fiveDaysEarlier" />

                <label htmlFor="oneDayBefore">1 Day Before:</label>
                <input type="text" id="oneDayBefore" name="oneDayBefore" />

                <label htmlFor="expiryDay">Expiry Day:</label>
                <input type="text" id="expiryDay" name="expiryDay" />

                <label htmlFor="oneMonthExpired">One Month Expired:</label>
                <input type="text" id="oneMonthExpired" name="oneMonthExpired" />

                <label htmlFor="registrationMessage">Registration Message:</label>
                <input type="text" id="registrationMessage" name="registrationMessage" />

                <label htmlFor="registrationSuccessMessage">Registration Success Message:</label>
                <input type="text" id="registrationSuccessMessage" name="registrationSuccessMessage" />
              </div>
            </div>
          </form>
        )}

        {activeTab === 'settings' && (
          <form>
            <div className="form-column">
              {/* Settings Form */}
              <div className="form-group">
                <label htmlFor="otpTimeout">OTP Timeout:</label>
                <input type="text" id="otpTimeout" name="otpTimeout" />

                <label htmlFor="homeScreenImage1">Home Screen Image 1:</label>
                <input type="file" id="homeScreenImage1" name="homeScreenImage1" />
                
                <label htmlFor="homeScreenImage2">Home Screen Image 2:</label>
                <input type="file" id="homeScreenImage2" name="homeScreenImage2" />
                
                <label htmlFor="homeScreenImage3">Home Screen Image 3:</label>
                <input type="file" id="homeScreenImage3" name="homeScreenImage3" />
              </div>
            </div>

            <div className="form-column">
              {/* Right Side */}
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number:</label>
                <input type="text" id="contactNumber" name="contactNumber" />

                <label htmlFor="contactAddress">Contact Address:</label>
                <input type="text" id="contactAddress" name="contactAddress" />
                
                <label htmlFor="emailId">Email ID:</label>
                <input type="email" id="emailId" name="emailId" />
                
                <label htmlFor="noOfSlots">Number of Slots:</label>
                <input type="text" id="noOfSlots" name="noOfSlots" />
              </div>
            </div>
          </form>
        )}

        {activeTab === 'roles' && (
          <div>
            <button className="add-role-button" onClick={() => setIsDialogOpen(true)}>Add Role</button>
            <table className="roles-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Features</th>
                  <th>Actions</th> {/* New Actions Column */}
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr key={index}>
                    <td>{role.name}</td>
                    <td>{role.features}</td>
                    <td>
  <button className="edit-button" onClick={() => handleEditRole(index)}>
    <i className="pi pi-pencil"  onClick={() => handleEditRole(index)}></i> {/* Pencil icon for editing */}
  </button>
  <button className="delete-button" onClick={() => handleDeleteRole(index)}>
    <i className="pi pi-trash"></i> {/* Trash icon for deleting */}
  </button>
</td>

                  </tr>
                ))}
              </tbody>
            </table>

            {/* Dialog for Adding/Editing Role */}
            {isDialogOpen && (
              <div className="dialog-overlay">
                <div className="dialog">
                  <h3>{editingRole !== null ? 'Edit Role' : 'Add Role'}</h3>
                  <label htmlFor="roleName">Role Name:</label>
                  <select
                    id="roleName"
                    name="name"
                    value={newRole.name}
                    onChange={handleRoleInputChange}
                  >
                    <option value="">Select Role</option>
                    <option value="SuperAdmin">SuperAdmin</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <label htmlFor="roleFeatures">Role Features:</label>
                  <input
                    type="text"
                    id="roleFeatures"
                    name="features"
                    value={newRole.features}
                    onChange={handleRoleInputChange}
                  />
                  <button className='add-role-button'  onClick={handleSaveRole}>{editingRole !== null ? 'Save Changes' : 'Add Role'}</button>
                  <button className='add-role-button' onClick={() => setIsDialogOpen(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminConfigurationForm;
