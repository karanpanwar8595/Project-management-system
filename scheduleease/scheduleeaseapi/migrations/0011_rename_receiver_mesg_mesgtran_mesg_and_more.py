# Generated by Django 4.2.2 on 2024-02-17 15:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('scheduleeaseapi', '0010_alter_companydetails_gst_no'),
    ]

    operations = [
        migrations.RenameField(
            model_name='mesgtran',
            old_name='receiver_mesg',
            new_name='mesg',
        ),
        migrations.RemoveField(
            model_name='mesgmaster',
            name='mesg_date',
        ),
        migrations.RemoveField(
            model_name='mesgtran',
            name='sender_mesg',
        ),
    ]
