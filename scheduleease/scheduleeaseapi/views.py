# from django.shortcuts import render
from scheduleeaseapi.models import Profile,Country,State,City,ProjectMember,Project,ProjectDocument,Payment,Task,TaskDocument,MesgMaster,MesgTran,ProfileDocument,CompanyDetails
from django.core.mail import send_mail
# from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import get_connection
import json
import secrets
import string
from django.utils import timezone
from django.shortcuts import get_object_or_404
import os
import uuid
from django.conf import settings
from rest_framework.views import APIView
from datetime import date




#Registration
@api_view(['post'])
def registration(request):
        try:
            data = json.loads(request.body)
            print(data)
            inputemail = data.get('inputemail')
            inputpassword = "S@123456"
            usergst_no=data.get('gst_no')
            address=data.get('address')
            # photo=data.get('photo')
            firstname=data.get('firstname')
            middlename=data.get('middlename')
            lastname=data.get('lastname')
            userrole=data.get('userrole')
            usergender=data.get('usergender')
            dateofbirth=data.get('dateofbirth')
            city=data.get('city')
            if (usergst_no == ''):
                gst_no=None
            else:
  
                gst_no=get_object_or_404(CompanyDetails, gst_no=usergst_no)

            city_id=get_object_or_404(City, city_id=city)
            
            print(inputemail)
            try:
                login_credential_data = Profile.objects.get(email=inputemail)
                # Profile with the given email exists
                print("Profile found:", login_credential_data)
                # Continue with the rest of your code...
                return Response({"profile_data": "user email already exist","value":False})
            except Profile.DoesNotExist:
                print("creation started")
                print(city)
                profile_instance = Profile.objects.create(
                    email=inputemail,
                    password=inputpassword,
                    fname=firstname,
                    mname=middlename,
                    lname=lastname,
                    role=userrole,
                    gst_no=gst_no,
                    gender=usergender,
                    dob=dateofbirth,
                    city=city_id,
                    user_status = 1,
                    profile_status = 1,
                    # Add other fields as needed...
                )

                # Save the instance to the database
                profile_instance.save()
                return Response({"profile_data": "Registration is Successful","value":True})

               
                  
        except Exception as e:
            print(e)
            return Response({"profile_data": "Internal Error","value":False})


@api_view(['post'])
def country(request):
    try:
        countries = Country.objects.all()
        country_list = [country.to_dict() for country in countries]
        print(country_list)
        return Response({"data":country_list,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})


@api_view(['post'])
def state(request):
    try:
        data = json.loads(request.body)
        print(request.body)
        user_country_id = data.get('country_id')
        print(user_country_id)
        states = State.objects.filter(country_id=user_country_id)
        state_list = [state.to_dict() for state in states]
        print(state_list)
        return Response({"data":state_list,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})


@api_view(['post'])
def city(request):
    try:
        data = json.loads(request.body)
        print(request.body)
        user_state_id = data.get('state_id')
        print(user_state_id)
        citys = City.objects.filter(state_id=user_state_id)
        city_list = [city.to_dict() for city in citys]
        print(city_list)
        return Response({"data":city_list,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})



@api_view(['post'])
def allcompanydata(request):
    try:
        allcompanpydetails = CompanyDetails.objects.all()
        allcompany_list = [company.to_dict() for company in allcompanpydetails]
        print(allcompany_list)
        return Response({"data":allcompany_list,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})

@api_view(['POST'])
def uploadprofilepic(request):
    try:

        username = request.data.get('useremail')
        
        clean_username = ''.join(char for char in username if char.isalnum())

        if request.method == 'POST':
            attachments = request.FILES.getlist('photo')
            for attachment in attachments:
                folder_path = f'media/{clean_username}/Profile/Picture/'
                print("upload pic")
                # Check if the folder exists, and create it if not
                if not os.path.exists(folder_path):
                    os.makedirs(folder_path)
                
                with open(os.path.join(folder_path, attachment.name), 'wb') as file:
                    for chunk in attachment.chunks():
                        file.write(chunk)

            return Response({'message': 'File uploaded successfully', 'value': True})
        else:
            return Response({'message': 'Invalid request method'}, status=405)
    except Exception as e:
        print(e)
        return Response({'message': str(e)}, status=500)

