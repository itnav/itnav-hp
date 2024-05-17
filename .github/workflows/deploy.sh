# SSH Directory を作成
mkdir -p ~/.ssh

# SSH key を用意
echo "$VPS_SSH_KEY" > ~/.ssh/vps
chmod 600 ~/.ssh/vps

# # SSH 接続設定
# ssh-keyscan $VPS_HOST >> ~/.ssh/known_hosts

# # SSH 接続設定の重複削除
# sort -u ~/.ssh/known_hosts -o ~/.ssh/known_hosts

# 環境変数のリストを生成
env_list=$(compgen -v | awk '{printf "$%s,", $0}' | sed 's/,$//')

# EC2 へ SSH 接続して Shell を実行
ssh -i ~/.ssh/vps -p $VPS_PORT $VPS_USER@$VPS_HOST "echo $(envsubst $env_list < ./.github/workflows/deploy.ssh.sh) | bash"
