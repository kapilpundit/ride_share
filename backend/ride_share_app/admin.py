from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Journey, Booking, Payment

# Register your models here.

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("username", "email", "first_name", "last_name", "gender", "is_staff", "is_active")
    fieldsets = UserAdmin.fieldsets + (
        ("Additional Info", {"fields": ("gender", "primary_contact", "profile_pic")}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Additional Info", {"fields": ("gender", "primary_contact", "profile_pic")}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Journey)
admin.site.register(Booking)
admin.site.register(Payment)