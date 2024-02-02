from django.urls import path
from . import views

urlpatterns = [
    path('', views.std_login, name='std_login'),
    path('my/', views.myCourses, name='myCourses'),
    path('facultyCourses/', views.facultyCourses, name='facultyCourses'),
    path('login/', views.std_login, name='std_login'),
    path('logout/', views.std_logout, name='std_logout'),
    path('my/<int:code>/', views.course_page, name='course'),
    path('profile/<str:id>/', views.profile, name='profile'),
    path('facultyProfile/<str:id>/', views.profile, name='profile_faculty'),
    path('faculty/<int:code>/', views.course_page_faculty, name='faculty'),
]
