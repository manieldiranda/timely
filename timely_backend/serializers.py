from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_jwt.settings import api_settings

from .models import TimeEntry, EmployeeProfile


class TimeEntrySerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):
        many = kwargs.pop('many', True)
        super(TimeEntrySerializer, self).__init__(many=many, *args, **kwargs)

    class Meta:
        model = TimeEntry
        fields = ('time_entry_id','date', 'clock_in', 'clock_out', 'late', 'employee')


class EmployeeProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.StringRelatedField(source='user.first_name')
    last_name = serializers.StringRelatedField(source='user.last_name')
    is_super_user = serializers.StringRelatedField(source='user.is_superuser')
    time_entries = TimeEntrySerializer(many=True, source='timeentry_set')

    class Meta:
        model = EmployeeProfile
        fields = [
            'user',
            'employee_id',
            'first_name',
            'last_name',
            'time_entries',
            'clocked_in',
            'current_shift',
            'is_super_user'

        ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'is_superuser', 'username', 'first_name', 'last_name', 'email', 'groups')


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    class Meta:
        model = User
        fields = ('token', 'username', 'password')