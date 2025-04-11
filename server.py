from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser
import os

def run_server(port=8000):
    # Cambiar al directorio del proyecto
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Crear el servidor
    server_address = ('', port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    
    # Abrir el navegador automáticamente
    url = f'http://localhost:{port}'
    print(f'Iniciando servidor en {url}')
    webbrowser.open(url)
    
    # Iniciar el servidor
    print('Presiona Ctrl+C para detener el servidor')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nServidor detenido')

if __name__ == '__main__':
    run_server() 