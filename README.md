# WebApp PHP – Game Distribution Platform

Individual Activity - Sessions and File Inclusions
- Jazper Angelo M. Bonagua

This project is a PHP-based web application inspired by platforms like **Steam** and **Itch.io**, built using **Bootstrap**, **jQuery**, and **MySQL**.  
It allows users to browse and purchase games.

---

## How to Run

1. Clone or download this repository.  
2. Make sure you have **XAMPP** (or any PHP + MySQL environment) installed.  
3. Place the project folder inside your `htdocs` directory.  
4. Start **Apache** and **MySQL** from XAMPP Control Panel.  
5. Import a database file into phpMyAdmin:
   - `db_template.sql` → if you want a **clean** database (no preexisting products).  
   - `db_existing.sql` → if you want to start with **preloaded products and data**.
6. Open a terminal inside the project root and install dependencies:
   npm install
7. Access the project through your browser:
8. 
   ```
   http://localhost/webapp-php-indiv/
   ```

---

## Default Page

When you visit the main site or `index.php`, you’ll automatically be redirected to the **Home Page**:

```
http://localhost/webapp-php-indiv/html/pages/home.php
```

From here, users can browse available games, log in, or sign up.

---

## Admin Page (Work in Progress)

Currently, there is **only one admin page** implemented:
**Add Products**

```
http://localhost/webapp-php-indiv/html/admin/add_product.php
```

### Functionality:

* Allows administrators (available to everyone to access for now) to add new games/products to the catalog.
* Supports adding:

  * **Product name**
  * **Slug**
  * **Description**
  * **Price**
  * **Genres** (comma-separated for multiple)
  * **Images** (requires at least one)
* **Important Note:**

  * When you upload product images, **only the file paths** are stored in the database.
  * The actual image files are uploaded and saved to:

    ```
    /public/prod_img/
    ```
  * Make sure this directory exists and is writable.

>  Images for preexisting products (from `db_existing.sql`) are already included in the repository.

---

## Database Information

* Database files are located in the root folder:

  * `db_template.sql` → clean structure (for new setup)
  * `db_existing.sql` → with preloaded product and genre data

* Images are **not stored in the database**, only their **file paths** (for performance and scalability).

---

## Technologies Used

* **PHP 8+**
* **MySQL 8+**
* **Bootstrap 5**
* **jQuery**
* **AJAX**
* **HTML5 / CSS3**
* **XAMPP (for local hosting)**

---

## Status

This project is still under **active development**, with the following features planned or in progress:

* Admin User Role/Functionality
* Light/Dark Mode Feature
* Improved Frontend & UI/UX Design
* Website Rebranding & Creator About Page Section

---

## Author

Developed by **Jazper Bonagua**
For academic and learning purposes.
