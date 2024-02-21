from django.db import models

class Profile(models.Model):
    class Meta:
        db_table = 'Profile'
    email = models.CharField(max_length=50, primary_key=True)
    password = models.CharField(max_length=40)
    photo = models.CharField(max_length=60)
    fname = models.CharField(max_length=40)
    mname = models.CharField(max_length=40, null=True)
    lname = models.CharField(max_length=40, null=True)
    role = models.SmallIntegerField()
    gender = models.SmallIntegerField(null=True)
    dob = models.DateField()
    city = models.ForeignKey('City', on_delete=models.CASCADE,null=True)
    user_status = models.SmallIntegerField()
    profile_status = models.SmallIntegerField()
    gst_no = models.ForeignKey('CompanyDetails', on_delete=models.CASCADE, null=True)

    def _str_(self):
        return self.email
    
    def login_to_dict(self):
        return {
            'email': self.email,
            'role': self.role,
            'user_status': self.user_status,
            'name':self.fname +" "+self.lname,
        }
    def project_to_dict(self):
        return {
            'email': self.email,
            'name':self.fname+" "+self.lname,
            'gst_no': self.gst_no.to_dict() if self.gst_no else None,
        }
    
    def to_dict(self):
        return {
            'email': self.email,
            'photo': self.photo,
            'name':self.fname+" "+self.lname,
            'fname': self.fname,
            'mname': self.mname,
            'lname': self.lname,
            'role': self.role,
            'gender': self.gender,
            'dob': str(self.dob),  # Convert DateField to string representation
            'city': self.city.profile_to_dict() if self.city else None,  # Assuming City model has a to_dict method
            'user_status': self.user_status,
            'profile_status': self.profile_status,
            'gst_no': self.gst_no.to_dict() if self.gst_no else None,
        }
    
    def client_to_dict(self):
        return{
            'email': self.email,
            'name': self.fname+self.mname+self.lname,
        }

class Project(models.Model):
    class Meta:
        db_table = 'Project'
    project_id = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=20)
    start_date = models.DateField()
    deadline = models.DateField()
    project_des = models.CharField(max_length=1000, null=True)
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    client = models.ForeignKey(Profile, on_delete=models.CASCADE)
    def to_dict(self):
        return {
            'project_id': self.project_id,
            'project_name': self.project_name,
            'start_date': str(self.start_date),
            'deadline': str(self.deadline),
            'project_des': self.project_des,
            'budget': float(self.budget) if self.budget is not None else None,
            'client': self.client.to_dict() if self.client else None,
            }
    
    def to_projectuserin_dict(self):
        return {
            'id': self.project_id,
            'name': self.project_name,
            
            }
    def _str_(self):
        return self.project_name
    
    def to_projectmanager_dict(self):
        return {
            'id': self.project_id,
            'name': self.project_name,
            'startDate': self.start_date,
            'dueDate': self.deadline,
            'projectDescription': self.project_des,
            'budget': float(self.budget) if self.budget is not None else None,
            'client': self.client.project_to_dict() if self.client is not None else None,
        }
    
    def to_projectadmin_dict(self):
        return {
            'id': self.project_id,
            'name': self.project_name,
            'startDate': self.start_date,
            'dueDate': self.deadline,
            'projectDescription': self.project_des,
            'budget': float(self.budget) if self.budget is not None else None,
            'client': self.client.project_to_dict() if self.client is not None else None,
        }
    
    def to_projectteam_dict(self):
        return {
            'id': self.project_id,
            'name': self.project_name,
            'startDate': self.start_date,
            'dueDate': self.deadline,
            'projectDescription': self.project_des,
            'budget': float(self.budget) if self.budget is not None else None,
            'client': self.client.project_to_dict() if self.client is not None else None,
            }

class ProjectMember(models.Model):
    class Meta:
        db_table = 'ProjectMember'
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    email = models.ForeignKey(Profile, on_delete=models.CASCADE)
    role = models.SmallIntegerField()
    joined_on = models.DateField()
    removed_on = models.DateField(null=True)

    def project_detail_team_to_dict(self):
        return {
             
            'email': self.email.to_dict(),  
            
            }
    def to_dict(self):
        return {
            'project': self.project.to_dict(),  
            'email': self.email.to_dict(),  
            'role': self.role,
            'joined_on': str(self.joined_on),
            'removed_on': str(self.removed_on) if self.removed_on else None,
        }
    def to_projectuserin_dict(self):
        return {
            'projects': self.project.to_projectuserin_dict(), 
            'role': self.role,
            
        }
    def to_projectmember_dict(self):
        return{
            'member': self.email.to_dict(),
            'role': self.role,
            'joined_on': str(self.joined_on),
            'removed_on': str(self.removed_on) if self.removed_on else None,
        }
    def to_project_dict(self):
        return{
            'project':self.project,
        }

    def tasktome(self):
        return{
            'project':self.project,
        }

