
import sys
import threading
import webbrowser
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit, unquote

if getattr(sys, "frozen", False):
    BASE_DIR = Path(sys._MEIPASS)
else:
    BASE_DIR = Path(__file__).resolve().parent.parent

DIST_DIR = BASE_DIR / "dist"
HOST = "127.0.0.1"
PORT = 8080


class SPAHandler(SimpleHTTPRequestHandler):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIST_DIR), **kwargs)

    def do_GET(self):
        requested_path = unquote(urlsplit(self.path).path)
        candidate = (DIST_DIR / requested_path.lstrip("/")).resolve()

        # Unknown frontend routes should load Vue's index.html.
        if not candidate.is_file() and not Path(requested_path).suffix:
            self.path = "/"

        super().do_GET()


if __name__ == "__main__":
    if not (DIST_DIR / "index.html").exists():
        print("ERROR: dist/index.html not found!")
        input("Press Enter to exit...")
        sys.exit(1)

    url = f"http://{HOST}:{PORT}"

    try:
        server = ThreadingHTTPServer((HOST, PORT), SPAHandler)
    except OSError as error:
        print(f"Could not start server: {error}")
        input("Press Enter to exit...")
        sys.exit(1)

    print("RS Cargo is starting...")
    print(f"Open: {url}")

    threading.Timer(1.5, lambda: webbrowser.open(url)).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping RS Cargo...")
    finally:
        server.server_close()
