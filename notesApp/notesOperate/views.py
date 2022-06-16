from .serializer import NotesSerializer
from .models import NotesModel
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.parsers import JSONParser 
from django.http.response import JsonResponse

# Create your views here.
@api_view(['GET','POST','DELETE'])
def getNotes(request):
    
    if request.method=='GET':
        notes=NotesModel.objects.all().order_by('-id')
        # id=request.query_params.get('id',None)
        # if id is not None:
        #     notes=notes.filter(user__icontains=request.user.id)
        notes=notes.filter(user=request.user.id)
        serializer=NotesSerializer(notes,many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data=JSONParser().parse(request)
        print(data)
        data['user']=request.user.id
        serializer=NotesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Note was created successfully!'}, status=status.HTTP_201_CREATED) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','DELETE'])
# Create your views here.
def editNotes(request,pk):
    try: 
        notes = NotesModel.objects.get(id=pk) 
    except NotesModel.DoesNotExist: 
        return JsonResponse({'message': 'The note does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        serializer = NotesSerializer(notes) 
        return JsonResponse(serializer.data) 
    
    elif request.method == 'PUT':
        serializer=NotesSerializer(notes,data=request.data,partial=True) 
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Note was updated successfully!'}) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        notes.delete() 
        return JsonResponse({'message': 'Note was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    