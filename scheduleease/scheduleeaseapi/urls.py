from django.urls import path
from . import views

urlpatterns = [

    #registration process
    path('country/', views.country, name='country'),
    path('state/', views.state, name='state'),

    # Login process
    path('login/', views.login, name='loginauthentication'),

    #forgotpassword process
    path('forgetpassword/', views.forgetpassword, name='forgetpassword'),





    # Discussion process
    path('listofreciver/', views.listofreciver, name='hello'),
    path('activereciveruser/', views.activereciveruser, name='activereciveruser'),
    path('messagesendertoreciver/', views.messagesendertoreciver, name='messagesendertoreciver'),
    path('messagesofauser/', views.messagesofauser, name='messagesofauser'),

    
]