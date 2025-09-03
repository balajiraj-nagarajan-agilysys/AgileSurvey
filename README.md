# Agile Survey Application

A comprehensive Angular survey application for participant management with skills tracking and analytics dashboard.

## 🚀 Live Demo

**GitHub Pages:** [https://balajiraj-nagarajan-agilysys.github.io/AgileSurvey/](https://balajiraj-nagarajan-agilysys.github.io/AgileSurvey/)

## ✨ Features

### 📊 **Participant Management**
- Add, edit, and delete participants
- Comprehensive participant profiles with personal and professional information
- Skills tracking with weightage scores (1-10)
- Search and filter participants by name, email, or mobile number

### 🔍 **Advanced Validation**
- **Duplicate Prevention**: Email and mobile number uniqueness validation
- **Mandatory Fields**: Name, email, and mobile number are required
- **Real-time Validation**: Form validation with user-friendly error messages
- **Data Integrity**: Comprehensive input validation and error handling

### 📈 **Analytics Dashboard**
- Total participants count
- Average skill scores across all participants
- Skill distribution analysis (Low: 1-3, Medium: 4-6, High: 7-10)
- Visual progress bars for skill analytics
- Skills summary with participant counts per skill

### 🎨 **Modern UI/UX**
- **Responsive Design**: Bootstrap 5 for mobile-first responsive layout
- **Professional Styling**: Clean, modern interface with consistent branding
- **Custom Logo**: Agile-themed SVG logo in navigation header
- **Loading States**: Visual feedback during form submissions
- **Accessibility**: ARIA labels and keyboard navigation support

### 💾 **Data Persistence**
- **Local Storage**: Client-side data persistence
- **Default Data**: 3 pre-loaded participants with realistic information
- **Data Export**: Skills and participant data ready for analysis

## 🛠️ Technical Stack

- **Framework**: Angular 20.2 (Latest) with Zoneless change detection
- **Styling**: Bootstrap 5.3 + Custom SCSS
- **Icons**: Custom SVG logo design
- **State Management**: RxJS BehaviorSubject for reactive data flow
- **Storage**: Browser localStorage API
- **Build**: Angular CLI with Server-Side Rendering (SSR) support
- **Testing**: Jasmine + Karma with comprehensive unit tests
- **Deployment**: GitHub Pages with automated CI/CD

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 20+ 
- npm 10+
- Angular CLI 20+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/balajiraj-nagarajan-agilysys/AgileSurvey.git
   cd AgileSurvey/agile-survey
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:4200
   ```

### Build for Production

```bash
npm run build:gh-pages
```

## 📁 Project Structure

```
agile-survey/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/              # Navigation header
│   │   │   └── participant-form/    # Modal form component
│   │   ├── pages/
│   │   │   ├── participants/        # Main participant management
│   │   │   └── dashboard/          # Analytics dashboard
│   │   ├── services/
│   │   │   └── participant.service.ts # Data service layer
│   │   └── models/
│   │       └── participant.model.ts   # TypeScript interfaces
│   ├── assets/
│   │   └── images/                  # Logo and images
│   └── public/
│       └── images/                  # Public assets
├── .github/
│   └── workflows/
│       └── gh-pages.yml            # GitHub Pages deployment
└── dist/                           # Build output
```

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test -- --code-coverage
```

## 🔧 Features in Detail

### Duplicate Prevention System
- **Email Validation**: Prevents multiple participants with the same email
- **Mobile Validation**: Ensures unique mobile numbers across participants
- **Smart Updates**: Allows users to update their own email/mobile without conflicts
- **Error Handling**: Clear, actionable error messages for duplicate attempts

### Skills Management
- **Dynamic Skills**: Add/remove skills dynamically in the form
- **Weightage System**: 1-10 scale for skill proficiency
- **Pre-defined Skills**: 20+ common technical skills available
- **Analytics Ready**: Skills data structured for advanced analytics

### Default Participants
The application comes with 3 comprehensive default participants:

1. **John Smith** - Senior Frontend Developer
   - Skills: Angular (8), Node.js (7), Python (6), JavaScript (8)
   
2. **Sarah Johnson** - Full Stack Developer  
   - Skills: React (9), Node.js (8), MongoDB (7), Express.js (8)
   
3. **Michael Davis** - Backend Developer
   - Skills: Java (9), Spring Boot (8), SQL Server (7), AWS (6)

## 🚀 Deployment

The application is automatically deployed to GitHub Pages via GitHub Actions on every push to the master branch.

### Manual Deployment

1. Build for production:
   ```bash
   npm run build:gh-pages
   ```

2. Deploy the `dist/agile-survey` folder to your hosting provider.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Balaji Raj Nagarajan** - [@balajiraj-nagarajan-agilysys](https://github.com/balajiraj-nagarajan-agilysys)

## 🎯 Future Enhancements

- [ ] Export participants data to CSV/Excel
- [ ] Import participants from external sources
- [ ] Advanced filtering and sorting options
- [ ] Skills recommendation system
- [ ] Team formation suggestions based on skills
- [ ] Integration with external APIs (LinkedIn, GitHub)
- [ ] Advanced analytics with charts and graphs
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Offline support with service workers

---

⭐ **Star this repository if you found it helpful!**
