from rest_framework import serializers
from .models import *

class CustomRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = ["pk", "title", "author", "summary", "date_published", "google_books_link"]

class CustomQuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = ["pk","quote_text", "created_at"]