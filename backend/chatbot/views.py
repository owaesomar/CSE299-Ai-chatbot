from django.contrib.auth import authenticate  # ✅ Import this
from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import ChatHistory
from .serializers import ChatHistorySerializer, UserSerializer

# ✅ User Signup
class SignUpView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ User Login
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)  # ✅ Now it works
        
        if user is not None:
            refresh = RefreshToken.for_user(user)  # ✅ Generate JWT tokens
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            })
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# ✅ Logout (Blacklists Token)
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()  # ✅ Blacklist refresh token
            return Response({"message": "Logout successful"}, status=200)
        except Exception:
            return Response({"error": "Invalid token"}, status=400)

# ✅ Chatbot Response
class ChatbotResponseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_message = request.data.get('message', '')
        
        # Create a simple bot response (this is where your chatbot logic goes)
        responses = {
            "hello": "Hi there! How can I help you today?",
            "sad": "I'm sorry to hear that. Would you like some coping strategies?",
            "stress": "Try deep breathing exercises. Would you like more suggestions?",
        }
        bot_response = responses.get(user_message.lower(), "I'm here to help. Can you tell me more?")
        
        # Save the chat entry to the database
        chat = ChatHistory.objects.create(
            user=request.user,
            user_message=user_message,
            bot_response=bot_response
        )
        
        serializer = ChatHistorySerializer(chat)
        return Response({
            "response": bot_response,
            "chat": serializer.data
        }, status=status.HTTP_200_OK)

# ✅ Chat History
class ChatHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        chats = ChatHistory.objects.filter(user=request.user).order_by("-timestamp")
        serializer = ChatHistorySerializer(chats, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        chat = ChatHistory.objects.create(user=request.user, user_message="", bot_response="")
        serializer = ChatHistorySerializer(chat)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