# Login Process
@api_view(['post'])
def login(request):
    try:
        # Get the posted data from the request body
        data = json.loads(request.body)
        # Access the data (assuming 'username' and 'password' keys in the posted data)
        inputemail = data.get('loginemail')
        inputpassword = data.get('loginpassword')
        print(inputemail,inputpassword)
        logincretentialdata = Profile.objects.get(email=inputemail,password=inputpassword)
        print(logincretentialdata)
        
        if (logincretentialdata):
            dic_login_cretential_data=logincretentialdata.login_to_dict()
            print(dic_login_cretential_data)
            print(dic_login_cretential_data['user_status'])
            if (dic_login_cretential_data['user_status']):
                return Response({"profile_data": dic_login_cretential_data,"value":True})
        else:
            return Response({"profile_data": False,"value":False})
    except Exception as e:
        print(e)
        return Response({"profile_data": False,"value":False})




# password process
def generate_random_password(length=12):
    characters = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(characters) for _ in range(length))
    return password

def mailsenderapi(inputemail,new_password):
    subject = 'Forgot Password Request'
    message = 'New password for your login to Schedule Ease website for the account '+inputemail+" is " + new_password
    from_email = "ujjwalbhansal55@gmail.com"
    recipient_list = [inputemail]
    email_settings = {
        'host': 'smtp.gmail.com',
        'port': 587,
        'user': '21bca050@sxca.edu.in',
        'password': 'dryx kjzx nlmu qfuc',
        'use_tls': True,  # Set to True if your email provider requires TLS
    }
    connection = get_connection(
        host=email_settings['host'],
        port=email_settings['port'],
        username=email_settings['user'],
        password=email_settings['password'],
        use_tls=email_settings['use_tls'],
    )
    send_mail(
        subject,
        message,
        from_email,
        recipient_list,
        fail_silently=False,
        auth_user=email_settings['user'],
        auth_password=email_settings['password'],
        connection=connection
    )
@api_view(['post'])
def forgetpassword(request):
    try:
        data = json.loads(request.body)
        inputemail = data.get('forgotpasswordemail')
        user_profile = Profile.objects.get(email = inputemail)
        if (user_profile):
            new_password=generate_random_password(12)
            print("not done")
            mailsenderapi(inputemail,new_password)
            print('done')
            # sql updation 
            condition = {'email':inputemail} 
            profiles_to_update = Profile.objects.filter(**condition)

            # Update the password field for each profile in the queryset
            for profile in profiles_to_update:
                profile.password = new_password
                profile.save()
            return Response({"message":"Password send to Email",'processcompleted':True})
        else:
            return Response({"message":"Email not found" ,'processcompleted':False })

    except Exception as e:
        print(e)
        return Response({"message":"Email not found" ,'processcompleted':False })
    


@api_view(['post'])
def changepassword(request):
    try:
        data = json.loads(request.body)
        inputemail = data.get('useremail')
        oldpass = data.get('oldpassword')
        newpass = data.get('newpassword')

        user_profile = Profile.objects.get(email = inputemail,password=oldpass)
        user_profile.password=newpass
        user_profile.save()
        return Response({"message":"Password Change Successful to Email",'value':True})
        
    except Profile.DoesNotExist:
        return Response({"message":"Old Password Does Not Match",'value':False })
                         
    except Exception as e:
        print(e)
        return Response({"message":"Email not found" ,'value':False })




# Disscussion process
@api_view(['POST'])
def listofreciver(request):
    try:
        data = json.loads(request.body)
        inputemail = data.get('useremail')
        projects = ProjectMember.objects.filter(email = inputemail)
        projectlist = [inproject.to_project_dict()['project'].project_id for inproject in projects]
        projectmembers = ProjectMember.objects.filter(project__in=projectlist)
        memberlist = [projectmember.to_projectmember_dict() for projectmember in projectmembers]
        unique_memberlist=[]
        unique_emaillist=[]
        for member in memberlist:
            print("hello",member['member']['email'])
            # print(member['email'])
            email=member['member']['email']
            print(unique_emaillist)
            if not (email in unique_emaillist):
                unique_emaillist.append(email)
                unique_memberlist.append(member)
        return Response({'data':unique_memberlist,'processcompleted':True})

    except Exception as e:
        print(e)
        return Response({"message":"Email not found" ,'processcompleted':False })



