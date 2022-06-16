from pyexpat import model
from rest_framework.serializers import ModelSerializer
from .models import extendeduser

class UserSerializer(ModelSerializer):
    class Meta:
        model=extendeduser
        fields="__all__"
        # (
        #         "id",
        #         "email",
        #         "username",
        #         "password",
        #         "first_name",
        #         "last_name",
        #         "is_active",
        #         "is_staff",
        #         "phonenumber",
        #         "age",
        #         "office_name",
        #         "designation"
        #         )
        # 