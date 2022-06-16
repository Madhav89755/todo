from rest_framework.serializers import ModelSerializer
from .models import NotesModel

class NotesSerializer(ModelSerializer):
    class Meta:
        model=NotesModel
        fields=('id','note','status','user')