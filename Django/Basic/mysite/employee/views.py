from django.shortcuts import render
from .models import Employee
# Create your views here.


def empd(request, id):
    emp = Employee.objects.get(id=id)
    return render(request, 'home.html', {'emp': emp})
