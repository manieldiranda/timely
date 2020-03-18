"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from django.conf.urls import url
from rest_framework import routers                    # add this
from timely_backend import views
from rest_framework_jwt.views import obtain_jwt_token
from django.views.generic import TemplateView


# add this

router = routers.DefaultRouter()                      # add this
router.register(r'time_entries', views.TimeEntryView, 'TimeEntry',)     # add this
router.register(r'employees', views.EmployeeProfileView, 'EmployeeProfile',)     # add this



urlpatterns = [
    path('timely_backend/', include('timely_backend.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth-get-token/', obtain_jwt_token),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),

]
