"""Dependency-free local server. Binds to this computer only."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path
import webbrowser

if __name__ == '__main__':
    address=('127.0.0.1',8080)
    handler=partial(SimpleHTTPRequestHandler,directory=str(Path(__file__).parent.resolve()))
    print('Field Reference: http://localhost:8080 — Ctrl+C to stop')
    with ThreadingHTTPServer(address,handler) as server:
        webbrowser.open('http://localhost:8080')
        try: server.serve_forever()
        except KeyboardInterrupt: pass
