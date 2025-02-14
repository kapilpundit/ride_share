#!/bin/sh

echo "Waiting for MySQL to be ready..."
until mysqladmin ping -h"$DATABASE_HOST" --silent; do
  sleep 3
done
echo "MySQL is up, proceeding with Django setup..."

# Navigate to /app directory
cd /app

# Check if Django project exists, if not, create it
if [ ! -f "manage.py" ]; then
    echo "Creating Django project..."
    django-admin startproject ride_share .
fi

# Check if the Django app exists, if not, create it
if [ ! -d "ride_share_app" ]; then
    echo "Creating Django app..."
    python manage.py startapp ride_share_app
fi

# Apply migrations
echo "Running migrations..."
python manage.py migrate

# Create a superuser if none exists
echo "Checking if superuser exists..."
python manage.py shell <<EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', '123456')
    print("Superuser created.")
else:
    print("Superuser already exists.")
EOF

# Start the Django server
echo "Starting Django server..."
exec python manage.py runserver 0.0.0.0:8000
