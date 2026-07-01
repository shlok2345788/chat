import React, { useState } from 'react';
import { getDB, updateDB } from '../services/mockData';
import { Plus, Trash2, Award, Users, BookOpen, Layers } from 'lucide-react';

function AdminPanel() {
  const [db, setDb] = useState(getDB());
  const [newYear, setNewYear] = useState('');
  const [selectedYear, setSelectedYear] = useState(Object.keys(db.academicYears)[0] || '');
  const [newDept, setNewDept] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [newSem, setNewSem] = useState('');
  const [selectedSem, setSelectedSem] = useState('');
  const [newSubj, setNewSubj] = useState('');
  const [newDiv, setNewDiv] = useState('');

  const refreshData = () => {
    setDb(getDB());
  };

  const handleAddAcademicYear = (e) => {
    e.preventDefault();
    if (!newYear.trim()) return;
    if (db.academicYears[newYear]) {
      alert("Academic Year already exists!");
      return;
    }
    const updated = { ...db.academicYears, [newYear.trim()]: { departments: {} } };
    updateDB("academic_years", updated);
    setNewYear('');
    setSelectedYear(newYear.trim());
    refreshData();
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (!selectedYear || !newDept.trim()) return;
    const yearObj = db.academicYears[selectedYear];
    if (yearObj.departments[newDept.trim()]) {
      alert("Department already exists in this academic year!");
      return;
    }
    const updated = { ...db.academicYears };
    updated[selectedYear].departments[newDept.trim()] = { semesters: {} };
    updateDB("academic_years", updated);
    setNewDept('');
    setSelectedDept(newDept.trim());
    refreshData();
  };

  const handleAddSemester = (e) => {
    e.preventDefault();
    if (!selectedYear || !selectedDept || !newSem.trim()) return;
    const deptObj = db.academicYears[selectedYear].departments[selectedDept];
    if (deptObj.semesters[newSem.trim()]) {
      alert("Semester already exists!");
      return;
    }
    const updated = { ...db.academicYears };
    updated[selectedYear].departments[selectedDept].semesters[newSem.trim()] = {
      divisions: ["Division A"],
      subjects: []
    };
    updateDB("academic_years", updated);
    setNewSem('');
    setSelectedSem(newSem.trim());
    refreshData();
  };

  const handleAddDivision = (e) => {
    e.preventDefault();
    if (!selectedYear || !selectedDept || !selectedSem || !newDiv.trim()) return;
    const semObj = db.academicYears[selectedYear].departments[selectedDept].semesters[selectedSem];
    if (semObj.divisions.includes(newDiv.trim())) {
      alert("Division already exists!");
      return;
    }
    const updated = { ...db.academicYears };
    updated[selectedYear].departments[selectedDept].semesters[selectedSem].divisions.push(newDiv.trim());
    updateDB("academic_years", updated);
    setNewDiv('');
    refreshData();
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!selectedYear || !selectedDept || !selectedSem || !newSubj.trim()) return;
    const semObj = db.academicYears[selectedYear].departments[selectedDept].semesters[selectedSem];
    if (semObj.subjects.includes(newSubj.trim())) {
      alert("Subject already exists!");
      return;
    }
    const updated = { ...db.academicYears };
    updated[selectedYear].departments[selectedDept].semesters[selectedSem].subjects.push(newSubj.trim());
    updateDB("academic_years", updated);
    setNewSubj('');
    refreshData();
  };

  const handleDeleteYear = (year) => {
    if (!window.confirm(`Are you sure you want to delete ${year}?`)) return;
    const updated = { ...db.academicYears };
    delete updated[year];
    updateDB("academic_years", updated);
    if (selectedYear === year) {
      setSelectedYear(Object.keys(updated)[0] || '');
      setSelectedDept('');
      setSelectedSem('');
    }
    refreshData();
  };

  return (
    <div className="admin-panel-container">
      <div className="section-header">
        <h2 className="section-title">Academic Structure Management</h2>
      </div>

      <div className="grid-stats">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Academic Years</span>
            <span className="stat-value">{Object.keys(db.academicYears).length}</span>
          </div>
          <div className="stat-icon"><Award size={20} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Exams Setup</span>
            <span className="stat-value">{db.exams.length}</span>
          </div>
          <div className="stat-icon"><BookOpen size={20} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Registered Students</span>
            <span className="stat-value">3</span>
          </div>
          <div className="stat-icon"><Users size={20} /></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        
        {/* LEFT COLUMN: Manage Academic Years */}
        <div className="wizard-box" style={{ height: 'fit-content' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={18} style={{ color: 'var(--primary)' }} />
            Academic Years
          </h3>
          
          <form onSubmit={handleAddAcademicYear} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <input 
              type="text" 
              placeholder="e.g. 2026-2027" 
              value={newYear} 
              onChange={e => setNewYear(e.target.value)}
              className="form-control"
              style={{ padding: '0.5rem' }}
            />
            <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0 0.75rem' }}>
              <Plus size={16} />
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '250px', overflowY: 'auto' }}>
            {Object.keys(db.academicYears).map(year => (
              <div 
                key={year} 
                className={`option-card ${selectedYear === year ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedYear(year);
                  setSelectedDept('');
                  setSelectedSem('');
                }}
                style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'between', alignItems: 'center', margin: 0 }}
              >
                <span style={{ fontWeight: 500 }}>{year}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDeleteYear(year); }} 
                  className="btn btn-icon-only text-danger" 
                  style={{ border: 'none', background: 'none', marginLeft: 'auto', padding: 0 }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Nested Dynamic Structure Builder */}
        <div className="wizard-box">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} style={{ color: 'var(--secondary)' }} />
            Configuration details for {selectedYear || 'Select Year'}
          </h3>

          {!selectedYear ? (
            <p style={{ color: 'var(--text-muted)' }}>Please select or add an academic year on the left panel to configure its details.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* DEPARTMENTS ROW */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                  1. Departments
                </label>
                <form onSubmit={handleAddDepartment} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <input 
                    type="text" 
                    placeholder="e.g. Information Technology" 
                    value={newDept} 
                    onChange={e => setNewDept(e.target.value)}
                    className="form-control"
                    style={{ padding: '0.5rem' }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Plus size={16} /> Add Dept
                  </button>
                </form>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {Object.keys(db.academicYears[selectedYear]?.departments || {}).map(dept => (
                    <button 
                      key={dept} 
                      className={`btn btn-sm ${selectedDept === dept ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => {
                        setSelectedDept(dept);
                        setSelectedSem('');
                      }}
                    >
                      {dept}
                    </button>
                  ))}
                  {Object.keys(db.academicYears[selectedYear]?.departments || {}).length === 0 && (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No departments defined yet.</span>
                  )}
                </div>
              </div>

              {/* SEMESTERS ROW */}
              {selectedDept && (
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                    2. Semesters in {selectedDept}
                  </label>
                  <form onSubmit={handleAddSemester} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. Semester V" 
                      value={newSem} 
                      onChange={e => setNewSem(e.target.value)}
                      className="form-control"
                      style={{ padding: '0.5rem' }}
                    />
                    <button type="submit" className="btn btn-primary btn-sm">
                      <Plus size={16} /> Add Sem
                    </button>
                  </form>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {Object.keys(db.academicYears[selectedYear]?.departments[selectedDept]?.semesters || {}).map(sem => (
                      <button 
                        key={sem} 
                        className={`btn btn-sm ${selectedSem === sem ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setSelectedSem(sem)}
                      >
                        {sem}
                      </button>
                    ))}
                    {Object.keys(db.academicYears[selectedYear]?.departments[selectedDept]?.semesters || {}).length === 0 && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No semesters added.</span>
                    )}
                  </div>
                </div>
              )}

              {/* DIVISIONS & SUBJECTS ROW */}
              {selectedSem && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                  
                  {/* Division setup */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                      Divisions
                    </label>
                    <form onSubmit={handleAddDivision} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <input 
                        type="text" 
                        placeholder="e.g. Division D" 
                        value={newDiv} 
                        onChange={e => setNewDiv(e.target.value)}
                        className="form-control"
                        style={{ padding: '0.5rem' }}
                      />
                      <button type="submit" className="btn btn-primary btn-sm">
                        <Plus size={16} />
                      </button>
                    </form>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {db.academicYears[selectedYear]?.departments[selectedDept]?.semesters[selectedSem]?.divisions.map(div => (
                        <span key={div} className="tag-pill" style={{ fontSize: '0.85rem', padding: '0.25rem 0.5rem' }}>
                          {div}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Subject setup */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                      Subjects
                    </label>
                    <form onSubmit={handleAddSubject} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <input 
                        type="text" 
                        placeholder="e.g. Artificial Intelligence" 
                        value={newSubj} 
                        onChange={e => setNewSubj(e.target.value)}
                        className="form-control"
                        style={{ padding: '0.5rem' }}
                      />
                      <button type="submit" className="btn btn-primary btn-sm">
                        <Plus size={16} />
                      </button>
                    </form>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {db.academicYears[selectedYear]?.departments[selectedDept]?.semesters[selectedSem]?.subjects.map(subj => (
                        <div key={subj} className="option-card" style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', margin: 0 }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{subj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AdminPanel;
