from flask import Flask, send_from_directory, request, jsonify
import webview
import threading
import os

from MenuManager import MenuManager

# Point Flask to the Angular 'dist' folder
dist_dir = os.path.abspath("C:\\Users\\Eliott\\MenuMaker\\FrontEnd\\menumaker\\dist\\menumaker\\browser")
menuMgr = MenuManager()
app = Flask(__name__, static_folder=dist_dir)

# 1. Route to serve the Angular application
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.get('/api/menu')
def get_menu():
    year = request.args.get('year')
    week = request.args.get('week')
    menu = menuMgr.RetrieveMenu(year, week)
    if menu == "":
        return menu, 400
    return menu, 200

# 2. Example Python API that your Angular app can call
@app.get('/api/Recipes')
def get_data():
    return menuMgr.RetrieveAllRecipes()

@app.post('/api/Recipes')
def post_recipes():
    data = request.get_data(as_text=True)
    code = 400
    if menuMgr.SaveNewRecipe(data):
        code = 200
    return '', code

@app.put('/api/Recipes')
def edit_recipe():
    data = request.get_data(as_text=True)
    id = request.args.get('id')
    code = 400
    if id is not None and menuMgr.EditRecipe(id, data):
        code = 200
    return '', code

@app.delete('/api/Recipes')
def delete_recipe():
    id = request.args.get('id')
    code = 400
    if id is not None and menuMgr.DeleteRecipe(id):
        code = 200
    return '', code

# Run the Flask server in a separate daemon thread
def start_flask():
    app.run(host='127.0.0.1', port=5000)

if __name__ == '__main__':
    # Start the server thread
    threading.Thread(target=start_flask, daemon=True).start()

    # Launch the pywebview desktop window
    webview.create_window('menuBuilder', 'http://127.0.0.1:5000')
    webview.start(debug=False)