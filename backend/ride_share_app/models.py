from django.db import models
from django.conf import settings  # Import settings for AUTH_USER_MODEL
from django.contrib.auth.models import AbstractUser

# Custom User model with additional fields
class CustomUser(AbstractUser):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, null=True, blank=True)
    primary_contact = models.CharField(max_length=16, unique=True, null=True, blank=True)
    profile_pic = models.CharField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.username


# Journey model to store ride details
class Journey(models.Model):
    driver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Use AUTH_USER_MODEL
    departure_location = models.CharField(max_length=255)
    destination_location = models.CharField(max_length=255)
    departure_time = models.DateTimeField()
    available_seats = models.IntegerField()
    price_per_passenger = models.DecimalField(max_digits=6, decimal_places=2)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.driver.username}'s journey from {self.departure_location} to {self.destination_location}"


# Booking model to store passenger bookings
class Booking(models.Model):
    passenger = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Use AUTH_USER_MODEL
    journey = models.ForeignKey(Journey, on_delete=models.CASCADE)
    booking_time = models.DateTimeField(auto_now_add=True)
    number_of_seats = models.IntegerField()
    total_price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.passenger.username} booked {self.number_of_seats} seats on {self.journey.driver.username}'s journey"


# Payment model to store payment details
class Payment(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE)
    amount_paid = models.DecimalField(max_digits=6, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Completed', 'Completed')])

    def __str__(self):
        return f"Payment of {self.amount_paid} for booking {self.booking.id}"
