# Version 2.0 - 11/18/2023 - Moved & updated files to enable backend modifications

from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='templates', static_folder='static')

#Run index.html
@app.route('/')
def index():
    return render_template('index.html')

# add_task() receives the most recent submitted task
@app.route('/api/add_task', methods=['POST'])
def add_task():
    data = request.get_json()
    task = data.get('task')
    
    print(f"Task submitted: {task}")

    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(debug=True)