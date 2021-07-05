from django.shortcuts import render
from .serializers import BlogSerializer, FileSerializer
from rest_framework import viewsets,parsers,views,response,status
from .models import Blog,File
from .forms import UploadForm
import json


class FileUploadView(views.APIView):
    parser_class = (parsers.MultiPartParser, parsers.FormParser)
    serializer_class = FileSerializer   
    # queryset = File.objects.all()  

    def post(self, request, format=None):
        # my_file = request.FILES['file']
        # print(my_file)
        handle_uploaded_file(request.FILES['file'])
        return response.Response(status=status.HTTP_201_CREATED)
        # filename = 'data'
        # with open(filename, 'wb+') as temp_file:
        #     for chunk in my_file.chunks():
        #         temp_file.write(chunk)

        # my_saved_file = open(filename) #there you go



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