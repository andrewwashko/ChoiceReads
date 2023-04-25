from rest_framework import serializers
from .models import Recommendation

class CustomRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = ["pk", "title", "author", "summary", "date_published", "google_books_link"]
