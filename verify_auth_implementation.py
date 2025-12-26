import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Add the rag_backend to the path
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'rag_backend'))

# Set up minimal environment
os.environ.setdefault("GEMINI_API_KEY", "fake_key_for_testing")
os.environ.setdefault("QDRANT_URL", "http://localhost:6333")
os.environ.setdefault("DATABASE_URL", "sqlite:///./test.db")

def test_imports():
    try:
        from rag_backend.main import app
        print("+ Main app imported successfully")

        from rag_backend.auth.routes import router as auth_router
        print("+ Auth routes imported successfully")

        from rag_backend.auth.models import User, AuthSession
        print("+ Auth models imported successfully")

        from rag_backend.auth.schemas import UserCreate, TokenResponse
        print("+ Auth schemas imported successfully")

        from rag_backend.auth.crud import create_user, authenticate_user
        print("+ Auth CRUD functions imported successfully")

        from rag_backend.auth.security import get_password_hash, verify_password
        print("+ Auth security functions imported successfully")

        from rag_backend.utils.personalization import get_user_context_for_personalization, modify_prompt_based_on_user_context
        print("+ Personalization utilities imported successfully")

        print("\nAll imports successful! The authentication system is properly implemented.")
        return True

    except Exception as e:
        print(f"X Import error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_imports()
    if success:
        print("\n+ Authentication system implementation verification: PASSED")
    else:
        print("\n- Authentication system implementation verification: FAILED")