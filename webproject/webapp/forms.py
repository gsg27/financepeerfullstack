from django.forms import Form
from django.forms.fields import FileField


class UploadForm(Form):
    file = FileField()