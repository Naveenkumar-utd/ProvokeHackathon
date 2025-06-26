from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    transcript = data.get("transcript", "")

    # Simulated response for now
    tasks = [
        {
            "task": "Fix Stripe timeout issue",
            "status": "Already Exists"
        },
        {
            "task": "Add iframe bug fix for Safari",
            "status": "Not Found"
        }
    ]
    return jsonify(tasks)

if __name__ == "__main__":
    app.run(debug=True)
