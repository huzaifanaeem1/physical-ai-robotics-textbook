from huggingface_hub import HfApi
import os

# Initialize the API
api = HfApi()

# Use the correct username
repo_id = "huzaifanaeem1/robotics-rag-backend"

print(f"Attempting to upload to repository: {repo_id}")

# Define the local directory
local_directory = r"D:\Hackathon-Book\Physical-Book-Hackathon"

# Upload individual files in the root
root_files = [
    "Dockerfile",
    "start.sh",
    "space.yml",
    "HUGGINGFACE_README.md",
    "DEPLOYMENT_GUIDE.md"
]

print("Uploading root files...")
for file in root_files:
    local_path = os.path.join(local_directory, file)
    if os.path.exists(local_path):
        print(f"Uploading {file}...")
        try:
            api.upload_file(
                path_or_fileobj=local_path,
                path_in_repo=file,
                repo_id=repo_id,
                repo_type="space"
            )
            print(f"Successfully uploaded {file}")
        except Exception as e:
            print(f"Error uploading {file}: {e}")
    else:
        print(f"Warning: {local_path} does not exist")

# Upload all files from rag-backend directory
print("Uploading rag-backend files...")
for root, dirs, files in os.walk("rag-backend"):
    for file in files:
        file_path = os.path.join(root, file)
        # Convert to relative path from the project root
        relative_path = os.path.relpath(file_path, local_directory)

        print(f"Uploading {relative_path}...")
        try:
            api.upload_file(
                path_or_fileobj=file_path,
                path_in_repo=relative_path,
                repo_id=repo_id,
                repo_type="space"
            )
            print(f"Successfully uploaded {relative_path}")
        except Exception as e:
            print(f"Error uploading {relative_path}: {e}")

# Upload all files from frontend directory
print("Uploading frontend files...")
for root, dirs, files in os.walk("frontend"):
    for file in files:
        file_path = os.path.join(root, file)
        # Convert to relative path from the project root
        relative_path = os.path.relpath(file_path, local_directory)

        print(f"Uploading {relative_path}...")
        try:
            api.upload_file(
                path_or_fileobj=file_path,
                path_in_repo=relative_path,
                repo_id=repo_id,
                repo_type="space"
            )
            print(f"Successfully uploaded {relative_path}")
        except Exception as e:
            print(f"Error uploading {relative_path}: {e}")

print(f"\nAll files upload process completed for {repo_id}!")
print("Remember to set the required secrets in your Space settings:")
print("- GEMINI_API_KEY")
print("- QDRANT_URL")
print("- QDRANT_API_KEY")
print("- DATABASE_URL")
print("\nThe Space will automatically build and deploy once all files are uploaded.")
print("You can monitor the build progress in the 'Logs' tab of your Space.")