class Task(models.Model):
    class Meta:
        db_table = 'Task'
    task_id = models.AutoField(primary_key=True)
    task_title = models.CharField(max_length=20)
    task_desc = models.CharField(max_length=50)
    start_date = models.DateField()
    completion_date = models.DateField(null=True)
    deadline = models.DateField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    manager = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='manager_tasks')
    team_member = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='team_member_tasks')

    def _str_(self):
        return self.task_title
    
    def to_dict(self):
        return {
            'task_id': self.task_id,
            'task_title': self.task_title,
            'task_desc': self.task_desc,
            'start_date': str(self.start_date),
            'completion_date': str(self.completion_date) if self.completion_date else None,
            'deadline': str(self.deadline),
            'project_id': self.project,
            'manager_id': self.manager,
            'team_member_id': self.team_member,
        }
    def task_to_dict(self):
        return {
            'task_id': self.task_id,
            'task_title': self.task_title,
            'task_desc': self.task_desc,
            'start_date': str(self.start_date),
            'completion_date': str(self.completion_date) if self.completion_date else None,
            'deadline': str(self.deadline),
            'project_id': self.project.to_projectuserin_dict(),
            'manager_id': self.manager.to_dict(),
            'team_member_id': self.team_member.to_dict(),
        }

class MesgMaster(models.Model):
    class Meta:
        db_table = 'MesgMaster'
    message_id = models.AutoField(primary_key=True)
    # mesg_date = models.DateField()
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='received_messages')
    def to_dict(self):
        return {
            'message_id': self.message_id,
            'sender': self.sender.to_dict(),
            'receiver': self.receiver.to_dict(),
        }


class MesgTran(models.Model):
    class Meta:
        db_table = 'MesgTran'
    message = models.ForeignKey(MesgMaster, on_delete=models.CASCADE)
    # sender_mesg = models.CharField(max_length=500, null=True)
    mesg = models.CharField(max_length=500, null=True)
    def to_dict(self):
        return {
            'message': self.message.to_dict(),
            'mesg': self.mesg,
        }

class Payment(models.Model):
    class Meta:
        db_table = 'Payment'
    transaction_id = models.IntegerField(primary_key=True)
    amount = models.IntegerField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    client = models.ForeignKey(Profile, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    def to_dict(self):
        return {
            'transaction_id': self.transaction_id,
            'amount': self.amount,
            'project': self.project.to_projectuserin_dict(),  # Assuming Project also has a to_dict method
            'client': self.client.client_to_dict(),    # Assuming Profile also has a to_dict method
            'date_time': self.date_time.isoformat(),
        }

class ProfileDocument(models.Model):
    class Meta:
        db_table = 'ProfileDocument'
    email_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    doc_path = models.CharField(max_length=500, unique=True)
    doc_type = models.ForeignKey('DocType', on_delete=models.CASCADE)
    
class ProjectDocument(models.Model):
    class Meta:
        db_table = 'ProjectDocument'
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    doc_path = models.CharField(max_length=500, unique=True)
    doc_access = models.SmallIntegerField()

class TaskDocument(models.Model):
    class Meta:
        db_table = 'TaskDocument'
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    doc_path = models.CharField(max_length=500, unique=True)

class DocType(models.Model):
    class Meta:
        db_table = 'DocType'
    doc_type_id = models.SmallIntegerField(primary_key=True)
    doc_type_name = models.CharField(max_length=20)

class Country(models.Model):
    class Meta:
        db_table = 'Country'
    country_id = models.IntegerField(primary_key=True)
    country_name = models.CharField(max_length=30)

    def to_dict(self):
        return{
            'id':self.country_id,
            'name':self.country_name,

        }


class State(models.Model):
    class Meta:
        db_table = 'State'
    state_id = models.IntegerField(primary_key=True)
    state_name = models.CharField(max_length=30)
    country= models.ForeignKey(Country, on_delete=models.CASCADE)

    def to_dict(self):
        return{
            'id':self.state_id,
            'name':self.state_name,
        }
    def profile_to_dict(self):
        return{
            'id':self.state_id,
            'name':self.state_name,
            'country_id':self.country.to_dict(),

        }

class City(models.Model):
    class Meta:
        db_table = 'City'
    city_id = models.IntegerField(primary_key=True)
    city_name = models.CharField(max_length=30)
    state= models.ForeignKey(State, on_delete=models.CASCADE)

    def to_dict(self):
        return{
            'id':self.city_id,
            'name':self.city_name,

        }
    def profile_to_dict(self):
        return{
            'id':self.city_id,
            'name':self.city_name,
            'state_id':self.state.profile_to_dict(),

            
        }

class CompanyDetails(models.Model):
    class Meta:
        db_table = 'CompanyDetails'
    gst_no = models.CharField(max_length=15, primary_key=True)
    company_name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=10)

    def to_dict(self):
        return {
            'gst_no': self.gst_no,
            'name': self.company_name,
            'address': self.address,
            'phone': self.phone,
        }


