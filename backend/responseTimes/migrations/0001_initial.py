# Generated by Django 4.0.4 on 2022-05-04 20:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ResponseTime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('siteID', models.IntegerField()),
                ('responseTime', models.FloatField()),
                ('timeRecorded', models.DateTimeField(null=True)),
            ],
        ),
    ]
