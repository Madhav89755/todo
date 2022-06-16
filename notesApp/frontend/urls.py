
from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('notesPanel/', views.notesPanel, name='notesPanel'),
    path('userPanel/', views.userPanel, name='userPanel'),
    path('', views.login),
    path('register/', views.register),
]
