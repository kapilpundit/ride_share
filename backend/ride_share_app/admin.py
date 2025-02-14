from django.contrib import admin
from .models import Journey, Booking, Payment

# Register your models here.

admin.site.register(Journey)
admin.site.register(Booking)
admin.site.register(Payment)