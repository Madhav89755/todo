from django.contrib import admin
from django.urls import path, include




urlpatterns = [
    path('admin/', admin.site.urls),
    path('userAuth/', include('userAuth.urls')),
    path('notesOperate/', include('notesOperate.urls')),
    path('', include('frontend.urls')),
]
