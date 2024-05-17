# SSH key を用意
echo "\n[Preparing SSH key.]"
mkdir -p ~/.ssh
echo "$VPS_SSH_KEY" > ~/.ssh/vps
chmod 600 ~/.ssh/vps

# 環境変数のリストを生成
env_list=$(compgen -v | awk '{printf "$%s,", $0}' | sed 's/,$//')

# EC2 へ SSH 接続して Shell を実行
echo "\n[Connecting to VPS and executing shell.]"
ssh -i ~/.ssh/vps -p $VPS_PORT -o StrictHostKeyChecking=no $VPS_USER@$VPS_HOST "echo $(envsubst $env_list < ./.github/workflows/deploy.ssh.sh) | bash"
