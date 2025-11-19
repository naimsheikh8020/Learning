
# from django.http import HttpResponse
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

# class HomeView(APIView):
#     def get(self, request):
#         return HttpResponse("Welcome to the Home Page!")

# @api_view(['GET'])
# def home(request):
#     return Response({"Welcome to the Home Page!"})