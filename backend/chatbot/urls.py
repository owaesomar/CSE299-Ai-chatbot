from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import LoginView, LogoutView, ChatbotResponseView, SignUpView, ChatHistoryView

urlpatterns = [
    # ✅ Use LoginView instead of TokenObtainPairView
    path('login/', LoginView.as_view(), name='login'),

    # Token refresh
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Logout (blacklist refresh token)
    path('logout/', LogoutView.as_view(), name='logout'),

    # Chatbot endpoints
    path('chatbot/', ChatbotResponseView.as_view(), name='chatbot'),
    path('chat-history/', ChatHistoryView.as_view(), name='chat_history'),

    # User signup
    path('signup/', SignUpView.as_view(), name='signup'),
]
