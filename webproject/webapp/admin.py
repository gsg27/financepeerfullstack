from django.contrib import admin
from .models import Blog

class BlogAdmin(admin.ModelAdmin):
    list = ('userId','id','title','body')

admin.site.register(Blog,BlogAdmin)

