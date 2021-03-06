# Generated by Django 3.2.2 on 2021-05-18 10:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0003_auto_20210516_1756'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pasangers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first', models.CharField(max_length=64)),
                ('last', models.CharField(max_length=64)),
                ('flights', models.ManyToManyField(blank=True, related_name='passengers', to='flights.Flight')),
            ],
        ),
    ]
