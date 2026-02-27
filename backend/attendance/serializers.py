from rest_framework import serializers
from .models import Attendance
from employee.serializers import EmployeeSerializer  # import your Employee serializer

class AttendanceSerializer(serializers.ModelSerializer):
    # nested employee details
    employee_detail = EmployeeSerializer(source="employee", read_only=True)

    class Meta:
        model = Attendance
        fields = ['id', 'date', 'status', 'employee', 'employee_detail']
