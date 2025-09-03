# El Rincón del Fondo - Dynamic Website

This project is a one-page website for "El Rincón del Fondo", a creative flower shop. The original static HTML has been enhanced with a Python Flask backend to serve the page and manage product data dynamically.

## Features

- **Dynamic Product Loading**: Product information is fetched from a backend API and rendered on the page, making it easy to manage the product catalog without touching the HTML code.
- **Flask Backend**: A lightweight Python server using the Flask framework.
- **Tailwind CSS**: The page is styled using Tailwind CSS for a modern, responsive design.

## How to Run the Application

To run this website on your local machine, please follow these steps:

### Prerequisites

- Python 3.6+
- pip (Python package installer)

### 1. Clone the Repository

First, get a copy of the project on your local machine.

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

The required Python packages are listed in the `requirements.txt` file. Install them using pip:

```bash
pip install -r requirements.txt
```

This will install Flask, the web framework used for the backend.

### 3. Run the Flask Server

Once the dependencies are installed, you can start the application by running the `app.py` file:

```bash
python app.py
```

You should see an output similar to this:

```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5001
Press CTRL+C to quit
```

### 4. View the Website

Open your web browser and navigate to the following address:

[http://127.0.0.1:5001](http://127.0.0.1:5001)

You should see the "El Rincón del Fondo" website, with the product section populated dynamically from the data provided by the Flask backend.

## Project Structure

- `app.py`: The main Flask application file. It serves the HTML page and the product API.
- `requirements.txt`: Lists the Python dependencies for the project.
- `templates/`: This directory contains the HTML templates.
  - `index.html`: The main HTML file for the website.
- `CNAME`: Custom domain configuration file for GitHub Pages.
- `README.md`: This file.