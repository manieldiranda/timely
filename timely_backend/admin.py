from django.contrib import admin
from django import forms


# Register your models here.


from .models import TimeEntry, EmployeeProfile


class TimeEntryAdmin(admin.ModelAdmin):
    list_display = ('date', 'clock_in', 'clock_out', 'late')

class TimeEntryInline(admin.TabularInline):
    model = TimeEntry
    extra = 0


class EmployeeProfileAdmin(admin.ModelAdmin):
    # going to be for time entries
    inlines = [TimeEntryInline]
    readonly_fields = ['user', 'get_employee_name', 'current_shift', 'clocked_in']



admin.site.register(TimeEntry, TimeEntryAdmin)
admin.site.register(EmployeeProfile, EmployeeProfileAdmin)
