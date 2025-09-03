from flask import Flask, jsonify, render_template, request
import re

app = Flask(__name__)

# Data that will be served from the API
# In a real application, this would come from a database or another service.
PRODUCTS = [
    {
        "id": 1,
        "name": "Ramo de Rosas Clásico",
        "description": "12 rosas en fomi con detalles en perlas",
        "price": "24.99",
        "image_url": "https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
        "tag": "¡Nuevo!"
    },
    {
        "id": 2,
        "name": "Girasoles Radiantes",
        "description": "Set de 5 girasoles con tallos flexibles",
        "price": "19.99",
        "image_url": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "tag": None
    },
    {
        "id": 3,
        "name": "Tulipanes Elegantes",
        "description": "Composición de 7 tulipanes en maceta decorativa",
        "price": "29.99",
        "image_url": "https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        "tag": "Más vendido"
    },
    {
        "id": 4,
        "name": "Margaritas Alegres",
        "description": "Ramo de 15 margaritas multicolores",
        "price": "22.99",
        "image_url": "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "tag": None
    }
]

@app.route('/')
def index():
    """Serve the main HTML file."""
    return render_template('index.html')

@app.route('/api/products')
def get_products():
    """Provide product data as a JSON API."""
    return jsonify(PRODUCTS)

@app.route('/subscribe', methods=['POST'])
def subscribe():
    """Handle newsletter subscription requests."""
    email = request.form.get('email')
    if not email:
        return jsonify({'status': 'error', 'message': 'El correo electrónico es obligatorio.'}), 400

    # Simple regex for email validation
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({'status': 'error', 'message': 'Por favor, introduce un correo electrónico válido.'}), 400

    try:
        with open('subscribers.txt', 'a') as f:
            f.write(email + '\n')
        return jsonify({'status': 'success', 'message': '¡Gracias por suscribirte!'})
    except IOError:
        return jsonify({'status': 'error', 'message': 'No se pudo guardar el correo. Inténtalo de nuevo más tarde.'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
