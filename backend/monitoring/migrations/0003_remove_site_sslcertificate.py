# Generated by Django 4.0.3 on 2022-04-13 21:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring', '0002_rename_sites_site'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='site',
            name='sslCertificate',
        ),
    ]
