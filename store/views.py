from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    """Homepage view"""
    return render(request, 'index.html')


def about(request):
    """About page view"""
    return render(request, 'about.html')
