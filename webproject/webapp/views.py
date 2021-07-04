from django.shortcuts import render
from .serializers import BlogSerializer
from rest_framework import viewsets
from .models import Blog
from .forms import UploadForm
import json

def index(request):
    
    if request.method == 'POST':
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            handle_uploaded_file(request.FILES['file'])
    else:
        form = UploadForm()
    return render(request,'index.html', {'form':form})

def handle_uploaded_file(f):
    data = json.load(f)
    for i in data:
        Blog.objects.create(**i)

class BlogView(viewsets.ModelViewSet):  
    serializer_class = BlogSerializer   
    queryset = Blog.objects.all()  