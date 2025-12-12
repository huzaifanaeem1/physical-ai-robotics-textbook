from huggingface_hub import HfApi, whoami
import os

# Initialize the API
api = HfApi()

try:
    # Check who the current user is
    user_info = whoami()
    print(f"Current user associated with token: {user_info['name']}")

    # Use the actual username from the token
    username = user_info['name']
    repo_id = f"{username}/robotics-rag-backend"

    print(f"Using repository: {repo_id}")

    # Define the local directory
    local_directory = r"D:\Hackathon-Book\Physical-Book-Hackathon"

    # Check if the repository exists
    try:
        api.repo_info(repo_id=repo_id, repo_type="space")
        print(f"Repository {repo_id} already exists.")
    except:
        print(f"Repository {repo_id} does not exist. Creating it...")
        api.create_repo(
            repo_id=repo_id,
            repo_type="space",
            space_sdk="docker",
            private=False
        )
        print(f"Repository {repo_id} created successfully.")

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
            api.upload_file(
                path_or_fileobj=local_path,
                path_in_repo=file,
                repo_id=repo_id,
                repo_type="space"
            )
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
            api.upload_file(
                path_or_fileobj=file_path,
                path_in_repo=relative_path,
                repo_id=repo_id,
                repo_type="space"
            )

    # Upload all files from frontend directory
    print("Uploading frontend files...")
    for root, dirs, files in os.walk("frontend"):
        for file in files:
            file_path = os.path.join(root, file)
            # Convert to relative path from the project root
            relative_path = os.path.relpath(file_path, local_directory)

            print(f"Uploading {relative_path}...")
            api.upload_file(
                path_or_fileobj=file_path,
                path_in_repo=relative_path,
                repo_id=repo_id,
                repo_type="space"
            )

    print(f"\nAll files uploaded successfully to {repo_id}!")
    print("Remember to set the required secrets in your Space settings:")
    print("- GEMINI_API_KEY")
    print("- QDRANT_URL")
    print("- QDRANT_API_KEY")
    print("- DATABASE_URL")
    print("\nThe Space will automatically build and deploy once all files are uploaded.")
    print("You can monitor the build progress in the 'Logs' tab of your Space.")

except Exception as e:
    print(f"Error: {e}")
    print("\nThe token might not be associated with the username 'huzaifanaeem1'.")
    print("Please make sure your Hugging Face token has the correct permissions")
    print("and is associated with the correct account.")