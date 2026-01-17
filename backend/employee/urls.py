from django.urls import path
from .views import EmployeeListCreateAPI, EmployeeRetrieveUpdateDestroyAPI

urlpatterns = [
    path('', EmployeeListCreateAPI.as_view(), name='employee-list-create'),
    path('<int:pk>/', EmployeeRetrieveUpdateDestroyAPI.as_view(), name='employee-detail'),
]

