import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'rag_backend'))

# Set up minimal environment
os.environ.setdefault("GEMINI_API_KEY", "fake_key_for_testing")
os.environ.setdefault("QDRANT_URL", "http://localhost:6333")
os.environ.setdefault("DATABASE_URL", "sqlite:///./test.db")

from rag_backend.main import app
import uvicorn
from fastapi.testclient import TestClient

def test_auth_endpoints():
    """Test the authentication endpoints using FastAPI's test client"""
    client = TestClient(app)

    print("Testing authentication endpoints...")

    # Test health check
    response = client.get("/health")
    print(f"Health check: {response.status_code}")
    if response.status_code == 200:
        print(f"  Health response: {response.json()}")
    else:
        print(f"  Health check failed: {response.text}")

    # Test signup
    print("\nTesting signup endpoint...")
    signup_data = {
        "email": "test@example.com",
        "password": "secure123",  # Shorter password to avoid bcrypt length limits
        "hardware_exp": "beginner",
        "software_exp": "intermediate",
        "robotics_level": "beginner",
        "goals": "Learning ROS2 fundamentals"
    }

    try:
        response = client.post("/api/auth/signup", json=signup_data)
        print(f"Signup response: {response.status_code}")
        if response.status_code == 201:
            signup_result = response.json()
            print(f"  Signup successful: {signup_result['email']}")
            token = signup_result['token']
        else:
            print(f"  Signup failed: {response.text}")
            token = None
    except Exception as e:
        print(f"  Signup error: {e}")
        token = None

    # Test login
    print("\nTesting login endpoint...")
    login_data = {
        "email": "test@example.com",
        "password": "securepassword123"
    }

    try:
        response = client.post("/api/auth/login", json=login_data)
        print(f"Login response: {response.status_code}")
        if response.status_code == 200:
            login_result = response.json()
            print(f"  Login successful: {login_result['email']}")
            token = login_result['token']  # Use login token if signup failed
        else:
            print(f"  Login failed: {response.text}")
    except Exception as e:
        print(f"  Login error: {e}")

    # Test profile access (if we have a token)
    if token:
        print("\nTesting profile endpoint...")
        headers = {"Authorization": f"Bearer {token}"}
        try:
            response = client.get("/api/auth/profile", headers=headers)
            print(f"Profile response: {response.status_code}")
            if response.status_code == 200:
                profile_result = response.json()
                print(f"  Profile access successful: {profile_result['email']}")
            else:
                print(f"  Profile access failed: {response.text}")
        except Exception as e:
            print(f"  Profile access error: {e}")

    # Test RAG endpoint with and without token
    print("\nTesting RAG ask endpoint...")
    ask_data = {"question": "What is ROS2?"}

    # Without auth
    try:
        response = client.post("/api/ask", json=ask_data)
        print(f"Ask without auth: {response.status_code}")
    except Exception as e:
        print(f"  Ask without auth error: {e}")

    # With auth (if we have a token)
    if token:
        headers = {"Authorization": f"Bearer {token}"}
        try:
            response = client.post("/api/ask", json=ask_data, headers=headers)
            print(f"Ask with auth: {response.status_code}")
        except Exception as e:
            print(f"  Ask with auth error: {e}")

    print("\nAuthentication endpoint testing completed!")

if __name__ == "__main__":
    test_auth_endpoints()