@api_view(['POST'])
def listofreciverformanager(request):
    try:
        data = json.loads(request.body)
        inputemail = data.get('useremail')
        projects = ProjectMember.objects.filter(email = inputemail,role=1)
        clientlist = [inproject.to_dict()['project']['client'] for inproject in projects]
        print("")
        print("client list",clientlist)

        unique_clientlist=[]
        unique_emaillist=[]
        for client in clientlist:

            email=client['email']
            # print(unique_emaillist)
            if not (email in unique_emaillist):
                unique_emaillist.append(email)
                unique_clientlist.append(client)
        return Response({'data':unique_clientlist,'processcompleted':True})

    except Exception as e:
        print(e)
        return Response({"message":"Email not found" ,'processcompleted':False })
    


@api_view(['POST'])
def listofreciverforclient(request):
    try:
        data = json.loads(request.body)
        inputemail = data.get('useremail')
        client_id_obj = get_object_or_404(Profile, email=inputemail)
        clientsprojects = Project.objects.filter(client = client_id_obj)



        projects = ProjectMember.objects.filter(project__in=clientsprojects,role=1)
        managerlist = [inproject.to_dict()['email'] for inproject in projects]
        print("")
        print("manager list",managerlist)

        unique_managerlist=[]
        unique_emaillist=[]
        for manager in managerlist:

            email=manager['email']
            # print(unique_emaillist)
            if not (email in unique_emaillist):
                unique_emaillist.append(email)
                unique_managerlist.append(manager)
        return Response({'data':unique_managerlist,'processcompleted':True})

    except Exception as e:
        print(e)
        return Response({"message":"Email not found" ,'processcompleted':False })
    
   

# store a single message into the database and send if the message is stored or not
@api_view(['post'])
def messagesendertoreciver(request):
    try:
        data=json.loads(request.body)
        sender=data.get('sender')
        reciver=data.get('reciver')
        message=data.get('textmessage')


        print(sender,reciver)
        existing_entry = MesgMaster.objects.filter(sender__email=sender, receiver__email=reciver).first()
        if not existing_entry:
            sender_profile=Profile.objects.get(email=sender)
            receiver_profile=Profile.objects.get(email=reciver)
            message_id_entry = MesgMaster.objects.create(sender=sender_profile, receiver=receiver_profile)
        comm_id=MesgMaster.objects.get(sender =sender,receiver=reciver)
        message_entry = MesgTran.objects.create(message=comm_id, mesg=message)
        return Response({'value':True})
    
    except Exception as e:
        print(e)

# give all the messages related to a perticular person
@api_view(['post'])
def messagesofauser(request):
    try:
        print("start message of user")
        data=json.loads(request.body)
        sender=data.get('sender')
        reciver=data.get('reciver')
        # message=data.get('textmessage')
        comm_id=[]
        try:
            mesg_master_1 = MesgMaster.objects.get(sender=sender, receiver=reciver)
            comm_id.append(mesg_master_1)
        except MesgMaster.DoesNotExist:
            pass

        try:
            mesg_master_2 = MesgMaster.objects.get(sender=reciver, receiver=sender)
            comm_id.append(mesg_master_2)
        except MesgMaster.DoesNotExist:
            pass
        print(comm_id)
        messages_obj = MesgTran.objects.filter(message__in=comm_id)
        allmessage = [messages.to_dict() for messages in messages_obj]

        print("sendmessage",allmessage)      
        return Response({'data':allmessage,'value':True})
    
    except Exception as e:
        print(e)
        return Response({'value':False})

    


# Project Component
@api_view(['post'])
def projectdetailsmanager(request):
    # request : data came from
    try:
        data = json.loads(request.body)
        print(data)
        useremail = data.get('useremail')
        role=data.get('role')
        if (role==2):
            role=0
        elif(role==1):
            role=1 
        print('role',role)
        # get : function get(key) dala == value milegi
        inprojects = ProjectMember.objects.filter(email=useremail,role=role)
        print(useremail)
        inprojectslist = [inproject.to_project_dict()['project'].project_id for inproject in inprojects]
        print("hello", inprojectslist)

        # Filter the Project queryset based on the list of project IDs
        projects = Project.objects.filter(project_id__in=inprojectslist)

        projectslist = [project.to_projectmanager_dict() for project in projects]
        print("")
        print("hellooooo", projectslist)
        return Response({"projectdetails":projectslist, "value":True})
    except Exception as e:
        print(e)
        return Response({"projectdetails":False, "value":False})



