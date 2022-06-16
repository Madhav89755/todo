from django.urls import re_path
from . import views 
from django.urls import include, path, re_path
from rest_framework import routers
 
router = routers.DefaultRouter()

urlpatterns = [ 
    re_path('', include(router.urls)),   

    re_path(r'^api/v1/', include('djoser.urls')),
    re_path(r'^api/v1/', include('djoser.urls.authtoken')),
    
    re_path(r'^getUsers$', views.getUsers),
    re_path(r'^getUsers/(?P<pk>[0-9]+)$', views.userEdit),
]
