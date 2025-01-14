# Generated by Django 4.2.2 on 2023-12-07 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TASK_TBL',
            fields=[
                ('TASK_ID', models.AutoField(primary_key=True, serialize=False)),
                ('TASK_TITLE', models.CharField(max_length=255)),
                ('TASK_DESC', models.TextField()),
                ('START_DATE', models.DateField()),
                ('COMPLETION_DATE', models.DateField(blank=True, null=True)),
                ('DEADLINE', models.DateField()),
                ('PROJECT_ID', models.IntegerField()),
                ('MANAGER_ID', models.IntegerField()),
                ('TEAM_MEMBER_ID', models.IntegerField()),
            ],
        ),
    ]
