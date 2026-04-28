# Django eCommerce Store with Flowbite and Tailwind CSS

A modern eCommerce platform built with Django, Tailwind CSS, and Flowbite components.

## 📋 Project Structure

```
django-ecommerce/
├── config/                 # Django project configuration
│   ├── settings.py        # Project settings
│   ├── urls.py            # URL routing
│   ├── wsgi.py
│   └── asgi.py
├── store/                 # Django app for store functionality
│   ├── models.py
│   ├── views.py
│   ├── admin.py
│   └── apps.py
├── templates/             # HTML templates
│   ├── _base.html         # Base template with Flowbite navbar & footer
│   ├── index.html         # Homepage with featured products
│   └── about.html         # About page
├── static/
│   └── src/
│       ├── input.css      # Tailwind CSS source
│       └── output.css     # Compiled CSS (generated)
├── venv/                  # Python virtual environment
├── manage.py              # Django management script
├── package.json           # Node.js dependencies
├── tailwind.config.js     # Tailwind CSS configuration
└── db.sqlite3            # SQLite database
```

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- pip (Python package manager)
- npm (Node.js package manager)

### Installation

1. **Activate Virtual Environment**

   ```bash
   cd django-ecommerce
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Python Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Install Node.js Dependencies** (already done, but if needed)
   ```bash
   npm install
   ```

### Running the Project

**Terminal 1: Watch Tailwind CSS changes**

```bash
npm run watch
```

**Terminal 2: Run Django development server**

```bash
source venv/bin/activate
python manage.py runserver
```

Visit `http://localhost:8000` in your browser to see the application.

## 📦 Installed Packages

### Python

- **Django 6.0.4** - Web framework
- **django-compressor 4.6.0** - Static file compression for CSS/JS
- **sqlparse** - SQL parsing library
- **asgiref** - ASGI utilities

### Node.js

- **tailwindcss@4.2.4** - CSS framework
- **@tailwindcss/cli@4.2.4** - Tailwind CLI
- **flowbite@4.0.1** - UI component library

## 🎨 Features Included

### Flowbite Components Used

- **Navigation Navbar** - Responsive navigation with mobile menu toggle
- **Hero Section** - Landing section with call-to-action buttons
- **Product Cards** - Reusable product display cards with hover effects
- **Footer** - Multi-column footer with links and information
- **Buttons** - Various button styles with hover effects
- **Forms** - Form inputs with Tailwind styling
- **Icons** - SVG icons embedded for visual enhancement

### Tailwind CSS

- **Responsive Design** - Mobile-first approach
- **Dark Mode** - Built-in dark mode support
- **Utility-First CSS** - Highly customizable styling
- **Custom Configuration** - Extended with primary color and Flowbite plugin

## 📝 Available Pages

1. **Home Page** (`/`) - Homepage with featured products
2. **About Page** (`/about/`) - Information about the store
3. **Admin Panel** (`/admin/`) - Django admin interface

## 🏗️ Building for Production

### Build CSS

```bash
npm run build
```

### Collect Static Files

```bash
source venv/bin/activate
python manage.py collectstatic
```

### Create requirements.txt

```bash
pip freeze > requirements.txt
```

## 🔧 Customization

### Adding New Pages

1. **Create View in `store/views.py`**

   ```python
   def new_page(request):
       return render(request, 'new_page.html')
   ```

2. **Add URL Route in `config/urls.py`**

   ```python
   path('new-page/', new_page, name='new_page'),
   ```

3. **Create Template in `templates/new_page.html`**
   ```html
   {% extends "_base.html" %} {% block content %}
   <!-- Your content here -->
   {% endblock %}
   ```

### Customizing Colors

Edit `tailwind.config.js` to modify the color scheme:

```javascript
theme: {
    extend: {
        colors: {
            primary: "#your-color-here",
        },
    },
},
```

### Using Flowbite Components

Visit [Flowbite Documentation](https://flowbite.com/docs/components/) to find components and copy their HTML code into your templates.

## 📚 Useful Commands

```bash
# Create a new Django app
python manage.py startapp yourapp

# Create database migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser for admin panel
python manage.py createsuperuser

# Run tests
python manage.py test

# Access Django shell
python manage.py shell
```

## 🌐 Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Flowbite Documentation](https://flowbite.com/docs/)
- [Flowbite Django Setup Guide](https://flowbite.com/docs/getting-started/django/)

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips

1. Always run `npm run watch` while developing to automatically compile CSS changes
2. Use the Django admin panel to manage content and users
3. Customize templates in the `templates/` folder
4. Add custom CSS classes to `static/src/input.css`
5. Use Flowbite components for consistent UI across pages

---

Happy coding! 🎉
