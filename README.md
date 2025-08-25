# HowBooks - Online Bookstore

A full-stack web application for an online bookstore built with React (TypeScript) frontend and Java backend using Jakarta EE technologies.

![Book Store Banner](client/src/assets/images/site/bookstore-logo.png)

## 🚀 Features

### Customer Features
- **Browse Books**: View books by categories (Classics, Fantasy, Mystery, Romance)
- **Search Functionality**: Search books by title
- **Shopping Cart**: Add/remove books, update quantities
- **Checkout System**: Complete order with customer information and payment details
- **Order Confirmation**: View order details and confirmation number
- **Responsive Design**: Mobile-friendly interface

### Book Management
- **Category Navigation**: Browse books by different genres
- **Book Details**: View title, author, price, and availability
- **Featured Books**: Highlight special books on the homepage
- **Read Now**: Access to public books for immediate reading

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** with TypeScript
- **React Router DOM** for navigation
- **Axios** for HTTP requests
- **FontAwesome** for icons
- **CSS3** with custom styling

### Backend
- **Java 17** with Jakarta EE
- **Jersey** for REST API
- **MySQL** database
- **JDBC** for database connectivity
- **Jackson** for JSON processing
- **Gradle** for build management

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts (Cart, Category, Order)
│   │   ├── reducers/       # State management reducers
│   │   ├── assets/         # Images, CSS files
│   │   └── types.tsx       # TypeScript interfaces
│   └── package.json
├── server/                 # Java backend
│   ├── src/main/java/
│   │   ├── api/           # REST API endpoints
│   │   ├── business/      # Business logic (DAO, Models)
│   │   └── com/           # Configuration
│   ├── src/main/resources/
│   │   ├── schema.sql     # Database schema
│   │   └── data.sql       # Initial data
│   └── build.gradle
├── gradle/                # Gradle wrapper
└── README.md
```

## 🗄️ Database Schema

The application uses MySQL database with the following main tables:
- `customer` - Customer information
- `category` - Book categories
- `book` - Book inventory
- `customer_order` - Order information
- `customer_order_line_item` - Order line items

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **Java 17**
- **MySQL** database
- **Gradle** (included via wrapper)

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Configure database connection in your application server (e.g., Tomcat)

3. Build the application:
   ```bash
   ./gradlew build
   ```

4. Deploy the WAR file to your Jakarta EE application server

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 🌐 API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID
- `GET /api/categories/name/{name}` - Get category by name

### Books
- `GET /api/books/{id}` - Get book by ID
- `GET /api/categories/{id}/books` - Get books by category ID
- `GET /api/categories/name/{name}/books` - Get books by category name
- `GET /api/categories/{id}/suggested-books` - Get suggested books

### Orders
- `POST /api/orders` - Place a new order

## 🎨 Components Overview

### Main Components
- **App.tsx** - Main application component with routing
- **AppHeader.tsx** - Navigation header with search and cart
- **AppFooter.tsx** - Application footer
- **Home.tsx** - Homepage with featured books
- **CategoryBookList.tsx** - Display books by category
- **Cart.tsx** - Shopping cart functionality
- **Checkout.tsx** - Order checkout form
- **ConfirmationPage.tsx** - Order confirmation

### Context Providers
- **CartContext** - Shopping cart state management
- **CategoryContext** - Category data management
- **OrderDetailsContext** - Order processing state

## 🔒 Security Features
- Input validation for forms
- Credit card number validation
- Email and phone number validation
- SQL injection prevention with prepared statements

## 🎯 Future Enhancements
- User authentication and registration
- Advanced search filters
- Book reviews and ratings
- Inventory management admin panel
- Payment gateway integration
- Order history and tracking

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author
Developed as part of a web development course project.

## 🙏 Acknowledgments
- React team for the amazing framework
- Jakarta EE community for the robust backend technologies
- FontAwesome for the beautiful icons
