from django.shortcuts import redirect, render
from .forms import NotesForm, UserForm, UserRegisterForm
import requests
import json

def notesPanel(request):
    form=NotesForm()
    return render(request,'notes.html',{'form':form})

def userPanel(request):
    form=UserForm()
    return render(request,'user.html',{'form':form})

def login(request):
    # if request.method=='POST':
    #     print('posting')
    #     email=request.POST['email']
    #     password=request.POST['password']
    #     data={
    #         'email':email,
    #         'password':password
    #     }
    #     r=requests.post(url="http://127.0.0.1:8005/userAuth/api/v1/token/login",data=data)
    #     data=r.json()
    #     print(data)
    #     return redirect('/notesPanel/',)
    # print('not posting')
    return render(request,'login.html')

def register(request):
    form=UserRegisterForm()
    return render(request,'register.html',{'form':form})
