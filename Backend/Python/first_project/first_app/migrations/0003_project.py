# Generated by Django 4.0 on 2022-03-15 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('first_app', '0002_company_employee'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.CharField(max_length=264, unique=True)),
                ('employee_name', models.ManyToManyField(to='first_app.Employee')),
            ],
        ),
    ]