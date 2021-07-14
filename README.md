# Amazing Bookstore
## About
A full stack e-commerce solution for a bookstore. The backend is created using **Spring Framework** with **MySQL** as the primary database. The frontend is created with **React** using the **Chakra UI** library.

<br/>

## Setup
You need the following dependencies:
  1. NodeJS
  2. MySQL 8.0 or above
  3. Java SE Development Kit 8 or above

First, clone the repository
```
https://github.com/gyataro/Amazing-Bookstore.git
```
For the backend (`./backend/`), you can import it into any Java IDE that supports Maven integration.

For the frontend (`./frontend/`), on the terminal type the following:

```
npm install
npm start
```

Alternatively, you can [import the entire project into IntelliJ IDEA](https://www.jetbrains.com/help/idea/import-project-or-module-wizard.html), which automatically manages both frontend and backend for you.

For the database, import both `./database_structure.sql` and `database_data.sql` either by [terminal](https://stackoverflow.com/questions/4546778/how-can-i-import-a-database-with-mysql-from-terminal) or by MySQL Workbench.

By default, the frontend launches at http://localhost:3000, and the backend launches at http://localhost:8080. Make sure no services are blocking the ports. Alternatively, configure the initial ports.

<br/>

## Description
- Authentication - User authentication and authorization is done by passing JSON Web Tokens (JWT) between the client and the server. The creation and validation of tokens are done via Spring Security.
- Backend - The backend is maintained with a layered architecture and a Model, View, Controller (MVC) pattern. The interface and implementation are separated via Dependency Injection (DI). The layers are as follow:
  1. Controller
  2. Service
  3. DAO
  4. Repository

  <br/>

  ![The MVC Diagram](https://i.stack.imgur.com/BfNin.jpg) [Image source](https://stackoverflow.com/questions/61303236/how-to-use-dtos-in-the-controller-service-and-repository-pattern)

  Data is passed between controller and service layers via Data Transfer Objects (DTO). The service, DAO and repository layers communicate with each other via Entity objects. The API calls to backend adopts a RESTful design. The JSON response adopts the [JSend format](https://github.com/omniti-labs/jsend).
- Frontend - Designed to be responsive on mobile, tablet and desktop.

<br/>

## API Documentation
### Authentication
Type | Link | Description
---- | ---- | ----
POST | /api/auth/login | (JSON) `{ username, password }`
POST | /api/auth/register | (JSON) `{ username, email, password, confirmPassword }`

### Book Management
Type | Link | Description
---- | ---- | ----
POST | /api/book | Create a book (FormData) `{ ISBN, title, description, author, image, language, price, stock, sales }`
GET | /api/book/:id | Get book by ID (Path Parameters) `{ id }`
PUT | /api/book/:id | Update existing book (Path Parameters) `{ id }`, (Formdata) `{ ISBN, title, description, author, image, language, price, stock, sales }`
DELETE | /api/book/:id | Delete book by ID (Path Parameters) `{ id }`
POST | /api/book/search | Get all books by criteria (Query Parameters) `{ title, page number, page size }`

### Shopping Cart Management
Type | Link | Description
---- | ---- | ----
GET | /api/cart | Get shopping cart of authenticated user
DELETE | /api/cart | Clear entire cart
POST | /api/cart/item | Add book to cart (JSON) `{ bookId, quantity }`
PUT | /api/cart/item | Update existing item in cart (JSON) `{ bookId, quantity }`
DELETE | /api/cart/item/:bookId | Remove all books with specified book ID in cart (Path Paramter) `{ bookId }`

### Order Management
Type | Link | Description
---- | ---- | ----
POST | /api/order/user | Submits new order, clears authenticated user's shopping cart
GET | /api/order/user/search | Get all orders of authenticated user, filter by book title search query (Query Parameter) `{ title }`
GET | /api/order/user/search | Get all orders of authenticated user, filter by date (Query Parameter) `{ from, to }`, represented in **ISO 8601** format
GET | /api/order/admin/search | Get orders by all users, filter by book title search query (Query Parameter) `{ title }`
GET | /api/order/admin/search | Get orders by all users, filter by date (Query Parameter) `{ from, to }`, represented in **ISO 8601** format

### Statistics
Type | Link | Description
---- | ---- | ----
GET | /api/stats/order | Get a list of books bought by the authenticated user in the date range. (Query Parameter) `{ from, to }`, represented in **ISO 8601** format
GET | /api/stats/sales | Get total number of books sold and total revenue in the data range. (Query Parameter) `{ from, to }`, represented in **ISO 8601** format
GET | /api/stats/users | Rank all users by total amount of books bought in the date range. (Query Parameter) `{ from, to }`, represented in **ISO 8601** format

### User Management
Type | Link | Description
---- | ---- | ----
GET | /api/users | Get all users.
POST | /api/users/:id | Ban an account by its user ID. (Path Parameter) `{ id }`

### Image Delivery Service
Type | Link | Description
---- | ---- | ----
GET | /image/book/:id | Get book cover image by its UUID. (Path Parameter) `{ id }`

*All API calls require `Authorization` Bearer header, except authentication

<br/>

## Screenshots
https://imgur.com/a/RjPPjHf

<br/>

## Future Improvements
- Setup Redis as a caching layer over MySQL database queries for faster access.
- Implement a load-balancing service to improve system reliability and scalability.
- Currently, book images are stored in MySQL as a Blob data object. A future improvement would be filesystem storage + store the corresponding file paths in database + multilayered cache + CDN
- Implement more features like book categories, book recommendation system, better search filters, better pagination etc.