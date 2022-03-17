from .forms import TestForm
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User

from django.contrib.auth.models import User
from django.db import IntegrityError

# Create your views here.


def index(request):
    return render(request, 'first_app/index.html')


def home(request):
    try:
        user = User.objects.create_user(
            username="Ulrich", email="ulrich@gmail.com", password="mac12")
        user.save()
    except IntegrityError as e:
        print(e)
    return HttpResponse("Welcome to Home page!")


def educative(request):
    user = User.objects.get(username='Ulrich')
    user.email = "helsinki@gmail.com"
    user.save()
    return HttpResponse("Welcome to Educative page!")


# def forms(request):
#     form = SearchForm()
#     return render(request, 'first_app/forms.html', {'form': form})


def forms(request):

    inital_dict = {
        "text": "Some initial data",
        "integer": 123,
    }
    # form = TestForm(request.POST or None)
    form = TestForm(request.POST or None, initial=inital_dict)
    data = "None"
    text = "None"
    if form.is_valid():
        data = form.cleaned_data
        text = form.cleaned_data.get("text")
    return render(request, 'first_app/forms.html', {'form': form, 'data': data, 'text': text})
