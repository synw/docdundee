import requests

r = requests.get("https://httpbin.org/basic-auth/user/pass", auth=("user", "pass"))
data = r.json()
