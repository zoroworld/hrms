from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Employee
from .serializers import EmployeeSerializer


# List all employees & create new employee
class EmployeeListCreateAPI(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({
                "status": "error",
                "message": "Validation failed",
                "errors": e.detail
            }, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        return Response({
            "status": "success",
            "message": "Employee created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)


class EmployeeAllListAPI(generics.ListAPIView):
    """
    GET /employee/all/
    Returns ALL employees (no pagination)
    """
    queryset = Employee.objects.all().order_by("id")
    serializer_class = EmployeeSerializer
    pagination_class = None


# Retrieve, update, or delete a specific employee
class EmployeeRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({
                "status": "error",
                "message": "Validation failed",
                "errors": e.detail
            }, status=status.HTTP_400_BAD_REQUEST)

        self.perform_update(serializer)
        return Response({
            "status": "success",
            "message": "Employee updated successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "status": "success",
            "message": "Employee deleted successfully"
        }, status=status.HTTP_200_OK)
