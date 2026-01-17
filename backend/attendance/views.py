from rest_framework import generics, status
from rest_framework.response import Response
from django.utils import timezone
from .models import Attendance
from .serializers import AttendanceSerializer

# List all attendance & create new record
class AttendanceListCreateAPI(generics.ListCreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Validate future date
        if serializer.validated_data['date'] > timezone.now().date():
            return Response({
                "status": "error",
                "message": "Attendance date cannot be in the future."
            }, status=status.HTTP_400_BAD_REQUEST)

        # Validate duplicate for same employee and date
        employee = serializer.validated_data['employee']
        date = serializer.validated_data['date']
        if Attendance.objects.filter(employee=employee, date=date).exists():
            return Response({
                "status": "error",
                "message": "Attendance for this employee on this date already exists."
            }, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        return Response({
            "status": "success",
            "message": "Attendance created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)


# Retrieve, update, or delete a specific attendance record
class AttendanceRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Validate future date
        if serializer.validated_data['date'] > timezone.now().date():
            return Response({
                "status": "error",
                "message": "Attendance date cannot be in the future."
            }, status=status.HTTP_400_BAD_REQUEST)

        # Validate duplicate for same employee and date (exclude current record)
        employee = serializer.validated_data['employee']
        date = serializer.validated_data['date']
        if Attendance.objects.filter(employee=employee, date=date).exclude(id=instance.id).exists():
            return Response({
                "status": "error",
                "message": "Attendance for this employee on this date already exists."
            }, status=status.HTTP_400_BAD_REQUEST)

        self.perform_update(serializer)
        return Response({
            "status": "success",
            "message": "Attendance updated successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            "status": "success",
            "message": "Attendance deleted successfully"
        }, status=status.HTTP_200_OK)


# Attendance by employee
class AttendanceByEmployeeAPI(generics.ListAPIView):
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        employee_id = self.kwargs['employee_id']
        return Attendance.objects.filter(employee_id=employee_id).order_by('date')
