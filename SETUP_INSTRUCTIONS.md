# EcoFinds - Complete Setup Instructions

## Overview
EcoFinds is a full-stack e-commerce application built with React (frontend) and FastAPI (backend). This guide will help you get the project running locally.

## Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL database

## Backend Setup (FastAPI)

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up your database:**
   - Create a MySQL database named `ecofinds`
   - Update the database connection in `app/database.py` if needed

5. **Start the FastAPI server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Add initial categories (in a new terminal):**
   ```bash
   python setup_categories.py
   ```

## Frontend Setup (React)

1. **Navigate to the root directory:**
   ```bash
   cd ..  # If you're in the server directory
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## Features Implemented

### ✅ Authentication
- User registration and login
- JWT token-based authentication
- Protected routes
- User profile management

### ✅ Product Management
- Browse all products with search and category filtering
- View individual product details
- Add new products (authenticated users)
- Edit/delete own products
- Category-based organization

### ✅ Shopping Cart
- Add products to cart
- View cart contents
- Adjust quantities
- Remove items
- Checkout functionality

### ✅ Order Management
- Place orders from cart
- View purchase history
- Order details with items

### ✅ User Interface
- Responsive design with Tailwind CSS
- Loading states
- Error handling
- Modern, clean interface

## API Endpoints

### Users (`/users`)
- `POST /users/register` - User registration
- `POST /users/login` - User login
- `GET /users/me` - Get current user
- `PUT /users/me` - Update user profile

### Products (`/products`)
- `GET /products/` - List all products
- `GET /products/{id}` - Get specific product
- `POST /products/` - Create product (authenticated)
- `PUT /products/{id}` - Update product (owner only)
- `DELETE /products/{id}` - Delete product (owner only)

### Cart (`/cart`)
- `GET /cart/` - Get user's cart
- `POST /cart/add/{product_id}` - Add to cart
- `POST /cart/remove/{product_id}` - Remove from cart

### Orders (`/orders`)
- `POST /orders/checkout` - Create order
- `GET /orders/my` - Get user's orders

### Categories (`/categories`)
- `GET /categories/` - List categories
- `POST /categories/` - Create category

## Testing the Application

1. **Register a new account:**
   - Go to `/auth`
   - Click "Don't have an account? Sign up"
   - Fill in the registration form

2. **Add a product:**
   - Go to `/add-product`
   - Fill in product details
   - Select a category
   - Submit the form

3. **Browse products:**
   - Go to `/` (home page)
   - Use search and category filters
   - Click on products to view details

4. **Add to cart:**
   - Click "Add to Cart" on any product
   - Go to `/cart` to view your cart
   - Adjust quantities or remove items

5. **Checkout:**
   - In the cart page, click "Checkout"
   - Confirm the order
   - View your order history at `/previous-purchases`

## Troubleshooting

### Common Issues

1. **CORS errors:**
   - Make sure the FastAPI server is running on port 8000
   - Check that CORS is properly configured in `app/main.py`

2. **Database connection errors:**
   - Verify MySQL is running
   - Check database credentials in `app/database.py`
   - Ensure the database exists

3. **Authentication issues:**
   - Clear browser localStorage
   - Check that JWT tokens are being stored properly

4. **Categories not showing:**
   - Run the `setup_categories.py` script
   - Check that the FastAPI server is running when you run the script

### Development Tips

- The backend runs on `http://localhost:8000`
- The frontend runs on `http://localhost:5173`
- API documentation is available at `http://localhost:8000/docs`
- Check browser console for frontend errors
- Check terminal for backend errors

## Project Structure

```
ecofinds/
├── server/                 # FastAPI backend
│   ├── app/
│   │   ├── routers/       # API route handlers
│   │   ├── models.py      # Database models
│   │   ├── schemas.py     # Pydantic schemas
│   │   └── main.py        # FastAPI app
│   └── requirements.txt
├── src/                   # React frontend
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom hooks
│   └── App.jsx           # Main app component
└── setup_categories.py   # Database setup script
```

## Next Steps

The application is now fully functional! You can:
- Add more features like product images, reviews, etc.
- Implement payment processing
- Add admin functionality
- Deploy to production
- Add more comprehensive testing
