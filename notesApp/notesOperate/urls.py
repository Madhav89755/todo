from . import views
from django.urls import include, path, re_path

urlpatterns = [ 
    re_path(r'^getNotes$', views.getNotes),
    re_path(r'^getNotes/(?P<pk>[0-9]+)$', views.editNotes),
]
