from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class GlobalPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "size"   # ?size=20
    max_page_size = 100
    page_query_param = "page"

    def get_paginated_response(self, data):
        return Response({
            "status": "success",
            "count": self.page.paginator.count,
            "total_pages": self.page.paginator.num_pages,
            "current_page": self.page.number,
            "next": self.get_next_link(),
            "previous": self.get_previous_link(),
            "data": data
        })