@api_view(['post'])
def projectdetailsadmin(request):
    # request : data came from
    try:
        all_project = Project.objects.all()
        projectslist = [project.to_projectadmin_dict() for project in all_project]
        return Response({"projectdetails":projectslist, "value":True})
    except Exception as e:
        print(e)
        return Response({"projectdetails":False, "value":False})



@api_view(['post'])
def projectdetailsteam(request):
    # request : data came from
    try:
        data = json.loads(request.body)
        print(data)
        useremail = data.get('useremail')
        # get : function get(key) dala == value milegi
        inprojects = ProjectMember.objects.filter(email=useremail,role=0)
        print(useremail)
        inprojectslist = [inproject.to_project_dict()['project'].project_id for inproject in inprojects]
        print("hello", inprojectslist)

        # Filter the Project queryset based on the list of project IDs
        projects = Project.objects.filter(project_id__in=inprojectslist)

        projectslist = [project.to_projectteam_dict() for project in projects]
        print('teamdetails',projectslist)

        for project in projectslist:
            print('projectdict' ,project['id'])
            project_id = get_object_or_404(Project, project_id=project['id'])
            inprojects = ProjectMember.objects.get(project=project_id,role=1)
            print('projectmanager' ,inprojects.project_detail_team_to_dict())
            project['email']=inprojects.project_detail_team_to_dict()

        return Response({"projectdetails":projectslist, "value":True})
    except Exception as e:
        print(e)
        return Response({"projectdetails":False, "value":False})
    

@api_view(['post'])
def projectdetailsclient(request):
    # request : data came from
    try:
        print("clientprojectdetails")
        data = json.loads(request.body)

        useremail = data.get('useremail')
        print(useremail)
        # Filter the Project queryset based on the client id
        projects = Project.objects.filter(client=useremail)
        projectslist = [project.to_projectteam_dict() for project in projects]
        print('clientprojects',projectslist)

        return Response({"projectdetails":projectslist, "value":True})
    except Exception as e:
        print(e)
        return Response({"projectdetails":False, "value":False})

@api_view(['post'])
def addingproject(request):
    # request : data came from
    try:
        data = json.loads(request.body)
        print(data)
        client_email = data.get('client_id')
        client_profile = get_object_or_404(Profile, email=client_email)
        project_instance = Project.objects.create(
            project_name=data.get('projectname'),
            project_des=data.get('projectdescription'),
            start_date=data.get('dueDate'),
            deadline=data.get('dueDate'),
            client=client_profile,
            budget=data.get('probudget')
        )
       
        # Access the project_id
        new_project_id = project_instance.project_id
        project_id = get_object_or_404(Project, project_id=new_project_id)
        user_email = data.get('useremail')
        manager_profile = get_object_or_404(Profile, email=user_email)
        ProjectMember_instance = ProjectMember.objects.create(
            project = project_id,
            email = manager_profile ,
            role = 1,
            joined_on= timezone.now().date(),
            removed_on = None,

        )
        ProjectMember_instance.save()

       

        return Response({"projectadded":{'project_id':new_project_id}, "value":True})
    except Exception as e:
        print (e)
        return Response({"projectdetails":False, "value":False})
    
@api_view(['post'])
def projectcompletion(request):
    try:
        data = json.loads(request.body)
        print(data)
        projectno = data.get('projectno')
        # print('hii',useremail)
        totaltaskperprofile = Task.objects.filter(project=projectno).count()
        # taskdoneperproject=Task.objects.filter(project=projectno,completion_date !=null).count() 
        task_done_per_project = Task.objects.filter(project=projectno, completion_date__isnull=False).count()
        print(totaltaskperprofile)
        print(task_done_per_project)

        # profiledetail=profiledetails.to_dict()
        completiondetails={'taskdone':task_done_per_project,'totaltask':totaltaskperprofile}
        # print(completiondetails)
        return Response({"data":completiondetails,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})

    
@api_view(['post'])
def projectmanager(request):
    try:
        data = json.loads(request.body)
        print(data)
        projectno = data.get('projectno')
        # print('hii',useremail)
        ProjectManager = ProjectMember.objects.get(project=projectno,role=1)
        ProjectManagertodic= ProjectManager.to_projectmember_dict() 
        print(ProjectManagertodic)


        # profiledetail=profiledetails.to_dict()
        completiondetails={'data':ProjectManagertodic,'value':True}
        # print(completiondetails)
        return Response({"data":completiondetails,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})


