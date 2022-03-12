import os
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.files.storage import FileSystemStorage

def profile_directory_path(instance, filename):
    extension = filename.split('.')[-1]
    filename = f"profile_img.{extension}"
    return 'profile/{0}/{1}'.format(instance.username, filename)

class CustomStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name

class CustomUserManager(BaseUserManager):

    use_in_migrations = True  

    def _create_user(self, username, password, email, **extra_fields):
        
        values = [email]

        field_value_map = dict(zip(self.model.REQUIRED_FIELDS, values))
        for field_name, value in field_value_map.items():
            if not value:
                raise ValueError('The {} value must be set'.format(field_name))

        email = self.normalize_email(email)
        user = self.model(
            username=username,
            email=email,
            **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, username, password, email, **extra_fields):
        
        return self._create_user(username, password, email, **extra_fields)

    def create_superuser(self, username, password, email, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, password, email, **extra_fields)

        

class CustomUser(AbstractBaseUser, PermissionsMixin):
    class Meta:
        db_table = "user"
    
    class GenderChoice(models.IntegerChoices):
        male = 0, 'male'
        female = 1, 'female'
        other = 2, 'other'
        empty = 4, 'please set this value'

    
    class AgeChoice(models.IntegerChoices):
        underTwenty = 0, '0~19'
        twenties = 1, '20~29'
        thirties = 2, '30~39'
        forties = 3, '40~49'
        fifties = 4, '50~59'
        sixties = 5, '60~69'
        overSixty = 6, '60~'
        empty = 7, 'please set this value'

    username = models.CharField(unique=True, max_length=25)
    email = models.EmailField(unique=True)
    nationality = models.CharField(default='please set this value', max_length=25, blank=True)
    gender = models.SmallIntegerField(choices=GenderChoice.choices, default=GenderChoice.empty, blank=True)
    age = models.SmallIntegerField(choices=AgeChoice.choices, default=AgeChoice.empty, blank=True)
    profile_image = models.ImageField(upload_to=profile_directory_path, storage=CustomStorage, default='profile/default_img.jpg')
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username


