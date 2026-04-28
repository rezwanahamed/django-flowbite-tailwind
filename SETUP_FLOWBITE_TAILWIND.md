# How to Setup Tailwind CSS and Flowbite in Django

## Introduction

This guide walks you through setting up **Tailwind CSS** and **Flowbite** components in a Django project. Flowbite is a library of interactive UI components built on top of Tailwind CSS, making it easy to create beautiful, modern web interfaces.

## Prerequisites

Before starting, ensure you have the following installed:

- **Python 3.10+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **pip** - Python package manager (comes with Python)
- **npm** - Node.js package manager (comes with Node.js)

Verify installations:

```bash
python --version
pip --version
node --version
npm --version
```

## Step 1: Create Django Project

### Create Project Directory

```bash
mkdir django-ecommerce
cd django-ecommerce
```

### Create Python Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Create Django Project and App

```bash
django-admin startproject config .
django-admin startapp store
```

Your structure should look like:

```
django-ecommerce/
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── store/
│   ├── models.py
│   ├── views.py
│   ├── apps.py
│   └── admin.py
├── manage.py
└── venv/
```

## Step 2: Install Python Packages

### Install Required Packages

```bash
pip install Django django-compressor
```

### Create requirements.txt

```bash
pip freeze > requirements.txt
```

## Step 3: Configure Django Settings

### Update `config/settings.py`

#### Add Apps to INSTALLED_APPS

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'compressor',  # Add this
    'store',       # Add this
]
```

#### Configure Templates Directory

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # Add this line
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

#### Add Compressor Configuration

```python
# Static files configuration
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Django-Compressor Configuration
COMPRESS_ROOT = BASE_DIR / 'static'
COMPRESS_ENABLED = True

STATICFILES_FINDERS = (
    'compressor.finders.CompressorFinder',
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)
```

## Step 4: Create Project Directory Structure

### Create Necessary Folders

```bash
mkdir templates
mkdir -p static/src
```

### Create input.css

Create `static/src/input.css`:

```css
/* static/src/input.css */

/* Import Tailwind CSS */
@import "tailwindcss";

/* Import Flowbite themes */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");
@import "flowbite/src/themes/default";

/* Import Flowbite plugin */
@plugin "flowbite/plugin";

/* Configure source files for Flowbite */
@source "../../node_modules/flowbite";
```

## Step 5: Initialize Node.js Project

### Initialize npm

```bash
npm init -y
```

### Install Node Dependencies

```bash
npm install tailwindcss @tailwindcss/cli flowbite --save-dev
```

## Step 6: Configure Tailwind CSS

### Create `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.{html,js}",
    "./store/templates/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00D084",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
```

## Step 7: Update package.json Scripts

Add build scripts to `package.json`:

```json
{
  "name": "django-ecommerce",
  "version": "1.0.0",
  "scripts": {
    "build": "tailwindcss -i ./static/src/input.css -o ./static/src/output.css",
    "watch": "tailwindcss -i ./static/src/input.css -o ./static/src/output.css --watch"
  },
  "devDependencies": {
    "@tailwindcss/cli": "^4.2.4",
    "flowbite": "^4.0.1",
    "tailwindcss": "^4.2.4"
  }
}
```

## Step 8: Build CSS

### Generate output.css

```bash
npm run build
```

This creates `static/src/output.css` with compiled Tailwind CSS and Flowbite styles.

## Step 9: Create Views

### Update `store/views.py`

```python
from django.shortcuts import render

def index(request):
    """Homepage view"""
    return render(request, 'index.html')

def about(request):
    """About page view"""
    return render(request, 'about.html')
```

## Step 10: Configure URLs

### Update `config/urls.py`

```python
from django.contrib import admin
from django.urls import path
from store.views import index, about

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('about/', about, name='about'),
]
```

## Step 11: Create Base Template

### Create `templates/_base.html`

```html
{% load compress %} {% load static %}

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>
      {% block title %}Django + Tailwind CSS + Flowbite{% endblock %}
    </title>

    {% compress css %}
    <link rel="stylesheet" href="{% static 'src/output.css' %}" />
    {% endcompress %}
  </head>

  <body class="bg-gray-50 dark:bg-gray-900">
    <!-- Navigation -->
    <nav
      class="bg-white border-b border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 dark:border-gray-700"
    >
      <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
      >
        <a
          href="{% url 'index' %}"
          class="flex items-center font-semibold text-2xl"
        >
          My Store
        </a>
        <div class="flex items-center lg:order-2">
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul
            class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
          >
            <li>
              <a
                href="{% url 'index' %}"
                class="block py-2 pr-4 pl-3 text-gray-700 lg:hover:text-green-700"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="{% url 'about' %}"
                class="block py-2 pr-4 pl-3 text-gray-700 lg:hover:text-green-700"
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="px-4 mx-auto max-w-screen-xl py-8">
      {% block content %} {% endblock %}
    </main>

    <!-- Footer -->
    <footer class="p-4 bg-white sm:p-6 dark:bg-gray-800 mt-8">
      <div class="mx-auto max-w-screen-xl">
        <p class="text-center text-gray-500 dark:text-gray-400">
          © 2024 My Store. All Rights Reserved.
        </p>
      </div>
    </footer>

    <!-- Flowbite Script -->
    <script src="https://cdn.jsdelivr.net/npm/flowbite@4.0.1/dist/flowbite.min.js"></script>
  </body>
