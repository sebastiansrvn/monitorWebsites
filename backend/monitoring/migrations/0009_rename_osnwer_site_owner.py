# Generated by Django 4.0.4 on 2022-05-05 21:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring', '0008_site_osnwer'),
    ]

    operations = [
        migrations.RenameField(
            model_name='site',
            old_name='osnwer',
            new_name='owner',
        ),
    ]