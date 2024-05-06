from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app) 

model = joblib.load('model/model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  
    print(data,"DATA")
    prediction = model.predict(data)
    return jsonify({'predicted_sales_total': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
