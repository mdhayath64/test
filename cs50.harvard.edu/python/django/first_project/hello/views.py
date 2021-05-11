from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def  redirect_page(request):
    return render(request, "hello/mypage.html")

def index(request):
    return HttpResponse("hello world")


def hayath(request):
    return HttpResponse("hello hayath")


def greet(request, name):
    return HttpResponse(f"hello {name.capitalize()}")

def greet1(request, name):
    return render(request, "hello/greet.html",{
        "name":name.capitalize(),
    })