from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.db.models import Count, Avg
from django.db.models.functions import TruncDate

from .models import Ticket
from .serializers import TicketSerializer
from .llm import classify_ticket


class TicketViewSet(viewsets.ModelViewSet):
    
    def get(self, request):
        return Response({"message": "API working"})

    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    filterset_fields = ['category', 'priority', 'status']
    search_fields = ['title', 'description']


@api_view(['POST'])
def classify(request):

    description = request.data.get("description")

    result = classify_ticket(description)

    if result:
        return Response({
            "suggested_category": result["category"],
            "suggested_priority": result["priority"]
        })

    return Response({
        "suggested_category": None,
        "suggested_priority": None
    })


@api_view(['GET'])
def stats(request):

    total = Ticket.objects.count()

    open_count = Ticket.objects.filter(status='open').count()

    avg = Ticket.objects.annotate(
        date=TruncDate('created_at')
    ).values('date').annotate(
        count=Count('id')
    ).aggregate(avg=Avg('count'))['avg']

    priority = Ticket.objects.values('priority').annotate(count=Count('id'))

    category = Ticket.objects.values('category').annotate(count=Count('id'))

    return Response({
        "total_tickets": total,
        "open_tickets": open_count,
        "avg_tickets_per_day": avg,
        "priority_breakdown": priority,
        "category_breakdown": category
    })