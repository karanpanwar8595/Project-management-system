from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [

    #registration process
    path('registration/', views.registration, name='registration'),

    path('country/', views.country, name='country'),
    path('state/', views.state, name='state'),
    path('city/', views.city, name='city'),
    path('allcompanydata/', views.allcompanydata,name='allcompanydata'),
    path('uploadprofilepic/', views.uploadprofilepic,name='uploadprofilepic'),


    # Login process
    path('login/', views.login, name='loginauthentication'),

    #password process
    path('forgetpassword/', views.forgetpassword, name='forgetpassword'),
    path('changepassword/', views.changepassword, name='changepassword'),


#profile process
    path('profileinfo/', views.profileinfo, name='profileinfo'),
    path('allusers/', views.allusers, name='allusers'),
    path('blockuser/', views.blockuser, name='blockuser'),






    # Discussion process
    path('listofreciver/', views.listofreciver, name='hello'),
    path('listofreciverformanager/', views.listofreciverformanager, name='listofreciverformanager'),
    path('listofreciverforclient/', views.listofreciverforclient, name='listofreciverforclient'),


    # path('activereciveruser/', views.activereciveruser, name='activereciveruser'),
    
    path('messagesendertoreciver/', views.messagesendertoreciver, name='messagesendertoreciver'),
    path('messagesofauser/', views.messagesofauser, name='messagesofauser'),

    # Project Component
    path('addingproject/', views.addingproject, name='addingproject'),
    path('uploadattachments/', views.uploadattachments, name='uploadattachments'),
    path('uploaddocument/', views.uploaddocument, name='uploaddocument'),


    path('projectdetailsmanager/', views.projectdetailsmanager, name='projectdetailsmanager'),
    
    path('projectdetailsadmin/', views.projectdetailsadmin, name='projectdetailsadmin'),

    path('projectdetailsteam/', views.projectdetailsteam, name='projectdetailsteam'),
    path('projectdetailsclient/', views.projectdetailsclient, name='projectdetailsclient'),



    path('fetchclient/', views.fetchclient, name='fetchclient'),
    path('projectmanager/', views.projectmanager, name='projectmanager'),

    path('projectcompletion/', views.projectcompletion, name='projectcompletion'),



#Teammember
    path('allmember/', views.allmember, name='allmember'),
    path('addteammembers/', views.addteammembers, name='addteammembers'),
    path('userinproject/', views.userinproject, name='userinproject'),
    path('projectmembers/', views.projectmembers, name='projectmembers'),
    path('removeteammember/', views.removeteammember, name='removeteammember'),


#tasks

    path('taskassigntome/', views.taskassigntome, name='taskassigntome'),
    path('taskassigntoother/', views.taskassigntoother, name='taskassigntoother'),
    path('addtaskdetails/', views.addtaskdetails, name='addtaskdetails'),
    path('teammembers/', views.teammembers, name='teammembers'),
    path('modifytask/', views.modifytask, name='modifytask'),
    path('taskcompleted/', views.taskcompleted, name='taskcompleted'),


#payment process

    path('viewpayment/', views.viewpayment, name='viewpayment'),



#Company Details

    path('editcompany/', views.editcompany, name='editcompany'),
    path('addcompany/', views.addcompany, name='addcompany'),



    
]