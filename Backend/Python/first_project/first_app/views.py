from django.shortcuts import render
from django.http import HttpResponse
from .forms import SearchForm
# Create your views here.


def index(request):
    my_dict = {'insert_me': "Hello I am from views.py!"}
    app_name = 'zing_it'
    return render(request, 'first_app/index.html')


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


def forms(request):
    form = SearchForm()
    return render(request, 'first_app/forms.html', {'form': form})
