from django.urls import path
from . import views

urlpatterns = [
    path('listofreciver/', views.listofreciver, name='hello'),
    path('activeuser/', views.activeuser, name='activeuser'),


    
]