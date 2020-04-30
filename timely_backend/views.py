from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets  # add this
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from .serializers import *
  # add this
from .models import TimeEntry, EmployeeProfile

@api_view(['GET'])
def get_current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

def index(request):
    return HttpResponse("Hello, world. You're at the Timely Backend Index")


class TimeEntryView(viewsets.ModelViewSet):  # add this
    serializer_class = TimeEntrySerializer  # add this
    queryset = TimeEntry.objects.all()


class EmployeeProfileView(viewsets.ModelViewSet):  # add this
    serializer_class = EmployeeProfileSerializer  # add this
    queryset = EmployeeProfile.objects.all()

# Create your views here.

def jwt_response_payload_handler(token, user=None, request=None):
    user = UserSerializer(user, context={'request': request}).data
    profile = EmployeeProfile.objects.filter(user__username=user['username']).first()
    return {
        'token': token,
        'user': user,
        'profile_id': profile.profile_id
    }

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
