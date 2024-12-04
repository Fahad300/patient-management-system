# Healthcare Patient Management System

A modern, full-stack patient management system built with Next.js 13, TypeScript, and Prisma. This system helps healthcare providers manage patients, appointments, billing, and more with an intuitive interface.

![Dashboard Preview](public/dashboard-preview.png)

## 🌟 Features

### Patient Management
- Complete patient profiles with medical history
- Document management
- Emergency contact information
- Allergy and medication tracking
- Patient search and filtering

### Appointment System
- Real-time appointment scheduling
- Calendar integration
- Appointment reminders
- Queue management
- Telemedicine support

### Billing & Payments
- Invoice generation
- Insurance management
- Payment tracking
- Financial reporting
- Multiple payment methods

### Clinical Features
- Electronic Health Records (EHR)
- Lab results management
- Prescription management
- Treatment plans
- Medical history tracking

### Administrative Tools
- Role-based access control
- Staff management
- Department organization
- Audit logging
- System settings

### Analytics & Reporting
- Patient statistics
- Revenue analytics
- Appointment analytics
- Custom report generation
- Data visualization

### Security & Compliance
- HIPAA compliance ready
- Data encryption
- Secure authentication
- Activity logging
- Role-based permissions

## 🛠️ Technology Stack

### Frontend
- **Next.js 13** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Ant Design** - UI component library
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **SWR** - Data fetching and caching

### Backend
- **Next.js API Routes** - Backend API endpoints
- **Prisma** - Type-safe database ORM
- **SQLite** - Database (configurable for PostgreSQL/MySQL)
- **NextAuth.js** - Authentication

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Jest** - Testing framework

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/healthcare-pms.git
```

2. Install dependencies:

```bash
cd healthcare-pms
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

5. Seed the database:

```bash
npm run db:seed
```

6. Start the development server:

```bash
npm run dev
```

## 🚀 Deployment

The application can be deployed to various platforms:

- Vercel (recommended)
- AWS
- Google Cloud
- Docker containers

Detailed deployment instructions for each platform are available in the [deployment guide](docs/deployment.md).

## 🔒 Environment Variables

Required environment variables:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

Open Source free for everyone.

## 👥 Authors

- Fahad Mushtaq - Initial work - [Fahad300](https://github.com/Fahad300)

## 🙏 Acknowledgments

- Ant Design team for the amazing UI components
- Next.js team for the awesome framework
- All contributors who have helped this project grow

## 📞 Support

For support, email fahadmushtaq300@gmail.com

---

Made with ❤️ by Fahad Mushtaq(https://github.com/Fahad300/)