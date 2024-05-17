# SSH Directory を作成
mkdir -p ~/.ssh

# SSH key を用意
echo "$VPS_SSH_KEY" > ~/.ssh/vps
chmod 600 ~/.ssh/vps

# 環境変数のリストを生成
env_list=$(compgen -v | awk '{printf "$%s,", $0}' | sed 's/,$//')

# EC2 へ SSH 接続して Shell を実行
ssh -i ~/.ssh/vps -p $VPS_PORT -o StrictHostKeyChecking=no $VPS_USER@$VPS_HOST "echo $(envsubst $env_list < ./.github/workflows/deploy.ssh.sh) | bash"
