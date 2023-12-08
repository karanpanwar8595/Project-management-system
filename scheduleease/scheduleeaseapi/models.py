from django.db import models

class TASK_TBL(models.Model):
    TASK_ID = models.AutoField(primary_key=True)
    TASK_TITLE = models.CharField(max_length=255)
    TASK_DESC = models.TextField()
    START_DATE = models.DateField()
    COMPLETION_DATE = models.DateField(null=True, blank=True)
    DEADLINE = models.DateField()
    PROJECT_ID = models.IntegerField()
    MANAGER_ID = models.IntegerField()
    TEAM_MEMBER_ID = models.IntegerField()

    def __str__(self):
        return self.TASK_TITLE
