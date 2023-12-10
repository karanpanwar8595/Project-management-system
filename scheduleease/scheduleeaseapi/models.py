from django.db import models

class Profile(models.Model):
    email = models.CharField(max_length=50, primary_key=True)
    password = models.CharField(max_length=40)
    photo = models.CharField(max_length=60)
    fname = models.CharField(max_length=40)
    mname = models.CharField(max_length=40, null=True)
    lname = models.CharField(max_length=40, null=True)
    role = models.SmallIntegerField()
    gender = models.SmallIntegerField(null=True)
    dob = models.DateField()
    city = models.ForeignKey('City', on_delete=models.CASCADE)
    user_status = models.SmallIntegerField()
    profile_status = models.SmallIntegerField()
    gst_no = models.ForeignKey('CompanyDetails', on_delete=models.CASCADE, null=True)

    def _str_(self):
        return self.email

class Project(models.Model):
    project_id = models.IntegerField(primary_key=True)
    project_name = models.CharField(max_length=20)
    start_date = models.DateField()
    deadline = models.DateField()
    project_des = models.CharField(max_length=1000, null=True)
    client = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def _str_(self):
        return self.project_name

class ProjectMember(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    email = models.ForeignKey(Profile, on_delete=models.CASCADE)
    role = models.SmallIntegerField()
    joined_on = models.DateField()
    removed_on = models.DateField(null=True)

class Task(models.Model):
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
    message_id = models.IntegerField(primary_key=True)
    mesg_date = models.DateField()
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='received_messages')

class MesgTran(models.Model):
    message = models.ForeignKey(MesgMaster, on_delete=models.CASCADE)
    sender_mesg = models.CharField(max_length=500, null=True)
    receiver_mesg = models.CharField(max_length=500, null=True)

class Payment(models.Model):
    transaction_id = models.IntegerField(primary_key=True)
    amount = models.IntegerField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    client = models.ForeignKey(Profile, on_delete=models.CASCADE)
    date_time = models.DateTimeField()

class ProfileDocument(models.Model):
    email_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    doc_path = models.CharField(max_length=500, unique=True)
    doc_type = models.ForeignKey('DocType', on_delete=models.CASCADE)
    
class ProjectDocument(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    doc_path = models.CharField(max_length=500, unique=True)
    doc_access = models.SmallIntegerField()

class TaskDocument(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    doc_path = models.CharField(max_length=500, unique=True)

class DocType(models.Model):
    doc_type_id = models.SmallIntegerField(primary_key=True)
    doc_type_name = models.CharField(max_length=20)

class Country(models.Model):
    country_id = models.IntegerField(primary_key=True)
    country_name = models.CharField(max_length=30)

class State(models.Model):
    state_id = models.IntegerField(primary_key=True)
    state_name = models.CharField(max_length=30)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

class City(models.Model):
    city_id = models.IntegerField(primary_key=True)
    city_name = models.CharField(max_length=30)
    state = models.ForeignKey(State, on_delete=models.CASCADE)

class CompanyDetails(models.Model):
    gst_no = models.IntegerField(primary_key=True)
    company_name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=10)