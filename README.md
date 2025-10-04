# Hit Hundred - Nutrition Tracking App

A modern, beautiful nutrition tracking web application that helps users track their daily nutrition intake and achieve 100% of their Recommended Dietary Allowance (RDA) targets.

![Hit Hundred App](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### Core Functionality

- **Real-time Food Search**: Comprehensive food database with instant search and filtering
- **Meal Organization**: Categorize foods by Breakfast 🍳, Lunch 🍱, Dinner 🍽️, and Snacks 🍪
- **Progress Tracking**: Visual progress bars showing how close you are to 100% RDA targets
- **Profile Management**: Choose between Active Male Adult and Active Female Adult RDA profiles
- **Data Persistence**: All data stored locally using localStorage
- **Export Functionality**: Download your nutrition data as JSON

### User Experience

- **Beautiful UI**: Modern design with gradient backgrounds and smooth animations
- **Mobile-First**: Responsive design that works perfectly on all devices
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Favorites System**: Save frequently used foods for quick access
- **Inline Editing**: Edit quantities directly in the food list
- **Welcome Tutorial**: Interactive onboarding for new users

### Nutritional Tracking

- **Comprehensive Database**: 30+ foods across 8 categories
- **Detailed Nutrition**: Tracks 15+ nutrients including macros, minerals, vitamins, and essential fats
- **Visual Progress**: Color-coded progress bars and percentage indicators
- **RDA Compliance**: Based on official Recommended Dietary Allowances

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hit_hundred
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

```bash
npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # App header with navigation
│   ├── HeroSection.jsx # Landing section
│   ├── AddFoodForm.jsx # Food search and input form
│   ├── FoodList.jsx    # Daily food log display
│   ├── ProgressGrid.jsx # Nutrition progress tracking
│   ├── ProfileSelector.jsx # RDA profile selection
│   └── WelcomeModal.jsx # Onboarding tutorial
├── data/               # Data and utilities
│   ├── foodDatabase.js # Comprehensive food nutrition data
│   └── rdaProfiles.js  # RDA profiles and calculations
├── pages/              # Next.js pages
│   └── index.js        # Main application page
└── styles/
    └── globals.css     # Global styles and animations
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue to Purple gradients
- **Success**: Green tones for completed goals
- **Warning**: Yellow/Orange for progress
- **Error**: Red for incomplete targets

### Typography

- **Font**: Geist Sans (primary), Geist Mono (code)
- **Weights**: Regular, Medium, Semibold, Bold

### Components

- **Cards**: Rounded corners with subtle shadows and backdrop blur
- **Buttons**: Gradient backgrounds with hover effects and ripple animations
- **Progress Bars**: Animated with color-coded status indicators
- **Forms**: Clean inputs with focus states and validation

## 📊 Food Database

The app includes a comprehensive food database with nutritional values per gram:

### Categories

- **Dairy & Eggs**: Milk, eggs, yogurt, cheese
- **Protein & Meat**: Chicken, salmon, beef, tofu
- **Grains & Cereals**: Rice, oats, bread, quinoa
- **Legumes & Beans**: Black beans, lentils, chickpeas
- **Vegetables**: Spinach, broccoli, carrots, sweet potato
- **Fruits**: Banana, apple, blueberries, avocado
- **Nuts & Seeds**: Almonds, walnuts, chia seeds
- **Beverages**: Water, green tea
- **Snacks & Others**: Dark chocolate, olive oil

### Nutrients Tracked

- **Macros**: Calories, Protein, Carbs, Fat, Fiber
- **Minerals**: Calcium, Iron, Potassium, Zinc
- **Vitamins**: A, C, D, E
- **Essential Fats**: Omega-3

## 🎯 RDA Profiles

### Active Male Adult

- **Calories**: 2,500 kcal
- **Protein**: 65g
- **Iron**: 8mg
- **Calcium**: 1,000mg

### Active Female Adult

- **Calories**: 2,000 kcal
- **Protein**: 50g
- **Iron**: 18mg (higher due to menstruation)
- **Calcium**: 1,000mg

## 💾 Data Storage

All data is stored locally using localStorage:

- `hh-user-profile`: Selected RDA profile
- `hh-favorites`: Favorite foods
- `hh-day-log-YYYY-MM-DD`: Daily food logs
- `hh-welcome-seen`: Tutorial completion status

## 🎨 Custom Animations

The app includes several custom CSS animations:

- **fadeIn**: Smooth entrance animations
- **bounceSubtle**: Gentle hover effects
- **ripple**: Button press feedback
- **pulse**: Loading and attention states
- **slideIn**: Side panel animations

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Mobile Features

- Touch-friendly interface
- Responsive grid layouts
- Swipe gestures
- Optimized input fields
- Mobile-first design approach

## 🚀 Deployment

The app can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Heroku**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for the beautiful icons
- **USDA** for nutritional data references

---

**Hit Hundred** - Making nutrition tracking beautiful, simple, and effective! 🎯
