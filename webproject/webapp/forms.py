from django.forms import Form
from django.forms.fields import FileField, JSONField


class UploadForm(Form):
    file = FileField()