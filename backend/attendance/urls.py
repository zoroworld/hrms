from django.urls import path
from .views import (
    AttendanceListCreateAPI,
    AttendanceRetrieveUpdateDestroyAPI,
    AttendanceByEmployeeAPI
)

urlpatterns = [
    path('', AttendanceListCreateAPI.as_view(), name='attendance-list-create'),
    path('<int:pk>/', AttendanceRetrieveUpdateDestroyAPI.as_view(), name='attendance-detail'),
    path('employee/<int:employee_id>/', AttendanceByEmployeeAPI.as_view(), name='attendance-by-employee'),
]
