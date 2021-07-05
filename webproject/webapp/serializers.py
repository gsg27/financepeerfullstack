from rest_framework import serializers
from .models import Blog,File

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ('userId','id', 'title', 'body')
        
class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"