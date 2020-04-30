from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import *



from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('', views.index, name='index'),
    path('current_user/', get_current_user),
]
