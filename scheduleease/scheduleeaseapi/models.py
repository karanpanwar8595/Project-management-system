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
        }
    
    def to_dict(self):
        return {
            'email': self.email,
            'password': self.password,
            'photo': self.photo,
            'fname': self.fname,
            'mname': self.mname,
            'lname': self.lname,
            'role': self.role,
            'gender': self.gender,
            'dob': str(self.dob),  # Convert DateField to string representation
            'city': self.city.to_dict() if self.city else None,  # Assuming City model has a to_dict method
            'user_status': self.user_status,
            'profile_status': self.profile_status,
            'gst_no': self.gst_no.to_dict() if self.gst_no else None,  # Assuming CompanyDetails model has a to_dict method
        }

class Project(models.Model):
    class Meta:
        db_table = 'Project'
    project_id = models.IntegerField(primary_key=True)
    project_name = models.CharField(max_length=20)
    start_date = models.DateField()
    deadline = models.DateField()
    project_des = models.CharField(max_length=1000, null=True)
    client = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def _str_(self):
        return self.project_name

class ProjectMember(models.Model):
    class Meta:
        db_table = 'ProjectMember'
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    email = models.ForeignKey(Profile, on_delete=models.CASCADE)
    role = models.SmallIntegerField()
    joined_on = models.DateField()
    removed_on = models.DateField(null=True)

class Task(models.Model):
    class Meta:
        db_table = 'Task'
    task_id = models.IntegerField(primary_key=True)
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

class MesgMaster(models.Model):
    class Meta:
        db_table = 'MesgMaster'
    message_id = models.IntegerField(primary_key=True)
    mesg_date = models.DateField()
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='received_messages')

class MesgTran(models.Model):
    class Meta:
        db_table = 'MesgTran'
    message = models.ForeignKey(MesgMaster, on_delete=models.CASCADE)
    sender_mesg = models.CharField(max_length=500, null=True)
    receiver_mesg = models.CharField(max_length=500, null=True)

class Payment(models.Model):
    class Meta:
        db_table = 'Payment'
    transaction_id = models.IntegerField(primary_key=True)
    amount = models.IntegerField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    client = models.ForeignKey(Profile, on_delete=models.CASCADE)
    date_time = models.DateTimeField()

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

class CompanyDetails(models.Model):
    class Meta:
        db_table = 'CompanyDetails'
    gst_no = models.IntegerField(primary_key=True)
    company_name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=10)
