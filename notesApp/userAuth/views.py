from .serializer import UserSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
from django.http.response import JsonResponse
from rest_framework.generics import GenericAPIView
from .models import extendeduser

# Create your views here.
@api_view(['GET','POST',])
def getUsers(request):
    
    if request.method=='GET':
        if request.user.is_superuser:
            users=extendeduser.objects.all().order_by('-id')
            email=request.query_params.get('email',None)
            if email is not None:
                users=users.filter(email__icontains=email)
        else:
            email=request.user
            users=extendeduser.objects.filter(email__icontains=email).order_by('-id')
        serializer=UserSerializer(users,many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        if request.user.is_superuser:
            data = JSONParser().parse(request)
            serializer = UserSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'message': 'User was created successfully!'}) 
            return JsonResponse(serializer.errors)
        else:
            return JsonResponse({'message': 'User not authorized to create new user!'}) 


@api_view(['GET','PUT','DELETE'])
# Create your views here.
def userEdit(request,pk):
    try: 
        users = extendeduser.objects.get(id=pk) 
    except extendeduser.DoesNotExist: 
        return JsonResponse({'message': 'The user does not exist'}) 
    
    if request.method == 'GET': 
        user=request.user
        if user.is_superuser:
            serializer = UserSerializer(users) 
        else:
            id=request.user.id
            users=extendeduser.objects.filter(id=id)
            serializer=UserSerializer(users)
        return JsonResponse(serializer.data, safe=False)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserSerializer(users,data=data,partial=True) 
        if serializer.is_valid(): 
            serializer.save() 
            return JsonResponse({'message': 'User was updated successfully!'})
        return JsonResponse(serializer.errors) 

            
 
    elif request.method == 'DELETE': 
        if request.user.is_superuser:    
            users.delete() 
            return JsonResponse({'message': 'User was deleted successfully!'})
        else:
            return JsonResponse({'message': 'User not authorized to delete details!'})


