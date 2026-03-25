# 🎮 GameStore

A full-stack web application for managing a game store inventory, built with .NET 10 and React. This project demonstrates modern web development practices with a clean architecture, RESTful API design, and a responsive user interface.

## ✨ Features

- **Full CRUD Operations**: Create, Read, Update, and Delete games
- **Genre Management**: Dynamic genre selection with dropdown
- **Responsive Design**: Modern UI that works on all devices
- **Real-time Updates**: Instant feedback and data synchronization
- **Error Handling**: Comprehensive error handling and user feedback
- **Clean Architecture**: Well-organized code following best practices

## 🛠️ Tech Stack

### Backend
- **Framework**: ASP.NET Core 10.0
- **Database**: SQLite with Entity Framework Core
- **ORM**: Entity Framework Core 10.0
- **Architecture**: Minimal APIs with clean separation of concerns

### Frontend
- **Framework**: React 19.2.4
- **Build Tool**: Vite 8.0
- **Styling**: Custom CSS with modern design system
- **State Management**: React hooks (useState, useEffect)

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **.NET 10.0 SDK** - [Download here](https://dotnet.microsoft.com/download/dotnet/10.0)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd GameStore
```

### 2. Backend Setup

```bash
# Navigate to the API project
cd GameStore.Api

# Restore NuGet packages
dotnet restore

# Run database migrations (creates GameStore.db)
dotnet run
```

The backend will start on `http://localhost:5066` and automatically create the database with sample data.

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to the React project
cd GameStore.React

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173`.

## 🎯 Usage

### Running Both Services

For the best development experience, run both services simultaneously:

**Terminal 1 - Backend:**
```bash
cd GameStore.Api
dotnet run
```

**Terminal 2 - Frontend:**
```bash
cd GameStore.React
npm run dev
```

### API Endpoints

The backend provides the following RESTful endpoints:

#### Games
- `GET /games` - Get all games
- `GET /games/{id}` - Get a specific game by ID
- `POST /games` - Create a new game
- `PUT /games/{id}` - Update an existing game
- `DELETE /games/{id}` - Delete a game

#### Genres
- `GET /genres` - Get all available genres

### Sample API Usage

```bash
# Get all games
curl http://localhost:5066/games

# Create a new game
curl -X POST http://localhost:5066/games \
  -H "Content-Type: application/json" \
  -d '{
    "name": "The Legend of Zelda",
    "genreId": 1,
    "price": 59.99,
    "releaseDate": "2023-05-12"
  }'
```

## 📁 Project Structure

```
GameStore/
├── GameStore.Api/                 # ASP.NET Core Web API
│   ├── Controllers/               # API Controllers (Minimal APIs)
│   ├── Data/                      # Database context and extensions
│   ├── Dtos/                      # Data Transfer Objects
│   ├── Endpoints/                 # API endpoint definitions
│   ├── Models/                    # Entity models
│   ├── Program.cs                 # Application entry point
│   ├── appsettings.json           # Configuration
│   └── GameStore.Api.csproj       # Project file
├── GameStore.React/               # React Frontend
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/            # React components
│   │   ├── services/              # API service layer
│   │   ├── App.jsx                # Main application component
│   │   ├── App.css                # Application styles
│   │   └── main.jsx               # React entry point
│   ├── package.json               # Dependencies and scripts
│   └── vite.config.js             # Vite configuration
└── GameStore.slnx                 # Solution file
```

## 🎨 UI Features

- **Modern Design**: Gradient backgrounds and clean typography
- **Responsive Layout**: Adapts to desktop, tablet, and mobile
- **Interactive Forms**: Real-time validation and feedback
- **Game Cards**: Beautiful cards with hover effects
- **Status Messages**: Success/error notifications
- **Loading States**: Smooth loading indicators

## 🔧 Development

### Backend Development

```bash
# Run with hot reload
dotnet watch run

# Run tests (if implemented)
dotnet test

# Build for production
dotnet build --configuration Release
```

### Frontend Development

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🗄️ Database

The application uses SQLite for simplicity and ease of setup. The database file `GameStore.db` is created automatically when you first run the application.

### Database Schema

- **Games**: id, name, genreId, price, releaseDate
- **Genres**: id, name

### Sample Data

The application includes sample genres and you can add games through the UI or API.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include error messages, screenshots, and steps to reproduce

## 🚀 Future Enhancements

- [ ] User authentication and authorization
- [ ] Image upload for game covers
- [ ] Advanced search and filtering
- [ ] Shopping cart functionality
- [ ] Admin dashboard
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Docker containerization

---

**Happy coding! 🎮✨**