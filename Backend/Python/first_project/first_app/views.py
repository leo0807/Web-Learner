from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def index(request):
    return HttpResponse("Hello World!")


def even_or_odd(request, num):
    if(num % 2 == 0):
        output = "%s is an even number." % num
    else:
        output = "%s is an odd number." % num
    return HttpResponse(output)


def home(request):
    return HttpResponse("Welcome to home page!")


def educative(request):
    return HttpResponse("Welcome to Educative page!")
