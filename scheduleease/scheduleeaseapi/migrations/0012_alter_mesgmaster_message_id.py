# Generated by Django 4.2.2 on 2024-02-17 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scheduleeaseapi', '0011_rename_receiver_mesg_mesgtran_mesg_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mesgmaster',
            name='message_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
