
A beautiful, modern web application for booking astrology consultations with personalized birth details and consultation types.

## Features

- ✨ **Beautiful Modern UI** - Gradient design with smooth animations
- 📅 **Slot-Based Booking System** - 5 time slots per day (9 AM - 2 PM), each 1 hour duration
- 🔮 **Multiple Consultation Types** - Choose from various astrology services:
  - General Reading
  - Career Guidance
  - Love & Relationships
  - Health & Wellness
  - Financial Astrology
  - Compatibility Reading
  - Birth Chart Analysis
  - Astrological Remedies
- 🎂 **Birth Details Collection** - Date, time, and place of birth for accurate chart analysis
- 📋 **Appointment Management** - View and delete booked appointments
- 📧 **Email Notifications** - Automated emails sent to customers and admin on booking
- 🔐 **Admin Dashboard** - View today's appointments count, manage leave days, and view all bookings
- 🚫 **Leave Management** - Automatically block dates for holidays/leaves
- ✅ **Form Validation** - Comprehensive input validation
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
appointment/
├── src/
│   ├── components/
│   │   ├── AppointmentForm.jsx    # Booking form component
│   │   ├── AppointmentList.jsx     # Appointment display component
│   │   ├── AdminDashboard.jsx     # Admin dashboard component
│   │   ├── PaymentModal.jsx       # Payment gateway selection modal
│   │   └── SlotSelector.jsx        # Time slot selector component
│   ├── utils/
│   │   ├── slotManager.js          # Slot management utilities
│   │   ├── paymentService.js       # Payment gateway integration
│   │   └── emailService.js         # Email notification service
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App styles
│   ├── index.css                   # Global styles
│   └── main.jsx                    # Entry point
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
└── README.md                       # This file
```

## Usage

### For Customers

1. Click "Book New Appointment" to open the booking form
2. Fill in your personal information (name, email, phone)
3. Provide your birth details (date, time, place) for accurate astrology readings
4. Select your preferred consultation type
5. Choose your preferred appointment date
6. Select an available time slot (5 slots per day)
7. Optionally add any specific questions or areas you'd like to focus on
8. Click "Book Appointment" to confirm
9. Confirmation email will be sent automatically

Your appointments will be displayed below the form, and you can delete them if needed.

### For Admins

1. Click "🔐 Admin Dashboard" button in the header
2. View today's appointment count and total appointments
3. See today's appointments in a detailed table
4. View appointments for any date
5. Manage leave days/holidays (these dates will be automatically blocked for booking)
6. View slot availability for any date

## ⚙️ Configuration

### Quick Setup

1. **Copy the example config file:**
   ```bash
   cp src/config/config.example.js src/config/config.js
   ```

2. **Follow the detailed setup guide:**
   - See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for step-by-step instructions
   - Configure EmailJS for email notifications

3. **Update `src/config/config.js` with your credentials:**
   - EmailJS Public Key, Service ID, and Template IDs
   - Admin email address

### Configuration Details

- **Slots Per Day**: 5 slots (9 AM - 2 PM, 1 hour each)
- **Time Slots**: 9-10, 10-11, 11-12, 12-13, 13-14

For complete setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **date-fns** - Date formatting utilities
- **EmailJS** - Email notification service
- **CSS3** - Modern styling with gradients and animations

## License

This project is open source and available for personal use.
