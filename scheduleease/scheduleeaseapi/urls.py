from django.urls import path
from . import views

urlpatterns = [
    path('listofreciver/', views.listofreciver, name='hello'),
    path('activereciveruser/', views.activereciveruser, name='activereciveruser'),
    path('messagesendertoreciver/', views.messagesendertoreciver, name='messagesendertoreciver'),
    path('messagesofauser/', views.messagesofauser, name='messagesofauser'),

    
]