@api_view(['POST'])
def uploadattachments(request, *args, **kwargs):
    try:
        # Access project_no from request.data
        project_no = request.data.get('project_no')
        
        # Access username from JSON data (assuming it's included in the FormData)
        username = request.data.get('useremail')
        
        clean_username = ''.join(char for char in username if char.isalnum())

        if request.method == 'POST':
            attachments = request.FILES.getlist('attachment')
            for attachment in attachments:
                folder_path = f'media/{clean_username}/Project/{project_no}/Attachment/'
                
                # Check if the folder exists, and create it if not
                if not os.path.exists(folder_path):
                    os.makedirs(folder_path)
                
                with open(os.path.join(folder_path, attachment.name), 'wb') as file:
                    for chunk in attachment.chunks():
                        file.write(chunk)

            return Response({'message': 'File uploaded successfully', 'value': True})
        else:
            return Response({'message': 'Invalid request method'}, status=405)
    except Exception as e:
        print(e)
        return Response({'message': str(e)}, status=500)





@api_view(['POST'])
def uploaddocument(request, *args, **kwargs):
    try:
        # Access project_no from request.data
        project_no = request.data.get('project_no')
        
        # Access username from JSON data (assuming it's included in the FormData)
        username = request.data.get('useremail')
        
        clean_username = ''.join(char for char in username if char.isalnum())

        if request.method == 'POST':
            attachments = request.FILES.getlist('attachment')
            for attachment in attachments:
                folder_path = f'media/{clean_username}/Project/{project_no}/Document/'
                
                # Check if the folder exists, and create it if not
                if not os.path.exists(folder_path):
                    os.makedirs(folder_path)
                
                with open(os.path.join(folder_path, attachment.name), 'wb') as file:
                    for chunk in attachment.chunks():
                        file.write(chunk)

            return Response({'message': 'File uploaded successfully', 'value': True})
        else:
            return Response({'message': 'Invalid request method'}, status=405)
    except Exception as e:
        print(e)
        return Response({'message': str(e)}, status=500)


#Team  member
    
