# Generated by Django 4.2.2 on 2024-01-06 13:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('scheduleeaseapi', '0002_city_companydetails_country_doctype_mesgmaster_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='city',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='scheduleeaseapi.city'),
        ),
    ]