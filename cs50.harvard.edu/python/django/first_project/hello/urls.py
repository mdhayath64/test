from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name = "index"),
    path("mypage", views.redirect_page, name = "mypage"),
    path("hayath", views.hayath, name = "hayath"), 
    path("<str:name>", views.greet1, name = "greet") 
]
