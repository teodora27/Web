import http.server
import socketserver

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path != "/404.html" and not self.path.endswith(".html") and not self.path.startswith("/imagini") and not self.path.startswith("/styles") and not self.path.startswith("/info"):
            self.path = '/404.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

handler_object = MyHttpRequestHandler

PORT = 8000
my_server = socketserver.TCPServer(("", PORT), handler_object)

my_server.serve_forever()
