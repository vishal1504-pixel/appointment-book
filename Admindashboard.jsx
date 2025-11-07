import React, { useState } from 'react'
import { format, isToday, parseISO } from 'date-fns'
import { getBookedSlots, getAvailableSlots, isLeaveDay } from '../utils/slotManager'

const AdminDashboard = ({ appointments, leaveDays, onAddLeave, onRemoveLeave, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [newLeaveDate, setNewLeaveDate] = useState('')

  // Get today's appointments
  const todayAppointments = appointments.filter(apt => {
    try {
      return isToday(parseISO(apt.appointmentDate))
    } catch {
      return false
    }
  })

  // Get appointments for selected date
  const selectedDateAppointments = getBookedSlots(selectedDate, appointments)
  const availableSlots = getAvailableSlots(selectedDate, appointments, leaveDays)

  const handleAddLeave = () => {
    if (newLeaveDate && !leaveDays.includes(newLeaveDate)) {
      onAddLeave(newLeaveDate)
      setNewLeaveDate('')
    }
  }

  const consultationTypeLabels = {
    general: 'General Reading',
    career: 'Career Guidance',
    love: 'Love & Relationships',
    health: 'Health & Wellness',
    financial: 'Financial Astrology',
    compatibility: 'Compatibility Reading',
    'birth-chart': 'Birth Chart Analysis',
    remedies: 'Astrological Remedies'
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>🔐 Admin Dashboard</h2>
        <button className="btn-close" onClick={onClose}>×</button>
      </div>

      <div className="admin-content">
        {/* Today's Stats */}
        <div className="admin-stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <div className="stat-value">{todayAppointments.length}</div>
            <div className="stat-label">Appointments Today</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <div className="stat-value">{appointments.length}</div>
            <div className="stat-label">Total Appointments</div>
          </div>
        </div>

        {/* Today's Appointments List */}
        <div className="admin-section">
          <h3>Today's Appointments ({todayAppointments.length})</h3>
          {todayAppointments.length === 0 ? (
            <p className="no-data">No appointments scheduled for today</p>
          ) : (
            <div className="appointment-table">
              <table>
                <thead>
                  <tr>
                    <th>Mode</th>
                    <th>Time</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {todayAppointments
                    .sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime))
                    .map(apt => (
                      <tr key={apt.id}>
                        <td>{apt.appointmentMode === 'offline' ? 'Offline' : 'Online'}</td>
                        <td>{apt.slotTime || apt.appointmentTime}</td>
                        <td>{apt.name}</td>
                        <td>{apt.email}</td>
                        <td>{apt.phone}</td>
                        <td>{consultationTypeLabels[apt.consultationType] || apt.consultationType}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Date Selector */}
        <div className="admin-section">
          <h3>View Appointments by Date</h3>
          <div className="date-selector">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
          </div>

          {isLeaveDay(selectedDate, leaveDays) ? (
            <div className="leave-notice">
              🚫 This date is marked as leave/holiday
            </div>
          ) : (
            <>
              <div className="slot-summary">
                <div className="summary-item">
                  <span className="summary-label">Available Slots:</span>
                  <span className="summary-value available">{availableSlots.length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Booked Slots:</span>
                  <span className="summary-value booked">{selectedDateAppointments.length}</span>
                </div>
              </div>

              {selectedDateAppointments.length > 0 && (
                <div className="appointment-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Mode</th>
                        <th>Slot</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedDateAppointments.map(apt => (
                        <tr key={apt.id}>
                          <td>{apt.appointmentMode === 'offline' ? 'Offline' : 'Online'}</td>
                          <td>{apt.slotTime || apt.slot?.display || apt.appointmentTime}</td>
                          <td>{apt.name}</td>
                          <td>{apt.email}</td>
                          <td>{consultationTypeLabels[apt.consultationType] || apt.consultationType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>

        {/* Leave Management */}
        <div className="admin-section">
          <h3>Manage Leave Days</h3>
          <div className="leave-management">
            <div className="add-leave">
              <input
                type="date"
                value={newLeaveDate}
                onChange={(e) => setNewLeaveDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
                placeholder="Select leave date"
                className="date-input"
              />
              <button className="btn-primary" onClick={handleAddLeave}>
                Add Leave Day
              </button>
            </div>

            {leaveDays.length > 0 && (
              <div className="leave-list">
                <h4>Upcoming Leave Days:</h4>
                <div className="leave-items">
                  {leaveDays
                    .filter(date => date >= format(new Date(), 'yyyy-MM-dd'))
                    .sort()
                    .map(date => (
                      <div key={date} className="leave-item">
                        <span>{format(parseISO(date), 'MMM d, yyyy')}</span>
                        <button
                          className="btn-delete-small"
                          onClick={() => onRemoveLeave(date)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
