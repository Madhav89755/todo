from django.contrib import admin
from .models import extendeduser
from django.contrib.auth.admin import UserAdmin
# Register your models here.


class extenduserAdmin(UserAdmin):
    list_display=('email','username','first_name','last_name','age','phonenumber','date_joined','last_login','is_admin','is_staff')
    search_fields=('email','username',)
    readonly_fields=('date_joined','last_login')
    filter_horizontal=()
    list_filter=()
    fieldsets=()

admin.site.register(extendeduser, extenduserAdmin)