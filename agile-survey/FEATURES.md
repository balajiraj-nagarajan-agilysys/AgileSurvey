# Agile Survey - Angular Application

A complete Angular application for managing training participants and their technical skills with comprehensive analytics and dashboard features.

## 🚀 Features

### Header & Navigation
- Professional navbar with company logo (round blue circle with "A")
- Navigation menu with Participants and Dashboard links
- Responsive design with Bootstrap integration

### Participants Management
- **Participants Table**: Display all participants with Name, Email, WhatsApp, LinkedIn, GitHub, Created date, and Actions
- **Search Functionality**: Filter participants by name or email with real-time search
- **Add Participant**: Modal form for adding new participants
- **Edit Participant**: Modal form for editing existing participant details
- **Delete Participant**: Remove participants with confirmation dialog
- **Skills Management**: 
  - Preloaded with 10 popular technical skills (Angular, React, Node.js, .NET Core, Java, Python, SQL, DevOps, Cloud, Machine Learning)
  - Dynamic add/remove skills functionality
  - Skill weightage input (0-10 scale)

### Dashboard & Analytics
- **Statistics Cards**: 
  - Total Participants count
  - Average Python skill level
  - Average Angular skill level
  - Average JavaScript skill level
- **Average Skills Overview**: Horizontal bar chart showing average skill levels across all participants
- **Skill Level Distribution**: 
  - Dropdown to select any skill
  - Distribution breakdown: Low (1-3), Medium (4-6), High (7-10) with color coding
- **Skill Summary Grid**: Cards showing average score and total participants for each skill

### Data Persistence
- **localStorage Integration**: All data persists across browser sessions
- **Service Layer**: ParticipantService handles all CRUD operations
- **Reactive Data**: Observable-based data flow with automatic UI updates

## 🛠️ Technology Stack

- **Angular 20.2** (Latest version with Zoneless architecture)
- **Bootstrap 5** for responsive UI components
- **Font Awesome 6** for icons
- **SCSS** for styling
- **TypeScript** for type safety
- **RxJS** for reactive programming

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm (Node Package Manager)
- Angular CLI (`npm install -g @angular/cli`)

## 🔧 Installation & Setup

1. **Navigate to the project directory**:
   ```bash
   cd c:\AI-Training\Survey\agile-survey
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   ng serve
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:4200 (or the port shown in terminal)
   ```

## 📱 Usage

### Adding Participants
1. Navigate to the Participants page
2. Click "Add Participant" button
3. Fill in participant details and skills
4. Click "Save"

### Viewing Analytics
1. Navigate to Dashboard
2. View statistics and skill analytics
3. Select skills for distribution analysis

All data is automatically saved to localStorage and persists across sessions.

## ✅ Completed Features

✅ Angular CLI project generated with routing and SCSS  
✅ Bootstrap installed and configured  
✅ Chart library integration  
✅ Navbar with Agile logo and company name  
✅ Menu items: Participants, Dashboard  
✅ Participants table with all required columns  
✅ Search functionality  
✅ Add Participant form with modal  
✅ Skills section with 10 preloaded skills  
✅ Dynamic Add/Remove skills  
✅ Edit and Delete functionality  
✅ Dashboard with statistics cards  
✅ Average skills bar chart  
✅ Skill level distribution  
✅ Skill summary cards  
✅ localStorage data persistence  
✅ Service abstraction implemented  
✅ Responsive design  
✅ Test specs generated  
✅ Professional UI matching requirements  

---

**Built with Angular 20.2 + Bootstrap 5**
