import http.server
import socketserver
import threading
import urllib.request
import time

PORT = 3000

class Handler(http.server.SimpleHTTPRequestHandler):
    pass

def keep_alive():
    while True:
        time.sleep(10)
        try:
            urllib.request.urlopen(f'http://localhost:{PORT}/')
        except:
            pass

# Start keep-alive thread
t = threading.Thread(target=keep_alive, daemon=True)
t.start()

# Start server
with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Server running at http://localhost:{PORT}")
    httpd.serve_forever()
