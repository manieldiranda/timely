from django.contrib.auth.models import User, Group
from .models import EmployeeProfile


def populate_employee_profile(user):
    user.save()
    profile = EmployeeProfile.objects.filter(user__username=user.username).first()
    profile.save()