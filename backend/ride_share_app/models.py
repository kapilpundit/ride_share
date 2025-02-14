from django.db import models
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


# Journey model to store ride details
class Journey(models.Model):
    driver = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the user who is the driver
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
    passenger = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the passenger (user)
    journey = models.ForeignKey(Journey, on_delete=models.CASCADE)  # Link to the journey the passenger booked
    booking_time = models.DateTimeField(auto_now_add=True)
    number_of_seats = models.IntegerField()
    total_price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.passenger.username} booked {self.number_of_seats} seats on {self.journey.driver.username}'s journey"


# Payment model to store payment details
class Payment(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE)  # Link to the booking for which payment is made
    amount_paid = models.DecimalField(max_digits=6, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Completed', 'Completed')])

    def __str__(self):
        return f"Payment of {self.amount_paid} for booking {self.booking.id}"

