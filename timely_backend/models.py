from django.db import models
from django.utils.timezone import now
from datetime import datetime
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.


class TimeEntry(models.Model):
    time_entry_id = models.AutoField(primary_key=True)
    employee = models.ForeignKey('EmployeeProfile', on_delete=models.CASCADE)
    date = models.DateField(default=datetime.now, blank=True, null=True)
    clock_in = models.DateTimeField('Clock In', default=datetime.now)
    clock_out = models.DateTimeField('Clock Out', blank=True, null=True)
    late = models.BooleanField(default=False)

    def __str__(self):
        return str(self.date)


class EmployeeProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    employee_id = models.AutoField(primary_key=True)
    clocked_in = models.BooleanField(default=False)
    current_shift = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return '{} {}'.format(self.user.first_name, self.user.last_name)

    def get_employee_name(self):
        return '{} {}'.format(self.user.first_name, self.user.last_name)

    get_employee_name.short_description = 'Employee'



# USED TO MAKE NEW EMPLOYEE PROFILES FOR USERS

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        EmployeeProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.employeeprofile.save()
