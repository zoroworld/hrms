from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from employee.models import Employee



# Create your models here.
class Attendance(models.Model):
    date = models.DateField()
    class StatusType(models.TextChoices):
        PRESENT = 'Present',
        ABSENT = 'Absent'

    status = models.CharField(
        max_length=255,
        choices=StatusType.choices,
        default=StatusType.ABSENT
    )

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name='attendances',
        null=False,
        blank=False,
        default=0
    )

    # Prevent marking attendance for future dates.
    def clean(self):
        if self.date > timezone.now().date():
            raise ValidationError("Attendance date cannot be in the future.")

