from django.db import models
from userAuth.models import extendeduser 
# Create your models here.



class NotesModel(models.Model):
    user=models.ForeignKey(extendeduser, on_delete=models.CASCADE)
    note=models.TextField()
    choices=[
        ('INCOMPLETE','Incomplete'),
        ('COMPLETE','Complete'),
    ]
    status=models.CharField(max_length=10, choices=choices, default='INCOMPLETE')
    created_date=models.DateField(auto_now_add=True)
    created_time=models.TimeField(auto_now_add=True)
