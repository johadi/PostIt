################################################################################
# function generate_skeleton_env_file
#
# Create a template .env file based on .env.sample if it does not already exist.
#
# Globals:
#     None
#
# Required Arguments:
#
#     $1  target file name
#         e.g. ".env.development"
#
# Example Usage:
#
#     generate_skeleton_env_file .env.development
#
# Returns:
#     None
################################################################################
function generate_skeleton_env_file() {
  filename="${1}"

  if [[ -e "./${filename}" ]]; then
    echo "A ${filename} already exists, so it will not be overwritten."
  else
    echo "Creating a ${filename} file from the sample..."
    cp ./.env.sample ./${filename}
  fi
}
