from django.db import models
from django.utils import timezone


# Create your models here.
class Employee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()

    # Department should be defined as a separate model/app for better scalability.

    class DepartmentType(models.TextChoices):
        HR = 'Human Resources'
        IT = 'Information Technology'
        FIN = 'Finance'

    department = models.CharField(
        max_length=255,
        choices=DepartmentType.choices
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
