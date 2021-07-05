from django.db import models

class Blog(models.Model):
    userId = models.IntegerField(default=1)
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=200,blank=False)
    body = models.TextField()

    def __str__(self):
        return self.title

class File(models.Model):
    file = models.FileField(blank=False, null=False)
    def __str__(self):
        return self.file.name