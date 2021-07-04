from django.shortcuts import render
from .serializers import BlogSerializer
from rest_framework import viewsets
from .models import Blog

def index(request):
    url = "<h2>hello world</h2"
    render(request, url)



class BlogView(viewsets.ModelViewSet):  
    serializer_class = BlogSerializer   
    queryset = Blog.objects.all()  