</html>
```

## Step 12: Create Page Templates

### Create `templates/index.html`

```html
{% extends "_base.html" %} {% block title %}Home - My Store{% endblock %} {%
block content %}

<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
    <h1
      class="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl dark:text-white"
    >
      Welcome to My Store
    </h1>
    <p class="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400">
      Discover amazing products built with Django, Tailwind CSS, and Flowbite.
    </p>
  </div>
</section>

{% endblock %}
```

### Create `templates/about.html`

```html
{% extends "_base.html" %} {% block title %}About - My Store{% endblock %} {%
block content %}

<div class="max-w-2xl mx-auto">
  <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
    About Our Store
  </h1>
  <p class="text-lg text-gray-600 dark:text-gray-400">
    We're building modern web applications using Django, Tailwind CSS, and
    Flowbite.
  </p>
</div>

{% endblock %}
```

## Step 13: Run the Project

### Terminal 1: Watch CSS Changes

```bash
npm run watch
```

### Terminal 2: Start Django Server

```bash
source venv/bin/activate
python manage.py runserver
```

Visit: **http://localhost:8000**

## Key Flowbite Components

### Buttons

```html
<button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
  Click Me
</button>
```

### Cards

```html
<div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-700">
  <h3 class="text-xl font-bold mb-2">Card Title</h3>
  <p class="text-gray-600 dark:text-gray-300">Card content here</p>
</div>
```

### Alerts

```html
<div
  class="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900 dark:border-blue-700"
>
  <p class="text-blue-700 dark:text-blue-200">Alert message</p>
</div>
```

### Modal

```html
<div
  id="modal"
  class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
>
  <div class="bg-white rounded-lg p-6 max-w-md dark:bg-gray-800">
    <h2 class="text-2xl font-bold mb-4">Modal Title</h2>
    <p class="mb-4">Modal content goes here</p>
    <button class="px-4 py-2 bg-green-600 text-white rounded-lg">Close</button>
  </div>
</div>
```

## Customization

### Change Primary Colors

In `tailwind.config.js`:

```javascript
theme: {
    extend: {
        colors: {
            primary: "#your-color-here",
        },
    },
},
```

### Switch Flowbite Themes

In `static/src/input.css`, replace the theme import:

```css
/* Default Theme */
@import "flowbite/src/themes/default";

/* Or use alternatives */
/* @import "flowbite/src/themes/minimal"; */
/* @import "flowbite/src/themes/enterprise"; */
/* @import "flowbite/src/themes/playful"; */
/* @import "flowbite/src/themes/mono"; */
```

### Add Custom CSS

Add to `static/src/input.css`:

```css
@layer components {
  .btn-custom {
    @apply px-4 py-2 rounded-lg font-medium transition-colors;
  }
}
```

## Useful Commands

```bash
# Build CSS once
npm run build

# Watch for CSS changes (development)
npm run watch

# Run Django server
python manage.py runserver

# Collect static files (production)
python manage.py collectstatic

# Create superuser for admin
python manage.py createsuperuser

# Run migrations
python manage.py migrate
```

## Production Deployment

### 1. Disable Debug Mode

In `config/settings.py`:

```python
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com']
```

### 2. Collect Static Files

```bash
python manage.py collectstatic --noinput
```

### 3. Build CSS

```bash
npm run build
```

## Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Flowbite Documentation](https://flowbite.com/docs/)
- [Flowbite Components](https://flowbite.com/docs/components/)

## Troubleshooting

### CSS Not Loading

1. Ensure `npm run build` was executed
2. Check that output.css exists in `static/src/`
3. Clear browser cache
4. Run `python manage.py collectstatic` if in production

### Compressor Issues

1. Check `COMPRESS_ENABLED = True` in settings
2. Verify `STATIC_ROOT` and `COMPRESS_ROOT` are set correctly
3. Try disabling compressor temporarily to debug

### Flowbite Components Not Working

1. Ensure Flowbite script is included: `<script src="https://cdn.jsdelivr.net/npm/flowbite@4.0.1/dist/flowbite.min.js"></script>`
2. Check browser console for JavaScript errors
3. Verify Flowbite is installed: `npm list flowbite`

## Tips & Best Practices

- Always run `npm run watch` during development
- Use Django's `{% static %}` template tag for assets
- Leverage Tailwind utility classes for rapid development
- Explore Flowbite components to avoid reinventing UI elements
- Use dark mode classes for better user experience
- Keep CSS organized in `static/src/input.css`
- Test on mobile devices using dev tools

---

Happy coding! 🎉
