from django.shortcuts import render
import requests
import json
from django.core import serializers
from django.http import HttpResponse ,JsonResponse
def ChatBotAPI(data):
    url = "https://api.blackbox.ai/api/chat"

    payload = json.dumps({
        
    "messages": [
        {
        "content": f"{data}",
        "role": "user"
        }
    ],
    "model": "deepseek-ai/DeepSeek-V3",
    "max_tokens": "1024"
    })
    headers = {
    'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)
    
    return response.text


def home(request):
    
    return render(request, 'home.html')


def getbotreply(request): 
    if request.method == 'GET':
        prompt=request.GET.get("prompt")
        bot_response = ChatBotAPI(prompt)
        print(prompt)
        print(bot_response)
        ele=json.dumps({
            "reply":bot_response,
        })
        return JsonResponse(ele,safe=False)
    