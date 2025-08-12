# **Zero Trust and Decentralization in Medical Records with Privacy-Preserving AI**

This project combines **Zero Trust Architecture**, **Homomorphic Encryption**, and **Blockchain Technology** to securely manage and utilize medical records. It facilitates privacy-preserving machine learning for cardiovascular disease prediction, ensuring the highest standards of data integrity, confidentiality, and usability.



Trust issues and centralized systems are at the heart of the challenge of maintaining privacy and security in medical data management. Centralized data storage creates vulnerabilities to cyber threats and data leaks, undermining user confidence. These issues not only compromise the confidentiality and integrity of medical records but also raise ethical concerns about data misuse. Such challenges discourage the adoption of AI in healthcare, obstructing the realization of its lifesaving potential.

---

## **Project Overview**

### **Medical Record Security System**

This system provides a decentralized, blockchain-secured platform for medical records storage, ensuring access only through a Zero Trust model. It enables data sharing with researchers by preserving patient privacy through homomorphic encryption techniques.

### **Cardiovascular Disease Prediction**

The project also includes machine learning models developed to predict cardiovascular diseases using homomorphic encryption. This ensures that sensitive medical data remains encrypted during AI model inference.

---

## **Features**

### **Medical Record System**

1. **Zero Trust Access Control:** Strict authentication and role-based access for patients, providers, and researchers.
2. **Blockchain for Integrity:** Ensures tamper-proof storage of medical records with a blockchain-inspired hashing mechanism.
3. **Homomorphic Encryption:** Encrypts sensitive data using Fully Homomorphic Encryption (FHE).
4. **File Management:** Supports uploading, downloading, and verification of medical records.
5. **Research Integration:** Allows researchers to utilize encrypted datasets for AI model training and evaluation.

### **Privacy-Preserving AI**

1. **Baseline and Encrypted Models:** Implements logistic regression and neural networks with both plaintext and encrypted computations.
2. **Homomorphic Encryption for AI:** Protects privacy by encrypting test data during inference using Paillier and CKKS schemes.
3. **Dataset Integration:** Utilizes the `cardiovascular_disease_prediction_dataset.csv` for AI model development.

---

## **Technologies Used**

### **Backend**

- **FastAPI**: Web framework for API development.
- **Uvicorn**: ASGI server for FastAPI.
- **Boto3**: AWS SDK for Filebase S3 integration.
- **python-dotenv**: Environment variable management.
- **Aiofiles**: Asynchronous file handling.
- **Blockchain Framework:** Custom implementation for data integrity.

### **Frontend**

- **React.js**: Frontend framework.
- **Axios**: HTTP client for API communication.
- **Vite**: Build tool for modern frontend development.

### **AI Models and Encryption**

- **scikit-learn**: Machine learning library.
- **phe**: Paillier encryption library.
- **TenSEAL**: CKKS-based homomorphic encryption.
- **NumPy** and **Pandas**: Data manipulation.
- **Matplotlib** and **Seaborn**: Visualization.

---

## **Folder Structure**

```
Project/  
│  
├── backend/  
│   ├── main.py               # Main backend application  
│   ├── requirements.txt      # Python dependencies  
│   ├── .env                  # Environment variables  
│   ├── blockchain/           # Blockchain logic  
│   ├── encryption/           # Encryption utilities  
│   └── logs/                 # Backend logs  
│  
├── frontend/  
│   ├── public/               # Static assets  
│   ├── src/                  # React.js components  
│   │   ├── App.js            # Main app logic  
│   ├── package.json          # Frontend dependencies  
│   └── vite.config.js        # Vite configuration  
├── ai_models/  
│   ├── data/                
│   │   └── cardiovascular_disease_prediction_dataset.csv  
│   ├── notebooks/           # Jupyter notebooks  
│   └── results/              # Results and metrics  
└── README.md                 # Documentation  
```

---

## **Setup Instructions**

### **Backend Setup**

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>/backend
   ```

2. Create a virtual environment (optional):

   ```bash
   python -m venv venv
   source venv/bin/activate  # For Linux/Mac
   venv\Scripts\activate     # For Windows
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Configure the `.env` file:

   ```plaintext
   ACCESS_KEY=your-access-key
   SECRET_KEY=your-secret-key
   BUCKET_NAME=your-bucket-name
   FILEBASE_ENDPOINT=https://s3.filebase.com
   ```

5. Start the backend server:

   ```bash
   uvicorn main:app --reload
   ```

6. Access the backend at:

   ```
   ```

[http://localhost:8000](http://localhost:8000)

````

### **Frontend Setup**

1. Navigate to the `frontend` folder:
```bash
cd ../frontend
````

2. Install Node.js dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser at:

   ```
   http://localhost:5173
   ```

---

## **API Endpoints**

### 1. **Health Check**

- **URL:** `/health`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "status": "healthy",
    "timestamp": "<current-timestamp>"
  }
  ```

### 2. **File Upload**

- **URL:** `/upload`
- **Method:** `POST`
- **Input:** File (`multipart/form-data`)
- **Response:**
  ```json
  {
    "message": "File uploaded successfully",
    "file_url": "<file-url>",
    "file_hash": "<file-hash>"
  }
  ```

### 3. **Verify File**

- **URL:** `/verify`
- **Method:** `POST`
- **Input:**
  ```json
  {
    "file_name": "<file-name>",
    "file_hash": "<file-hash>"
  }
  ```
- **Response:**
  ```json
  {
    "status": "verified",
    "blockchain_data": [
      { "index": 1, "hash": "<file-hash>", "timestamp": "<timestamp>" }
    ]
  }
  ```

---

## **Results (AI Models)**

| Model                           | Accuracy (%) | Computational Overhead |
| ------------------------------- | ------------ | ---------------------- |
| Logistic Regression (Plaintext) | 96.67        | Low                    |
| Paillier Logistic Regression    | 96.67        | Moderate               |
| CKKS Logistic Regression        | 96.67        | Low                    |
| CKKS Neural Network             | 75.00        | High                   |

# Screenshots

Below are the screenshots of the key pages of the application:

### Main Page

[![Main Page](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20101945.png)](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20101945.png)

### Upload Page

[![Upload Page](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102005.png)](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102005.png)

### Verify Page

[![Verify Page](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102016.png)](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102016.png)

### History Page

[![History Page](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102038.png)](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102038.png)

### Sign In Page

|[![Sign In Page](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102055.png)](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102055.png) 
---

# Screenshots

| Main Page           | Upload Page         | Verify Page         | History Page        | Sign In    |
|---------------------|---------------------|---------------------|---------------------|-----------------------|
| [![Main Page](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20101945.png)](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20101945.png) | [![Upload Page](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102005.png)](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102005.png) | [![Verify Page](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102016.png)](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102016.png) | [![History Page](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102038.png)](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102038.png) |[![Sign In Page](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102055.png)](https://raw.githubusercontent.com/codehat01/0x.day/refs/heads/main/screenshots/Screenshot%202024-12-30%20102055.png) |


## **Future Directions**

1. Expand neural network models for encrypted datasets.
2. Integrate real-world medical datasets for broader testing, such as the MIMIC-III Clinical Database, the eICU Collaborative Research Database, or publicly available cardiovascular health datasets.
3. Optimize blockchain and encryption algorithms for scalability.