@api_view(['post'])
def removeteammember(request):
    try:
        data = json.loads(request.body)
        print(data)
        project_no = data.get('project_id')
        email=data.get('usertoremove')
        print(project_no,email)
        ProjectMember_to_update = ProjectMember.objects.get(project=project_no,email=email) 
        ProjectMember_to_update.removed_on =  timezone.now()
        ProjectMember_to_update.save()

        return Response({"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})
    


@api_view(['post'])
def fetchclient(request):
    try:
           
        profiles = Profile.objects.filter(role=3)
        profile_list = [profile.client_to_dict() for profile in profiles]
        print(profile_list)
        # print(city_list)
        return Response({"data":profile_list,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})
    


@api_view(['post'])
def allmember(request):
    try:
 
        # Query for profiles with role 1 or 2
        profiles = Profile.objects.filter(role__in=[1,2])

        # Extract email and name from each profile
        allmemberprofiles_data = [{'email': profile.email, 'name': f"{profile.fname} {profile.lname}"}
                        for profile in profiles]


        print(allmemberprofiles_data)
        return Response({"data":allmemberprofiles_data,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})
    

@api_view(['post'])
def userinproject(request):
    try:
        data = json.loads(request.body)
        print(data)
        useremail = data.get('useremail')
        role = data.get('role')
        if (role==2):
            role=0
        projectmembers = ProjectMember.objects.filter(email=useremail,role=role,removed_on=None)
        allpojectinwhichthisuseris = [projectmember.to_projectuserin_dict() for projectmember in projectmembers]
        print(allpojectinwhichthisuseris)
        return Response({"data":allpojectinwhichthisuseris,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})
    
@api_view(['post'])
def projectmembers(request):
    try:
        data = json.loads(request.body)
        print(data)
        useremail = data.get('useremail')
        user_project_id=data.get('project_id')
        print(user_project_id)
        project_id = get_object_or_404(Project, project_id=user_project_id)
        projectmembers = ProjectMember.objects.filter(project=project_id,removed_on=None)
        allprojectmembers = [projectmember.to_projectmember_dict() for projectmember in projectmembers]

        print(allprojectmembers)
        return Response({"data":allprojectmembers,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})
    
@api_view(['post'])
def addteammembers(request):
    try:
        data = json.loads(request.body)
        print(data)
        useremail = data.get('useremail')
        selecteduser=data.get('selecteduser')
        print(selecteduser)
        project_id=data.get('project_id')
        print(project_id)
        your_project_instance= get_object_or_404(Project, project_id=project_id)
        for teammember in selecteduser:
            your_profile_instance= get_object_or_404(Profile, email=teammember['email'])
            project_member = ProjectMember.objects.create(
                project=your_project_instance,  
                email=your_profile_instance,    
                role=0,  
                joined_on=date.today(), 
                removed_on=None 
            )

        return Response({"data":"Profile Added","value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})
    





#profile component
    


@api_view(['post'])
def profileinfo(request):
    try:

        data = json.loads(request.body)
        print(data)
        useremail = data.get('useremail')
        print('hii',useremail)
        profiledetails = Profile.objects.get(email=useremail)
        profiledetail=profiledetails.to_dict()
        
        print(profiledetail)
        return Response({"data":profiledetail,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})
    

@api_view(['post'])
def allusers(request):
    try:

        data = json.loads(request.body)
        print(data)
        useremail = data.get('useremail')
        print('hii',useremail)
        profiledetails = Profile.objects.all()
        allprofile = [profile.to_dict() for profile in   profiledetails]

        print(allprofile)
        return Response({"data":allprofile,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})

@api_view(['post'])
def blockuser(request):
    try:

        data = json.loads(request.body)
        print(data)
        emailtoblock = data.get('email')
        userstatus = data.get('userstatus')

        # print('hii',useremail)
        profiledetail = Profile.objects.get(email=emailtoblock)
        if userstatus==0:
            profiledetail.user_status=1
        else:
            profiledetail.user_status=0
        profiledetail.save()

        return Response({"data":"Success","value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})
    


#task process
    
       
@api_view(['post'])
def taskassigntome(request):
    try:
        data = json.loads(request.body)
        print(data)
        useremail = data.get('useremail')

        profile_instance= get_object_or_404(Profile, email=useremail)
        tasks_of_users = Task.objects.filter(team_member = profile_instance)
        alltasks = [tasks_of_user.task_to_dict() for tasks_of_user in tasks_of_users]

        print(alltasks)
        return Response({"data":alltasks,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})
 

@api_view(['post'])
def taskassigntoother(request):
    try:
        data = json.loads(request.body)
        print(data)
        useremail = data.get('useremail')
        projectid=data.get('projectid')
        print(projectid)
        profile_instance= get_object_or_404(Profile, email=useremail)
        tasks_of_users = Task.objects.filter(manager = profile_instance,project=get_object_or_404(Project, project_id=projectid))
        alltasks = [tasks_of_user.task_to_dict() for tasks_of_user in tasks_of_users]

        print(alltasks)
        return Response({"data":alltasks,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})
    

@api_view(['post'])
def addtaskdetails(request):
    try:
        data = json.loads(request.body)
        print(data)
        # useremail = 
        task_instance = Task.objects.create(
        task_title=data.get('title'),
        task_desc=data.get('description'),
        start_date=data.get('taskstartdate'),
        completion_date=None,  # Assuming the task is not completed yet
        deadline=data.get('taskDueDate'),
        project=get_object_or_404(Project, project_id=data.get('project_id')),
        manager=get_object_or_404(Profile, email=data.get('username')),
        team_member=get_object_or_404(Profile, email=data.get('teammemberid'))
        )

        return Response({"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})



@api_view(['post'])
def teammembers(request):
    try:
        data = json.loads(request.body)
        print(data)
        useremail = data.get('useremail')
        user_project_id=data.get('project_no')
        print(user_project_id)
        project_id = get_object_or_404(Project, project_id=user_project_id)
        projectmembers = ProjectMember.objects.filter(project=project_id,removed_on=None,role=0)
        allprojectmembers = [projectmember.to_projectmember_dict() for projectmember in projectmembers]

        print(allprojectmembers)
        return Response({"data":allprojectmembers,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})


@api_view(['post'])
def modifytask(request):
    try:
        data = json.loads(request.body)

        task_id = data.get('taskid')  # Assuming 'task_id' is present in the data
        task_instance = get_object_or_404(Task, task_id=task_id)
        # Update the task fields
        task_instance.task_title = data.get('title')
        task_instance.task_desc = data.get('description')
        task_instance.start_date = data.get('taskstartdate')
        task_instance.deadline = data.get('taskDueDate')
        # Save the modified task instance
        task_instance.save()

        return Response({"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})
    



@api_view(['post'])
def taskcompleted(request):
    try:
        data = json.loads(request.body)

        task_id = data.get('taskid')  # Assuming 'task_id' is present in the data
        task_instance = get_object_or_404(Task, task_id=task_id)
        # Update the task fields
        task_instance.completion_date = timezone.now()
        # Save the modified task instance
        task_instance.save()

        return Response({"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})
    





# payment process
@api_view(['post'])
def viewpayment(request):
    try:
        data = json.loads(request.body)
        useremail = data.get('username')  # Assuming 'task_id' is present in the data
        role=data.get('role')
        if role==0:
            allprojects=Project.objects.all()
            allproject = [project.to_dict() for project in allprojects]
            print(allproject)
            allproject1=allproject
            # allprojectobj=[]
            for project in allproject:
                projectobj=get_object_or_404(Project, project_id=project['project_id'])
                try:
                    paymentdetails=Payment.objects.get(project=projectobj)
                    paymentdetail=paymentdetails.to_dict()
                    print(paymentdetail)
                    project_id_3 = next(project for project in allproject1 if project['project_id'] == paymentdetail['project']['id'])
                    # Add a new key-value pair to the dictionary
                    project_id_3['payment_info'] = paymentdetail
                except Exception as e:
                    print("")
            # print(allproject)
                   
        elif role==1:

            inprojects = ProjectMember.objects.filter(email=useremail,role=1)
            print(useremail)
            inprojectslist = [inproject.to_project_dict()['project'].project_id for inproject in inprojects]
            print("hello", inprojectslist)

            # Filter the Project queryset based on the list of project IDs
            allprojects = Project.objects.filter(project_id__in=inprojectslist)

            
            allproject = [project.to_dict() for project in allprojects]
            print(allproject)
            allproject1=allproject
            # allprojectobj=[]
            for project in allproject:
                projectobj=get_object_or_404(Project, project_id=project['project_id'])
                try:
                    paymentdetails=Payment.objects.get(project=projectobj)
                    paymentdetail=paymentdetails.to_dict()
                    print(paymentdetail)
                    project_id_3 = next(project for project in allproject1 if project['project_id'] == paymentdetail['project']['id'])
                    # Add a new key-value pair to the dictionary
                    project_id_3['payment_info'] = paymentdetail
                except Exception as e:
                    print("")
            # print(allproject)
        elif role==3:

            client_obj=get_object_or_404(Profile,email=useremail)
            
            allprojects = Project.objects.filter(client=client_obj)

            
            allproject = [project.to_dict() for project in allprojects]
            print(allproject)
            allproject1=allproject
            # allprojectobj=[]
            for project in allproject:
                projectobj=get_object_or_404(Project, project_id=project['project_id'])
                try:
                    paymentdetails=Payment.objects.get(project=projectobj)
                    paymentdetail=paymentdetails.to_dict()
                    print(paymentdetail)
                    project_id_3 = next(project for project in allproject1 if project['project_id'] == paymentdetail['project']['id'])
                    # Add a new key-value pair to the dictionary
                    project_id_3['payment_info'] = paymentdetail
                except Exception as e:
                    print("")
            # print(allproject)               
        return Response({"data":allproject,"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})


# Company Details 




@api_view(['post'])
def editcompany(request):
    try:
        data = json.loads(request.body)
        # data=request.data
        gstno=data.get('gstno')
        companyname=data.get('companyname')
        companyaddress=data.get('companyaddress')
        companyphone=data.get('companyphone')
        company = CompanyDetails.objects.get(gst_no=gstno)
        company.name=companyname
        company.address=companyaddress
        company.phone=companyphone
        company.save()
        return Response({"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})
    
@api_view(['post'])
def addcompany(request):
    try:
        data = json.loads(request.body)
        # data=request.data
        gstno=data.get('gstno')
        companyname=data.get('companyname')
        companyaddress=data.get('companyaddress')
        companyphone=data.get('companyphone')
        company = CompanyDetails.objects.create(gst_no=gstno,  company_name=companyname, address=companyaddress, phone=companyphone,)
        
        return Response({"value":True})
    except Exception as e:
        print(e)
        return Response({"data":"no data","value":False})